"use strict"

const RestockOrder = require("../models/RestockOrder");

async function _getRestockOrders(db){
    return db.loadRestockOrder().then(orders => orders.map(order => {
        let transportNote = {};
        if (order.getTransportNoteDate()) {
            transportNote = {
              deliveryDate: order.getTransportNoteDate().replaceAll("-", "/"),
            };
        }
        return {
            "id": order.getId(),
            "issue": order.getIssueDate(),
            "orderState": order.getState(),
            "transportNote": transportNote,
            "SKUItems": order.getSKUItems(),
            "supplierId": order.getSupplierId(),
            "product": order.getProducts()
        }
    }));
}

async function _getIssuedRestockOrders(db){
    return db.loadRestockOrder().then(orders => orders.filter(order => order.getState() === "ISSUED").map(
        order => {
            let transportNote = {};
            if (order.getTransportNoteDate()) {
                transportNote = {
                  deliveryDate: order.getTransportNoteDate().replaceAll("-", "/"),
                };
            }
            return {
                "id": order.getId(),
                "issue": order.getIssueDate(),
                "orderState": order.getState(),
                "transportNote": transportNote,
                "SKUItems": order.getSKUItems(),
                "supplierId": order.getSupplierId(),
                "product": order.getProducts()
            }
        }
    ))
}

async function _getRestockOrder(db, id){
    return db.loadRestockOrder().then(orders => orders.filter(order => order.getId() === id).map(
        order => {
            let transportNote = {};
            if (order.getTransportNoteDate()) {
                transportNote = {
                  deliveryDate: order.getTransportNoteDate().replaceAll("-", "/"),
                };
            }
            return {
                "id": order.getId(),
                "issue": order.getIssueDate(),
                "orderState": order.getState(),
                "transportNote": transportNote,
                "SKUItems": order.getSKUItems(),
                "supplierId": order.getSupplierId(),
                "product": order.getProducts()
            }
        }
    ))
}

async function _getRestockOrderReturnItems(db, id){
    return await db.loadRestockOrder().then(orders => orders.find(order => order.getId() == id).getProducts());
}

async function _createRestockOrder(db, issueDate, products, supplierId){
    const skuItems = [];
    return db.storeRestockOrder(new RestockOrder(null, issueDate, "ISSUED", null, skuItems, supplierId, products));
}

async function _updateRestockOrderState(db, id, newState){
    const restockOrder = await db.loadRestockOrder().then(orders => orders.find(order => order.getId() == id));
    restockOrder.setState(newState);
    return db.storeRestockOrder(restockOrder);
}

async function _restockOrderAddSKUItems(db, orderId, skuitems){
    const ro = await db.loadRestockOrder().then(orders => orders.filter(order => order.getId() == orderId).map(o => o.setSKUItems(
        skuitems
    )));
    return await db.storeRestockOrder(ro);

}

async function _restockOrderAddTransportNote(db, orderId, deliveryDate){
    return await db.loadRestockOrder().then(orders => orders.filter(order => order.getId() == orderId).map(
        order => order.setTransportNoteDate(deliveryDate))
    )
}

async function _deleteRestockOrder(db, orderId){
    const delRo = await db.loadRestockOrder().then(orders => orders.find(order => order.getId() == orderId));
    return await db.deleteRestockOrder(delRo);
}

module.exports = {
    _getRestockOrders,
    _getIssuedRestockOrders,
    _getRestockOrder,
    _getRestockOrderReturnItems,
    _createRestockOrder,
    _updateRestockOrderState,
    _restockOrderAddSKUItems,
    _restockOrderAddTransportNote,
    _deleteRestockOrder
}