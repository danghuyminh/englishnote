import {Sqlite} from "./DbService";

export const CategoryService = {
    createCategory,
    getCategories
};

function createCategory(title) {
    return new Promise((resolve, reject) => {
        Sqlite.db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO categories (title) VALUES (?) ',
                    [
                        title
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

function getCategories() {
    return new Promise((resolve, reject) => {
        Sqlite.db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM categories',
                    [],
                    (txt, result) => {
                        resolve({
                            categories: result.rows._array,
                        })
                    },
                    (txt, error) => {
                        reject(error)
                    }
                );
            }
        );
    })
}