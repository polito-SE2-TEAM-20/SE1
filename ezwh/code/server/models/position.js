class Position {
    constructor(positionId, aisleID, row, col, maxWeight, maxVolume, occupiedWeight,occupiedVolume) {
        this.setPositionId(positionId);
        this.setAisleId(aisleID);
        this.setRow(row);
        this.setCol(col);
        this.setMaxWeight(maxWeight);
        this.setMaxVolume(maxVolume);
        this.setOccupiedWeight(occupiedWeight);
        this.setOccupiedVolume(occupiedVolume);
    }

    get_positionId() {
        return this.positionId;
    }

    get_aisleID() {
        return this.aisleID;
    }

    get_row() {
        return this.row;
    }

    get_col() {
        return this.col;
    }

    getMaxWeight() {
        return this.maxWeight;
    }

    getMaxVolume() {
        return this.maxVolume;
    }

    getOccupiedWeight() {
        return this.occupiedWeight;
    }

    getOccupiedVolume() {
        return this.occupiedVolume;
    }

    setPositionId(positionId) {
        this.positionId = positionId;
    }

    setAisleId(aisleID) {
        this.aisleID = aisleID;
    }

    setRow(row) {
        this.row = row;
    }

    setCol(col) {
        this.col = col;
    }

    setMaxWeight(maxWeight) {
        this.maxWeight = maxWeight;
    }

    setMaxVolume(maxVolume) {
        this.maxVolume = maxVolume;
    }

    setOccupiedWeight(occupiedWeight) {
        this.occupiedWeight = occupiedWeight;
    }

    setOccupiedVolume(occupiedVolume) {
        this.occupiedVolume = occupiedVolume;
    }

}

module.exports = Position;