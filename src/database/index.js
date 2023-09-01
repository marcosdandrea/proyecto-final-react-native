import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("progress.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {

    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS progress (id INTEGER PRIMARY KEY NOT NULL, date TEXT NOT NULL, weight FLOAT NOT NULL, height FLOAT NOT NULL, frontPic TEXT NOT NULL, sidePic TEXT NOT NULL, backPic TEXT NOT NULL)",
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const dropTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx)=>{
      tx.executeSql("DROP TABLE IF EXISTS progress"),
      [],
      () => {
        resolve();
      },
      (_, error) => {
        reject(error);
      }
    })
  })
  return promise
}

export const insertNewProgress = ({
  date,
  weight,
  height,
  frontPic,
  sidePic,
  backPic,
}) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO progress (date, weight, height, frontPic, sidePic, backPic) VALUES (?, ?, ?, ?, ? , ?)",
        [date, weight, height, frontPic, sidePic, backPic],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

export const getAllProgresses = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT id, weight, date FROM progress",
        [],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

export const getProgress = ({id}) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM progress WHERE id = ?', [id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};

export const deleteProgressById = ({id}) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM progress WHERE id = ?', [id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
  return promise;
};