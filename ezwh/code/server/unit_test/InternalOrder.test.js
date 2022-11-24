const DatabaseHandler = require("../dbms");
const DataInterface = require("../controller/data-interface");
const { deleteDb } = require("./test-utils");
const { expect } = require("chai");
//const { expect } = require("chai");

describe('testControllerInternalOrder', () => {

    beforeEach(() => {
        deleteDb()
    });
    testGetInternalOrders();
    testGetInternalOrdersIssued();
    testGetAcceptedInternalOrders();
    testGetInternalOrder();
    testCreateInternalOrder("2022/12/3", [{"SKUId":12,"description":"a product","price":10.99,"qty":30},
    {"SKUId":180,"description":"another product","price":11.99,"qty":20}],1);
    testUpdateInternalOrder("ACCEPTED");
    testDeleteInternalOrder();
});

function testGetInternalOrders(){
    test('get all Internal Orders', async () =>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const IO =   {
            "issueDate":"2021/11/29 09:33",
            "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":3},
                        {"SKUId":180,"description":"another product","price":11.99,"qty":3}],
            "customerId" : 1
        }
        await datainterface.CreateInternalOrder(IO.issueDate, IO.products, IO.customerId);
        
        var res = await datainterface.GetInternalOrders();
        expect(res.length).toStrictEqual(1);

        const i = res[0];
        expect(i.id).toStrictEqual(1);
        expect(i.IssueDate).toStrictEqual(IO.issueDate);
        expect(i.state).toStrictEqual("ISSUED");
        expect(i.CustomerID).toStrictEqual(IO.customerId);
        expect(i.Products).toStrictEqual(IO.products);


    })

}

function testGetInternalOrdersIssued(){
    test("Get issued internal orders", async()=>{

    const db = new DatabaseHandler();
    await db.init();
    const datainterface = new DataInterface(db);

    const IO =   {
        "issueDate":"2021/11/29 09:33",
        "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":3},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":3}],
        "customerId" : 1
    }
    await datainterface.CreateInternalOrder(IO.issueDate, IO.products, IO.customerId);
    var res = await datainterface.GetIssuedInternalOrders();
    expect(res.length).toStrictEqual(1);
    const i = res[0];
    expect(i.id).toStrictEqual(1);
    expect(i.IssueDate).toStrictEqual(IO.issueDate);
    expect(i.state).toStrictEqual("ISSUED");
    expect(i.CustomerID).toStrictEqual(IO.customerId);
    expect(i.Products).toStrictEqual(IO.products);
})
}   

function testGetAcceptedInternalOrders(){
    test("Get accepted internal orders", async()=>{
    const db = new DatabaseHandler();
    await db.init();
    const datainterface = new DataInterface(db);
    const IO =   {
        "issueDate":"2021/11/29 09:33",
        "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":3},
                    {"SKUId":180,"description":"another product","price":11.99,"qty":3}],
        "customerId" : 1
    }

    await datainterface.CreateInternalOrder(IO.issueDate, IO.products, IO.customerId);
    var temp = await datainterface.GetInternalOrders();
    t=temp[0];
    await datainterface.UpdateInternalOrder(t.ID, "ACCEPTED");
    var res = await datainterface.GetAcceptedInternalOrders();
    expect(res.length).toStrictEqual(1);
    const i = res[0];
    expect(i.id).toStrictEqual(1);
    expect(i.IssueDate).toStrictEqual(IO.issueDate);
    expect(i.state).toStrictEqual("ACCEPTED");
    expect(i.CustomerID).toStrictEqual(IO.customerId);
    expect(i.Products).toStrictEqual(IO.products);
})
}

function testGetInternalOrder(){
    test('Get internal order by ID ', async()=>{
    const db = new DatabaseHandler();
    await db.init();
    const datainterface = new DataInterface(db);
    const IO =   {
            "issueDate":"2021/11/29 09:33",
            "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":3},
                        {"SKUId":180,"description":"another product","price":11.99,"qty":3}],
            "customerId" : 1
        }
    await datainterface.CreateInternalOrder(IO.issueDate, IO.products, IO.customerId);
    var temp = await datainterface.GetInternalOrders();
    t=temp[0];
    var res = await datainterface.GetInternalOrder(1);
    expect(res.length).toStrictEqual(1);
    const i = res[0];
    expect(i.id).toStrictEqual(1);
    expect(i.IssueDate).toStrictEqual(IO.issueDate);
    expect(i.state).toStrictEqual(t.state);
    expect(i.CustomerID).toStrictEqual(IO.customerId);
    expect(i.Products).toStrictEqual(IO.products);    

    })
}

function testCreateInternalOrder(issueDate, products, customerId){
    test('Get internal order by ID ', async()=>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);
        await datainterface.CreateInternalOrder(issueDate, products, customerId);
        var res = await datainterface.GetInternalOrders();
        expect(res.length).toStrictEqual(1);

        const i = res[0];
        expect(i.id).toStrictEqual(1);
        expect(i.IssueDate).toStrictEqual(issueDate);
        expect(i.state).toStrictEqual("ISSUED");
        expect(i.CustomerID).toStrictEqual(customerId);
        expect(i.Products).toStrictEqual(products);


    })
}

function testUpdateInternalOrder(newState){
    test('Update internal order', async()=>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);
        const IO =   {
            "issueDate":"2021/11/29 09:33",
            "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":3},
                        {"SKUId":180,"description":"another product","price":11.99,"qty":3}],
            "customerId" : 1
        }
        await datainterface.CreateInternalOrder(IO.issueDate, IO.products, IO.customerId);
        await datainterface.UpdateInternalOrder(1,newState);
        var res = await datainterface.GetInternalOrders();
        expect(res.length).toStrictEqual(1);
        const i = res[0];
        expect(i.id).toStrictEqual(1);
        expect(i.IssueDate).toStrictEqual(IO.issueDate);
        expect(i.state).toStrictEqual(newState);
        expect(i.CustomerID).toStrictEqual(IO.customerId);
        expect(i.Products).toStrictEqual(IO.products);
        
    })
}

function testDeleteInternalOrder(){
    test("Delete Internal Order",async()=>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);
        const IO =   {
            "issueDate":"2021/11/29 09:33",
            "products": [{"SKUId":12,"description":"a product","price":10.99,"qty":3},
                        {"SKUId":180,"description":"another product","price":11.99,"qty":3}],
            "customerId" : 1
        }
        await datainterface.CreateInternalOrder(IO.issueDate, IO.products, IO.customerId);
        await datainterface.DeleteInternalOrder(1);
        var res = await datainterface.GetInternalOrders();
        expect(res.length).toStrictEqual(0);
    })
}

