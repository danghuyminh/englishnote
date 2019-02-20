import {Sqlite} from "./DbService";
import {NetInfo} from 'react-native';
import {Toast} from "native-base";

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
                        dispatch(SyncService.synchronizeContinue('local'));
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

    static async runSync(dispatch, hostToLocal, uid)
    {
        if (!SyncService.eventRegistered) {
            SyncService.eventRegistered = true;
            SyncService.registerEvent(dispatch);
        }
        const isConnected = await NetInfo.isConnected.fetch();
        if (isConnected) {
            if (hostToLocal) {
                await SyncService.syncFromHostToLocal(uid, dispatch)
            } else {
                await SyncService.syncFromLocalToHost(dispatch)
            }
        } else {
            Toast.show({
                text: 'No internet connection',
                buttonText: 'Hide',
                type: "warning",
                duration: 3000
            });
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
            Toast.show({
                text: 'Everything is up-to-date',
                buttonText: 'Hide',
                type: "success",
                duration: 3000
            });
            return true;
        }

        dispatch(SyncService.synchronizeStart('local'));

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
                dispatch({
                    type: NOTE_SYNC_FAILURE,
                    error: 'Create remote note failed'
                })
            }
            done++;
            dispatch(SyncService.synchronizeProgress(((done * 100 / total)/100), done, total))
        }

        SyncService.isBroken = !(done >= total);
        SyncService.isRunning = false;
    }

    static async syncFromHostToLocal(userId, dispatch)
    {
        console.log('syncFromHostToLocal');
        const noteRef = SyncService.db.collection("notes");
        const querySnapshot = await noteRef.where("user_id", "==", userId).orderBy("id").get();
        const total = querySnapshot.size;

        if (total === 0) {
            return true;
        }

        let done = 0;

        dispatch(SyncService.synchronizeStart('remote'));

        let remoteNotes = [];

        querySnapshot.forEach(function(doc) {
            let item = doc.data();
            item.doc_id = doc.id;
            remoteNotes.push(item);
        });

        for (const remoteNote of remoteNotes) {
            try {
                console.log(remoteNote.doc_id, " => ", remoteNote);
                const localNote = await SyncService.getNoteByRefId(remoteNote.doc_id);
                // Determine corresponding local category
                let localCategory = {id: null};
                if (remoteNote.cat_ref_id) {
                    localCategory = await SyncService.getCategoryByRefId(remoteNote.cat_ref_id);
                    if (!localCategory) {
                        const localCategoryId = await SyncService.createLocalCategory(remoteNote.cat_title, remoteNote.cat_ref_id);
                        localCategory = {id: localCategoryId}
                    }
                }

                if (localNote) {
                    await Sqlite.updateNote(localNote.id, {
                        title: remoteNote.title,
                        explanation: remoteNote.explanation,
                        cat_id: localCategory.id
                    });
                } else {
                    // When localNote has not been created
                    // Create local note
                    await SyncService.createLocalNote({...remoteNote, cat_id: localCategory.id});
                }
            } catch (error) {
                throw error;
            }
            done++;
            dispatch(SyncService.synchronizeProgress(((done * 100 / total)/100), done, total))
        }
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
                await SyncService.updateNoteRefId(noteId, noteRefId);

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

    static createLocalNote = (params) => {
        return new Promise((resolve, reject) => {
            Sqlite.db.transaction(tx => {
                    tx.executeSql(
                        'INSERT INTO notes (title, explanation, cat_id, ref_id, user_id, created_at) VALUES (?, ?, ?, ?, ?, DateTime("now")) ',
                        [
                            params.title,
                            params.explanation,
                            params.cat_id,
                            params.ref_id,
                            auth.currentUser.uid,

                        ],
                        (txt, result) => {
                            resolve(result.insertId);
                        },
                        (txt, error) => {
                            console.log('Cannot create local note due to this error: ' + error.toString())
                            reject('Cannot create local note due to this error: ' + error.toString())
                        }
                    );
                }
            );
        })
    };

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

    static createLocalCategory(title, refId) {
        return new Promise((resolve, reject) => {
            Sqlite.db.transaction(tx => {
                    tx.executeSql(
                        'INSERT INTO categories (title, ref_id, user_id) VALUES (?, ?, ?) ',
                        [
                            title,
                            refId,
                            auth.currentUser.uid
                        ],
                        (txt, result) => {
                            resolve(result.insertId);
                        },
                        (txt, error) => {
                            reject('Cannot create local category due to this error: ' + error.toString())
                        }
                    );
                }
            );
        })
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

    static getCategoryByRefId(ref_id) {
        return new Promise((resolve, reject) => {
            Sqlite.db.transaction(tx => {
                    tx.executeSql(
                        'SELECT id, title, ref_id FROM categories WHERE ref_id = ? and user_id = ?',
                        [
                            ref_id,
                            auth.currentUser.uid
                        ],
                        (txt, result) => {
                            if (result.rows.length) {
                                let {0 : category} = result.rows._array;
                                resolve(category);
                            } else {
                                resolve(null)
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

    static getNoteByRefId(refId) {
        return new Promise((resolve, reject) => {
            Sqlite.db.transaction(tx => {
                    tx.executeSql(
                        'SELECT id, title, ref_id, cat_id FROM notes WHERE ref_id = ? and user_id = ? and (`deleted` != 1 or `deleted` is null)',
                        [
                            refId,
                            auth.currentUser.uid
                        ],
                        (txt, result) => {
                            if (result.rows.length) {
                                let {0 : note} = result.rows._array;
                                resolve(note);
                            } else {
                                resolve(null)
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
                        'UPDATE notes SET ref_id = ?, updated = null WHERE id = ?',
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

    static synchronizeStart(syncType) {
        return {
            type: NOTE_SYNC_REQUEST,
            syncType
        }
    }

    static synchronizeContinue(syncType) {
        return {
            type: NOTE_SYNC_CONTINUE,
            syncType
        }
    }

   /* static async synchronizeLocalToRemote(dispatch) {
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
    }*/
};

export default SyncService;