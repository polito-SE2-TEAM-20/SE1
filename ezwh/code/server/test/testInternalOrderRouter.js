const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

const { deleteDb } = require("../unit_test/test-utils");
const SKUitem = require("../models/SKUitem");
const SKU = require("../models/sku");
const InternalOrder = require("../models/InternalOrder");

const DatabaseHandler = require("../dbms");
const res = require("express/lib/response");

let agent;

describe("Test Internal Orders api", () => {

    beforeEach(async () => {
        deleteDb();

        const db = new DatabaseHandler();
        await db.init();
        await db.storeSKU(new SKU(null, "a product", null, null, null, 10.99))
        await db.storeSKU(new SKU(null, "another product", null, null, null, 11.99))
        await db.storeSKUItem(new SKUitem("12345678901234567890123456789016", 1, false, null))
        await db.storeSKUItem(new SKUitem("12345678901234567890123456789038", 2, false, null))
        const generateApp = require("../server");
        const app = await generateApp()
        agent = chai.request.agent(app);
    });
    getInternalorderstest(200,"2021/11/29 09:33", [{SKUId:1, description:"a product", price:10.99, RFID:"12345678901234567890123456789016"},
    {SKUId:2, description:"another product", price:11.99, RFID:"12345678901234567890123456789038"}], 1);
    getIssuedInternalOrderstest(200, "2021/11/29 09:33", [{SKUId:1, description:"a product", price:10.99, RFID:"12345678901234567890123456789016"},
    {SKUId:2, description:"another product", price:11.99, RFID:"12345678901234567890123456789038"}], 1);
    getacceptedInternalOrdertest(200, "2021/11/29 09:33", [{SKUId:1, description:"a product", price:10.99, RFID:"12345678901234567890123456789016"},
    {SKUId:2, description:"another product", price:11.99, RFID:"12345678901234567890123456789038"}], 1);
    getInternalOrderByIdTest(200, "2021/11/29 09:33", [{SKUId:1, description:"a product", price:10.99, RFID:"12345678901234567890123456789016"},
    {SKUId:2, description:"another product", price:11.99, RFID:"12345678901234567890123456789038"}], 1);
    newInteralOrderTest(201, "2021/11/29 09:33", [{SKUId:1, description:"a product", price:10.99, RFID:"12345678901234567890123456789016"},
    {SKUId:2, description:"another product", price:11.99, RFID:"12345678901234567890123456789038"}], 1);
    deleteInternalOrderTest(204,"2021/11/29 09:33", [{SKUId:1, description:"a product", price:10.99, RFID:"12345678901234567890123456789016"},
    {SKUId:2, description:"another product", price:11.99, RFID:"12345678901234567890123456789038"}], 1);
    updateInternalOrdertype("2021/11/29 09:33", [{SKUId:1, description:"a product", price:10.99, RFID:"12345678901234567890123456789016"},
    {SKUId:2, description:"another product", price:11.99, RFID:"12345678901234567890123456789038"}], 1, "ACCEPTED");

})

function getInternalorderstest(expectedHTTPStatus, issueDate, products, customerId){
    it('Getting all internal orders', function(done){
        let io = {issueDate: issueDate, products: products, customerId};
        agent.post("/api/internalOrders")
        .send(io)
        .then(function (res){
            try{
                res.should.have.status(201);
                agent.get("/api/internalOrders").then (function(r){
                    try{
                        r.should.have.status(expectedHTTPStatus);
                        r.body[0].issueDate.should.equal(issueDate);
                        r.body[0].customerId.should.equal(customerId);
                        done();
                    }
                    catch(e){
                        done(e);
                    }
                })
            }
            catch(e)
            {
                done (e);
            }
        })
    })
}

