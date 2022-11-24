'use strict';

class InternalOrder{
    constructor(id, IssueDate, state, Products, CustomerID) {
        this.id=id;
        this.IssueDate=IssueDate;
        this.state=state;
        this.CustomerID=CustomerID;
        this.Products=Products || [];

    }
    getID() {
        return this.id;
    }
    
    getIssueDate() {
        return this.IssueDate;
    }
    
    getState(){
        return this.state;
    }
    
    getCustomerID(){
        return this.CustomerID;
    }
    setID(id){
        this.id=id;
    }

    setIssueDate(IssueDate){
        this.IssueDate=IssueDate;
    }

    setstate(state){
        this.state=state;
    }
    setCustomerId(CustomerID){
        this.CustomerID=CustomerID;
    }
    
    getProducts(){
        return this.Products;
    }
    setProducts(Products){
        this.Products=Products;

    }

}

module.exports = InternalOrder;
