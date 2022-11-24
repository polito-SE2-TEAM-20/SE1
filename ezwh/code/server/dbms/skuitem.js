const SKUItem = require("../models/SKUitem");

function _loadSKUItem(db) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM skuitem";
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const skuitems = rows.map(
        (r) => new SKUItem(r.rfid, r.sku, r.available, r.dateofstock, r.restockorder, r.internalorder, r.returnorder)
      );
      resolve(skuitems);
    });
  });
}

function _storeSKUItem(db, skui) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM skuitem WHERE rfid=?";
    db.run(sql, [skui.getRFID()], (err) => {
      if (err) {
        reject(err);
        return;
      }

      let sql = "";
      let args = [];
      if (skui.getRFID()) {
        sql =
          "INSERT INTO skuitem (rfid, available, sku, dateofstock, restockorder, internalorder, returnorder) VALUES (?, ?, ?, ?, ?, ?, ?)";
        args = [
          skui.getRFID(),
          skui.getAvailable(),
          skui.getSKUid(),
          skui.getDateOfStock(),
          skui.getRestockOrder(),
          skui.getInternalOrder(),
          skui. getReturnOrder(),
        ];
      } else {
        sql =
          "INSERT INTO skuitem (available, sku, dateofstock, restockorder, internalorder, returnorder) VALUES (?, ?, ?, ?, ?, ?)";
        args = [
          skui.getAvailable(),
          skui.getSKUid(),
          skui.getDateOfStock(),
          skui.getRestockOrder(),
          skui.getInternalOrder(),
          skui.getReturnOrder(),
        ];
      }

      db.run(sql, args, function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  });
}

function _deleteSKUItem(db, skui) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM skuitem WHERE rfid=?";
    db.run(sql, [skui.getRFID()], (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

module.exports = { _loadSKUItem, _storeSKUItem, _deleteSKUItem };
