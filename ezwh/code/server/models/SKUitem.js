class SKUitem {
    constructor(rfid, SKUid, available, dateOfStock, restockorder = null, internalorder = null, returnorder = null) {
        this.setRFID(rfid);
        this.setSKUid(SKUid);
        this.setAvailable(available);
        this.setDateOfStock(dateOfStock);
        this.setRestockOrder(restockorder);
        this.setInternalOrder(internalorder);
        this.setReturnOrder(returnorder);
    }

    getRFID() {
        return this.rfid;
    }

    getSKUid() {
        return this.SKUid;
    }

    getAvailable() {
        return this.available;
    }

    getDateOfStock() {
        return this.dateOfStock;
    }

    setRFID(rfid) {
        this.rfid = rfid;
    }

    setSKUid(SKUid) {
        this.SKUid = SKUid;
    }

    setAvailable(available) {
        this.available = available;
    }

    setDateOfStock(dateOfStock) {
        this.dateOfStock = dateOfStock;
    }

    getReturnOrder() {
        return this.returnorder
    }

    setReturnOrder(returnorder) {
        this.returnorder = returnorder;
    }

    getRestockOrder() {
        return this.restockorder
    }

    setRestockOrder(restockorder) {
        this.restockorder = restockorder;
    }

    getInternalOrder() {
        return this.internalorder
    }

    setInternalOrder(internalorder) {
        this.internalorder = internalorder;
    }
}

module.exports = SKUitem;