const SKU = require("../models/sku");

function _loadSKU(db) {
  return new Promise(async (resolve, reject) => {
    db.all("SELECT * FROM sku", [], (err, skuRows) => {
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
          "SELECT * FROM testdescriptor",
          [],
          (err, testDescriptorRows) => {
            if (err) {
              reject(err);
              return;
            }

            const skus = skuRows.map(
              (r) =>
                new SKU(
                  r.id,
                  r.description,
                  r.weight,
                  r.volume,
                  r.notes,
                  r.price,
                  skuItemRows
                    .filter((sir) => sir.sku == r.id)
                    .map((sir) => sir.id),
                  r.position,
                  testDescriptorRows
                    .filter((tdr) => tdr.sku == r.id)
                    .map((tdr) => tdr.id),
                  r.availablequantity
                )
            );
            resolve(skus);
          }
        );
      });
    });
  });
}

function _storeSKU(db, sku) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM sku WHERE id=?";
    db.run(sql, [sku.get_SKU_ID()], (err) => {
      if (err) {
        reject(err);
        return;
      }

      let sql = "";
      let args = [];
      if (sku.get_SKU_ID()) {
        sql =
          "INSERT INTO sku (id, description, weight, volume, price, notes, position, availablequantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        args = [
          sku.get_SKU_ID(),
          sku.get_Description(),
          sku.get_weight(),
          sku.get_volume(),
          sku.get_price(),
          sku.get_notes(),
          sku.get_position(),
          sku.getAvailableQuantity(),
        ];
      } else {
        sql =
          "INSERT INTO sku (description, weight, volume, price, notes, position, availablequantity) VALUES (?, ?, ?, ?, ?, ?, ?)";
        args = [
          sku.get_Description(),
          sku.get_weight(),
          sku.get_volume(),
          sku.get_price(),
          sku.get_notes(),
          sku.get_position(),
          sku.getAvailableQuantity(),
        ];
      }

      db.run(sql, args, function (err) {
        if (err) {
          reject(err);
          return;
        }

        sku.set_SKU_ID(this.lastID);
        resolve();
      });
    });
  });
}

function _deleteSKU(db, sku) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM sku WHERE id=?";
    db.run(sql, [sku.get_SKU_ID()], (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

module.exports = { _loadSKU, _storeSKU, _deleteSKU };