function getIssuedInternalOrderstest(expectedHTTPStatus, issueDate, products, customerId){
    it('Getting all issued internal orders', function(done){
        let io = {issueDate: issueDate, products: products, customerId};
        agent.post("/api/internalOrders")
        .send(io)
        .then(function (res){
            try{
                res.should.have.status(201);
                agent.get("/api/internalOrdersIssued").then (function(r){
                    try{
                        r.should.have.status(expectedHTTPStatus);
                        r.body[0].issueDate.should.equal(issueDate);
                        r.body[0].customerId.should.equal(customerId);
                        r.body[0].state.should.equal("ISSUED")
                        done();
                    }
                    catch(e){
                        done(e);
                    }
                })
            }
            catch(e)
            {
                done (e);
            }
        })
    })
}

function getacceptedInternalOrdertest(expectedHTTPStatus, issueDate, products, customerId){
    it('Getting all accpeted internal orders', function(done){
        let io = {issueDate: issueDate, products: products, customerId};
        let io_diffstate={newState: "ACCEPTED"};
        agent.post("/api/internalOrders")
        .send(io)
        .then(function (res){
            try{
                res.should.have.status(201);
                agent.put("/api/internalOrders/"+1).send(io_diffstate)
                .then(function (res){
                    try{
                        res.should.have.status(200);
                        agent.get("/api/internalOrdersAccepted").then (function(r){
                            try{
                                r.should.have.status(expectedHTTPStatus);
                                r.body[0].issueDate.should.equal(issueDate);
                                r.body[0].customerId.should.equal(customerId);
                                r.body[0].state.should.equal("ACCEPTED")
                                done();
                            }
                            catch(e){
                                done(e);
                            }
                    
                    })
                }
                catch(e){
                    done(e);
                }
            })
            
                }
                catch(e){
                    done(e);
                }
            
                
            })
    })
}

function getInternalOrderByIdTest(expectedHTTPStatus, issueDate, products, customerId) {
    it('Getting Internal Order by id', function (done) {

        let io = { issueDate: issueDate, products: products, customerId : customerId }

        agent.post("/api/internalOrders")
        .send(io)
        .then(function (res) {
            try {
                res.should.have.status(201);

                agent.get("/api/internalOrders/"+1).then(function (r) {
                    try {
                        r.should.have.status(expectedHTTPStatus);
                
                        r.body.id.should.equal(1);
                        r.body.issueDate.should.equal(issueDate);
                        r.body.customerId.should.equal(customerId);
        
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

function newInteralOrderTest(expectedHTTPStatus, issueDate, products, customerId) {
    it('Creating a Inernal Order', function (done) {
    
        let io = { issueDate: issueDate, products: products, customerId : customerId }

        agent.post("/api/internalOrders")
        .send(io)
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

function deleteInternalOrderTest(expectedHTTPStatus, issueDate, products, customerId) {
    it('Deleting a Internal Order', function (done) {

        let io = { issueDate: issueDate, products: products, customerId : customerId }

        agent.post("/api/returnOrder")
        .send(io)
        .then(function (res) {
            try {
                res.should.have.status(201);

                agent.delete("/api/internalOrders/"+1)
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

function updateInternalOrdertype(expectedHTTPStatus, issueDate, products, customerId,newState){
    it('updating internal order', function(done){
        let io = {issueDate: issueDate, products: products, customerId};
        let io_diffstate={newState: newState};
        agent.post("/api/internalOrders")
        .send(io)
        .then(function (res){
            try{
                res.should.have.status(201);
                agent.put("/api/internalOrders/"+1).send(io_diffstate)
                .then(function (res){
                    try{
                        res.should.have.status(200);
                        agent.get("/api/internalOrders").then (function(r){
                            try{
                                r.should.have.status(expectedHTTPStatus);
                                r.body[0].issueDate.should.equal(issueDate);
                                r.body[0].customerId.should.equal(customerId);
                                r.body[0].state.should.equal(newState);
                                done();
                            }
                            catch(e){
                                done(e);
                            }
                    
                    })
                }
                catch(e){
                    done(e);
                }
            })
            
                }
                catch(e){
                    done(e);
                }
            
                
            })
    })
}