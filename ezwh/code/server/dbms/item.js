const Item = require("../models/Item");

function _loadItem(db) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM item";
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const items = rows.map(
        (r) => new Item(r.id, r.description, r.price, r.sku, r.supplier)
      );
      resolve(items);
    });
  });
}

function _storeItem(db, i) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM item WHERE id=?";
    db.run(sql, [i.getId()], (err) => {
      if (err) {
        reject(err);
        return;
      }

      let sql = "";
      let args = [];
      if (i.getId()) {
        sql =
          "INSERT INTO item (id, description, price, sku, supplier) VALUES (?, ?, ?, ?, ?)";
        args = [
          i.getId(),
          i.getDescription(),
          i.getPrice(),
          i.getSKUId(),
          i.getSupplierId(),
        ];
      } else {
        sql =
          "INSERT INTO item (description, price, sku, supplier) VALUES (?, ?, ?, ?)";
        args = [
          i.getDescription(),
          i.getPrice(),
          i.getSKUId(),
          i.getSupplierId(),
        ];
      }

      db.run(sql, args, function (err) {
        if (err) {
          reject(err);
          return;
        }

        i.setId(this.lastID);
        resolve();
      });
    });
  });
}

function _deleteItem(db, i) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM item WHERE id=?";
    db.run(sql, [i.getId()], (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

module.exports = { _loadItem, _storeItem, _deleteItem };
