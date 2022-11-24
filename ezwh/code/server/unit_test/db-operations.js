function getInternalOrderProductsCount(db, id) {
  return new Promise(function (resolve, reject) {
    db.all(
      "SELECT COUNT(*) FROM product WHERE internalorder=?",
      [id],
      function (err, rows) {
        if (err) {
          reject(err);
          return;
        }

        resolve(rows[0]["COUNT(*)"]);
      }
    );
  });
}

function getRestockOrderProductsCount(db, id) {
  return new Promise(function (resolve, reject) {
    db.all(
      "SELECT COUNT(*) FROM restockorderproduct WHERE restockorder=?",
      [id],
      function (err, rows) {
        if (err) {
          reject(err);
          return;
        }

        resolve(rows[0]["COUNT(*)"]);
      }
    );
  });
}

module.exports = {
  getInternalOrderProductsCount,
  getRestockOrderProductsCount,
};
