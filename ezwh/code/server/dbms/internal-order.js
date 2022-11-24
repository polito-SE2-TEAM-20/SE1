const InternalOrder = require("../models/InternalOrder");
const SKUItem = require("../models/SKUitem");

function _loadInternalOrder(db) {
  return new Promise(async (resolve, reject) => {
    db.all("SELECT * FROM internalorder", [], (err, internalOrderRows) => {
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
          "SELECT id, description, price, quantity FROM product, sku WHERE sku.id = product.sku",
          [],
          (err, productRows) => {
            if (err) {
              reject(err);
              return;
            }

            const orders = internalOrderRows.map((r) => {
              if (r.state == "COMPLETED") {
                const products = skuItemRows
                  .filter((sir) => sir.internalorder == r.id)
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
                  );
                return new InternalOrder(
                  r.id,
                  r.issuedate,
                  r.state,
                  products,
                  r.customer
                );
              } else {
                const products = productRows
                  .filter((pr) => pr.internalorder == r.id)
                  .map((pr) => ({
                    SKUId: pr.id,
                    description: pr.description,
                    price: pr.price,
                    qty: pr.quantity,
                  }));
                return new InternalOrder(
                  r.id,
                  r.issuedate,
                  r.state,
                  products,
                  r.customer
                );
              }
            });

            resolve(orders);
          }
        );
      });
    });
  });
}

function _storeInternalOrderProduct(db, internalOrderId, iop) {
  return new Promise(async (resolve, reject) => {
    db.run(
      "INSERT INTO product (internalorder, sku, quantity) VALUES (?, ?, ?)",
      [internalOrderId, iop["SKUId"], iop["qty"]],
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

function _storeInternalOrderSKUItem(db, internalOrderId, product) {
  return new Promise(async (resolve, reject) => {
    db.run(
      "UPDATE skuitem SET internalorder = ? WHERE rfid = ?",
      [internalOrderId, product["RFID"]],
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

function _storeInternalOrder(db, o) {
  return new Promise(async (resolve, reject) => {
    db.run("DELETE FROM internalorder WHERE id=?", [o.getID()], (err) => {
      if (err) {
        reject(err);
        return;
      }

      db.run(
        "DELETE FROM product WHERE internalorder=?",
        [o.getID()],
        (err) => {
          if (err) {
            reject(err);
            return;
          }

          let sql = "";
          let args = [];
          if (o.getID()) {
            sql =
              "INSERT INTO internalorder (id, issuedate, state, customer) VALUES (?, ?, ?, ?)";
            args = [
              o.getID(),
              o.getIssueDate(),
              o.getState(),
              o.getCustomerID(),
            ];
          } else {
            sql =
              "INSERT INTO internalorder (issuedate, state, customer) VALUES (?, ?, ?)";
            args = [o.getIssueDate(), o.getState(), o.getCustomerID()];
          }

          db.run(sql, args, async function (err) {
            if (err) {
              reject(err);
              return;
            }

            o.setID(this.lastID);

            if (o.getState() != "COMPLETED") {
              Promise.all(
                o
                  .getProducts()
                  .map((p) => _storeInternalOrderProduct(db, o.getID(), p))
              )
                .then(() => {
                  resolve();
                })
                .catch((err) => {
                  reject(err);
                });
            } else {
              Promise.all(
                o
                  .getProducts()
                  .map((p) => _storeInternalOrderSKUItem(db, o.getID(), p))
              )
                .then(() => {
                  resolve();
                })
                .catch((err) => {
                  reject(err);
                });
            }
          });
        }
      );
    });
  });
}

function _deleteInternalOrder(db, o) {
  return new Promise(async (resolve, reject) => {
    db.run("DELETE FROM internalorder WHERE id=?", [o.getID()], (err) => {
      if (err) {
        reject(err);
        return;
      }

      db.run(
        "DELETE FROM product WHERE internalorder=?",
        [o.getID()],
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

module.exports = {
  _loadInternalOrder,
  _storeInternalOrder,
  _deleteInternalOrder,
};
