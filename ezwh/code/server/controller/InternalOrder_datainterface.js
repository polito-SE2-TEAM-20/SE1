'use strict';
const InternalOrder = require('../models/InternalOrder');
const SKUitem = require('../models/SKUitem');
async function getInternalOrders(db){
    const prod = await db.loadSKUItem();
    const skus = await db.loadSKU();
    return db.loadInternalOrder().then(internalOrder=>internalOrder.map((IO)=>({
           id: IO.getID(),
           IssueDate: IO.getIssueDate(),
           state: IO.getState(),
           CustomerID: IO.getCustomerID(),
           Products: prod.filter(skui=>skui.getInternalOrder()===IO.getID()).map(p=>(
            {
            SKUId: skus.filter(sku => sku.get_SKU_ID() === p.getSKUid()).map(s=>s.get_SKU_ID()).shift(),
            description: skus.filter(sku => sku.get_SKU_ID() === p.getSKUid()).map(s=>s.get_Description()).shift(),
            price: skus.filter(sku => sku.get_SKU_ID() === p.getSKUid()).map(s=>s.get_price()).shift(),
            quantity: p.getQuantity()
            }
            ))

    }
    )));
}

async function getIssuedInternalOrders(db){
    let IO_issued = await db.loadInternalOrder();
    const prod = await db.loadSKUItem();
    const skus = await db.loadSKU();
    return IO_issued.filter(io_a => io_a.state==="ISSUED").map((IO)=>({
        id: IO.getID(),
        IssueDate: IO.getIssueDate(),
        state: IO.getState(),
        CustomerID: IO.getCustomerID(),
        Products: prod.filter(skui=>skui.getInternalOrder()===IO.getID()).map(p=>(
            {
            SKUId: skus.filter(sku => sku.get_SKU_ID() === p.getSKUid()).map(s=>s.get_SKU_ID()).shift(),
            description: skus.filter(sku => sku.get_SKU_ID() === p.getSKUid()).map(s=>s.get_Description()).shift(),
            price: skus.filter(sku => sku.get_SKU_ID() === p.getSKUid()).map(s=>s.get_price()).shift(),
            quantity: p.getQuantity()
            }
            ))
        
     }));
}


async function getAcceptedInternalOrders(db){
    let IO_accepted = await db.loadInternalOrder();
    const prod = await db.loadSKUItem();
    const skus = await db.loadSKU();
    return IO_accepted.filter(io_a => io_a.state==="ACCEPTED").map((IO)=>({
        id: IO.getID(),
        IssueDate: IO.getIssueDate(),
        state: IO.getState(),
        CustomerID: IO.getCustomerID(),
        Products: prod.filter(skui=>skui.getInternalOrder()===IO.getID()).map(p=>(
            {
            SKUId: skus.filter(sku => sku.get_SKU_ID() === p.getSKUid()).map(s=>s.get_SKU_ID()).shift(),
            description: skus.filter(sku => sku.get_SKU_ID() === p.getSKUid()).map(s=>s.get_Description()).shift(),
            price: skus.filter(sku => sku.get_SKU_ID() === p.getSKUid()).map(s=>s.get_price()).shift(),
            quantity: p.getQuantity()
            }
            ))
        
     }));
}
//do we need a function in dbms for getinternalorder?
async function get_InternalOrder(db, id){

    const prod = await db.loadSKUItem();
    const skus = await db.loadSKU();

    return db.loadInternalOrder().then(ios => ios.filter(io => io.id === Number(id)).map(io => ({
        id: io.getID(),
        IssueDate: io.getIssueDate(),
        state: io.getState(),
        CustomerID: io.getCustomerID(),
        Products: prod.filter(skui=>skui.getInternalOrder()===io.getID()).map(p=>(
            {
            SKUId: skus.filter(sku => sku.get_SKU_ID() === p.getSKUid()).map(s=>s.get_SKU_ID()).shift(),
            description: skus.filter(sku => sku.get_SKU_ID() === p.getSKUid()).map(s=>s.get_Description()).shift(),
            price: skus.filter(sku => sku.get_SKU_ID() === p.getSKUid()).map(s=>s.get_price()).shift(),
            quantity: p.getQuantity()
            }
            ))
        
     }
    )));
}
        

async function createInternalOrder(db, issueDate, products, customerId){
    const IO_new = new InternalOrder(null, issueDate, "ISSUED", customerId, null);
    const action = await db.storeInternalOrder(IO_new)
    .then(() => db.loadSKUItem())
        .then(skuitems => skuitems.filter(skui => products.some(p => p.SKUid === skui.getSKUid())))
            .then(skuis => skuis.forEach(s => {
                s.setInternalOrder(IO_new.getID())
                db.storeSKUItem(s)
            }));
           
 //how to take care of quantity   
return action

    
}

async function updateInternalOrder(db, id, newState){
    const OldInternalOrder = await db.loadInternalOrder().then(io=>io.filter(ios=>ios.id===id));
    db.deleteInternalOrder(OldInternalOrder)
    OldInternalOrder.setstate(newState);
    if(OldInternalOrder.getState()==="COMPLETED"){
        //OldInternalOrder.setProducts(product);
        return db.storeInternalOrder(new InternalOrder(
            OldInternalOrder.getID(),
            OldInternalOrder.getIssueDate(),
            OldInternalOrder.getState(),
            OldInternalOrder.getProducts(),
            OldInternalOrder.getCustomerID()
        ))
    }
    else{
        return db.storeInternalOrder(new InternalOrder(
            OldInternalOrder.getID(),
            OldInternalOrder.getIssueDate(),
            OldInternalOrder.getState(),
            OldInternalOrder.getProducts(),
            OldInternalOrder.getCustomerID()
        ))
    }
    // db.storeInternalOrder(IO_mod);
    // if(IO_mod.getState()==="COMPLETED"){
    //     return IO_mod.map((io_m)=>({
    //         newState: io_m.getState(),
    //         products: io_m.getProducts()
    //     }));
    // }
    // else{
    //     console.log("Internal Order's state is changed but order not Completed yet");
    // }
}


function deleteInternalOrder(db, id){
    const action = db.deleteInternalOrder(new InternalOrder(id))
        .then(() => db.loadSKUItem())
            .then(skuitems => skuitems.filter(skui => skui.getInternalOrder() === Number(id)))
                .then(skuis => skuis.forEach(skui => {
                    skui.setInternalOrder(null)
                    db.storeSKUItem(skui)
                }));

    return action

}

module.exports = {
    getInternalOrders,
    getIssuedInternalOrders,
    getAcceptedInternalOrders,
    get_InternalOrder,
    createInternalOrder,
    updateInternalOrder,
    
    deleteInternalOrder,
    
}






