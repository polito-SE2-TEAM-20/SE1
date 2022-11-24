'use strict';

const SKU = require ('../models/sku.js');
const Position = require ('../models/position.js')
 async function getAllSKU(db) {
     const skus = await db.loadSKU();
    return skus.map(sku => (
        {
          id: sku.get_SKU_ID(),
          description: sku.get_Description(),
          weight: sku.get_weight(),
          volume: sku.get_volume(),
          notes: sku.get_notes(),
          position: sku.get_position(),
          availableQuantity: sku.getAvailableQuantity(),
          price: sku.get_price(),
          testDescriptors: sku.get_TestDescriptors()
         }
      ));
    }
        


async function getSKU(db,id){
    // //return db.loadSKU().then().map(sku =>(
    //     {
    //         description: sku.getDescription(),
    //         weight: sku.get_weight(),
    //         volume: sku.get_volume(),
    //         notes: sku.get_notes(),
    //         position: sku.get_position(),
    //         price: sku.get_price(),
    //         testDescriptors: get_TestDescriptors()
    //     }
    // // ));
    const skus = await db.loadSKU();
    const s = skus.find(s=>s.ID === parseInt(id))
    return {
        description: s.get_Description(),
        weight: s.get_weight(),
        volume: s.get_volume(),
        notes: s.get_notes(),
        position: s.get_position(),
        availableQuantity: s.getAvailableQuantity(),
        price: s.get_price(),
        testDescriptors: s.get_TestDescriptors()
    }
}

function createSKU(db, Description, weight, volume, notes, price, quantity){
    return db.storeSKU(new SKU(null, Description, weight, volume, notes, price, [], null, [], quantity));
}

async function updateSKU(db, id, newDescription, newweight, newvolume, newnotes, newprice, newquantity){
    const skus = await db.loadSKU();
    const sku = skus.find(sku => sku.get_SKU_ID() === parseInt(id));
    sku.set_Description(newDescription);
    sku.set_weight(newweight);
    sku.set_volume(newvolume);
    sku.set_notes(newnotes);
    sku.set_price(newprice);
    sku.setAvailableQuantity(newquantity);
    await db.storeSKU(sku);
}

async function AddModifyposition(db, sku_id, position_id){
    const skus = await db.loadSKU();
    const sku = skus.find(sku => sku.get_SKU_ID() === parseInt(sku_id));
    if(sku) {
        sku.set_position(position_id);
        await db.storeSKU(sku);
        return "ok";
    }
    else return "SKU not found"
}

function deleteSKU(db, id){
    try{
    return db.deleteSKU(new SKU(id));
    }
    catch (error){
        console.log(error);
    }
}

module.exports = {
    getAllSKU,
    getSKU,
    createSKU,
    updateSKU,
    deleteSKU,
    AddModifyposition
}
