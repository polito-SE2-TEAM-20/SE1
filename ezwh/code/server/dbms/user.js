const { User } = require("../models/UserAndSubclasses");

function _loadUser(db) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM user";
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      // TODO: maybe use subclass?
      const users = rows.map(
        (r) => new User(r.id, r.name, r.surname, r.username, r.type, r.password)
      );
      resolve(users);
    });
  });
}

function _storeUser(db, u) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM user WHERE id=?";
    db.run(sql, [u.getID()], (err) => {
      if (err) {
        reject(err);
        return;
      }

      let sql = "";
      let args = [];
      if (u.getID()) {
        sql =
          "INSERT INTO user (id, name, surname, username, password, type) VALUES (?, ?, ?, ?, ?, ?)";
        args = [
          u.getID(),
          u.getname(),
          u.getSurname(),
          u.getusername(),
          u.getPassword(),
          u.getType(),
        ];
      } else {
        sql =
          "INSERT INTO user (name, surname, username, password, type) VALUES (?, ?, ?, ?, ?)";
        args = [
          u.getname(),
          u.getSurname(),
          u.getusername(),
          u.getPassword(),
          u.getType(),
        ];
      }

      db.run(sql, args, function (err) {
        if (err) {
          reject(err);
          return;
        }

        u.setId(this.lastID);
        resolve();
      });
    });
  });
}

function _deleteUser(db, u) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM user WHERE id=?";
    db.run(sql, [u.getID()], (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

module.exports = { _loadUser, _storeUser, _deleteUser };
