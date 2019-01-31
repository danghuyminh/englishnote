import {Sqlite} from "./DbService";

export const CategoryService = {
    createCategory,
    updateCategory,
    getCategories,
    getCategory,
    deleteCategory,
    createCategoryWithRefId
};

function createCategory(title) {
    return new Promise((resolve, reject) => {
        Sqlite.db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO categories (title, user_id) VALUES (?, ?) ',
                    [
                        title,
                        auth.currentUser.uid
                    ],
                    (txt, result) => {
                        getCategories().then((categories) => {
                            resolve(categories)
                        });
                    },
                    (txt, error) => {
                        reject(error)
                    }
                );
            }
        );
    })
}

function createCategoryWithRefId(title, refId) {
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
                        reject(error)
                    }
                );
            }
        );
    })
}

function updateCategory(values) {
    return new Promise((resolve, reject) => {
        Sqlite.db.transaction(tx => {
                tx.executeSql(
                    'UPDATE categories SET title = ? WHERE id = ?',
                    [
                        values.title,
                        values.id
                    ],
                    (txt, result) => {
                        getCategories().then((categories) => {
                            resolve(categories)
                        });
                    },
                    (txt, error) => {
                        reject(error)
                    }
                );
            }
        );
    })
}


function deleteCategory(id) {
    return new Promise((resolve, reject) => {
        // set parent id of all children to null first
        resetParentForChildren(id).then(() => {
            // then delete category
            Sqlite.db.transaction(tx => {
                    tx.executeSql(
                        'DELETE FROM categories WHERE id = ?',
                        [
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
        });
    })
}

function resetParentForChildren(parentId) {
    return new Promise((resolve, reject) => {
        Sqlite.db.transaction(tx => {
                tx.executeSql(
                    'UPDATE notes SET cat_id = null, updated = 1 WHERE cat_id = ?',
                    [
                        parentId
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

function getCategory(id) {
    return new Promise((resolve, reject) => {
        Sqlite.db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM categories WHERE id = ? AND user_id = ?',
                    [
                        id,
                        auth.currentUser.uid
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