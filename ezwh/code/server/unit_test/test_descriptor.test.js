const DatabaseHandler = require("../dbms");
const DataInterface = require("../controller/data-interface");
const { deleteDb } = require("./test-utils")

describe('testControllerTestDescriptor', () => {

    beforeEach(async () => {
        deleteDb()
    });

    testGetAllTestDescriptors();
    testGetTestDescriptor();
    testCreateTestDescriptor("test descriptor 1", "This test is described by...", 1);
    testUpdateTestDescriptor(1, "test descriptor mod", "This test is described by...", 2); //id must be 1 for db autoincrement
    testDeleteTestDescriptor(1); //id must be 1 for db autoincrement

});

function testGetAllTestDescriptors() {
    test('get all test descriptors', async () => {

        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const td = { name:"test descriptor 1", procedureDescription: "This test is described by...", idSKU :1 }
        await datainterface.createTestDescriptor(td.name, td.procedureDescription, td.idSKU)

        var res = await datainterface.getAllTestDescriptors();

        console.log('get test descriptors: ');
        console.log(res);
        expect(res.length).toStrictEqual(1);

        const t = res[0];
        expect(t.id).toStrictEqual(1);
        expect(t.name).toStrictEqual(td.name);
        expect(t.procedureDescription).toStrictEqual(td.procedureDescription);
        expect(t.idSKU).toStrictEqual(td.idSKU);

    })
}

function testGetTestDescriptor() {
    test('get test descriptor by id', async () => {

        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const td = { name:"test descriptor 1", procedureDescription: "This test is described by...", idSKU :1 }
        await datainterface.createTestDescriptor(td.name, td.procedureDescription, td.idSKU)
        
        res = await datainterface.getTestDescriptor(1);

        const t = res;
        expect(t.id).toStrictEqual(1);
        expect(t.name).toStrictEqual(td.name);
        expect(t.procedureDescription).toStrictEqual(td.procedureDescription);
        expect(t.idSKU).toStrictEqual(td.idSKU);

    })
}

function testCreateTestDescriptor(name, procedureDescription, sku) {
    test('create test descriptor', async () => {

        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.createTestDescriptor(name, procedureDescription, sku)
        var res = await datainterface.getAllTestDescriptors();

        expect(res.length).toStrictEqual(1);

        const t = res[0];
        expect(t.id).toStrictEqual(1);
        expect(t.name).toStrictEqual(name);
        expect(t.procedureDescription).toStrictEqual(procedureDescription);
        expect(t.idSKU).toStrictEqual(sku);

    })
}

function testUpdateTestDescriptor(ID, name, procedureDescription, sku) {
    test('update test descriptor', async () => {

        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.createTestDescriptor()
        await datainterface.updateTestDescriptor(ID, name, procedureDescription, sku)

        var res = await datainterface.getAllTestDescriptors();
        expect(res.length).toStrictEqual(1);

        const t = res[0];
        expect(t.id).toStrictEqual(ID);
        expect(t.name).toStrictEqual(name);
        expect(t.procedureDescription).toStrictEqual(procedureDescription);
        expect(t.idSKU).toStrictEqual(sku);

    })
}

function testDeleteTestDescriptor(ID) {
    test('delete test descriptor', async () => {

        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.createTestDescriptor()
        var res = await datainterface.getAllTestDescriptors();
        expect(res.length).toStrictEqual(1);

        await datainterface.deleteTestDescriptor(ID)
        var res = await datainterface.getAllTestDescriptors();
        expect(res.length).toStrictEqual(0);

    })
}