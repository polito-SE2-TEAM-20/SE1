const DatabaseHandler = require("../dbms");
const DataInterface = require("../controller/data-interface");
const {deleteDb} = require("./test-utils");

describe("testControllerRestockOrder", () => {
    beforeEach(() => {
        deleteDb();
    });
    
    testGetRestockOrders();
    testGetRestockOrdersIssued();
    testGetRestockOrderById();
    testGetReturnItemsById();
    testCreateRestockOrder("2021/11/29 09:33", [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
           {"SKUId":180,"description":"another product","price":11.99,"qty":20}],1);
    testUpdateRestockOrder("DELIVERED");
    testUpdateSKUItems([{"SKUId":12,"rfid":"12345678901234567890123456789016"},{"SKUId":12,"rfid":"12345678901234567890123456789017"}]);
    testUpdateTransportNote("2021/12/29");
    testDeleteRestockOrder();
});

function testGetRestockOrders(){
    test("get restock orders", async () => {
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const ro = {issueDate:"2021/11/29 09:33",
                    products : [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
                    supplierId : 1};
        await datainterface.CreateRestockOrder(ro.issueDate, ro.products, ro.supplierId);
        
        var res = await datainterface.GetRestockOrders();
        expect(res.length).toStrictEqual(1);

        const test = res[0];
        expect(test.id).toStrictEqual(1);
        expect(test.issue).toStrictEqual(ro.issueDate);
        expect(test.orderState).toStrictEqual("ISSUED");
        expect(test.supplierId).toStrictEqual(ro.supplierId);
        expect(test.product).toStrictEqual(ro.products);
    })
}

function testGetRestockOrdersIssued(){
    test("get issued restock orders", async () => {
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const ro = {issueDate:"2021/11/29 09:33",
                    products : [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
                    supplierId : 1};
        await datainterface.CreateRestockOrder(ro.issueDate, ro.products, ro.supplierId);
        
        var res = await datainterface.GetIssuedRestockOrders();
        expect(res.length).toStrictEqual(1);

        const test = res[0];
        expect(test.id).toStrictEqual(1);
        expect(test.issue).toStrictEqual(ro.issueDate);
        expect(test.orderState).toStrictEqual("ISSUED");
        expect(test.supplierId).toStrictEqual(ro.supplierId);
        expect(test.product).toStrictEqual(ro.products);
    })
}

function testGetRestockOrderById(){
    test("get restock orders by id", async () => {
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const ro = {issueDate:"2021/11/29 09:33",
                    products : [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
                    supplierId : 1};
        await datainterface.CreateRestockOrder(ro.issueDate, ro.products, ro.supplierId);
        
        var res = await datainterface.GetRestockOrder(1);
        expect(res.length).toStrictEqual(1);

        const test = res[0];
        console.log(test);
        expect(test.id).toStrictEqual(1);
        expect(test.issue).toStrictEqual(ro.issueDate);
        expect(test.orderState).toStrictEqual("ISSUED");
        expect(test.supplierId).toStrictEqual(ro.supplierId);
        expect(test.product).toStrictEqual(ro.products);
    })
}

function testGetReturnItemsById(){
    test("get return items by id", async () => {
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const ro = {issueDate:"2021/11/29 09:33",
                    products : [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
                    supplierId : 1};
        await datainterface.CreateRestockOrder(ro.issueDate, ro.products, ro.supplierId);
        var res = await datainteface.GetRestockOrderReturnItem(1);

        expect(res.getProducts()).toStrictEqual(ro.products);

    })
}

function testCreateRestockOrder(issueDate, products, supplierId){
    test("create restock order", async () => {
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.CreateRestockOrder(issueDate, products, supplierId);
        var res = await datainterface.GetRestockOrder(1);

        const test = res[0];
        console.log(test);
        expect(test.id).toStrictEqual(1);
        expect(test.issue).toStrictEqual(issueDate);
        expect(test.orderState).toStrictEqual("ISSUED");
        expect(test.supplierId).toStrictEqual(supplierId);
        expect(test.product).toStrictEqual(products);
    })
}

function testUpdateRestockOrder(newState){
    test("update restock order state", async () => {
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const ro = {issueDate:"2021/11/29 09:33",
                    products : [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
                    supplierId : 1};
        await datainterface.CreateRestockOrder(ro.issueDate, ro.products, ro.supplierId);
        await datainterface.UpdateRestockOrderState(1, newState);
        var res = await datainterface.GetRestockOrder(1);

        const test = res[0];
        console.log(test);
        expect(test.id).toStrictEqual(1);
        expect(test.issue).toStrictEqual(ro.issueDate);
        expect(test.orderState).toStrictEqual(newState);
        expect(test.supplierId).toStrictEqual(ro.supplierId);
        expect(test.product).toStrictEqual(ro.products);
    })
}

function testUpdateSKUItems(skuItems){
    test("update restock order skuItems", async () => {
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const ro = {issueDate:"2021/11/29 09:33",
                    products : [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
                    supplierId : 1};
        await datainterface.CreateRestockOrder(ro.issueDate, ro.products, ro.supplierId);
        await datainterface.UpdateRestockOrderState(1, "DELIVERED");
        await datainterface.RestockOrderAddSKUItems(1, skuItems);

        var res = await datainterface.GetRestockOrder(1);
        const test = res[0];
        expect(test.id).toStrictEqual(1);
        expect(test.issue).toStrictEqual(ro.issueDate);
        expect(test.orderState).toStrictEqual("DELIVERED");
        expect(test.supplierId).toStrictEqual(ro.supplierId);
        expect(test.product).toStrictEqual(ro.products);
        expect(test.SKUItems).toStrictEqual(skuItems);
    })
}

function testUpdateTransportNote(deliveryDate){
    test("update restock order transport note", async () => {
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const ro = {issueDate:"2021/11/29 09:33",
                    products : [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
                    supplierId : 1};
        await datainterface.CreateRestockOrder(ro.issueDate, ro.products, ro.supplierId);
        await datainterface.UpdateRestockOrderState(1, "DELIVERY");
        var res = await datainterface.GetRestockOrder(1);

        const test = res[0];
        console.log(test);
        expect(test.id).toStrictEqual(1);
        expect(test.issue).toStrictEqual(ro.issueDate);
        expect(test.orderState).toStrictEqual("DELIVERY");
        expect(test.supplierId).toStrictEqual(ro.supplierId);
        expect(test.product).toStrictEqual(ro.products);
    })
}

function testDeleteRestockOrder(){
    test("delete restock order", async () => {
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const ro = {issueDate:"2021/11/29 09:33",
                    products : [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":20}],
                    supplierId : 1};
        await datainterface.CreateRestockOrder(ro.issueDate, ro.products, ro.supplierId);
        console.log(ro);
        await datainterface.DeleteRestockOrder(1);

        var res = await datainterface.GetRestockOrders();
        expect(res.length).toStrictEqual(0);
    })
}
