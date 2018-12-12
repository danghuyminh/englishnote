export class Sqlite {

    static db = Expo.SQLite.openDatabase('english_note');

    static initialize = () => {
        return new Promise((resolve, reject) => {
            Sqlite.db.transaction(tx => {
                    tx.executeSql(
                        'CREATE TABLE IF NOT EXISTS notes (' +
                            'id integer primary key not null, ' +
                            'title varchar(255) not null, ' +
                            'explanation text,' +
                            'cat_id integer,' +
                            'user_id varchar(128) not null' +
                        ');',
                        []
                    );
                    tx.executeSql(
                        'CREATE TABLE IF NOT EXISTS categories (' +
                        'id integer primary key not null, ' +
                        'title varchar(255) not null, ' +
                        'user_id varchar(128) not null' +
                        ');',
                        []
                    );
                }, error => {
                    reject(error)
                }, result => {
                    resolve(result)
                }
            );
        })
    };

    static createNote = (params) => {
        return new Promise((resolve, reject) => {
            Sqlite.db.transaction(tx => {
                    tx.executeSql(
                        'INSERT INTO notes (title, explanation, cat_id) VALUES (?, ?, ?) ',
                        [
                            params.title,
                            params.explanation,
                            params.category
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
    };

    static createSampleNotes = (arr) => {
        return new Promise((resolve, reject) => {

            Sqlite.db.transaction(tx => {
                tx.executeSql(
                    'DROP TABLE IF EXISTS notes',
                    [],
                    (txt, result) => {
                        resolve(result)
                    },
                    (txt, error) => {
                        console.log(error)
                        reject(error)
                    }
                );

                tx.executeSql(
                    'DROP TABLE IF EXISTS categories',
                    [],
                    (txt, result) => {
                        resolve(result)
                    },
                    (txt, error) => {
                        console.log(error)
                        reject(error)
                    }
                );

                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS notes (' +
                    'id integer primary key not null, ' +
                    'title varchar(255) not null, ' +
                    'explanation text,' +
                    'cat_id integer,' +
                    'user_id varchar(128) not null' +
                    ');',
                    [],
                    (txt, result) => {
                        resolve(result)
                    },
                    (txt, error) => {
                        console.log(error)
                        reject(error)
                    }
                );

                arr.map((row) => {
                    //console.log(row)
                    tx.executeSql(
                        'INSERT INTO notes (title, explanation, cat_id) VALUES (?, ?, ?) ',
                        [
                            row.title,
                            row.explanation,
                            row.cat_id
                        ],
                        (txt, result) => {
                            resolve(result)
                        },
                        (txt, error) => {
                            console.log(error)
                            reject(error)
                        }
                    );
                });
            }
            );
        })
    };

    static selectNotes = async (params) => {

        if (!params || (params && !params.limit && !params.offset)) {
            params = {
                limit: '10',
                offset: '0',
                keyword: undefined
            }
        }

        const {keyword} = params;
        let whereClause = keyword ? ' WHERE title like "%' + keyword + '%" OR explanation like "%' + keyword + '%"' : '';

        return new Promise((resolve, reject) => {
            Sqlite.db.transaction(tx => {
                    tx.executeSql(
                        'SELECT * FROM notes LIMIT ? OFFSET ?' + whereClause,
                        [
                            params.limit,
                            params.offset
                        ],
                        (txt, queryResult) => {
                            tx.executeSql(
                                'SELECT count(*) as total FROM notes' + whereClause,
                                [],
                                (txt, allResult) => {
                                    resolve({
                                        notes: queryResult.rows._array,
                                        limit: params.limit,
                                        offset: params.offset,
                                        total: allResult.rows._array[0].total
                                    })
                                },
                                (txt, error) => {
                                    reject(error)
                                }
                            );
                        },
                        (txt, error) => {
                            reject(error)
                        }
                    );
                }
            );
        })
    };

    static dropNotes = () => {
        return new Promise((resolve, reject) => {
            Sqlite.db.transaction(tx => {
                    tx.executeSql(
                        'DROP TABLE IF EXISTS notes',
                        [],
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
}