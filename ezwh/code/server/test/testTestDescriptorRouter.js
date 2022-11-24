const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

const { deleteDb } = require("../unit_test/test-utils");
const DatabaseHandler = require("../dbms");
const SKU = require("../models/sku");

let agent;

describe("Test Descriptor api", () => {

    beforeEach(async () => {
        deleteDb();

        const db = new DatabaseHandler();
        await db.init();
        await db.storeSKU(new SKU(1, "A sku", 50, 50, "sku1", 50, 10.99));

        const generateApp = require("../server");
        const app = await generateApp();
        agent = chai.request.agent(app);
    });

    getTestDescriptorsTest(200, "test descriptor 1", "This test is described by...", 1);
    getTestDescriptorByIdTest(200, "test descriptor 1", "This test is described by...", 1);
    newTestDescriptorTest(201, "test descriptor 1", "This test is described by...", 1);
    updateTestDescriptorTest(200, "test descriptor 1", "This test is described by...", 1);
    deleteTestDescriptorTest(204, "test descriptor 1", "This test is described by...", 1);
})

function getTestDescriptorsTest(expectedHTTPStatus, name, procedureDescription, idSKU) {
    it('Getting all Test Descriptors', function (done) {
        
        let td = { name: name, procedureDescription: procedureDescription, idSKU : idSKU }
        agent.post("/api/testDescriptor")
        .send(td)
            .then(function (res) {
                try {
                    res.should.have.status(201);
                
                    agent.get("/api/testDescriptors").then(function (r) {
                        try{
                            r.should.have.status(expectedHTTPStatus);
    
                            r.body[0].id.should.equal(1);
                            r.body[0].name.should.equal(name);
                            r.body[0].procedureDescription.should.equal(procedureDescription);
                            r.body[0].idSKU.should.equal(idSKU);
                            
                            done();
                        } catch (e) {
                            done(e);
                        }
                    })
                }
                catch (e) {
                    done(e);
                }
            })
    })
}

function getTestDescriptorByIdTest(expectedHTTPStatus, name, procedureDescription, idSKU) {
    it('Getting Test Descriptor by id', function (done) {

        let td = { name: name, procedureDescription: procedureDescription, idSKU : idSKU }

        agent.post("/api/testDescriptor")
        .send(td)
        .then(function (res) {
            try{
                res.should.have.status(201);

                agent.get("/api/testDescriptors/"+1).then(function (r) {
                    try {
                        r.should.have.status(expectedHTTPStatus);
                
                        r.body.id.should.equal(1);
                        r.body.name.should.equal(name);
                        r.body.procedureDescription.should.equal(procedureDescription);
                        r.body.idSKU.should.equal(idSKU);
    
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

function newTestDescriptorTest(expectedHTTPStatus, name, procedureDescription, idSKU) {
    it('Creating a Test Descriptor', function (done) {
    
        let td = { name: name, procedureDescription: procedureDescription, idSKU : idSKU }
        agent.post("/api/testDescriptor")
        .send(td)
            .then(function (res) {
                try{
                    res.should.have.status(expectedHTTPStatus);  
                    done();
                } catch (e) {
                    done(e);
                } 
            })
    })
}

function updateTestDescriptorTest(expectedHTTPStatus, name, procedureDescription, idSKU) {
    it('Updating a Test Descriptor', function (done) {

        let td = { name: name, procedureDescription: procedureDescription, idSKU : idSKU }
        let newtd = { newName:"test descriptor mod 1", newProcedureDescription:"This test is described by...", newIdSKU :1 }

        agent.post("/api/testDescriptor")
        .send(td)
        .then(function (res) {
            try {
                res.should.have.status(201);
            
                agent.put("/api/testDescriptor/"+1)
                .send(newtd)
                .then(function (res) {
                    try {
                        res.should.have.status(200);
    
                        agent.get("/api/testDescriptors").then(function (r) {

                            try {
                                r.should.have.status(expectedHTTPStatus);
        
                                r.body[0].id.should.equal(1);
                                r.body[0].name.should.equal(newtd.newName);
                                r.body[0].procedureDescription.should.equal(newtd.newProcedureDescription);
                                r.body[0].idSKU.should.equal(newtd.newIdSKU);
                                
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

function deleteTestDescriptorTest(expectedHTTPStatus, name, procedureDescription, idSKU) {
    it('Deleting a Test Descriptor', function (done) {

        let td = { name: name, procedureDescription: procedureDescription, idSKU : idSKU }
        agent.post("/api/testDescriptor")
        .send(td)
        .then(function (res) {
            try {
                res.should.have.status(201);

                agent.delete("/api/testDescriptor/"+1)
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