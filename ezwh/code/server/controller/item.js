"use strict";

const Item = require("../models/Item");

async function _getItems(db){
    return db.loadItem().then(items => items.map(item => (
        {
            "id": item.getId(),
            "description": item.getDescription(),
            "price": item.getPrice(),
            "SKUId": item.getSKUId(),
            "supplierId": item.getSupplierId()
        }
    )));
}

async function _getItem(db, id){
    return db.loadItem().then(items => items.filter(item=> item.getId() == id).map(item => (
        {
            "id": item.getId(),
            "description": item.getDescription(),
            "price": item.getPrice(),
            "SKUId": item.getSKUId(),
            "supplierId": item.getSupplierId()
        }
    )));
}

async function _createItem(db, id, description, price, SKUId, supplierId){
    return db.storeItem(new Item(id, description, price, SKUId, supplierId));
}

async function _updateItem(db, id, newDescription, newPrice){
    //const oldItem = db.loadItem().then(items => items.filter(item => item.getId() == id));
    const item = await db.loadItem().then(items=>items.find(i=>i.getId() == id));
    item.setDescription(newDescription);
    item.setPrice(newPrice);
    return db.storeItem(item);
}

async function _deleteItem(db, id){
    //const delItem = _getItem(db, id);
    const delItem = new Item(id);
    return db.deleteItem(delItem);
} 

module.exports = {
    _getItems,
    _getItem,
    _createItem,
    _updateItem,
    _deleteItem
}