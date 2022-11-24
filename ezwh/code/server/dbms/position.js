const Position = require("../models/position");

function _loadPosition(db) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM position";
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }

      const positions = rows.map(
        (r) =>
          new Position(
            r.id,
            r.aisle,
            r.row,
            r.col,
            r.maxweight,
            r.maxvolume,
            r.occupiedweight,
            r.occupiedvolume
          )
      );
      resolve(positions);
    });
  });
}

function _storePosition(db, p) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM position WHERE id=?";
    db.run(sql, [p.get_positionId()], (err) => {
      if (err) {
        reject(err);
        return;
      }

      let sql = "";
      let args = [];
      sql =
        "INSERT INTO position (id, aisle, row, col, maxweight, maxvolume, occupiedweight, occupiedvolume) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      args = [
        p.get_positionId(),
        p.get_aisleID(),
        p.get_row(),
        p.get_col(),
        p.getMaxWeight(),
        p.getMaxVolume(),
        p.getOccupiedWeight(),
        p.getOccupiedVolume(),
      ];

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

function _deletePosition(db, p) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM position WHERE id=?";
    db.run(sql, [p.get_positionId()], (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

module.exports = { _loadPosition, _storePosition, _deletePosition };
