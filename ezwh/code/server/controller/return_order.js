'use strict'

const ReturnOrder = require("../models/ReturnOrder");

async function _getReturnOrders(db) {
   
    const prod = await db.loadSKUItem();
    const skus = await db.loadSKU();

    return db.loadReturnOrder().then(ros => ros.map(ro => (
        {
            id: ro.getId(),
            returnDate: ro.getReturnDate(),
            products: prod.filter(skui => skui.getReturnOrder() === ro.getId()).map(p => (
                {
                    SKUId: p.getSKUid(),
                    description: skus.find(sku => sku.get_SKU_ID() === p.getSKUid()).get_Description(),
                    price: skus.find(sku => sku.get_SKU_ID() === p.getSKUid()).get_price(),
                    RFID: p.getRFID()
                }
            )),
            restockOrderId: ro.getRestockOrderId()
        }
    )));
}

async function _getReturnOrder(db, id) {

    const prod = await db.loadSKUItem();
    const skus = await db.loadSKU();

    return db.loadReturnOrder().then(ros => ros.filter(ro => ro.id === Number(id)).map(ro => (
        {
            returnDate: ro.getReturnDate(),
            products: prod.filter(skui => skui.getReturnOrder() === ro.getId()).map(p => (
                {
                    SKUId: skus.filter(sku => sku.get_SKU_ID() === p.getSKUid()).map(s=>s.get_SKU_ID()).shift(),
                    description: skus.filter(sku => sku.get_SKU_ID() === p.getSKUid()).map(s=>s.get_Description()).shift(),
                    price: skus.filter(sku => sku.get_SKU_ID() === p.getSKUid()).map(s=>s.get_price()).shift(),
                    RFID: p.getRFID()
                }
            )),
            restockOrderId: ro.getRestockOrderId()
        }
    )).shift());
}

function _createReturnOrder(db, returnDate, products, restockOrderId) {

    const ro = new ReturnOrder(null, returnDate, null, restockOrderId);

    const action = db.storeReturnOrder(ro)
        .then(() => db.loadSKUItem())
            .then(skuitems => skuitems.filter(skui => products.some(p => p.RFID === skui.getRFID())))
                .then(skuis => skuis.forEach(s => {
                    s.setReturnOrder(ro.getId())
                    db.storeSKUItem(s)
                }));
               
        
    return action
}

function _deleteReturnOrder(db, id) {

    const action = db.deleteReturnOrder(new ReturnOrder(id))
        .then(() => db.loadSKUItem())
            .then(skuitems => skuitems.filter(skui => skui.getReturnOrder() === Number(id)))
                .then(skuis => skuis.forEach(skui => {
                    skui.setReturnOrder(null)
                    db.storeSKUItem(skui)
                }));

    return action
}

module.exports = {
    _getReturnOrders,
    _getReturnOrder,
    _createReturnOrder,
    _deleteReturnOrder
}