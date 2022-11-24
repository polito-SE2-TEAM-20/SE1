const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

const { deleteDb } = require("../unit_test/test-utils");

let agent;

describe("Test Positions api", async () => {

    beforeEach(async () => {
        deleteDb();

        const generateApp = require("../server");
        const app = await generateApp()
        agent = chai.request.agent(app);
    });

    getPositionListTest(200, "800234543413", "8002", "3454", "3412", 1000, 1000);
    newPositionTest(201, "800234543413", "8002", "3454", "3412", 1000, 1000);
    updatePositionTest(200, "800234543413", "8002", "3454", "3412", 1000, 1000);
    updatePositionIDTest(200, "800234543413", "8002", "3454", "3412", 1000, 1000);
    deletePositionTest(204, "800234543413", "8002", "3454", "3412", 1000, 1000);

})

function getPositionListTest(expectedHTTPStatus, positionID, aisleID, row, col, maxWeight, maxVolume) {
    it('Getting all Positions', function (done) {
        let pos = { positionID: positionID, aisleID: aisleID, row: row, col: col, maxWeight: maxWeight, maxVolume: maxVolume }
        agent.post("/api/position")
        .send(pos)
        .then(function (res) {
            try {
                res.should.have.status(201);
                
                agent.get("/api/positions").then(function (r) {
                    try {
                        r.should.have.status(expectedHTTPStatus);

                        r.body[0].positionId.should.equal(positionID);
                        r.body[0].aisleID.should.equal(aisleID);
                        r.body[0].row.should.equal(row);
                        r.body[0].col.should.equal(col);
                        r.body[0].maxWeight.should.equal(maxWeight);
                        r.body[0].maxVolume.should.equal(maxVolume);
                        
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

function newPositionTest(expectedHTTPStatus, positionID, aisleID, row, col, maxWeight, maxVolume) {
    it('Creating a new Position', function (done) {
    
        let pos = { positionID: positionID, aisleID: aisleID, row: row, col: col, maxWeight: maxWeight, maxVolume: maxVolume }
        agent.post("/api/position")
        .send(pos)
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

function updatePositionTest(expectedHTTPStatus, positionID, aisleID, row, col, maxWeight, maxVolume) {
    it('Updating a Position', function (done) {

        let pos = { positionID: positionID, aisleID: aisleID, row: row, col: col, maxWeight: maxWeight, maxVolume: maxVolume }
        let newpos = { newAisleID: "8004", newRow: "3455", newCol: "3415", newMaxWeight: 1200, newMaxVolume: 600, newOccupiedWeight: 200, newOccupiedVolume:100 }

        agent.post("/api/position")
        .send(pos)
        .then(function (res) {
            try {
                res.should.have.status(201);
                
                agent.put("/api/position/"+positionID)
                .send(newpos)
                .then(function (res) {
                    try {
                        res.should.have.status(200);

                        agent.get("/api/positions").then(function (r) {
                            try {
                                r.should.have.status(expectedHTTPStatus);

                                r.body[0].positionId.should.equal(positionID);
                                r.body[0].aisleID.should.equal(newpos.newAisleID);
                                r.body[0].row.should.equal(newpos.newRow);
                                r.body[0].col.should.equal(newpos.newCol);
                                r.body[0].maxWeight.should.equal(newpos.newMaxWeight);
                                r.body[0].maxVolume.should.equal(newpos.newMaxVolume);
                                r.body[0].occupiedWeight.should.equal(newpos.newOccupiedWeight);
                                r.body[0].occupiedVolume.should.equal(newpos.newOccupiedVolume);
                                
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

function updatePositionIDTest(expectedHTTPStatus, positionID, aisleID, row, col, maxWeight, maxVolume) {
    it('Updating a positionID', function (done) {

        let pos = { positionID: positionID, aisleID: aisleID, row: row, col: col, maxWeight: maxWeight, maxVolume: maxVolume }
        let newpos = { newPositionID: "800234543420" }

        agent.post("/api/position")
        .send(pos)
        .then(function (res) {
            try {
                res.should.have.status(201);
                
                agent.put("/api/position/"+positionID+"/changeID")
                .send(newpos)
                .then(function (res) {
                    try {
                        res.should.have.status(200);

                        agent.get("/api/positions").then(function (r) {
                            try {
                                r.should.have.status(expectedHTTPStatus);

                                r.body[0].positionId.should.equal(newpos.newPositionID);
                                r.body[0].aisleID.should.equal(aisleID);
                                r.body[0].row.should.equal(row);
                                r.body[0].col.should.equal(col);
                                r.body[0].maxWeight.should.equal(maxWeight);
                                r.body[0].maxVolume.should.equal(maxVolume);
                                
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

function deletePositionTest(expectedHTTPStatus, positionID, aisleID, row, col, maxWeight, maxVolume) {
    it('Deleting a Position', function (done) {

        let pos = { positionID: positionID, aisleID: aisleID, row: row, col: col, maxWeight: maxWeight, maxVolume: maxVolume }
        agent.post("/api/position")
        .send(pos)
        .then(function (res) {
            try {
                res.should.have.status(201);

                agent.delete("/api/position/"+positionID)
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