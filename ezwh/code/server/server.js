"use strict";
const express = require("express");
const DatabaseHandler = require("./dbms");
const DataInterface = require("./controller/data-interface");

const port = 3001;

async function generateApp() {
// init db
const db = new DatabaseHandler();
await db.init();

// init controller
const datainterface = new DataInterface(db);

// init express
const app = new express();

app.use(express.json());

//POSITION API

app.get("/api/positions", (req, res) => {
  try {
    datainterface.getAllPositions().then((positions) => {
      return res.status(200).json(positions);
    });
  }
  catch(error) {
    return res.status(500).json({error: error});
  }
});

app.post("/api/position", async (req,res) => {
  const pos = req.body
  try {
    if(Object.keys(pos).length === 0) {
      return res.status(422).json({error: `Empty body request`})
    }
    if(pos.positionID===undefined||pos.aisleID===undefined||pos.row===undefined||pos.col===undefined||pos.maxWeight===undefined||pos.maxVolume===undefined) {
      return res.status(422).json({error: `One or more parameters are undefined`})
    }
    if(isNaN(pos.positionID) || Number(pos.positionID)<=0 || pos.positionID.length!==12) {
      return res.status(422).json({error: `PositionID not valid`})
    }
    const exist = await db.loadPosition().then(positions=>positions.some(p=>p.positionId===pos.positionID))
    if(exist) {
      return res.status(422).json({error: `PositionID already exists`})
    }
    else {
      datainterface.createPosition(pos.positionID, pos.aisleID, pos.row, pos.col, pos.maxWeight, pos.maxVolume)
        .then(() => {return res.status(201).end()});
    }
  }
  catch(error) {
    return res.status(503).json({error: error});
  }
})

app.put("/api/position/:positionID", async (req,res) => {
  const pos = req.body;
  try {
    if(Object.keys(pos).length === 0) {
      return res.status(422).json({error: `Empty body request`})
    }
    if(pos.newAisleID===undefined||pos.newRow===undefined||pos.newCol===undefined||pos.newMaxWeight===undefined||pos.newMaxVolume===undefined||pos.newOccupiedWeight===undefined||pos.newOccupiedVolume===undefined) {
      return res.status(422).json({error: `One ore more parameters are undefined`})
    }
    if(isNaN(req.params.positionID) || Number(req.params.positionID)<=0 || req.params.positionID.length!==12) {
      return res.status(422).json({error: `PositionID not valid`})
    }
    const exist = await db.loadPosition().then(positions=>positions.some(p=>p.positionId===req.params.positionID))
    if(!exist) {
      return res.status(404).json({error: `PositionID doesn't exist`})
    }
    else{
      datainterface.updatePosition(req.params.positionID, pos.newAisleID, pos.newRow, pos.newCol, pos.newMaxWeight, pos.newMaxVolume, pos.newOccupiedWeight, pos.newOccupiedVolume)
      .then(() => {return res.status(200).end()})
    }
  }
  catch(error) {
    return res.status(503).json({error: error});
  }
})

app.put("/api/position/:positionID/changeID", async (req,res) => {
  const pos = req.body;
  try {
    if(Object.keys(pos).length === 0) {
      return res.status(422).json({error: `Empty body request`})
    }
    if(pos.newPositionID===undefined) {
      return res.status(422).json({error: `PositionID is undefined`})
    }
    if(isNaN(req.params.positionID) || Number(req.params.positionID)<=0 || req.params.positionID.length!==12) {
      return res.status(422).json({error: `PositionID not valid`})
    }
    const exist = await db.loadPosition().then(positions=>positions.some(p=>p.positionId===req.params.positionID))
    if(!exist) {
      return res.status(404).json({error: `PositionID doesn't exist`})
    }
    const existnew = await db.loadPosition().then(positions=>positions.some(p=>p.positionId===pos.newPositionID))
    if(existnew) {
      return res.status(422).json({error: `newPositionID already exists`, a:pos.positionID})
    }
    else {
      datainterface.updatePositionId(req.params.positionID, pos.newPositionID).then((position) => {
        return res.status(200).json(position)}) 
    }
  }
  catch(error) {
    return res.status(503).json({error: error});
  }
})

app.delete("/api/position/:positionID", async (req,res) => {
  try {
    if(isNaN(req.params.positionID) || Number(req.params.positionID)<=0 || req.params.positionID.length!==12) {
      return res.status(422).json({error: `PositionID not valid`})
    }
    const exist = await db.loadPosition().then(positions=>positions.some(p=>p.positionId===req.params.positionID))
    if(!exist) {
      return res.status(422).json({error: `PositionID doesn't exist`})
    }
    else {
      datainterface.deletePosition(req.params.positionID)
        .then(() => {return res.status(204).end()})
    }
  }
  catch(error) {
    return res.status(503).json({error: error});
  }
})

//SKUITEM API

app.get("/api/skuitems", (req,res) => {
  try {
    datainterface.getAllSKUitems()
    .then(skuitems => {return res.status(200).json(skuitems)})
  }
  catch(error) {
    return res.status(500).json({error: error});
  }
})

app.get("/api/skuitems/sku/:id", async (req,res) => {
  try {
    if(isNaN(req.params.id) || Number(req.params.id)<=0 || Number(req.params.id)>2147483647) {
      return res.status(422).json({error: `SKUid not valid`})
    }
    const exist = await db.loadSKUItem().then(skuitems=>skuitems.some(skui=>skui.getSKUid()===Number(req.params.id)))
    if(!exist) {
      return res.status(404).json({error: `No SKUitem associated to this skuid`})
    }
    else {
      datainterface.getAvailableSKUitems(req.params.id)
        .then(skuitems => {return res.status(200).json(skuitems)})
    }
  }
  catch(error) {
    return res.status(500).json({error: error});
  }
})

app.get("/api/skuitems/:rfid", async (req,res) => {
  try {
    if(isNaN(req.params.rfid) || Number(req.params.rfid)<=0 || req.params.rfid.length!==32) {
      return res.status(422).json({error: `RFID not valid`})
    }
    const exist = await db.loadSKUItem().then(skuitems=>skuitems.some(skui=>skui.getRFID()===req.params.rfid))
    if(!exist) {
      return res.status(404).json({error: `No SKUitem associated to this rfid`})
    }
    else {
      datainterface.getSKUitemRFID(req.params.rfid)
       .then(skuitems => {return res.status(200).json(skuitems)})
    }
  }
  catch(error) {
    return res.status(500).json({error: error});
  }
})

app.post("/api/skuitem", async (req,res) => {
  const skui = req.body;
  try{
    if(Object.keys(skui).length === 0) {
      return res.status(422).json({error: `Empty body request`})
    }
    if(skui.RFID===undefined||skui.SKUId===undefined||skui.DateOfStock===undefined) {
      return res.status(422).json({error: `One ore more parameters are undefined`})
    }
    if(isNaN(skui.RFID) || Number(skui.RFID)<=0 || skui.RFID.length!==32) {
      return res.status(422).json({error: `RFID not valid`})
    }
    const exist = await db.loadSKUItem().then(skuitems=>skuitems.some(skui=>skui.getRFID()===req.body.RFID))
    if(exist) {
      return res.status(422).json({error: `SKUitem already associated to this rfid`})
    }
    const existsku = await db.loadSKU().then(skus=>skus.some(sku=>sku.get_SKU_ID()===Number(skui.SKUId)))
    if(!existsku) {
      return res.status(404).json({error: `No SKU associated to SKUId`})
    }
    else {
      datainterface.createSKUItem(skui.RFID, skui.SKUId, skui.DateOfStock)
        .then(() => {return res.status(201).end()});
    }
  }
  catch(error) {
    return res.status(503).json({error: error});
  }
})

app.put("/api/skuitems/:rfid", async (req,res) => {
  const skui = req.body;
  try {
    if(Object.keys(skui).length === 0) {
      return res.status(422).json({error: `Empty body request`})
    }
    if(skui.newRFID===undefined||skui.newAvailable===undefined||skui.newDateOfStock===undefined) {
      return res.status(422).json({error: `One ore more parameters are undefined`})
    }
    if(isNaN(req.params.rfid) || Number(req.params.rfid)<=0 || req.params.rfid.length!==32) {
      return res.status(422).json({error: `RFID not valid`})
    }
    const exist = await db.loadSKUItem().then(skuitems=>skuitems.some(skui=>skui.getRFID()===req.params.rfid))
    if(!exist) {
      return res.status(404).json({error: `SKUitem doesn't exist`})
    }
    const existnew = await db.loadSKUItem().then(skuitems=>skuitems.some(skui=>skui.getRFID()===req.body.newRFID && skui.getRFID()!==req.params.rfid))
    if(existnew) {
      return res.status(404).json({error: `SKUitem already exists with this rfid`})
    }
    else {
      datainterface.updateSKUItem(req.params.rfid,skui.newRFID, skui.newAvailable, skui.newDateOfStock)
        .then(() => {return res.status(200).end()})
    }
  }
  catch(error) {
    return res.status(503).json({error: error});
  }
})

app.delete("/api/skuitems/:rfid", async (req,res) => {
  try {
    if(isNaN(req.params.rfid) || Number(req.params.rfid)<=0 || req.params.rfid.length!==32) {
      return res.status(422).json({error: `RFID not valid`})
    }
    const exist = await db.loadSKUItem().then(skuitems=>skuitems.some(skui=>skui.getRFID()===req.params.rfid))
    if(!exist) {
      return res.status(404).json({error: `SKUitem doesn't exist`})
    }
    else {
      datainterface.deleteSKUItem(req.params.rfid)
        .then(() => {return res.status(204).end()})}
  }
  catch(error) {
    return res.status(503).json({error: error});
  }
})

//RETURN ORDER API

app.get("/api/returnOrders", (req,res) => {
  try {
    datainterface.getReturnOrders()
    .then(ros => {return res.status(200).json(ros)})
  }
  catch(error) {
    return res.status(500).json({error: error});
  }
})

app.get("/api/returnOrders/:id", async (req,res) => {
  try {
    if(isNaN(req.params.id) || Number(req.params.id)<=0 || Number(req.params.id)>2147483647) {
      return res.status(422).json({error: `Return Order ID is not valid`})
    }
    const exist = await db.loadReturnOrder().then(ros=>ros.some(ro=>ro.getId()===Number(req.params.id)))
    if(!exist) {
      return res.status(404).json({error: `Return Order doesn't exist`})
    }
    else {
      datainterface.getReturnOrder(req.params.id)
      .then(ro => {return res.status(200).json(ro)})
    } 
  }
  catch(error) {
    return res.status(500).json({error: error});
  }
})

app.post("/api/returnOrder", async (req,res) => {
  const ro = req.body;
  try {
    if(Object.keys(ro).length === 0) {
      return res.status(422).json({error: `Empty body request`})
    }
    if(ro.returnDate===undefined||ro.products.some(p=>p.SKUId===undefined)||ro.products.some(p=>p.RFID===undefined)||ro.restockOrderId===undefined) {
      return res.status(422).json({error: `One ore more parameters are undefined`})
    }
    const exist = await db.loadRestockOrder().then(ros=>ros.some(r=>r.getId()===Number(ro.restockOrderId)))
    if(!exist) {
      return res.status(404).json({error: `No Restock Order associated to restockOrderId`})
    }
    else {
      datainterface.createReturnOrder(ro.returnDate, ro.products, ro.restockOrderId)
      .then(() => {return res.status(201).end()})
    }
  }
  catch(error) {
    return res.status(503).json({error: error});
  }
})

app.delete("/api/returnOrder/:id", async (req,res) => {
  try {
    if(isNaN(req.params.id) || Number(req.params.id)<=0 || Number(req.params.id)>2147483647) {
      return res.status(422).json({error: `Return Order ID is not valid`})
    }
    const exist = await db.loadReturnOrder().then(ros=>ros.some(ro=>ro.getId()===Number(req.params.id)))
    if(!exist) {
      return res.status(404).json({error: `Return Order doesn't exist`})
    }
    else {
      datainterface.deleteReturnOrder(req.params.id)
      .then(() => {return res.status(204).end()})
    }
  }
  catch(error) {
    return res.status(503).json({error: error});
  }
})

//TEST DESCRIPTOR API

app.get("/api/testDescriptors", (req,res) => {
  try {
    datainterface.getAllTestDescriptors()
    .then(tds => {return res.status(200).json(tds)})
  }
  catch(error) {
    return res.status(500).json({error: error});
  }
})

app.get("/api/testDescriptors/:id", async (req,res) => {
  try {
    if(isNaN(req.params.id) || Number(req.params.id)<=0 || Number(req.params.id)>2147483647) {
      return res.status(422).json({error: `Test Descriptor ID not valid`})
    }
    const exist = await db.loadTestDescriptor().then(tds=>tds.some(td=>td.getID()===Number(req.params.id)))
    if(!exist) {
      return res.status(404).json({error: `No Test Descriptor associated to this id`})
    }
    else {
      datainterface.getTestDescriptor(req.params.id)
        .then(tds => {return res.status(200).json(tds)})
    }
  }
  catch(error) {
    return res.status(500).json({error: error});
  }
})

app.post("/api/testDescriptor", async (req,res) => {
  const td = req.body;
  try {
    if(Object.keys(td).length === 0) {
      return res.status(422).json({error: `Empty body request`})
    }
    if(td.name===undefined||td.procedureDescription===undefined||td.idSKU===undefined) {
      return res.status(422).json({error: `One ore more parameters are undefined`})
    }
    const exist = await db.loadSKU().then(skus=>skus.some(sku=>sku.get_SKU_ID()===Number(td.idSKU)))
    if(!exist) {
      return res.status(404).json({error: `No SKU associated to idSKU`})
    }
    else {
      datainterface.createTestDescriptor(td.name, td.procedureDescription, td.idSKU)
        .then(() => {return res.status(201).end()});
    }
  }
  catch(error) {
    return res.status(503).json({error: error});
  }
})

app.put("/api/testDescriptor/:id", async (req,res) => {
  const td = req.body;
  try {
    if(Object.keys(td).length === 0) {
      return res.status(422).json({error: `Empty body request`})
    }
    if(td.newName===undefined||td.newProcedureDescription===undefined||td.newIdSKU===undefined) {
      return res.status(422).json({error: `One ore more parameters are undefined`})
    }
    if(isNaN(req.params.id) || Number(req.params.id)<=0 || Number(req.params.id)>2147483647) {
      return res.status(422).json({error: `Test Descriptor ID not valid`})
    }
    const exist = await db.loadTestDescriptor().then(tds=>tds.some(td=>td.getID()===Number(req.params.id)))
    if(!exist) {
      return res.status(404).json({error: `No Test Descriptor associated to this id`})
    }
    const existsku = await db.loadSKU().then(skus=>skus.some(sku=>sku.get_SKU_ID()===Number(td.newIdSKU)))
    if(!existsku) {
      return res.status(404).json({error: `No SKU associated to newIdSKU`})
    }
    else {
      datainterface.updateTestDescriptor(req.params.id, td.newName, td.newProcedureDescription, td.newIdSKU)
        .then(() => {return res.status(200).end()});
    }
  }
  catch(error) {
    return res.status(503).json({error: error});
  }
})

app.delete("/api/testDescriptor/:id", async (req,res) => { 
  try {
    if(isNaN(req.params.id) || Number(req.params.id)<=0 || Number(req.params.id)>2147483647) {
      return res.status(422).json({error: `Test Descriptor ID not valid`})
    }
    const exist = await db.loadTestDescriptor().then(tds=>tds.some(td=>td.getID()===Number(req.params.id)))
    if(!exist) {
      return res.status(404).json({error: `No Test Descriptor associated to this id`})
    }
    else {
      datainterface.deleteTestDescriptor(req.params.id)
    .then(() => {return res.status(204).end()});
    }
  }
  catch(error) {
    return res.status(503).json({error: error});
  }
})

app.get("/api/internalOrders", (req,res)=>{
  try{
    datainterface.GetInternalOrders().then((InternalOrders)=>{
      return res.status(200).json(InternalOrders);
    });
  }
  catch(error){
    return res.status(500).json(error);
  }
});

app.get("/api/internalOrdersIssued", (req,res)=>{
  try{
    datainterface.GetIssuedInternalOrders().then(IO=>
      {return res.status(200).json(IO)});
  }
  catch(error){
    return res.status(500).json(error);
  }

});
app.get("/api/internalOrdersAccepted", (req,res)=>{
  try{
    datainterface.GetAcceptedInternalOrders().then(IO=>
      {return res.status(200).json(IO)});
  }
  catch(error){
    return res.status(500).json(error);
  }

});

app.get("/api/internalOrders/:id", (req,res) => {
  try{
    console.log(req.params.id);
    datainterface.GetInternalOrder(req.params.id).then(io=>
      {return res.status(200).json(io)});
  }
  catch(error){
    return res.status(500).json({error: error});
  }
});

app.post("/api/internalOrders", (req,res)=>{
  const io = req.body;
  try{
    datainterface.CreateInternalOrder(io.issueDate, io.products, io.customerId)
    .then(()=>{return res.status(201).end});

  }
  catch (error){
    return res.status(500).json({error:error});
  }
});

app.put("/api/internalOrders/:id", async(req,res)=>{
  const io = req.body;
  try{
    if(Object.keys(io).length===0){
      return res.status(422).json({error:'Empty Body Request'});
    }
    if(io.newState===undefined){
      return res.status(422).json({error:'One or more parameters are undefined or wrong'});
    }
    if(isNaN(req.params.id)||Number(req.params.id)<=0){
      return res.status(422).json({error:'ID not valid'});
    }
    const exist = await db.loadInternalOrder().then(io_upd => io_upd.some(io=>io.id===parseInt(req.params.id)));
    if(!exist){
      return res.status(404).json({error:'Internal Order not found'});
    }
    else{
      datainterface.UpdateInternalOrder(req.params.id, io.newState)
        .then(()=>{return res.status(200).end()})
    }
  }
  catch(error){
    return res.status(503).json({error: error});
  }
});

app.delete("/api/internalOrders/:id", async (req,res)=>{
  try{
    if(isNaN(req.params.id)||Number(req.params.id)<=0){
      return res.status(422).json({error:'ID not valid'});
    }
    console.log(typeof(req.params.id));
    const exist = await db.loadInternalOrder().then(io_del => io_del.some(io=>io.id===parseInt(req.params.id)));
    if(!exist){
      return res.status(404).json({error:'Internal Order not found'});
    }
    else{
      datainterface.DeleteInternalOrder(req.params.id)
        .then(()=>{return res.status(204).end});
    }
  }
  catch(error){
    return res.status(503).json({error: error});
  }
});

app.get("/api/skus", (req,res)=>{
  try{
    datainterface.GetAllSKU().then((SKUS)=>{
      return res.status(200).json(SKUS);
    });
  }
  catch(error){
    return res.status(500).json({error:error});
  }
});

app.get("/api/skus/:id", async (req,res)=>{
  try{
    if(isNaN(req.params.id)||Number(req.params.id)<=0){
      return res.status(422).json({error:'ID not valid'});
    }
    const exist = await db.loadSKU().then(skus => skus.some(sku=>sku.ID===parseInt(req.params.id)));
    if(!exist){
      return res.status(404).json({error:'SKU not found'});
    }
    else{
      datainterface.GetSKU(req.params.id).then(skuss=>{return res.status(200).json(skuss)});
    }
  }
  catch(error){
    return res.status(500).json({error:error});
  }
});

app.post("/api/sku", (req,res)=>{
  const sku = req.body;
  try{
    if(Object.keys(sku).length===0){
      return res.status(422).json({error:'Empty Body Request'});
    }
    if (sku.description===undefined||sku.weight===undefined||sku.volume===undefined||sku.notes===undefined||sku.price===undefined||sku.availableQuantity===undefined){
      return res.status(422).json({error:'One or more parameters are undefined'});
    }
    if(isNaN(sku.weight)||Number(sku.weight)<=0){
      return res.status(422).json({error:'Weight not valid'});
    }
    if(isNaN(sku.volume)||Number(sku.volume)<=0){
      return res.status(422).json({error:'Volume not valid'});
    }
    if(isNaN(sku.price)||Number(sku.price)<=0){
      return res.status(422).json({error:'Price not valid'});
    }
    if(isNaN(sku.availableQuantity)||Number(sku.availableQuantity)<=0){
      return res.status(422).json({error:'Quantity not valid'});
    }
    else {
      datainterface.CreateSKU(sku.description, sku.weight, sku.volume, sku.notes, sku.price, sku.availableQuantity)
      .then(()=>{return res.status(201).end()});
    }
  }
  catch (error){
    res.status(503).json({error:error});
  }
});

app.put("/api/sku/:id", async(req,res)=>{
  const sku = req.body;
  try{
    if(Object.keys(sku).length===0){
      return res.status(422).json({error:'Empty Body Request'});
    }
    if (sku.newDescription===undefined||sku.newWeight===undefined||sku.newVolume===undefined||sku.newNotes===undefined||sku.newPrice===undefined||sku.newAvailableQuantity===undefined){
      return res.status(422).json({error:'One or more parameters are undefined'});
    }
    if(isNaN(sku.newWeight)||Number(sku.newWeight)<=0){
      return res.status(422).json({error:'Weight not valid'});
    }
    if(isNaN(sku.newVolume)||Number(sku.newVolume)<=0){
      return res.status(422).json({error:'Volume not valid'});
    }
    if(isNaN(sku.newPrice)||Number(sku.newPrice)<=0){
      return res.status(422).json({error:'Price not valid'});
    }
    if(isNaN(sku.newAvailableQuantity)||Number(sku.newAvailableQuantity)<=0){
      return res.status(422).json({error:'Quantity not valid'});
    }
    const exist = await db.loadSKU().then(skus=>skus.some(skuss=>skuss.ID===parseInt(req.params.id)));
    // const d = await db.loadSKU();
    // console.log(di);
    // console.log(di.filter(sku=>sku.ID===1));
    // console.log(typeof].get_SKU_ID()));
    // console.log(typeof(parseInt(req.params.id)));
    // console.log(await db.loadSKU().then(skus=>skus.filter(skuss=>skuss.ID===parseInt(req.params.id))));
    if(!exist) {
      return res.status(404).json({error: `SKU doesn't exist`})
    }
    else{
      datainterface.UpdateSKU(req.params.id, sku.newDescription, sku.newWeight, sku.newVolume, sku.newNotes, sku.newPrice, sku.newAvailableQuantity)
      .then(()=>{return res.status(200).end()});
    }

  }
  catch (error){
    return res.status(503).json({error:error});
  }
});

app.put("/api/sku/:id/position", async(req,res)=>{
  const sku = req.body;
  try{
      //console.log("ehehehehhe");
      if(Object.keys(sku).length===0){
        return res.status(422).json({error:'Empty Body Request'});
      }
      //console.log("after if 1");
      if(req.params.id===undefined||sku.position===undefined){
        return res.status(422).json({error:'One or more parameters are undefined'});
      }
      //console.log("after if 2");
      if(isNaN(req.params.id)||Number(req.params.id)<=0){
        return res.status(422).json({error:'ID not valid'});
      }
      //console.log("after if 3");
      //console.log(isNaN(sku.positionId),Number(sku.positionId)<=0,sku.positionId.length!==12);
      if(isNaN(sku.position)||Number(sku.position)<=0||sku.position.length!==12){
        return res.status(422).json({error:'Position ID not valid'});
      }
      //console.log("after if 4");
      const exist = await db.loadSKU().then(skus=>skus.some(skuss=>skuss.ID===parseInt(req.params.id)));
      if(!exist) {
        return res.status(404).json({error: `SKU doesn't exist`})
      }
      //console.log("jhsdjasdj");
      //const existpos = await db.loadPosition().then(pos=>pos.some(p=>p.positionId===sku.positionId));
      const existpos = await db.loadPosition().then(pos=>pos.some(p=>p.positionId===sku.position));
      //const skupos = await
      //console.log(await db.loadPosition());
      //console.log(existpos);
      if(!existpos) {
        return res.status(404).json({error: `Position doesn't exist`})
      }
      else{
        //console.log("is it here?");
        //console.log(req.params.id, parseInt(sku.positionId));
        datainterface.addModifyposition(req.params.id, sku.position)
        .then(()=>{return res.status(200).end()});
      }
  }
  catch(error){
    return res.status(503).json({error: error});  
  }
  
});

app.delete("/api/skus/:id", async (req, res)=>{
  try{
    if(isNaN(req.params.id)||Number(req.params.id)<=0){
      return res.status(422).json({error:'ID not valid'});
    }
    const exist = await db.loadSKU().then(sku=>sku.some(skus=>skus.ID===parseInt(req.params.id)))
    if(!exist){
      return res.status(422).json({error:'SKU does not exist'})
    }
    else{
      datainterface.DeleteSKU(req.params.id).then(()=> {return res.status(204).end()})
    }
  }
  catch (error){
    return res.status(503).json({error:error});
  }
});

app.get("/api/suppliers", (req,res)=>{
  try{
    datainterface.GetSuppliers().then(u=>{return res.status(200).json(u)});
  }
  catch (error){
    return res.status(500).json(error);
  }
});

app.get("/api/suppliers", (req,res)=>{
  try{
    datainterface.GetSuppliers().then(u=>{return res.status(200).json(u)});
  }
  catch (error){
    return res.status(500).json(error);
  }
});

app.get("/api/users", (req,res)=>{
  try{
    datainterface.GetUsers().then(u=>{return res.status(200).json(u)});
  }
  catch(error){
    return res.status(500).json(error);
  }
});

app.post("/api/newUser", async (req,res) => {
  const user=req.body;
  try{
    if(Object.keys(user).length===0){
      return res.status(422).json({error:'Empty Body Request'});
    }
    if(user.username===undefined||user.name===undefined||user.surname===undefined||user.password===undefined||user.type===undefined){
      return res.status(422).json({error:'One or more parameters are undefined'});
    }
    if(user.username.includes("@ezwh.com")===false){
      return res.status(422).json({error: 'Username is supposed to be an email'});
    }
    if(user.password.length<8){
      return res.status(422).json({error: 'Password is too short'});
    }

    const exist = await db.loadUser().then(users=>users.some(u=>u.getusername()===user.username && u.getType()===user.type));
    if(exist){
      return res.status(409).json({error:'User with same username and type exists'});
    }
    else{
      datainterface.CreateUser(user.username, user.name, user.surname, user.password, user.type)
      .then(()=>{return res.status(201).end()});
    }

    }
    catch(error)
    {
      return res.status(503).json({error:error});
    }
  }
);

app.post("/api/managerSessions", async (req, res)=>{
  const user = req.body;
  try{
    if(user.username.includes("@ezwh.com")===false){
      return res.status(422).json({error: 'Username is not email'});
    }
    const exist = await db.loadUser().then(users=>users.some(u=>u.getusername()===user.username && u.getType()==="manager" && u.getPassword()===user.password));
    if(!exist){
      return res.status(404).json({error:'User or password invalid'});
    }
    //console.log("data base hit ");
    else{
      datainterface.LoginManager(user.username, user.password)
      .then(u=>{return res.status(200).json(u)});
    }

  }
  catch(error){
    return res.status(500).json({error:error});
  }
});

app.post("/api/customerSessions", async (req, res)=>{
  const user = req.body;
  try{
    if(user.username.includes("@ezwh.com")===false){
      return res.status(422).json({error: 'Username is not email'});
    }
    const exist = await db.loadUser().then(users=>users.some(u=>u.getusername()===user.username && u.getType()==="customer" && u.getPassword()===user.password));
    if(!exist){
      return res.status(404).json({error:'User or password invalid'});
    }
    else{
      datainterface.LoginCustomer(user.username, user.password)
      .then(u=>{return res.status(200).json(u)});
    }

  }
  catch(error){
    return res.status(500).json({error:error});
  }
});

app.post("/api/supplierSessions", async (req, res)=>{
  const user = req.body;
  try{
    if(user.username.includes("@ezwh.com")===false){
      return res.status(422).json({error: 'Username is not email'});
    }
    const exist = await db.loadUser().then(users=>users.some(u=>u.getusername()===user.username && u.getType()==="supplier" && u.getPassword()===user.password));
    if(!exist){
      return res.status(404).json({error:'User or password invalid'});
    }
    else{
      datainterface.LoginSupplier(user.username, user.password)
      .then(u=>{return res.status(200).json(u)});
    }

  }
  catch(error){
    return res.status(500).json({error:error});
  }
});

app.post("/api/clerkSessions", async (req, res)=>{
  const user = req.body;
  try{
    if(user.username.includes("@ezwh.com")===false){
      return res.status(422).json({error: 'Username is not email'});
    }
    const exist = await db.loadUser().then(users=>users.some(u=>u.getusername()===user.username && u.getType()==="Clerk" && u.getPassword()===user.password));
    if(!exist){
      return res.status(404).json({error:'User or password invalid'});
    }
    else{
      datainterface.LoginClerk(user.username, user.password)
      .then(u=>{return res.status(200).json(u)});
    }

  }
  catch(error){
    return res.status(500).json({error:error});
  }
});

app.post("/api/qualityEmployeeSessions", async (req, res)=>{
  const user = req.body;
  try{
    if(user.username.includes("@ezwh.com")===false){
      return res.status(422).json({error: 'Username is not email'});
    }
    const exist = await db.loadUser().then(users=>users.some(u=>u.getusername()===user.username && u.getType()==="Quality Check Employee" && u.getPassword()===user.password));
    if(!exist){
      return res.status(404).json({error:'User or password invalid'});
    }
    else{
      datainterface.LoginQualityEmployee(user.username, user.password)
      .then(u=>{return res.status(200).json(u)});
    }

  }
  catch(error){
    return res.status(500).json({error:error});
  }
});

app.post("/api/deliveryEmployeeSessions", async (req, res)=>{
  const user = req.body;
  try{
    if(user.username.includes("@ezwh.com")===false){
      return res.status(422).json({error: 'Username is not email'});
    }
    const exist = await db.loadUser().then(users=>users.some(u=>u.getusername()===user.username && u.getType()==="Delivery Employee" && u.getPassword()===user.password));
    if(!exist){
      return res.status(404).json({error:'User or password invalid'});
    }
    else{
      datainterface.LoginDeliveryEmployee(user.username, user.password)
      .then(u=>{return res.status(200).json(u)});
    }

  }
  catch(error){
    return res.status(500).json({error:error});
  }
});

app.put("/api/users/:username", async (req, res)=>{
  const user = req.body;
  try{
    if(req.params.username===undefined){
      return res.status(422).json({error: `Parameters are undefined`})
    }
    if(req.params.username.includes("@ezwh.com")===false){
      return res.status(422).json({error: 'Username is not email'});
    }
    const exist = await db.loadUser().then(users=>users.some(u=>u.getusername()===req.params.username));
    if(!exist){
      return res.status(404).json({error:'User does not exist'});
    }
    else{
      datainterface.UpdateUserType(req.params.username, user.type, user.newType)
      .then(()=> {return res.status(200).end()});
    }
  }
  catch(error){
    return res.status(503).json({error:error});
  }
});

app.delete("/api/users/:username/:type", (req,res)=>{
  try{
    if(req.params.username===undefined||req.params.type===undefined){
      return res.status(422).json({error: `Parameters are undefined`})
    }
    if(req.params.username.includes("@ezwh.com")===false){
      return res.status(422).json({error: 'Username is not email'});
    }
    else{
      datainterface.DeleteUser(req.params.username,req.params.type)
      .then(()=>{return res.status(204).end()});
    }
  }
  catch(error){
    return res.status(503).json({error:error});
  }
});




//ITEM

app.get("/api/items", (req, res) => {
  try {
    datainterface.GetAllItems().then((items) => {
      return res.status(201).json(items);
    });
  }
  catch(error) {
    return res.status(500).json({error: error});
  }
});

app.get("/api/items/:id", async (req,res) => {
  try {
    if(isNaN(req.params.id) || Number(req.params.id)<=0 || Number(req.params.id)>2147483647) {
      return res.status(422).json({error: `ItemId not valid`})
    }
    const exist = await db.loadItem().then(items=>items.some(item=>item.getId()===Number(req.params.id)))
    if(!exist) {
      return res.status(404).json({error: `No item associated to this itemId`})
    }
    else {
      datainterface.GetItem(req.params.id).then(item => {return res.status(201).json(item)});
    }
  }
  catch(error) {
    return res.status(500).json({error: error});
  }
});

app.post("/api/item", async (req,res) => {
  const item = req.body;
  try {
    if(Object.keys(item).length === 0) {
      return res.status(422).json({error: `Empty body request`})
    }
    if((item.description === undefined) || (item.price === undefined) || (item.SKUId === undefined) || (item.supplierId === undefined)) {
      return res.status(422).json({error: `One ore more parameters are undefined`});
    }
    if(Number(item.price)<=0) {
      return res.status(422).json({error: `Price not valid`})
    }
    const exist = await db.loadItem().then(items=>items.some(i=>(i.getSupplierId() == Number(item.supplierId))&&(i.getSKUId() == Number(item.SKUId))));
    if(exist) {
      return res.status(422).json({error: `this supplier already sells an item with the same SKUId`})
    }
    else {
      datainterface.CreateItem(item.id, item.description, item.price, item.SKUId, item.supplierId)
        .then(() => {return res.status(201).end()});
    }
  }
  catch(error) {
    return res.status(503).json({error: error});
  }
});

app.put("/api/item/:id", async (req,res) => {
  const item = req.body;
  try {
    if(Object.keys(item).length === 0) {
      return res.status(422).json({error: `Empty body request`})
    }
    if(item.newDescription === undefined||item.newPrice === undefined) {
      return res.status(422).json({error: `One ore more parameters are undefined`})
    }
    if(isNaN(req.params.id) || Number(req.params.id)<=0 || Number(req.params.id)>2147483647) {
      return res.status(422).json({error: `Item ID not valid`})
    }
    const exist = await db.loadItem().then(items=>items.some(i=>i.getId() === Number(req.params.id)))
    if(!exist) {
      return res.status(404).json({error: `No item associated with this ID`})
    }
    else {
      datainterface.UpdateItem(req.params.id, item.newDescription, item.newPrice).then(() => {return res.status(201).end()});
    }
  }
  catch(error) {
    return res.status(503).json({error: "error"});
  }
});

app.delete("/api/items/:id", async (req,res)=>{
  try{
    if(isNaN(req.params.id)||Number(req.params.id)<=0){
      return res.status(422).json({error:'ID not valid'});
    }
    const exist = await db.loadItem().then(item_del => item_del.some(item=>item.getId() == req.params.id));
    if(!exist){
      return res.status(404).json({error:'Item not found'});
    }
    else{
      datainterface.DeleteItem(req.params.id).then(()=>{return res.status(201).end()});
    }
  }
  catch(error){
    return res.status(503).json({error: "error"});
  }
});

//TEST RESULT

app.get("/api/skuitems/:rfid/testResults", async (req,res) => {
  try {
    if(isNaN(req.params.rfid) || Number(req.params.rfid)<=0) {
      return res.status(422).json({error: `RFID not valid`})
    }
    const exist = await db.loadSKUItem().then(skuitems=>skuitems.some(skui=>skui.getRFID()===req.params.rfid))
    if(!exist) {
      return res.status(404).json({error: `No SKUitem associated to this rfid`})
    }
    else {
      datainterface.GetSKUItemTestResults(req.params.rfid)
       .then(skuitems => {return res.status(200).json(skuitems)})
    }
  }
  catch(error) {
    return res.status(500).json({error: error});
  }
});

app.get("/api/skuitems/:rfid/testResults/:id", async (req,res) => {
  try {
    if(isNaN(req.params.rfid) || Number(req.params.rfid)<=0 || req.params.rfid.length!==32) {
      return res.status(422).json({error: `RFID not valid`})
    }
    
    if(isNaN(req.params.id) || Number(req.params.id)<=0) {
      return res.status(422).json({error: `ID not valid`})
    }
    const existRfid = await db.loadSKUItem().then(skuitems=>skuitems.some(skui=>skui.getRFID()===req.params.rfid));
    const existId = await db.loadTestResult().then(tests => tests.some(test => test.getID() == req.params.id));
    if(existRfid && existId) {
      datainterface.GetSKUItemTestResult(req.params.rfid, req.params.id)
       .then(tr => {return res.status(200).json(tr)})
    }
    else {
      return res.status(404).json({error: `No SKUitem associated to this rfid`});
    }
  }
  catch(error) {
    return res.status(500).json({error: error});
  }
});

app.post("/api/skuitems/testResult", async (req,res) => {
  const tr = req.body;
  try {
    if(Object.keys(tr).length === 0) {
      return res.status(422).json({error: `Empty body request`})
    }
    if(tr.rfid===undefined||tr.idTestDescriptor===undefined||tr.Date===undefined||tr.Result===undefined) {
      return res.status(422).json({error: `Validation of request body or of rfid failed`})
    }
    if(Number(tr.rfid)<=0) {
      return res.status(422).json({error: `RFID not valid`})
    }
    if(Number(tr.idTestDescriptor) <= 0){
      return res.status(422).json({error: `ID Test Descriptor not valid`})
    }
    const existTestDescriptor = await db.loadTestDescriptor().then(tests=>tests.some(test=>test.getID()==Number(tr.idTestDescriptor)));
    const existRfid = await db.loadSKUItem().then(skuitems => skuitems.some(skuitem => skuitem.getRFID() == tr.rfid));
    if(existTestDescriptor && existRfid) {
      datainterface.CreateTestResult(tr.rfid, tr.idTestDescriptor, tr.Date, tr.Result).then(() => {return res.status(201).end()});
    }else{
      return res.status(404).json({error: "rfid or test descriptor not found"});
    }
    }
  catch(error) {
    return res.status(503).json({error: error});
  }
});

app.put("/api/skuitems/:rfid/testResult/:id", async (req,res) => {
  const tr = req.body;
  try {
    if(Object.keys(tr).length === 0) {
      return res.status(422).json({error: `Empty body request`})
    }
    if(tr.newIdTestDescriptor===undefined||tr.newDate===undefined||tr.newResult===undefined) {
      return res.status(422).json({error: `One ore more parameters are undefined`})
    }
    if(Number(tr.idTestDescriptor) <= 0){
      return res.status(422).json({error: `ID Test Descriptor not valid`})
    }
    const existTestDescriptor = await db.loadTestDescriptor().then(tests=>tests.some(test=>test.getID()==Number(tr.newIdTestDescriptor)));
    const existRfid = await db.loadSKUItem().then(skuitems=>skuitems.some(skui=>skui.getRFID()===req.params.rfid));
    const existId = await db.loadTestResult().then(tests => tests.some(test => test.getID() == req.params.id));
    if(existTestDescriptor && existRfid && existId) {
      datainterface.UpdateTestResult(req.params.rfid, req.params.id ,tr.newIdTestDescriptor, tr.newDate, tr.newResult)
        .then(() => {return res.status(201).end()});
    }else{
      res.status(404).json({error: 'no sku item associated to rfid or no test descriptor associated to newIdTestDescriptor or no test result associated to id'})
    }
  }
  catch(error) {
    return res.status(503).json({error: error});
  }
});

app.delete("/api/skuitems/:rfid/testResult/:id", async (req,res) => {
  const tr = req.body;
  try {
    if(Number(req.params.rfid)<=0) {
      return res.status(422).json({error: `RFID not valid`})
    }
    if(Number(req.params.id) <= 0){
      return res.status(422).json({error: `ID Test Descriptor not valid`})
    }
    const existRfid = await db.loadSKUItem().then(skuitems=>skuitems.some(skui=>skui.getRFID()===req.params.rfid));
    const existId = await db.loadTestResult().then(tests => tests.some(test => test.getID() == req.params.id));
    if(existRfid && existId) {
      datainterface.DeleteTestResult(req.params.rfid, req.params.id)
        .then(() => {return res.status(201).end()});
    }
    }
  catch(error) {
    return res.status(503).json({error: error});
  }
});

//RESTOCK ORDER

app.get("/api/restockOrders", (req, res) => {
  try {
    datainterface.GetRestockOrders().then((orders) => {
      return res.status(200).json(orders);
    });
  }
  catch(error) {
    return res.status(500).json({error: error});
  }
});

app.get("/api/restockOrdersIssued", (req, res) => {
  try {
    datainterface.GetIssuedRestockOrders().then((orders) => {
      return res.status(200).json(orders);
    });
  }
  catch(error) {
    return res.status(500).json({error: error});
  }
});

app.get("/api/restockOrders/:id", async (req, res) => {
  try {
    if(Number(req.params.id) <= 0){
      return res.status(422).json({error:error});
    }
    const array = db.loadRestockOrder();
    const existId = array.some(order => order.getId() == req.params.id); 
    if(!existId){
      return res.status(404).json({error: "no restock order associated to id"});
    }else{
      return datainterface.GetRestockOrder(Number(req.params.id)).then(() => {return res.status(201).end()});
    }
    }
  catch(error) {
    return res.status(500).json({error: error});
  }
});

app.get("/api/restockOrders/:id/returnItems", (req, res) => {
  try {
    if(Number(req.params.id) <= 0){
      return res.status(422).json({error:error});
    }
    const exist =  datainterface.GetRestockOrderReturnItems(req.params.id);
    if(!exist){
      return res.status(404).json({error: "id not found"});
    }else{
       exist.then(ro => {return res.status(200).json(ro)})
    }
    }
  catch(error) {
    return res.status(500).json({error: error});
  }
});

app.post("/api/restockOrder", async (req,res) => {
  const ro = req.body
  try {
    if(Object.keys(ro).length === 0) {
      return res.status(422).json({error: `Empty body request`})
    }
    if(ro.issueDate===undefined||ro.products===undefined||ro.supplierId===undefined) {
      return res.status(422).json({error: `One ore more parameters are undefined`})
    }
      datainterface.CreateRestockOrder(ro.issueDate, ro.products, ro.supplierId)
        .then(() => {return res.status(201).end()});
  }
  catch(error) {
    return res.status(503).json({error: error});
  }
})

app.put("/api/restockOrder/:id", async (req,res) => {
  const ro = req.body;
  try {
    if(Object.keys(ro).length === 0) {
      return res.status(422).json({error: `Empty body request`})
    }
    if(ro.newState===undefined) {
      return res.status(422).json({error: `new State is undefined`})
    }
    
    const exist = await db.loadRestockOrder().then(orders => orders.some(order => order.getId() == req.params.id));
    if(!exist) {
      return res.status(404).json({error: `Restock Order doesn't exist`})
    }
    else {
      datainterface.UpdateRestockOrderState(req.params.id, ro.newState)
        .then(() => {return res.status(200).end()});
    }
  }
  catch(error) {
    return res.status(503).json({error: error});
  }
})

app.put("/api/restockOrder/:id/skuItems", async (req,res) => {
  const ro = req.body;
  try {
    if(Object.keys(ro).length === 0) {
      return res.status(422).json({error: `Empty body request`})
    }
    const exist = await db.loadRestockOrder().then(orders => orders.some(order => order.getId() == req.params.id));
    if(!exist) {
      return res.status(404).json({error: `Restock Order doesn't exist`})
    }
    else {
      datainterface.RestockOrderAddSKUItems(req.params.id, ro.skuItems)
        .then(() => {return res.status(200).end()});
    }
  }
  catch(error) {
    return res.status(503).json({error: error});
  }
})


app.put("/api/restockOrder/:id/transportNote", async (req,res) => {
  const ro = req.body;
  try {
    if(Object.keys(ro).length === 0) {
      return res.status(422).json({error: `Empty body request`})
    }
    const exist = await db.loadRestockOrder().then(orders => orders.some(order => order.getId() == req.params.id));
    if(!exist) {
      return res.status(404).json({error: `Restock Order doesn't exist`})
    }
    else {
      datainterface.RestockOrderAddTransportNote(req.params.id, ro.transportNote)
        .then(() => {return res.status(201).end()});
    }
  }
  catch(error) {
    return res.status(503).json({error: error});
  }
})

app.delete("/api/restockOrder/:id", async (req,res) => {
  try{
    const exist = await db.loadRestockOrder().then(orders => orders.some(order => order.getId() == req.params.id));
    if(!exist) {
      return res.status(404).json({error: `Restock Order doesn't exist`})
    }
    else {
      datainterface.DeleteRestockOrder(req.params.id).then(() => {return res.status(200).end()});
    }
  }
  catch(error) {
      return res.status(503).json({error: error});
    }
  })

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

return app;
}

generateApp();

module.exports = generateApp;
