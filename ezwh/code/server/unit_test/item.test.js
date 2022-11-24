const DatabaseHandler = require("../dbms");
const DataInterface = require("../controller/data-interface");
const {deleteDb} = require("./test-utils");

describe("testControllerItem", () => {
    beforeEach(() => {
        deleteDb();
    });
    
    testGetItems();
    testGetItemId();
    testCreateItem("a new item", 10.99, 1, 2);
    testUpdateItem("1", "a new sku!!", "12.99");
    testDeleteItem();
});

function testGetItems(){
    test("get Items", async () => {
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const item = {id : 5, description : "a new item", price : 10.99, SKUId : 1, supplierId : 2};
        await datainterface.CreateItem(item.id, item.description, item.price, item.SKUId, item.supplierId);

        var res = await datainterface.GetAllItems();
        expect(res.length).toStrictEqual(1);

        const i = res[0];
        expect(i.id).toStrictEqual(item.id);
        expect(i.description).toStrictEqual(item.description);
        expect(i.price).toStrictEqual(item.price);
        expect(i.SKUId).toStrictEqual(item.SKUId);
        expect(i.supplierId).toStrictEqual(item.supplierId);
    })
}

function testGetItemId(){
    test("get item by id", async () =>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const item = {id : 5, description : "a new item", price : 10.99, SKUId : 1, supplierId : 2};    
        await datainterface.CreateItem(item.id, item.description, item.price, item.SKUId, item.supplierId);

        var res = await datainterface.GetItem(item.id);
        expect(res.length).toStrictEqual(1);

        const i = res[0];
        expect(i.id).toStrictEqual(item.id);
        expect(i.description).toStrictEqual(item.description);
        expect(i.price).toStrictEqual(item.price);
        expect(i.SKUId).toStrictEqual(item.SKUId);
        expect(i.supplierId).toStrictEqual(item.supplierId);
    })
}

function testCreateItem(description, price, SKUId, supplierId){
    test("create item", async () =>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.CreateItem(null, description, price, SKUId, supplierId);
        var res = await datainterface.GetAllItems();
        expect(res.length).toStrictEqual(1);
        const i = res[0];
        expect(i.id).toStrictEqual(1);
        expect(i.description).toStrictEqual(description);
        expect(i.price).toStrictEqual(price);
        expect(i.SKUId).toStrictEqual(SKUId);
        expect(i.supplierId).toStrictEqual(supplierId);
    })
}

function testUpdateItem(newDescription, newPrice){
    test("update item", async () =>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const item = {id : 10, description : "a new item", price : 10.99, SKUId : 1, supplierId : 2};    
        await datainterface.CreateItem(item.id, item.description, item.price, item.SKUId, item.supplierId);
        await datainterface.UpdateItem(item.id, newDescription, newPrice);

        var res = await datainterface.GetAllItems();
        expect(res.length).toStrictEqual(1);
        const i = res[0];
        expect(i.id).toStrictEqual(item.id);
        expect(i.description).toStrictEqual(newDescription);
        expect(i.price).toStrictEqual(newPrice);
        expect(i.SKUId).toStrictEqual(item.SKUId);
        expect(i.supplierId).toStrictEqual(item.supplierId);

    })
}

function testDeleteItem(){
    test("create item", async () =>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const item = {id : 11, description : "a new item", price : 10.99, SKUId : 1, supplierId : 2};    
        await datainterface.CreateItem(item.id, item.description, item.price, item.SKUId, item.supplierId);
        await datainterface.DeleteItem(item.id);

        var res = await datainterface.GetAllItems();
        expect(res.length).toStrictEqual(0);
    })
}


