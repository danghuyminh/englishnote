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
                            'ref_id varchar(255),' +
                            'created_at datetime,' +
                            'user_id varchar(128) not null' +
                        ');',
                        []
                    );
                    tx.executeSql(
                        'CREATE TABLE IF NOT EXISTS categories (' +
                        'id integer primary key not null, ' +
                        'title varchar(255) not null, ' +
                        'ref_id varchar(255),' +
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
                        'INSERT INTO notes (title, explanation, cat_id, created_at, user_id) VALUES (?, ?, ?, DateTime("now"), ?) ',
                        [
                            params.title,
                            params.explanation,
                            params.category,
                            auth.currentUser.uid,

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

    static createSampleNotes = (arr, catArr) => {
        return new Promise((resolve, reject) => {

            Sqlite.db.transaction(tx => {
                tx.executeSql(
                    'DROP TABLE IF EXISTS notes',
                    [],
                    (txt, result) => {

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
                    'ref_id varchar(255),' +
                    'created_at datetime,' +
                    'user_id varchar(128) not null' +
                    ');',
                    [],
                    (txt, result) => {
                        arr.map((row) => {
                            //console.log(row)
                            tx.executeSql(
                                'INSERT INTO notes (title, explanation, cat_id, created_at, user_id) VALUES (?, ?, ?, DateTime("now"), ?) ',
                                [
                                    row.title,
                                    row.explanation,
                                    row.cat_id,
                                    'SGETEjzYMmNSOB9quQeQ7FAWZzQ2'
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
                    },
                    (txt, error) => {
                        console.log(error)
                        reject(error)
                    }
                );

                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS categories (' +
                    'id integer primary key not null, ' +
                    'title varchar(255) not null, ' +
                    'ref_id varchar(255),' +
                    'user_id varchar(128) not null' +
                    ');',
                    [],
                    (txt, result) => {
                        catArr.map((row) => {
                            //console.log(row)
                            tx.executeSql(
                                'INSERT INTO categories (title, user_id) VALUES (?, ?) ',
                                [
                                    row.title,
                                    'SGETEjzYMmNSOB9quQeQ7FAWZzQ2'
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
                    },
                    (txt, error) => {
                        console.log(error)
                        reject(error)
                    }
                );
            }
            );
        })
    };

    static selectNotes = async (params) => {

        if (!params || (params && !params.limit && !params.offset)) {
            params = Object.assign({}, params, {
                limit: 10,
                offset: 0
            });
        }

        const {keyword, categoryId} = params;

        let whereClause = ` WHERE n.user_id = ?`;
        whereClause += keyword ? ' AND (n.title like "%' + keyword + '%" OR n.explanation like "%' + keyword + '%")' : '';
        whereClause += categoryId ? ` AND cat_id = ${categoryId}` : '';
        const leftJoin = ' LEFT JOIN categories as c on n.cat_id = c.id';

        return new Promise((resolve, reject) => {
            Sqlite.db.transaction(tx => {
                    tx.executeSql(
                        'SELECT n.id, n.title, n.explanation, c.title as cat_title, n.created_at FROM notes as n' + leftJoin + whereClause + ' ORDER BY n.id DESC LIMIT ? OFFSET ?',
                        [
                            auth.currentUser.uid,
                            params.limit,
                            params.offset,
                        ],
                        (txt, queryResult) => {
                            tx.executeSql(
                                'SELECT count(*) as total FROM notes as n' + whereClause,
                                [
                                    auth.currentUser.uid
                                ],
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