const ReturnOrder = require("../models/ReturnOrder");
const SKUItem = require("../models/SKUitem");

function _loadReturnOrder(db) {
  return new Promise(async (resolve, reject) => {
    db.all("SELECT * FROM returnorder", [], (err, returnOrderRows) => {
      if (err) {
        reject(err);
        return;
      }

      db.all("SELECT * FROM skuitem", [], (err, skuItemRows) => {
        if (err) {
          reject(err);
          return;
        }

        const orders = returnOrderRows.map(
          (r) =>
            new ReturnOrder(
              r.id,
              r.returndate,
              skuItemRows
                .filter((sir) => sir.returnorder == r.id)
                .map(
                  (sir) =>
                    new SKUItem(
                      sir.rfid,
                      sir.sku,
                      sir.available,
                      sir.dateofstock,
                      sir.restockorder,
                      sir.internalorder,
                      sir.returnorder
                    )
                ),
              r.restockorder
            )
        );
        resolve(orders);
      });
    });
  });
}

function _storeReturnOrder(db, o) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM returnorder WHERE id=?";
    db.run(sql, [o.getId()], (err) => {
      if (err) {
        reject(err);
        return;
      }

      let sql = "";
      let args = [];
      if (o.getId()) {
        sql =
          "INSERT INTO returnorder (id, returndate, restockorder) VALUES (?, ?, ?)";
        args = [o.getId(), o.getReturnDate(), o.getRestockOrderId()];
      } else {
        sql =
          "INSERT INTO returnorder (returndate, restockorder) VALUES (?, ?)";
        args = [o.getReturnDate(), o.getRestockOrderId()];
      }

      db.run(sql, args, function (err) {
        if (err) {
          reject(err);
          return;
        }

        o.setId(this.lastID);
        resolve();
      });
    });
  });
}

function _deleteReturnOrder(db, o) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM returnorder WHERE id=?";
    db.run(sql, [o.getId()], (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

module.exports = { _loadReturnOrder, _storeReturnOrder, _deleteReturnOrder };
