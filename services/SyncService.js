import {Sqlite} from "./DbService";
import {NetInfo} from 'react-native';

export const NOTE_SYNC_REQUEST   = 'ASYNC_NOTE_SYNC_REQUEST';
export const NOTE_SYNC_SUCCESS   = 'ASYNC_NOTE_SYNC_SUCCESS';
export const NOTE_SYNC_FAILURE   = 'ASYNC_NOTE_SYNC_FAILURE';
export const NOTE_SYNC_PROGRESS  = 'ASYNC_NOTE_SYNC_PROGRESS';

const SyncService = class
{
    constructor()
    {
        this.db = fire.firestore();

        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
        });
        function handleFirstConnectivityChange(isConnected) {
            console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
           
        }
    }

    static handleFirstConnectivityChange(connectionInfo) {
        console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    }

    async runSync(dispatch)
    {
        if (NetInfo.isConnected) {
           await this.syncFromLocalToHost(dispatch)
        }

        /*fire.database().ref('.info/connected').on('value', async (connectedSnap) => {
            if (connectedSnap.val() === true) {
                console.log('online');
                await this.syncFromLocalToHost(dispatch)
            } else {
                /!* we're disconnected! *!/
                console.log('offline')
            }
        });*/
    }

    async syncFromLocalToHost(dispatch)
    {
        console.log('Unsync Notes');
        const notes = await this.getUnsyncNotes();
        let limit = 1;
        const total = notes.length;
        let done = 0;

        if (notes.length === 0) {
            return true;
        }

        dispatch(this.synchronizeStart());

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
                    await this.deleteRemoteNote(note.id, note.ref_id);

                // If note has not been synced, delete from local is enough
                } else {
                    await Sqlite.deleteNote(note.id);
                }
                // continue to process next note
                continue;
            }

            // Create and update scenario
            const category = note.cat_id ? await this.getCategory(note.cat_id) : {ref_id: 'uncategorized'};
            let catRefId = category.ref_id;

            console.log('Syncing note ID ' + note.id);
            console.log(note.ref_id);

            if (!catRefId) {
                catRefId = await this.createRemoteCategory(note.cat_id, note.cat_title, note.user_id);
            }

            await this.createRemoteNote(note.id, note.ref_id, catRefId, note);

            done++;
            dispatch(this.synchronizeProgress(((done * 100 / total)/100), done, total))
        }
    }

    async createRemoteNote(noteId, noteRefId, catRefId, params)
    {
        try {
            let data = {
                ...params,
                cat_ref_id: catRefId === 'uncategorized' ? null : catRefId
            };

            // If noteRefId exists then update data with the new one
            if (noteRefId) {
                await this.db.collection("notes").doc(noteRefId).set(data);

            // If noteRefId does not exist, create a new instance on firebase
            } else {
                const docRef = await this.db.collection("notes").add(data);
                await this.updateNoteRefId(noteId, docRef.id);
                await this.db.collection("notes").doc(docRef.id).update({ref_id: docRef.id});
                catRefId = docRef.id;
            }
            return catRefId
        } catch(error) {
            console.error("Error adding note document: ", error);
            //throw(error)
        }
    }

    async deleteRemoteNote(noteId, noteRefId)
    {
        try {
            await this.db.collection("notes").doc(noteRefId).delete();
            // finally delete from local also
            await Sqlite.deleteNote(noteId);
        } catch (error) {
            console.error("Error delete note document: ", error);
            // no need to throw error
        }
    }

    async createRemoteCategory(catId, title, userId)
    {
        try {
            const docRef = await this.db.collection("categories").add({
                title: title,
                user_id: userId
            });
            await this.updateCategoryRefId(catId, docRef.id);
            return docRef.id
        } catch(error) {
            console.error("Error adding category document: ", error);
            throw(error)
        }
    }

    getUnsyncNotes()
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

    getCategory(id) {
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

    updateCategoryRefId(id, refId) {
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

    updateNoteRefId(id, refId) {
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

    synchronizeProgress(progress, done, total) {
        return {
            type: NOTE_SYNC_PROGRESS,
            data: {
                progress,
                done,
                total
            }
        }
    }

    synchronizeStart() {
        return {
            type: NOTE_SYNC_REQUEST
        }
    }
};

export default SyncService;