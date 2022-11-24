class RestockOrder{
    constructor(id, issue, state, transportNoteDate, SKUItems, supplierId, products){
        this.id = id;
        this.issue = issue;
        this.state = state;
        this.transportNoteDate = transportNoteDate;
        this.SKUItems = SKUItems || [];
        this.supplierId = supplierId;
        this.products = products || [];
    }

    getId(){
        return this.id;
    }

    getIssueDate(){
        return this.issue;
    }

    getState(){
        return this.state;
    }

    getSKUItems(){
        return this.SKUItems;
    }

    getSupplierId(){
        return this.supplierId;
    }

    getTransportNoteDate(){
        return this.transportNoteDate
    }

    setState(state){
        this.state = state;
    }

    setTransportNoteDate(transportNoteDate){
        this.transportNoteDate = transportNoteDate;
    }

    setId(id){
        this.id = id;
    }

    setIssueDate(issue){
        this.issue = issue;
    }

    setSKUItems(SKUItems){
        this.SKUItems = SKUItems;
    }

    setSupplierId(supplierId){
        this.supplierId = supplierId;
    }

    getProducts(){
        return this.products;
    }

    setProducts(products){
        this.products = products;
    }
}

module.exports = RestockOrder;