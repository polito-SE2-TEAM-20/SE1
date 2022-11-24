const DatabaseHandler = require("../dbms");
const DataInterface = require("../controller/data-interface");
const { deleteDb } = require("./test-utils")

describe('testControllerSKUitem', () => {

    beforeEach(async () => {
        deleteDb()
    });

    testGetAllSKUitems();
    testGetAvailableSKUitems();
    testGetSKUitemByRFID();
    testCreateSKUitem("12345678901234567890123456789015", 1, "2021/11/29 12:30");
    testUpdateSKUitem("12345678901234567890123456789015", "12345678901234567890123456789015", 1, "2021/11/29 12:35");
    testDeleteSKUitem("12345678901234567890123456789015");

});

function testGetAllSKUitems() {
    test('get SKUitems', async () => {

        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const skui = { RFID:"12345678901234567890123456789015", SKUId:1, DateOfStock:"2021/11/29 12:30" }
        await datainterface.createSKUItem(skui.RFID, skui.SKUId, skui.DateOfStock);

        var res = await datainterface.getAllSKUitems();

        console.log('get SKUitems: ');
        console.log(res);
        expect(res.length).toStrictEqual(1);

        const s = res[0];
        expect(s.RFID).toStrictEqual(skui.RFID);
        expect(s.SKUId).toStrictEqual(skui.SKUId);
        expect(s.Available).toStrictEqual(0);
        expect(s.DateOfStock).toStrictEqual(skui.DateOfStock);

    })
}

function testGetAvailableSKUitems() {
    test('get available SKUitems', async () => {

        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const skui = { RFID:"12345678901234567890123456789015", SKUId:1, DateOfStock:"2021/11/29 12:30" }
        await datainterface.createSKUItem(skui.RFID, skui.SKUId, skui.DateOfStock);
        await datainterface.updateSKUItem(skui.RFID, skui.RFID, 1, skui.DateOfStock);

        var res = await datainterface.getAvailableSKUitems(skui.SKUId);
        expect(res.length).toStrictEqual(1);

        const s = res[0];
        expect(s.RFID).toStrictEqual(skui.RFID);
        expect(s.SKUId).toStrictEqual(skui.SKUId);
        expect(s.DateOfStock).toStrictEqual(skui.DateOfStock);

    })
}

function testGetSKUitemByRFID() {
    test('get SKUitem by RFID', async () => {

        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const skui = { RFID:"12345678901234567890123456789015", SKUId:1, DateOfStock:"2021/11/29 12:30" }
        await datainterface.createSKUItem(skui.RFID, skui.SKUId, skui.DateOfStock);

        var res = await datainterface.getSKUitemRFID(skui.RFID);

        const s = res;
        expect(s.RFID).toStrictEqual(skui.RFID);
        expect(s.SKUId).toStrictEqual(skui.SKUId);
        expect(s.Available).toStrictEqual(0);
        expect(s.DateOfStock).toStrictEqual(skui.DateOfStock);

    })
}

function testCreateSKUitem(rfid, SKUid, dateOfStock) {
    test('create SKUitem', async () => {

        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.createSKUItem(rfid, SKUid, dateOfStock);

        var res = await datainterface.getAllSKUitems();
        expect(res.length).toStrictEqual(1);

        const s = res[0];
        expect(s.RFID).toStrictEqual(rfid);
        expect(s.SKUId).toStrictEqual(SKUid);
        expect(s.DateOfStock).toStrictEqual(dateOfStock);

    })
}

function testUpdateSKUitem(rfid, new_rfid, new_available, new_dateofstock) {
    test('update SKUitem', async () => {

        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.createSKUItem(rfid, 1);
        await datainterface.updateSKUItem(rfid, new_rfid, new_available, new_dateofstock);

        var res = await datainterface.getAllSKUitems();
        expect(res.length).toStrictEqual(1);

        const s = res[0];
        expect(s.RFID).toStrictEqual(new_rfid);
        expect(s.SKUId).toStrictEqual(1);
        expect(s.Available).toStrictEqual(new_available);
        expect(s.DateOfStock).toStrictEqual(new_dateofstock);

    })
}

function testDeleteSKUitem(rfid) {
    test('delete SKUitem', async () => {

        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.createSKUItem(rfid);
        var res = await datainterface.getAllSKUitems();
        expect(res.length).toStrictEqual(1);

        await datainterface.deleteSKUItem(rfid);
        var res = await datainterface.getAllSKUitems();
        expect(res.length).toStrictEqual(0);
    })
}