const DatabaseHandler = require("../dbms");
const DataInterface = require("../controller/data-interface");
const { deleteDb } = require("./test-utils");
//const { expect } = require("chai");

describe('testControllerSKU', () => {

    beforeEach(() => {
        deleteDb()
    });
    testGetAllSKU();
    testGetSKU();
    testCreateSKU("a description", 1, 1, "some notes", 12,1);
    testUpdateSKU("new Descritpion", 2,2,"new notes", 14, 5 );
    testAddmodifyPosition("800234543413");
    testDeleteSKU();

});

function testGetAllSKU(){
    test('get all SKU', async () => {
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const SKU =     {
            "Description" : "a new sku",
            "weight" : 100,
            "volume" : 20,
            "notes" : "first SKU",
            "price" : 10.99,
            "availableQuantity" : 50
        }
        await datainterface.CreateSKU(SKU.Description, SKU.weight, SKU.volume, SKU.notes, SKU.price, SKU.availableQuantity);
        var res = await datainterface.GetAllSKU();
        // console.log('get SKUs');
        // console.log(res);
        expect(res.length).toStrictEqual(1);
        const s = res[0];
        expect(s.description).toStrictEqual(SKU.Description);
        expect(s.weight).toStrictEqual(SKU.weight);
        expect(s.volume).toStrictEqual(SKU.volume);
        expect(s.notes).toStrictEqual(SKU.notes);
        expect(s.availableQuantity).toStrictEqual(SKU.availableQuantity);

    })
}

function testGetSKU(){
    test('get SKU from id', async ()=>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);
        
        const SKU =     {
            "Description" : "a new sku",
            "weight" : 100,
            "volume" : 50,
            "notes" : "an SKU",
            "price" : 10.99,
            "availableQuantity" : 50
        }
        await datainterface.CreateSKU(SKU.Description, SKU.weight, SKU.volume, SKU.notes, SKU.price, SKU.availableQuantity);
        var temp = await datainterface.GetAllSKU();
        const t = temp[0]
        // console.log(temp);
        
        var res = await datainterface.GetSKU(t.id);
        const s = res;
        // console.log(s);

        expect(s.description).toStrictEqual(t.description);
        expect(s.weight).toStrictEqual(t.weight);
        expect(s.volume).toStrictEqual(t.volume);
        expect(s.notes).toStrictEqual(t.notes);
        expect(s.positionId).toStrictEqual(t.positionId);
        expect(s.price).toStrictEqual(t.price);
        expect(s.testDescriptorIds).toStrictEqual(t.testDescriptorIds);

    })
}

function testCreateSKU(Descripition, weight, volume, notes, price, availableQuantity){
    test('Create SKU', async()=>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.CreateSKU(Descripition, weight, volume, notes, price, availableQuantity)
        var res = await datainterface.GetAllSKU();
        // console.log(res);
        expect(res.length).toStrictEqual(1);
        s=res[0];
        expect(s.description).toStrictEqual(Descripition);
        expect(s.weight).toStrictEqual(weight);
        expect(s.volume).toStrictEqual(volume);
        expect(s.notes).toStrictEqual(notes);
        expect(s.price).toStrictEqual(price);
        expect(s.availableQuantity).toStrictEqual(availableQuantity);

    })
}

function testUpdateSKU(newDescription, newweight, newvolume, newnotes, newprice, newquantity){
    test('Update SKU', async()=>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);
        await datainterface.CreateSKU("a description", 1, 1, "some notes", 12,1)
        var res = await datainterface.UpdateSKU(1,newDescription, newweight, newvolume, newnotes, newprice, newquantity)
        var temp = await datainterface.GetSKU(1);
        s=temp;
        expect(s.description).toStrictEqual(newDescription);
        expect(s.weight).toStrictEqual(newweight);
        expect(s.volume).toStrictEqual(newvolume);
        expect(s.notes).toStrictEqual(newnotes);
        expect(s.price).toStrictEqual(newprice);
        expect(s.availableQuantity).toStrictEqual(newquantity);
    })
}

function testAddmodifyPosition(position_id){
    test('Update or add position ID', async ()=>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);
        await datainterface.CreateSKU("a description", 1, 1, "some notes", 12,1)
        var temp = await datainterface.GetAllSKU();
        const t = temp[0]
        var res = await datainterface.addModifyposition(t.id, position_id);
        var res = await datainterface.GetSKU(1);
        s=res[0];
        expect(res.position).toStrictEqual(position_id);
    })
}

function testDeleteSKU(){
    test('Delete SKU', async ()=>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);
        await datainterface.CreateSKU("a description", 1, 1, "some notes", 12,1)
        var temp = await datainterface.GetAllSKU();
        // console.log(temp);
        const t = temp[0]
        expect(temp.length).toStrictEqual(1);
        await datainterface.DeleteSKU(t.id);
        var res = await datainterface.GetAllSKU();
        // console.log(res);
        expect(res.length).toStrictEqual(0);

    })
}






