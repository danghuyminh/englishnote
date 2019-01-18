import {Sqlite} from "./DbService";
import {NetInfo} from 'react-native';

export const NOTE_SYNC_REQUEST   = 'ASYNC_NOTE_SYNC_REQUEST';
export const NOTE_SYNC_SUCCESS   = 'ASYNC_NOTE_SYNC_SUCCESS';
export const NOTE_SYNC_FAILURE   = 'ASYNC_NOTE_SYNC_FAILURE';
export const NOTE_SYNC_PROGRESS  = 'ASYNC_NOTE_SYNC_PROGRESS';
export const NOTE_SYNC_CONTINUE  = 'ASYNC_NOTE_SYNC_CONTINUE';

const SyncService = class
{
    static isBroken         = false;
    static isRunning        = false;
    static eventRegistered  = false;
    static db               = undefined;
    static dispatch         = undefined;

    static registerEvent(dispatch) {
        SyncService.db          = firestore;
        SyncService.dispatch    = dispatch;

        let connectedRef = fire.database().ref('.info/connected');
        connectedRef.on('value', async (snap) => {
            if (snap.val() === true) {
                console.log('internet reconnected');
                if (SyncService.isRunning) {
                    if (SyncService.isBroken === true) {
                        console.log('resync again!');
                        await SyncService.runSync(dispatch)
                    } else {
                        dispatch(SyncService.synchronizeContinue(dispatch));
                    }
                }
            } else {
                console.log('internet disconnected');
                dispatch({
                    type: NOTE_SYNC_FAILURE,
                    error: 'Internet disconnected'
                })
            }
        });
    }

    static async runSync(dispatch)
    {
        if (!SyncService.eventRegistered) {
            SyncService.eventRegistered = true;
            SyncService.registerEvent(dispatch);
        }
        const isConnected = await NetInfo.isConnected.fetch();
        if (isConnected) {
           await SyncService.syncFromLocalToHost(dispatch)
        }
    }

    static async syncFromLocalToHost(dispatch)
    {
        console.log('Unsync Notes');
        const notes = await SyncService.getUnsyncNotes();
        let limit = 1;
        const total = notes.length;
        let done = 0;

        if (notes.length === 0) {
            return true;
        }

        dispatch(SyncService.synchronizeStart());

        SyncService.isRunning = true;

        for (const note of notes) {
            // If category has not been synced
            // then sync category first
            if (limit >= 50) {
                break;
            }

            limit++;

            // Delete scenario
            if (note.deleted === 1) {
                console.log(note)
                // If note is already synced before, delete it from remote
                if (note.ref_id) {
                    await SyncService.deleteRemoteNote(note.id, note.ref_id);

                // If note has not been synced, delete from local is enough
                } else {
                    await Sqlite.deleteNote(note.id);
                }
                // continue to process next note
                continue;
            }

            // Create and update scenario
            const category = note.cat_id ? await SyncService.getCategory(note.cat_id) : {ref_id: 'uncategorized'};
            let catRefId = category.ref_id;

            console.log('Syncing note ID ' + note.id);
            console.log(note.ref_id);

            try {
                if (!catRefId) {
                    catRefId = await SyncService.createRemoteCategory(note.cat_id, note.cat_title, note.user_id);
                }

                await SyncService.createRemoteNote(note.id, note.ref_id, catRefId, note);
            } catch (error) {
                SyncService.isBroken = true;
            }
            done++;
            dispatch(SyncService.synchronizeProgress(((done * 100 / total)/100), done, total))
        }

        SyncService.isBroken = !(done >= total);
        SyncService.isRunning = false;
    }

    static async createRemoteNote(noteId, noteRefId, catRefId, params)
    {
        try {
            let data = {
                ...params,
                cat_ref_id: catRefId === 'uncategorized' ? null : catRefId
            };

            // If noteRefId exists then update data with the new one
            if (noteRefId) {
                await SyncService.db.collection("notes").doc(noteRefId).set(data);

            // If noteRefId does not exist, create a new instance on firebase
            } else {
                const docRef = await SyncService.db.collection("notes").add(data);
                await SyncService.updateNoteRefId(noteId, docRef.id);
                await SyncService.db.collection("notes").doc(docRef.id).update({ref_id: docRef.id});
                catRefId = docRef.id;
            }
            return catRefId
        } catch(error) {
            console.error("Error adding note document: ", error);
            throw(error)
        }
    }

    static async deleteRemoteNote(noteId, noteRefId)
    {
        try {
            await SyncService.db.collection("notes").doc(noteRefId).delete();
            // finally delete from local also
            await Sqlite.deleteNote(noteId);
        } catch (error) {
            console.error("Error delete note document: ", error);
            // no need to throw error
        }
    }

    static async createRemoteCategory(catId, title, userId)
    {
        try {
            const docRef = await SyncService.db.collection("categories").add({
                title: title,
                user_id: userId
            });
            await SyncService.updateCategoryRefId(catId, docRef.id);
            return docRef.id
        } catch(error) {
            console.error("Error adding category document: ", error);
            throw(error)
        }
    }

    static getUnsyncNotes()
    {
        return new Promise((resolve, reject) => {
            Sqlite.db.transaction(tx => {
                    tx.executeSql(
                        'SELECT n.id, n.title, n.explanation, n.user_id, n.ref_id, n.cat_id, c.title as cat_title, n.deleted ' +
                        'FROM notes n ' +
                        'LEFT JOIN categories c ON n.cat_id = c.id ' +
                        'WHERE n.user_id = ? AND (n.ref_id is null OR n.updated = 1 OR n.deleted = 1)',
                        [
                            auth.currentUser.uid
                        ],
                        (txt, result) => {
                            resolve(result.rows._array);
                        },
                        (txt, error) => {
                            reject(error)
                        }
                    );
                }
            );
        })
    }

    static getCategory(id) {
        return new Promise((resolve, reject) => {
            Sqlite.db.transaction(tx => {
                    tx.executeSql(
                        'SELECT ref_id FROM categories WHERE id = ?',
                        [
                            id
                        ],
                        (txt, result) => {
                            if (result.rows.length) {
                                let {0 : category} = result.rows._array;
                                resolve(category);
                            } else {
                                reject('There is no category matching the ID ' + id);
                            }
                        },
                        (txt, error) => {
                            reject(error)
                        }
                    );
                }
            );
        })
    }

    static updateCategoryRefId(id, refId) {
        return new Promise((resolve, reject) => {
            Sqlite.db.transaction(tx => {
                    tx.executeSql(
                        'UPDATE categories SET ref_id = ? WHERE id = ?',
                        [
                            refId,
                            id
                        ],
                        (txt, result) => {
                           resolve(result)
                        },
                        (txt, error) => {
                            reject(error)
                        }
                    );
                }
            );
        })
    }

    static updateNoteRefId(id, refId) {
        return new Promise((resolve, reject) => {
            Sqlite.db.transaction(tx => {
                    tx.executeSql(
                        'UPDATE notes SET ref_id = ? WHERE id = ?',
                        [
                            refId,
                            id
                        ],
                        (txt, result) => {
                            resolve(result)
                        },
                        (txt, error) => {
                            reject(error)
                        }
                    );
                }
            );
        })
    }

    static synchronizeProgress(progress, done, total) {
        return {
            type: NOTE_SYNC_PROGRESS,
            data: {
                progress,
                done,
                total
            }
        }
    }

    static synchronizeStart() {
        return {
            type: NOTE_SYNC_REQUEST
        }
    }

    static synchronizeContinue() {
        return {
            type: NOTE_SYNC_CONTINUE
        }
    }

    static async synchronizeLocalToRemote(dispatch) {
        try {
            const result = await SyncService.runSync(dispatch);
            dispatch(success(result));
            return result;
        } catch (error) {
            dispatch(failure(error.toString()));
            throw error.toString()
        }
        function success(data) { return { type: NOTE_SYNC_SUCCESS, data } }
        function failure(error) { return { type: NOTE_SYNC_FAILURE, error } }
    }
};

export default SyncService;