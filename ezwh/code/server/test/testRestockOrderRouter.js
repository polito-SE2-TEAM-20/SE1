const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

const { deleteDb } = require("../unit_test/test-utils");
const DatabaseHandler = require("../dbms");
const RestockOrder = require("../models/RestockOrder");

let agent;

describe("Test Descriptor api", () => {

    testGetRestockOrders(200, "2021/11/29 09:33", "ISSUED", "transport note",[], 1,[{"SKUId":12,"description":"a product","price":10.99,"qty":30},{"SKUId":180,"description":"another product","price":11.99,"qty":20}]);
})

function testGetRestockOrders(expectedHTTPStatus, id, issue, state, transportNoteDate, SKUItems, supplierId, products){
    it('Getting all restock orders', function (done) {
        
        let ro = {id : id, issue : issue, state : state, transportNoteDate : transportNoteDate, SKUItems : SKUItems , supplierId: supplierId, products : products};
        agent.post("/api/restockOrder")
        .send(ro)
            .then(function (res) {
                try {
                    res.should.have.status(200);
                
                    agent.get("/api/restockOrders").then(function (r) {
                        try {
                            r.should.have.status(expectedHTTPStatus);
    
                            r.body[0].id.should.equal(id);
                            r.body[0].issue.should.equal(issue);
                            r.body[0].state.should.equal(state);
                            r.body[0].transportNoteDate.should.equal(transportNoteDate);
                            r.body[0].SKUItems.should.equal(SKUItems);
                            r.body[0].supplierId.should.equal(supplierId);
                            r.body[0].products.should.equal(products);
                            
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