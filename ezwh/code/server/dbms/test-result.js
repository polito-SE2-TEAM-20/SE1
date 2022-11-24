const TestResult = require("../models/test-result");

function _loadTestResult(db) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM testresult";
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const results = rows.map(
        (r) =>
          new TestResult(r.id, r.date, r.result, r.testdescriptor, r.skuitem)
      );
      resolve(results);
    });
  });
}

function _storeTestResult(db, res) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM testresult WHERE id=?";
    db.run(sql, [res.getID()], (err) => {
      if (err) {
        reject(err);
        return;
      }

      let sql = "";
      let args = [];
      if (res.getID()) {
        sql =
          "INSERT INTO testresult (id, date, result, testdescriptor, skuitem) VALUES (?, ?, ?, ?, ?)";
        args = [
          res.getID(),
          res.getDate(),
          res.getResult(),
          res.getTestDescriptor(),
          res.getSKUItem(),
        ];
      } else {
        sql =
          "INSERT INTO testresult (date, result, testdescriptor, skuitem) VALUES (?, ?, ?, ?)";
        args = [
          res.getDate(),
          res.getResult(),
          res.getTestDescriptor(),
          res.getSKUItem(),
        ];
      }

      db.run(sql, args, function (err) {
        if (err) {
          reject(err);
          return;
        }

        res.setID(this.lastID);
        resolve();
      });
    });
  });
}

function _deleteTestResult(db, res) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM testresult WHERE id=?";
    db.run(sql, [res.getID()], (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

module.exports = { _loadTestResult, _storeTestResult, _deleteTestResult };
