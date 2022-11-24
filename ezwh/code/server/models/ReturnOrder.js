class ReturnOrder {

    constructor(id, returnDate, products, restockOrderId) {
        this.setId(id);
        this.setReturnDate(returnDate);
        this.setProducts(products || []);
        this.setRestockOrderId(restockOrderId);
    } 

    getId() {
        return this.id;
    }

    getReturnDate() {
        return this.returnDate;
    }

    getProducts() {
        return this.products;
    }

    getRestockOrderId() {
        return this.restockOrderId;
    }

    setId(id) {
        this.id = id;
    }

    setReturnDate(returnDate) {
        this.returnDate = returnDate;
    }

    setProducts(products) {
        this.products = products;
    }

    setRestockOrderId(restockOrderId) {
        this.restockOrderId = restockOrderId;
    }

}

module.exports = ReturnOrder;