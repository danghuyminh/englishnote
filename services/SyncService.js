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

        notes.forEach((note) => {
            console.log(note);
            return false;
        });
        //await this.createRemoteCategory('test title', '23432423');
    }

    async createRemoteCategory(title, userId)
    {
        this.db.collection("categories").add({
            title: title,
            user_id: userId
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

    getUnsyncNotes()
    {
        return new Promise((resolve, reject) => {
            Sqlite.db.transaction(tx => {
                    tx.executeSql(
                        'SELECT n.id, n.title, n.explanation, n.user_id, c.title as cat_title, c.ref_id as cat_ref_id ' +
                        'FROM notes n ' +
                        'LEFT JOIN categories c ON n.cat_id = c.id ' +
                        'WHERE n.user_id = ? AND n.ref_id is null',
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
};

export default SyncService;