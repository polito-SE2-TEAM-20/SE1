"use strict";

const TestResult = require("../models/test-result");


async function _getSKUItemTestResults(db, rfid){
        return db.loadTestResult().then(tests => tests.filter(test => test.getSKUItem() === rfid).map(
            test => ({
                "ID": test.getID(),
                "date": test.getDate(),
                "result": test.getResult(),
                "testDescriptor": test.getTestDescriptor(),
                "skuitem": test.getSKUItem()
            }
        )));
}

async function _getSKUItemTestResult(db, rfid, idTestResult){
    return db.loadTestResult().then(tests => tests.filter(test => test.getSKUItem() == rfid &&
            test.getID() == idTestResult).map(test => ({
            "ID": test.getID(),
            "date": test.getDate(),
            "result": test.getResult(),
            "testDescriptor": test.getTestDescriptor(),
            "skuitem": test.getSKUItem()
        }
    )));
}

async function _createTestResult(db, rfid, idTestDescriptor, date, result){
    return db.storeTestResult(new TestResult(null, date, result, idTestDescriptor, rfid));
}

async function _updateTestResult(db, rfid, idTestResult, newTestDescriptor, newDate, newResult){
    const mytest = await db.loadTestResult().then(tests => tests.find(test => test.getSKUItem() == rfid && test.getID() == idTestResult));
    mytest.setTestDescriptorID(newTestDescriptor);
    mytest.setDate(newDate);
    return db.storeTestResult(mytest);
}

async function _deleteTestResult(db, rfid, idTestResult){
    const delTest = await db.loadTestResult().then(tests => tests.find(test => test.getSKUItem() == rfid && test.getID() == idTestResult));
    return db.deleteTestResult(delTest);
}

module.exports = {
    _getSKUItemTestResults,
    _getSKUItemTestResult,
    _createTestResult,
    _updateTestResult,
    _deleteTestResult
}