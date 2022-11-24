const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

const { deleteDb } = require("../unit_test/test-utils");
const DatabaseHandler = require("../dbms");
const SKU = require("../models/sku");

let agent;

describe("Test SKUitems api", () => {

    beforeEach(async () => {
        deleteDb();

        const db = new DatabaseHandler();
        await db.init();
        await db.storeSKU(new SKU(1, "A sku", 50, 50, "sku1", 50, 10.99))

        const generateApp = require("../server");
        const app = await generateApp();
        agent = chai.request.agent(app);
    });

    //GOOD
    getSKUitemListTest(200, "12345678901234567890123456789015", 1, "2021/11/29 12:30");
    getSKUitemByIdTest(200, "12345678901234567890123456789015", 1, "2021/11/29 12:30");
    getSKUitemByRFIDTest(200, "12345678901234567890123456789015", 1, "2021/11/29 12:30");
    newSKUitemTest(201, "12345678901234567890123456789015", 1, "2021/11/29 12:30");
    updateSKUitemTest(200, "12345678901234567890123456789015", 1, "2021/11/29 12:30");
    deleteSKUitemTest(204, "12345678901234567890123456789015", 1, "2021/11/29 12:30");

    //BAD
    newSKUitemTest(422, "12345678901234567890123456789015", 1, undefined);

})

function getSKUitemListTest(expectedHTTPStatus, rfid, SKUid, dateOfStock) {
    it('Getting all SKUitems', function (done) {
        
        let skui = { RFID: rfid, SKUId: SKUid, DateOfStock: dateOfStock }
        agent.post("/api/skuitem")
        .send(skui)
            .then(function (res) {
                try {
                    res.should.have.status(201);
                
                    agent.get("/api/skuitems").then(function (r) {
                        try {
                            r.should.have.status(expectedHTTPStatus);
    
                            r.body[0].RFID.should.equal(rfid);
                            r.body[0].SKUId.should.equal(SKUid);
                            r.body[0].DateOfStock.should.equal(dateOfStock);
                            
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

function getSKUitemByIdTest(expectedHTTPStatus, rfid, SKUid, dateOfStock) {
    it('Getting SKUitem by id', function (done) {

        let skui = { RFID: rfid, SKUId: SKUid, DateOfStock: dateOfStock }
        let newskui = { newRFID: rfid, newAvailable:1, newDateOfStock: dateOfStock}

        agent.post("/api/skuitem")
        .send(skui)
        .then(function (res) {
            try {
                res.should.have.status(201);
            
                agent.put("/api/skuitems/"+rfid)
                .send(newskui)
                .then(function (res) {
                    try {
                        res.should.have.status(200);
    
                        agent.get("/api/skuitems/sku/"+SKUid).then(function (r) {
                            try {
                                r.should.have.status(expectedHTTPStatus);
                        
                                r.body[0].RFID.should.equal(rfid);
                                r.body[0].SKUId.should.equal(SKUid);
                                r.body[0].DateOfStock.should.equal(dateOfStock);
            
                                done();
                            } catch (e) {
                                done(e);
                            }                        
                        })
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

function getSKUitemByRFIDTest(expectedHTTPStatus, rfid, SKUid, dateOfStock) {
    it('Getting SKUitem by rfid', function (done) {

        let skui = { RFID: rfid, SKUId: SKUid, DateOfStock: dateOfStock }

        agent.post("/api/skuitem")
        .send(skui)
        .then(function (res) {
            try {
                res.should.have.status(201);

                agent.get("/api/skuitems/"+rfid).then(function (r) {
                    try {
                        r.should.have.status(expectedHTTPStatus);
                
                        r.body.RFID.should.equal(rfid);
                        r.body.SKUId.should.equal(SKUid);
                        r.body.Available.should.equal(0);
                        r.body.DateOfStock.should.equal(dateOfStock);
        
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

function newSKUitemTest(expectedHTTPStatus, rfid, SKUid, dateOfStock) {
    it('Creating a new SKUitem', function (done) {

            let skui = { RFID: rfid, SKUId: SKUid, DateOfStock: dateOfStock }

            agent.post("/api/skuitem")
            .send(skui)
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

function updateSKUitemTest(expectedHTTPStatus, rfid, SKUid, dateOfStock) {
    it('Updating a SKUitem', function (done) {

        let skui = { RFID: rfid, SKUId: SKUid, DateOfStock: dateOfStock }
        let newskui = { newRFID: rfid, newAvailable:1, newDateOfStock: dateOfStock}

        agent.post("/api/skuitem")
        .send(skui)
        .then(function (res) {
            try {
                res.should.have.status(201);
            
                agent.put("/api/skuitems/"+rfid)
                .send(newskui)
                .then(function (res) {
                    try {
                        res.should.have.status(200);
    
                        agent.get("/api/skuitems").then(function (r) {
                            try {
                                r.should.have.status(expectedHTTPStatus);
                        
                                r.body[0].RFID.should.equal(rfid);
                                r.body[0].SKUId.should.equal(SKUid);
                                r.body[0].Available.should.equal(1);
                                r.body[0].DateOfStock.should.equal(dateOfStock);
            
                                done();
                            }  catch (e) {
                                done(e);
                            }
                        })
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

function deleteSKUitemTest(expectedHTTPStatus, rfid, SKUid, dateOfStock) {
    it('Deleting a SKUitem', function (done) {

        let skui = { RFID: rfid, SKUId: SKUid, DateOfStock: dateOfStock }
        agent.post("/api/skuitem")
        .send(skui)
        .then(function (res) {
            try {
                res.should.have.status(201);

                agent.delete("/api/skuitems/"+rfid)
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