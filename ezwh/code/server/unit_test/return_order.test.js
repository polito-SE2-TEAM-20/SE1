const DatabaseHandler = require("../dbms");
const DataInterface = require("../controller/data-interface");
const { deleteDb } = require("./test-utils")

describe('testControllerReturnOrder', () => {

    beforeEach(async () => {
        deleteDb()
    });

    testGetAllReturnOrders();
    testGetReturnOrder();
    testCreateReturnOrder("2021/11/29 09:33", [{SKUId:1, description:"a product", price:10.99, RFID:"12345678901234567890123456789016"},
{SKUId:2, description:"another product", price:11.99, RFID:"12345678901234567890123456789038"}], 1);
    testDeleteReturnOrder();

});

function testGetAllReturnOrders() {
    test('get all return orders', async () => {

        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const ro = {
            returnDate:"2021/11/29 09:33",
            products: [{SKUId:1, description:"a product", price:10.99, RFID:"12345678901234567890123456789016"},
                        {SKUId:2, description:"another product", price:11.99, RFID:"12345678901234567890123456789038"}],
            restockOrderId : 1   
         }
         
         await datainterface.CreateSKU("a product", null, null, null, 10.99)
         await datainterface.CreateSKU("another product", null, null, null, 11.99)
         await datainterface.createSKUItem("12345678901234567890123456789016", 1)
         await datainterface.createSKUItem("12345678901234567890123456789038", 2)
         await datainterface.createReturnOrder(ro.returnDate, ro.products, ro.restockOrderId);

         var res = await datainterface.getReturnOrders();

        console.log('get return orders: ');
        console.log(res);
        expect(res.length).toStrictEqual(1);

        const r = res[0];
        expect(r.id).toStrictEqual(1);
        expect(r.returnDate).toStrictEqual(ro.returnDate);
        //expect(r.products).toStrictEqual(ro.products);
        expect(r.restockOrderId).toStrictEqual(ro.restockOrderId);

    })
}

function testGetReturnOrder() {
    test('get return order', async () => {
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const ro = {
            returnDate:"2021/11/29 09:33",
            products: [{SKUId:1, description:"a product", price:10.99, RFID:"12345678901234567890123456789016"},
                        {SKUId:2, description:"another product", price:11.99, RFID:"12345678901234567890123456789038"}],
            restockOrderId : 1   
        }
         
        await datainterface.CreateSKU("a product", null, null, null, 10.99)
        await datainterface.CreateSKU("another product", null, null, null, 11.99)
        await datainterface.createSKUItem("12345678901234567890123456789016", 1)
        await datainterface.createSKUItem("12345678901234567890123456789038", 2)
        await datainterface.createReturnOrder(ro.returnDate, ro.products, ro.restockOrderId);

        var res = await datainterface.getReturnOrder(1);

        const r = res;
        expect(r.returnDate).toStrictEqual(ro.returnDate);
        //expect(r.products).toStrictEqual(ro.products);
        expect(r.restockOrderId).toStrictEqual(ro.restockOrderId);
    })
}

function testCreateReturnOrder(returnDate, products, restockOrderId) {
    test('create return order', async () => {

        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.CreateSKU("a product", null, null, null, 10.99)
        await datainterface.CreateSKU("another product", null, null, null, 11.99)
        await datainterface.createSKUItem("12345678901234567890123456789016", 1)
        await datainterface.createSKUItem("12345678901234567890123456789038", 2)
        await datainterface.createReturnOrder(returnDate, products, restockOrderId)

        var res = await datainterface.getReturnOrders();

        expect(res.length).toStrictEqual(1);

        const r = res[0];
        expect(r.id).toStrictEqual(1);
        expect(r.returnDate).toStrictEqual(returnDate);
        //expect(r.products).toStrictEqual(products);
        expect(r.restockOrderId).toStrictEqual(restockOrderId);
    })
}

function testDeleteReturnOrder() {
    test('delete return order', async () =>{

        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const ro = {
            returnDate:"2021/11/29 09:33",
            products: [{SKUId:1, description:"a product", price:10.99, RFID:"12345678901234567890123456789016"},
                        {SKUId:2, description:"another product", price:11.99, RFID:"12345678901234567890123456789038"}],
            restockOrderId : 1   
        }

        await datainterface.CreateSKU("a product", null, null, null, 10.99)
        await datainterface.CreateSKU("another product", null, null, null, 11.99)
        await datainterface.createSKUItem("12345678901234567890123456789016", 1)
        await datainterface.createSKUItem("12345678901234567890123456789038", 2)
        await datainterface.createReturnOrder(ro.returnDate, ro.products, ro.restockOrderId)

        var res = await datainterface.getReturnOrders();
        expect(res.length).toStrictEqual(1);

        await datainterface.deleteReturnOrder(1);
        var res = await datainterface.getReturnOrders();
        expect(res.length).toStrictEqual(0);

    })
}