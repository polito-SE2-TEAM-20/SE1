const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

const { deleteDb } = require("../unit_test/test-utils");

let agent;

describe("Test TestResult api", async () => {

    beforeEach(async () => {
        deleteDb();

        const generateApp = require("../server");
        const app = await generateApp()
        agent = chai.request.agent(app);
    });

    testGetSKUItemTestResults(200,"12345678901234567890123456789016",12,"2021/11/28",true);
    testGetSKUItemTestResult(200,"12345678901234567890123456789016",12,"2021/11/28",true);
    testNewTestResult(201,"12345678901234567890123456789016",12,"2021/11/28",true);
    testUpdateTestResult(200,"12345678901234567890123456789016",12,"2021/11/28",true);
    deleteTestResultTest(204,"12345678901234567890123456789016",12,"2021/11/28",true);

})

function testGetSKUItemTestResults(expectedHTTPStatus,rfid,idTestDescriptor,Date,Result) {
    it('Getting all Test Results', function (done) {
        let tr = {
            "rfid":rfid,
            "idTestDescriptor":idTestDescriptor,
            "Date":Date,
            "Result": Result
        }

        agent.post("/api/skuitems/testResult")
        .send(tr)
        .then(function (res) {
            try {
                res.should.have.status(201);
                
                agent.get("/api/skuitems/"+rfid+"/testResults").then(function (r) {
                    try {
                        r.should.have.status(expectedHTTPStatus);

                        r.body[0].id.should.equal(1);
                        r.body[0].idTestDescriptor.should.equal(idTestDescriptor);
                        r.body[0].Date.should.equal(Date);
                        r.body[0].Result.should.equal(Result);
                        
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

function testGetSKUItemTestResult(expectedHTTPStatus,rfid,idTestDescriptor,Date,Result) {
    it('Getting a Test Results', function (done) {
        let tr = {
            "rfid":rfid,
            "idTestDescriptor":idTestDescriptor,
            "Date":Date,
            "Result": Result
        }

        agent.post("/api/skuitems/testResult")
        .send(tr)
        .then(function (res) {
            try {
                res.should.have.status(201);
                
                agent.get("/api/skuitems/"+rfid+"/testResults/"+1).then(function (r) {
                    try {
                        r.should.have.status(expectedHTTPStatus);

                        r.body[0].id.should.equal(1);
                        r.body[0].idTestDescriptor.should.equal(idTestDescriptor);
                        r.body[0].Date.should.equal(Date);
                        r.body[0].Result.should.equal(Result);
                        
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

function testNewTestResult(expectedHTTPStatus,rfid,idTestDescriptor,Date,Result) {
    it('Creating a new TestResult', function (done) {
    
        let tr = {
            "rfid":rfid,
            "idTestDescriptor":idTestDescriptor,
            "Date":Date,
            "Result": Result
        }

        agent.post("/api/skuitems/testResult")
        .send(tr)
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

function testUpdateTestResult(expectedHTTPStatus,rfid,idTestDescriptor,Date,Result) {
    it('Updating a Position', function (done) {

        let tr = {
            "rfid":rfid,
            "idTestDescriptor":idTestDescriptor,
            "Date":Date,
            "Result": Result
        }
        let newtr = {
            "newIdTestDescriptor":12,
            "newDate":"2021/11/28",
            "newResult": true
        }

        agent.post("/api/skuitems/testResult")
        .send(tr)
        .then(function (res) {
            try {
                res.should.have.status(201);
                
                agent.put("/api/skuitems/"+rfid+"/testResult/"+1)
                .send(newtr)
                .then(function (res) {
                    try {
                        res.should.have.status(200);

                        agent.get("/api/skuitems/"+rfid+"/testResults").then(function (r) {
                            try {
                                r.should.have.status(expectedHTTPStatus);

                                r.body[0].id.should.equal(1);
                                r.body[0].idTestDescriptor.should.equal(newtr.newIdTestDescriptor);
                                r.body[0].Date.should.equal(newtr.newDate);
                                r.body[0].Result.should.equal(newtr.newResult);
                                
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

function deleteTestResultTest(expectedHTTPStatus,rfid,idTestDescriptor,Date,Result) {
    it('Deleting a TestResult', function (done) {

        let tr = {
            "rfid":rfid,
            "idTestDescriptor":idTestDescriptor,
            "Date":Date,
            "Result": Result
        }
        agent.post("/api/skuitems/testResult")
        .send(tr)
        .then(function (res) {
            try {
                res.should.have.status(201);

                agent.delete("/api/skuitems/"+rfid+"/testResult/"+1)
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