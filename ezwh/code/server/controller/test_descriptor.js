'use strict'

const TestDescriptor = require("../models/test-descriptor")

function _getAllTestDescriptors(db) {
    return db.loadTestDescriptor().then(tds => tds.map(td => (
        {
            id: td.getID(),
            name: td.getName(),
            procedureDescription: td.getProcedureDescription(),
            idSKU : td.getSku()
        }
    )));
}

function _getTestDescriptor(db, id) {
    return db.loadTestDescriptor().then(tds => tds.filter(td => td.ID === Number(id)).map(td => (
        {
            id: td.getID(),
            name: td.getName(),
            procedureDescription: td.getProcedureDescription(),
            idSKU : td.getSku()
        }
    )).shift());
}

function _createTestDescriptor(db, name, procedureDescription, sku) {
    return db.storeTestDescriptor(new TestDescriptor(null, name, procedureDescription, sku));
}

function _updateTestDescriptor(db, ID, name, procedureDescription, sku) {
    return db.storeTestDescriptor(new TestDescriptor(ID, name, procedureDescription, sku));
}

function _deleteTestDescriptor(db, ID) {
    return db.deleteTestDescriptor(new TestDescriptor(ID));
}

module.exports = {
    _getAllTestDescriptors,
    _getTestDescriptor,
    _createTestDescriptor,
    _updateTestDescriptor,
    _deleteTestDescriptor
}