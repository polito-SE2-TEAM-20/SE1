const DatabaseHandler = require("../dbms");
const DataInterface = require("../controller/data-interface");
const { deleteDb } = require("./test-utils")

describe('testControllerPosition', () => {

    beforeEach(() => {
        deleteDb();
    });

    testGetPositions();
    testCreatePosition("800234543413", "8002", "3454", "3412", 1000, 1000);
    testUpdatePosition("800234543412", "8002", "3454", "3412", 1000, 1000, 600, 600);
    testUpdatePositionId("800234543412", "800234543418");
    testDeletePosition("800234543418");

});

function testGetPositions() {
    test('get positions', async () => {

        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const pos = { positionID:"800234543412", aisleID: "8002", row: "3454", col: "3412", maxWeight: 1000, maxVolume: 1000 }
        await datainterface.createPosition(pos.positionID, pos.aisleID, pos.row, pos.col, pos.maxWeight, pos.maxVolume)

        var res = await datainterface.getAllPositions();

        expect(res.length).toStrictEqual(1);

        const p = res[0];
        expect(p.positionId).toStrictEqual(pos.positionID);
        expect(p.aisleID).toStrictEqual(pos.aisleID);
        expect(p.row).toStrictEqual(pos.row);
        expect(p.col).toStrictEqual(pos.col);
        expect(p.maxWeight).toStrictEqual(pos.maxWeight);
        expect(p.maxVolume).toStrictEqual(pos.maxVolume);

    })
}

function testCreatePosition(positionId, aisleID, row, col, maxWeight, maxVolume) {
    test('create position', async () => {

        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.createPosition(positionId, aisleID, row, col, maxWeight, maxVolume)

        var res = await datainterface.getAllPositions();

        expect(res.length).toStrictEqual(1);

        const p = res[0];
        expect(p.positionId).toStrictEqual(positionId);
        expect(p.aisleID).toStrictEqual(aisleID);
        expect(p.row).toStrictEqual(row);
        expect(p.col).toStrictEqual(col);
        expect(p.maxWeight).toStrictEqual(maxWeight);
        expect(p.maxVolume).toStrictEqual(maxVolume);

    })
}

function testUpdatePosition(positionId, aisleID, row, col, maxWeight, maxVolume,occupiedWeight,occupiedVolume) {
    test('update position', async () => {

        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.createPosition(positionId)
        await datainterface.updatePosition(positionId, aisleID, row, col, maxWeight, maxVolume, occupiedWeight, occupiedVolume)

        var res = await datainterface.getAllPositions();

        expect(res.length).toStrictEqual(1);

        const p = res[0];
        expect(p.positionId).toStrictEqual(positionId);
        expect(p.aisleID).toStrictEqual(aisleID);
        expect(p.row).toStrictEqual(row);
        expect(p.col).toStrictEqual(col);
        expect(p.maxWeight).toStrictEqual(maxWeight);
        expect(p.maxVolume).toStrictEqual(maxVolume);
        expect(p.occupiedWeight).toStrictEqual(occupiedWeight);
        expect(p.occupiedVolume).toStrictEqual(occupiedVolume);

    })
}

function testUpdatePositionId(positionId, newPositionId) {
    test('update position id', async () => {

        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.createPosition(positionId)
        await datainterface.updatePositionId(positionId, newPositionId)

        var res = await datainterface.getAllPositions();

        expect(res.length).toStrictEqual(1);

        const p = res[0];
        expect(p.positionId).toStrictEqual(newPositionId);

    })
}

function testDeletePosition(positionId) {
    test('delete position', async () => {

        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.createPosition(positionId)
        var res = await datainterface.getAllPositions();
        expect(res.length).toStrictEqual(1);

        await datainterface.deletePosition(positionId);
        var res = await datainterface.getAllPositions();
        expect(res.length).toStrictEqual(0);
        
    })
}