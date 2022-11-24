const DatabaseHandler = require("../dbms");
const DataInterface = require("../controller/data-interface");
const { deleteDb } = require("./test-utils")


describe("testControllerTestResult", () => {
    beforeEach(async () => {
        deleteDb()
    });

    testGetTestResults();
    testGetTestResultById();
    createTestResult("123456789012345678901234567890123456", 12, "2021/11/28", 1);
    updateTestResult(12, "2021/11/28", 1);
    deleteTestResult();
});

function testGetTestResults(){
    test("get test results by rfid", async () => {
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const testResult = {rfid : "123456789012345678901234567890123456", idTestDescriptor : 12, date :  "2021/11/28", result : 1};
        await datainterface.CreateTestResult(testResult.rfid, testResult.idTestDescriptor, testResult.date, testResult.result);

        var res = await datainterface.GetSKUItemTestResults(testResult.rfid);
        expect(res.length).toStrictEqual(1);
        const tr = res[0];
        expect(tr.skuitem).toStrictEqual(testResult.rfid);
        expect(tr.testDescriptor).toStrictEqual(testResult.idTestDescriptor);
        expect(tr.date).toStrictEqual(testResult.date);
        expect(tr.result).toStrictEqual(testResult.result);
    })
}


function testGetTestResultById(){
    test("get test results by rfid and id", async () => {
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const testResult = {rfid : "123456789012345678901234567890123456", idTestDescriptor : 12, date :  "2021/11/28", result : 1};
        await datainterface.CreateTestResult(testResult.rfid, testResult.idTestDescriptor, testResult.date, testResult.result);

        var res = await datainterface.GetSKUItemTestResult(testResult.rfid, 1)
        expect(res.length).toStrictEqual(1);
        const tr = res[0];
        expect(tr.skuitem).toStrictEqual(testResult.rfid);
        expect(tr.testDescriptor).toStrictEqual(testResult.idTestDescriptor);
        expect(tr.date).toStrictEqual(testResult.date);
        expect(tr.result).toStrictEqual(testResult.result);
    })
}

function createTestResult(rfid, idTestDescriptor, date, result){
    test("create test result", async () => {
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.CreateTestResult(rfid, idTestDescriptor, date, result);

        var res = await datainterface.GetSKUItemTestResult(rfid, 1)
        expect(res.length).toStrictEqual(1);
        const tr = res[0];
        expect(tr.skuitem).toStrictEqual(rfid);
        expect(tr.testDescriptor).toStrictEqual(idTestDescriptor);
        expect(tr.date).toStrictEqual(date);
        expect(tr.result).toStrictEqual(result);
        
    })
}

function updateTestResult(newTestDescriptor, newDate, newResult){
    test("update test result", async () => {
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const testResult = {rfid : "123456789012345678901234567890123456", idTestDescriptor : 12, date :  "2021/11/28", result : 1};
        await datainterface.CreateTestResult(testResult.rfid, testResult.idTestDescriptor, testResult.date, testResult.result);

        await datainterface.UpdateTestResult(testResult.rfid, 1, newTestDescriptor, newDate, newResult);

        var res = await datainterface.GetSKUItemTestResult(testResult.rfid, 1)
        expect(res.length).toStrictEqual(1);
        const tr = res[0];
        expect(tr.skuitem).toStrictEqual(testResult.rfid);
        expect(tr.testDescriptor).toStrictEqual(newTestDescriptor);
        expect(tr.date).toStrictEqual(newDate);
        expect(tr.result).toStrictEqual(newResult);

    })
}

function deleteTestResult(){
    test("delete test result", async () => {
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const testResult = {rfid : "123456789012345678901234567890123456", idTestDescriptor : 12, date :  "2021/11/28", result : 1};
        await datainterface.CreateTestResult(testResult.rfid, testResult.idTestDescriptor, testResult.date, testResult.result);

        await datainterface.DeleteTestResult(testResult.rfid, 1);
        var res = await datainterface.GetSKUItemTestResults(testResult.rfid);
        expect(res.length).toStrictEqual(0);
    })
}


