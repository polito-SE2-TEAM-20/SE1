'use strict'

const Position = require('../models/position');

function _createPosition(db, positionId, aisleID, row, col, maxWeight, maxVolume) {
    return db.storePosition(new Position(positionId, aisleID, row, col, maxWeight, maxVolume, 0, 0));
}

function _updatePosition(db, positionId, aisleID, row, col, maxWeight, maxVolume,occupiedWeight,occupiedVolume) {
    return db.storePosition(new Position(positionId, aisleID, row, col, maxWeight, maxVolume,occupiedWeight,occupiedVolume));
}

function _updatePositionId(db, positionId, newPositionId) {  
   const action = db.loadPosition()
     .then(positions => positions.filter(p=>p.positionId===positionId).shift())
         .then(oldPos => {oldPos.setPositionId(newPositionId); db.storePosition(oldPos)})
            .then(()=>db.deletePosition(new Position(positionId)));
   return action;
}

function _getAllPositions(db) {
    return db.loadPosition().then((positions) =>
      positions.map((pos) => ({
        positionId: pos.get_positionId(),
        aisleID: pos.get_aisleID(),
        row: pos.get_row(),
        col: pos.get_col(),
        maxWeight: pos.getMaxWeight(),
        maxVolume: pos.getMaxVolume(),
        occupiedWeight: pos.getOccupiedWeight(),
        occupiedVolume: pos.getOccupiedVolume(),
      }))
    );
  }

function _deletePosition(db, positionId) {
    return db.deletePosition(new Position(positionId));
}

module.exports = {
    _createPosition,
    _updatePosition,
    _updatePositionId,
    _getAllPositions,
    _deletePosition
}