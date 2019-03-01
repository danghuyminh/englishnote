import {Sqlite} from "./DbService";

export const SettingService = {
    getSettings,
    updateSetting,
    getSetting
};

function getSettings() {
    return new Promise((resolve, reject) => {
        Sqlite.db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM settings WHERE user_id = ?',
                    [auth.currentUser.uid],
                    (txt, result) => {
                        let settings = result.rows._array;
                        let modifiedSettings = {};
                        settings.forEach(setting => {
                            modifiedSettings[setting.name] = setting.value;
                        });

                        resolve({
                            ...modifiedSettings,
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

function updateSetting(name, value) {
   return new Promise((resolve, reject) => {
       getSetting(name, true).then((setting) => {
           if (setting === false) {
               Sqlite.db.transaction(tx => {
                       tx.executeSql(
                           'INSERT INTO settings (name, value, user_id) VALUES (?, ?, ?)',
                           [
                               name,
                               value,
                               auth.currentUser.uid
                           ],
                           (txt, result) => {
                               getSettings().then((settings) => {
                                   resolve(settings)
                               });
                           },
                           (txt, error) => {
                               reject(error)
                           }
                       );
                   }
               );
           } else {
               Sqlite.db.transaction(tx => {
                       tx.executeSql(
                           'UPDATE settings SET value = ? WHERE id = ?',
                           [
                               value,
                               setting.id
                           ],
                           (txt, result) => {
                               getSettings().then((settings) => {
                                   resolve(settings);
                               });
                           },
                           (txt, error) => {
                               reject(error)
                           }
                       );
                   }
               );
           }
        })
   })
}

function getSetting(name, returnObject) {
    return new Promise((resolve, reject) => {
        Sqlite.db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM settings WHERE name = ? AND user_id = ?',
                    [   name,
                        auth.currentUser.uid
                    ],
                    (txt, result) => {
                        if (result.rows.length) {
                            let {0: setting} = result.rows._array;
                            if (returnObject)
                                resolve(setting);
                            else
                                resolve(setting.value)
                        }
                        resolve(false)
                    },
                    (txt, error) => {
                        reject(error)
                    }
                );
            }
        );
    })
}