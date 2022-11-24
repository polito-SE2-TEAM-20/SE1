const TestDescriptor = require("../models/test-descriptor");

function _loadTestDescriptor(db) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM testdescriptor";
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const descriptors = rows.map(
        (r) => new TestDescriptor(r.id, r.name, r.description, r.sku)
      );
      resolve(descriptors);
    });
  });
}

function _storeTestDescriptor(db, d) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM testdescriptor WHERE id=?";
    db.run(sql, [d.getID()], (err) => {
      if (err) {
        reject(err);
        return;
      }

      let sql = "";
      let args = [];
      if (d.getID()) {
        sql =
          "INSERT INTO testdescriptor (id, name, description, sku) VALUES (?, ?, ?, ?)";
        args = [
          d.getID(),
          d.getName(),
          d.getProcedureDescription(),
          d.getSku(),
        ];
      } else {
        sql =
          "INSERT INTO testdescriptor (name, description, sku) VALUES (?, ?, ?)";
        args = [d.getName(), d.getProcedureDescription(), d.getSku()];
      }

      db.run(sql, args, function (err) {
        if (err) {
          reject(err);
          return;
        }

        d.setID(this.lastID);
        resolve();
      });
    });
  });
}

function _deleteTestDescriptor(db, d) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM testdescriptor WHERE id=?";
    db.run(sql, [d.getID()], (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

module.exports = {
  _loadTestDescriptor,
  _storeTestDescriptor,
  _deleteTestDescriptor,
};
