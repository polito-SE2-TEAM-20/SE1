const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

const { deleteDb } = require("../unit_test/test-utils");
const DatabaseHandler = require("../dbms");
const RestockOrder = require("../models/RestockOrder");
const SKUitem = require("../models/SKUitem");
const SKU = require("../models/sku");


let agent;


describe("Test Return Orders api", () => {

    beforeEach(async () => {
        deleteDb();

        const db = new DatabaseHandler();
        await db.init();
        await db.storeSKU(new SKU(null, "a product", null, null, null, 10.99))
        await db.storeSKU(new SKU(null, "another product", null, null, null, 11.99))
        await db.storeSKUItem(new SKUitem("12345678901234567890123456789016", 1, false, null))
        await db.storeSKUItem(new SKUitem("12345678901234567890123456789038", 2, false, null))
        await db.storeRestockOrder(new RestockOrder(null, "2021/11/29 09:33","ISSUED", null, [], null, [{SKUId:1, description:"a product", price:10.99, RFID:"12345678901234567890123456789016"},
       {SKUId:2, description:"another product", price:11.99, RFID:"12345678901234567890123456789038"}]))
        
        

        const generateApp = require("../server");
        const app = await generateApp()
        agent = chai.request.agent(app);
    });

    getReturnOrdersTest(200, "2021/11/29 09:33", [{SKUId:1, description:"a product", price:10.99, RFID:"12345678901234567890123456789016"},
{SKUId:2, description:"another product", price:11.99, RFID:"12345678901234567890123456789038"}], 1);

    getReturnOrderByIdTest(200, "2021/11/29 09:33", [{SKUId:1, description:"a product", price:10.99, RFID:"12345678901234567890123456789016"},
{SKUId:2, description:"another product", price:11.99, RFID:"12345678901234567890123456789038"}], 1);

    newReturnOrderTest(201, "2021/11/29 09:33", [{SKUId:1, description:"a product", price:10.99, RFID:"12345678901234567890123456789016"},
{SKUId:2, description:"another product", price:11.99, RFID:"12345678901234567890123456789038"}], 1);

    deleteReturnOrderTest(204, "2021/11/29 09:33", [{SKUId:1, description:"a product", price:10.99, RFID:"12345678901234567890123456789016"},
{SKUId:2, description:"another product", price:11.99, RFID:"12345678901234567890123456789038"}], 1);

})

function getReturnOrdersTest(expectedHTTPStatus, returnDate, products, restockOrderId) {
    it('Getting all Return Orders', function (done) {
        
        let ro = { returnDate: returnDate, products: products, restockOrderId : restockOrderId }
        agent.post("/api/returnOrder")
        .send(ro)
            .then(function (res) {
                try {
                    res.should.have.status(201);
                
                    agent.get("/api/returnOrders").then(function (r) {
                        try {
                            r.should.have.status(expectedHTTPStatus);
    
                            r.body[0].id.should.equal(1);
                            r.body[0].returnDate.should.equal(returnDate);
                            r.body[0].restockOrderId.should.equal(restockOrderId);
                            
                            done();
                        } catch (e) {
                            done(e);
                        }
                    })
                } catch (e) {
                    done(e);
                }
            })
    })
}

function getReturnOrderByIdTest(expectedHTTPStatus, returnDate, products, restockOrderId) {
    it('Getting Return Order by id', function (done) {

        let ro = { returnDate: returnDate, products: products, restockOrderId : restockOrderId }

        agent.post("/api/returnOrder")
        .send(ro)
        .then(function (res) {
            try {
                res.should.have.status(201);

                agent.get("/api/returnOrders/"+1).then(function (r) {
                    try {
                        r.should.have.status(expectedHTTPStatus);
                
                        r.body.id.should.equal(1);
                        r.body.returnDate.should.equal(returnDate);
                        r.body.restockOrderId.should.equal(restockOrderId);
        
                        done();
                    } catch (e) {
                        done(e);
                    }
                })
            } catch (e) {
                done(e);
            }
        })
    })
}

function newReturnOrderTest(expectedHTTPStatus, returnDate, products, restockOrderId) {
    it('Creating a Return Order', function (done) {
    
        let ro = { returnDate: returnDate, products: products, restockOrderId : restockOrderId }

        agent.post("/api/returnOrder")
        .send(ro)
            .then(function (res) {
                try {
                    res.should.have.status(expectedHTTPStatus);  
                    done();
                } catch (e) {
                    done(e);
                }
            })
    })
}

function deleteReturnOrderTest(expectedHTTPStatus, returnDate, products, restockOrderId) {
    it('Deleting a Return Order', function (done) {

        let ro = { returnDate: returnDate, products: products, restockOrderId : restockOrderId }

        agent.post("/api/returnOrder")
        .send(ro)
        .then(function (res) {
            try {
                res.should.have.status(201);

                agent.delete("/api/returnOrder/"+1)
                .then(function (r) {
                    try {
                        r.should.have.status(expectedHTTPStatus);
                        done();
                    } catch (e) {
                        done(e);
                    }
                })
            } catch (e) {
                done(e);
            }
          })
    })
}