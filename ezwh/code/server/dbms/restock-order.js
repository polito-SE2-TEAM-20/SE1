const RestockOrder = require("../models/RestockOrder");
const SKUItem = require("../models/SKUitem");

async function _loadRestockOrder(db) {
  return new Promise(async (resolve, reject) => {
    db.all("SELECT * FROM restockorder", [], (err, restockOrderRows) => {
      if (err) {
        reject(err);
        return;
      }

      db.all("SELECT * FROM skuitem", [], (err, skuItemRows) => {
        if (err) {
          reject(err);
          return;
        }

        db.all(
          "SELECT * FROM restockorderproduct",
          [],
          (err, restockOrderProductRows) => {
            if (err) {
              reject(err);
              return;
            }

            const orders = restockOrderRows.map(
              (r) =>
                new RestockOrder(
                  r.id,
                  r.issuedate,
                  r.state,
                  r.transportnoteDeliverydate,
                  skuItemRows
                    .filter((sir) => sir.restockorder == r.id)
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
                  r.supplier,
                  restockOrderProductRows
                    .filter((ropr) => ropr.restockorder == r.id)
                    .map((ropr) => ({
                      SKUId: ropr.sku,
                      description: ropr.description,
                      price: ropr.price,
                      qty: ropr.qty,
                    }))
                )
            );
            resolve(orders);
          }
        );
      });
    });
  });
}

function _storeRestockOrderProduct(db, restockorderId, rop) {
  return new Promise(async (resolve, reject) => {
    db.run(
      "INSERT INTO restockorderproduct (restockorder, sku, description, price, qty) VALUES (?, ?, ?, ?, ?)",
      [restockorderId, rop.SKUId, rop.description, rop.price, rop.qty],
      (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      }
    );
  });
}

function _storeRestockOrderSKUItems(db, restockorderId, rfid) {
  return new Promise(async (resolve, reject) => {
    db.run(
      "UPDATE skuitem SET restockorder = ? WHERE rfid = ?",
      [restockorderId, rfid],
      (err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      }
    );
  });
}

function _storeRestockOrder(db, o) {
  return new Promise(async (resolve, reject) => {
    db.run("DELETE FROM restockorder WHERE id=?", [o.getId()], (err) => {
      if (err) {
        reject(err);
        return;
      }

      db.run(
        "DELETE FROM restockorderproduct WHERE restockorder=?",
        [o.getId()],
        (err) => {
          if (err) {
            reject(err);
            return;
          }

          let sql = "";
          let args = [];
          if (o.getId()) {
            sql =
              "INSERT INTO restockorder (id, issuedate, state, supplier, transportnoteDeliverydate) VALUES (?, ?, ?, ?, ?)";
            args = [
              o.getId(),
              o.getIssueDate(),
              o.getState(),
              o.getSupplierId(),
              o.getTransportNoteDate(),
            ];
          } else {
            sql =
              "INSERT INTO restockorder (issuedate, state, supplier, transportnoteDeliverydate) VALUES (?, ?, ?, ?)";
            args = [
              o.getIssueDate(),
              o.getState(),
              o.getSupplierId(),
              o.getTransportNoteDate(),
            ];
          }

          db.run(sql, args, function (err) {
            if (err) {
              reject(err);
              return;
            }

            o.setId(this.lastID);

            Promise.all(
              o
                .getProducts()
                .map((rop) => _storeRestockOrderProduct(db, o.getId(), rop))
            ).then(() => {
              Promise.all(
                o
                  .getSKUItems()
                  .map((skuitem) =>
                    _storeRestockOrderSKUItems(db, o.getId(), skuitem["rfid"])
                  )
              ).then(() => {
                resolve();
              });
            });
          });
        }
      );
    });
  });
}

function _deleteRestockOrder(db, o) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM restockorder WHERE id=?", [o.getId()], (err) => {
      if (err) {
        reject(err);
        return;
      }

      db.run(
        "DELETE FROM restockorderproduct WHERE restockorder=?",
        [o.getId()],
        (err) => {
          if (err) {
            reject(err);
            return;
          }

          resolve();
        }
      );
    });
  });
}

module.exports = { _loadRestockOrder, _storeRestockOrder, _deleteRestockOrder };
