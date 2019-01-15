import {Sqlite} from "./DbService";

const SyncService = class
{
    constructor()
    {
        this.db = fire.firestore();
    }

    async syncFromLocalToHost()
    {
        console.log('Unsync Notes');

        const notes = await this.getUnsyncNotes();
        //console.log(notes)
        let limit = 1;

        for (const note of notes) {
            // If category has not been synced
            // then sync category first
            if (limit >= 50) {
                return false;
            }

            limit++;

            const category = await this.getCategory(note.cat_id);
            let catRefId = category.ref_id;

            console.log('CatRefId');
            console.log(catRefId);

            if (!catRefId) {
                catRefId = await this.createRemoteCategory(note.cat_id, note.cat_title, note.user_id);
            }

            await this.createRemoteNote(note.id, note.ref_id, catRefId, note);
        }
    }

    async createRemoteNote(noteId, noteRefId, catRefId, params)
    {
        try {
            let docRef = null;
            let data = {
                ...params,
                cat_ref_id: catRefId
            };

            if (noteRefId) {
                docRef = await this.db.collection("notes").doc(noteRefId).set(data);
            } else {
                docRef = await this.db.collection("notes").add(data);
                await this.updateNoteRefId(noteId, docRef.id);
                await this.db.collection("notes").doc(docRef.id).update({ref_id: docRef.id});
            }
            return docRef.id
        } catch(error) {
            console.error("Error adding note document: ", error);
            throw(error)
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
                        'SELECT n.id, n.title, n.explanation, n.user_id, n.ref_id, n.cat_id, c.title as cat_title ' +
                        'FROM notes n ' +
                        'LEFT JOIN categories c ON n.cat_id = c.id ' +
                        'WHERE n.user_id = ? AND (n.ref_id is null OR n.updated = 1)',
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
            console.log('Update note ref');
            console.log(id);
            console.log(refId);
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
};

export default SyncService;