const {
  deleteDb,
  randomString,
  randomInt,
  todayDate,
  generateInternalOrders,
  generateItems,
  generatePositions,
  generateRestockOrders,
  generateReturnOrders,
  generateSKUs,
  generateSKUItems,
  generateTestDescriptors,
  generateTestResults,
  generateUsers,
} = require("./test-utils");
const {
  basicDeleteTest,
  basicUninitializedDeleteTest,
  basicStoreTest,
  basicUninitializedStoreTest,
} = require("./dao-utils");
const DatabaseHandler = require("../dbms");
const { User } = require("../models/UserAndSubclasses");
const Position = require("../models/position");
const SKU = require("../models/sku");
const Item = require("../models/Item");
const SKUItem = require("../models/SKUitem");
const TestDescriptor = require("../models/test-descriptor");
const TestResult = require("../models/test-result");
const InternalOrder = require("../models/InternalOrder");
const RestockOrder = require("../models/RestockOrder");
const ReturnOrder = require("../models/ReturnOrder");

describe("DatabaseHandler", () => {
  beforeEach(() => {
    deleteDb();
  });

  loadInternalOrderInitialized();
  loadInternalOrderUninitialized();
  loadItemInitialized();
  loadItemUninitialized();
  loadPositionInitialized();
  loadPositionUninitialized();
  loadRestockOrderInitialized();
  loadRestockOrderUninitialized();
  loadReturnOrderInitialized();
  loadReturnOrderUninitialized();
  loadSKUInitialized();
  loadSKUUninitialized();
  loadSKUItemInitialized();
  loadSKUItemUninitialized();
  loadTestDescriptorInitialized();
  loadTestDescriptorUninitialized();
  loadTestResultInitialized();
  loadTestResultUninitialized();
  loadUserInitialized();
  loadUserUninitialized();

  basicDeleteTest(
    "deleteInternalOrder initialized",
    generateInternalOrders(),
    "loadInternalOrder",
    "storeInternalOrder",
    "deleteInternalOrder"
  );
  basicUninitializedDeleteTest(
    "deleteInternalOrder uninitialized",
    "deleteInternalOrder",
    generateInternalOrders(1)[0]
  );

  basicDeleteTest(
    "deleteItem initialized",
    generateItems(),
    "loadItem",
    "storeItem",
    "deleteItem"
  );
  basicUninitializedDeleteTest(
    "deleteItem uninitialized",
    "deleteItem",
    generateItems(1)[0]
  );

  basicDeleteTest(
    "deletePosition initialized",
    generatePositions(),
    "loadPosition",
    "storePosition",
    "deletePosition"
  );
  basicUninitializedDeleteTest(
    "deletePosition uninitialized",
    "deletePosition",
    generatePositions(1)[0]
  );

  basicDeleteTest(
    "deleteRestockOrder initialized",
    generateRestockOrders(),
    "loadRestockOrder",
    "storeRestockOrder",
    "deleteRestockOrder"
  );
  basicUninitializedDeleteTest(
    "deleteRestockOrder uninitialized",
    "deleteRestockOrder",
    generateRestockOrders(1)[0]
  );

  basicDeleteTest(
    "deleteReturnOrder initialized",
    generateReturnOrders(),
    "loadReturnOrder",
    "storeReturnOrder",
    "deleteReturnOrder"
  );
  basicUninitializedDeleteTest(
    "deleteReturnOrder uninitialized",
    "deleteReturnOrder",
    generateReturnOrders(1)[0]
  );

  basicDeleteTest(
    "deleteSKU initialized",
    generateSKUs(),
    "loadSKU",
    "storeSKU",
    "deleteSKU"
  );
  basicUninitializedDeleteTest(
    "deleteSKU uninitialized",
    "deleteSKU",
    generateSKUs(1)[0]
  );

  basicDeleteTest(
    "deleteSKUItem initialized",
    generateSKUItems(),
    "loadSKUItem",
    "storeSKUItem",
    "deleteSKUItem"
  );
  basicUninitializedDeleteTest(
    "deleteSKUItem uninitialized",
    "deleteSKUItem",
    generateSKUItems(1)[0]
  );

  basicDeleteTest(
    "deleteTestDescriptor initialized",
    generateTestDescriptors(),
    "loadTestDescriptor",
    "storeTestDescriptor",
    "deleteTestDescriptor"
  );
  basicUninitializedDeleteTest(
    "deleteTestDescriptor uninitialized",
    "deleteTestDescriptor",
    generateTestDescriptors(1)[0]
  );

  basicDeleteTest(
    "deleteTestResult initialized",
    generateTestResults(),
    "loadTestResult",
    "storeTestResult",
    "deleteTestResult"
  );
  basicUninitializedDeleteTest(
    "deleteTestResult uninitialized",
    "deleteTestResult",
    generateTestResults(1)[0]
  );

  basicDeleteTest(
    "deleteUser initialized",
    generateUsers(),
    "loadUser",
    "storeUser",
    "deleteUser"
  );
  basicUninitializedDeleteTest(
    "deleteUser uninitialized",
    "deleteUser",
    generateUsers(1)[0]
  );

  basicStoreTest(
    "storeInternalOrder initialized",
    "loadInternalOrder",
    "storeInternalOrder",
    generateInternalOrders(1)[0],
    "getID"
  );

  basicStoreTest(
    "storeItem initialized",
    "loadItem",
    "storeItem",
    generateItems(1)[0],
    "getId"
  );

  basicStoreTest(
    "storePosition initialized",
    "loadPosition",
    "storePosition",
    generatePositions(1)[0],
    "get_positionId"
  );

  basicStoreTest(
    "storeRestockOrder initialized",
    "loadRestockOrder",
    "storeRestockOrder",
    generateRestockOrders(1)[0],
    "getId"
  );

  basicStoreTest(
    "storeReturnOrder initialized",
    "loadReturnOrder",
    "storeReturnOrder",
    generateReturnOrders(1)[0],
    "getId"
  );

  basicStoreTest(
    "storeSKU initialized",
    "loadSKU",
    "storeSKU",
    generateSKUs(1)[0],
    "get_SKU_ID"
  );

  basicStoreTest(
    "storeSKUItem initialized",
    "loadSKUItem",
    "storeSKUItem",
    generateSKUItems(1)[0],
    "getRFID"
  );

  basicStoreTest(
    "storeTestDescriptor initialized",
    "loadTestDescriptor",
    "storeTestDescriptor",
    generateTestDescriptors(1)[0],
    "getID"
  );

  basicStoreTest(
    "storeTestResult initialized",
    "loadTestResult",
    "storeTestResult",
    generateTestResults(1)[0],
    "getID"
  );

  basicStoreTest(
    "storeUser initialized",
    "loadUser",
    "storeUser",
    generateUsers(1)[0],
    "getID"
  );

  basicUninitializedStoreTest(
    "storeInternalOrder uninitialized",
    "storeInternalOrder",
    generateInternalOrders(1)[0]
  );

  basicUninitializedStoreTest(
    "storeItem uninitialized",
    "storeItem",
    generateItems(1)[0]
  );

  basicUninitializedStoreTest(
    "storePosition uninitialized",
    "storePosition",
    generatePositions(1)[0]
  );

  basicUninitializedStoreTest(
    "storeRestockOrder uninitialized",
    "storeRestockOrder",
    generateRestockOrders(1)[0]
  );

  basicUninitializedStoreTest(
    "storeReturnOrder uninitialized",
    "storeReturnOrder",
    generateReturnOrders(1)[0]
  );

  basicUninitializedStoreTest(
    "storeSKU uninitialized",
    "storeSKU",
    generateSKUs(1)[0]
  );

  basicUninitializedStoreTest(
    "storeSKUItem uninitialized",
    "storeSKUItem",
    generateSKUItems(1)[0]
  );

  basicUninitializedStoreTest(
    "storeTestDescriptor uninitialized",
    "storeTestDescriptor",
    generateTestDescriptors(1)[0]
  );

  basicUninitializedStoreTest(
    "storeTestResult uninitialized",
    "storeTestResult",
    generateTestResults(1)[0]
  );

  basicUninitializedStoreTest(
    "storeUser uninitialized",
    "storeUser",
    generateUsers(1)[0]
  );
});

function loadInternalOrderInitialized() {
  test("loadInternalOrder initialized", async () => {
    const db = new DatabaseHandler();
    await db.init();

    // Populate DB to test
    const insertedInternalOrder = [];
    for (let i = 0; i < 10; i++) {
      insertedInternalOrder.push(
        new InternalOrder(null, todayDate(), "ISSUED", [], randomInt())
      );
    }
    for (internalOrder of insertedInternalOrder) {
      await db.storeInternalOrder(internalOrder);
    }

    // Check data correctness
    const res = await db.loadInternalOrder();
    expect(res.length).toStrictEqual(10);
    for (internalOrder of insertedInternalOrder) {
      foundInternalOrder = res.find((r) => r.getID() === internalOrder.getID());
      expect(foundInternalOrder).toBeDefined();
      for (key of Object.keys(internalOrder)) {
        if (Array.isArray(internalOrder[key]))
          expect(internalOrder[key]).toEqual(foundInternalOrder[key]);
        else expect(internalOrder[key]).toStrictEqual(foundInternalOrder[key]);
      }
    }
  });
}

function loadInternalOrderUninitialized() {
  test("loadInternalOrder uninitialized", async () => {
    const db = new DatabaseHandler();
    await expect(db.loadInternalOrder()).rejects.toThrow();
  });
}

function loadItemInitialized() {
  test("loadItem initialized", async () => {
    const db = new DatabaseHandler();
    await db.init();

    // Populate DB to test
    const insertedItems = [];
    for (let i = 0; i < 10; i++) {
      insertedItems.push(
        new Item(null, randomString(), randomInt(), randomInt(), randomInt())
      );
    }
    for (item of insertedItems) {
      await db.storeItem(item);
    }

    // Check data correctness
    const res = await db.loadItem();
    expect(res.length).toStrictEqual(10);
    for (item of insertedItems) {
      foundItem = res.find((r) => r.getId() === item.getId());
      expect(foundItem).toBeDefined();
      for (key of Object.keys(item)) {
        if (Array.isArray(item[key])) expect(item[key]).toEqual(foundItem[key]);
        else expect(item[key]).toStrictEqual(foundItem[key]);
      }
    }
  });
}

function loadItemUninitialized() {
  test("loadItem uninitialized", async () => {
    const db = new DatabaseHandler();
    await expect(db.loadItem()).rejects.toThrow();
  });
}

function loadPositionInitialized() {
  test("loadPosition initialized", async () => {
    const db = new DatabaseHandler();
    await db.init();

    // Populate DB to test
    const insertedPositions = [];
    for (let i = 0; i < 10; i++) {
      insertedPositions.push(
        new Position(
          String(randomInt(100000000000)),
          String(randomInt()),
          String(randomInt()),
          String(randomInt()),
          randomInt(),
          randomInt(),
          randomInt(),
          randomInt()
        )
      );
    }
    for (pos of insertedPositions) {
      await db.storePosition(pos);
    }

    // Check data correctness
    const res = await db.loadPosition();
    expect(res.length).toStrictEqual(10);
    for (position of insertedPositions) {
      foundPos = res.find(
        (r) => r.get_positionId() === position.get_positionId()
      );
      expect(foundPos).toBeDefined();
      for (key of Object.keys(position)) {
        if (Array.isArray(position[key]))
          expect(position[key]).toEqual(foundPos[key]);
        else expect(position[key]).toStrictEqual(foundPos[key]);
      }
    }
  });
}

function loadPositionUninitialized() {
  test("loadPosition uninitialized", async () => {
    const db = new DatabaseHandler();
    await expect(db.loadPosition()).rejects.toThrow();
  });
}

function loadRestockOrderInitialized() {
  test("loadRestockOrder initialized", async () => {
    const db = new DatabaseHandler();
    await db.init();

    // Populate DB to test
    const insertedRestockOrders = [];
    for (let i = 0; i < 10; i++) {
      insertedRestockOrders.push(
        new RestockOrder(
          null,
          todayDate(),
          "ISSUED",
          todayDate(),
          [],
          randomInt(),
          []
        )
      );
    }
    for (restockOrder of insertedRestockOrders) {
      await db.storeRestockOrder(restockOrder);
    }

    // Check data correctness
    const res = await db.loadRestockOrder();
    expect(res.length).toStrictEqual(10);
    for (restockOrder of insertedRestockOrders) {
      foundRestockOrder = res.find((r) => r.getId() === restockOrder.getId());
      expect(foundRestockOrder).toBeDefined();
      for (key of Object.keys(restockOrder)) {
        if (Array.isArray(restockOrder[key]))
          expect(restockOrder[key]).toEqual(foundRestockOrder[key]);
        else expect(restockOrder[key]).toStrictEqual(foundRestockOrder[key]);
      }
    }
  });
}

function loadRestockOrderUninitialized() {
  test("loadRestockOrder uninitialized", async () => {
    const db = new DatabaseHandler();
    await expect(db.loadRestockOrder()).rejects.toThrow();
  });
}

function loadReturnOrderInitialized() {
  test("loadReturnOrder initialized", async () => {
    const db = new DatabaseHandler();
    await db.init();

    // Populate DB to test
    const insertedReturnOrders = [];
    for (let i = 0; i < 10; i++) {
      insertedReturnOrders.push(
        new ReturnOrder(null, todayDate(), [], randomInt())
      );
    }
    for (returnOrder of insertedReturnOrders) {
      await db.storeReturnOrder(returnOrder);
    }

    // Check data correctness
    const res = await db.loadReturnOrder();
    expect(res.length).toStrictEqual(10);
    for (returnOrder of insertedReturnOrders) {
      foundReturnOrder = res.find((r) => r.getId() === returnOrder.getId());
      expect(foundReturnOrder).toBeDefined();
      for (key of Object.keys(returnOrder)) {
        if (Array.isArray(returnOrder[key]))
          expect(returnOrder[key]).toEqual(foundReturnOrder[key]);
        else expect(returnOrder[key]).toStrictEqual(foundReturnOrder[key]);
      }
    }
  });
}

function loadReturnOrderUninitialized() {
  test("loadReturnOrder uninitialized", async () => {
    const db = new DatabaseHandler();
    await expect(db.loadReturnOrder()).rejects.toThrow();
  });
}

function loadSKUInitialized() {
  test("loadSKU initialized", async () => {
    const db = new DatabaseHandler();
    await db.init();

    // Populate DB to test
    const insertedSKUs = [];
    for (let i = 0; i < 10; i++) {
      insertedSKUs.push(
        new SKU(
          null,
          randomString(),
          randomInt(),
          randomInt(),
          randomString(),
          randomInt(),
          [], // SKUItems are read-only, so useless for the test
          String(randomInt()),
          [], // TestDescriptors are read-only, so useless for the test
          randomInt()
        )
      );
    }
    for (sku of insertedSKUs) {
      await db.storeSKU(sku);
    }

    // Check data correctness
    const res = await db.loadSKU();
    expect(res.length).toStrictEqual(10);
    for (sku of insertedSKUs) {
      foundSKU = res.find((r) => r.get_SKU_ID() === sku.get_SKU_ID());
      expect(foundSKU).toBeDefined();
      for (key of Object.keys(sku)) {
        if (Array.isArray(sku[key])) expect(sku[key]).toEqual(foundSKU[key]);
        else expect(sku[key]).toStrictEqual(foundSKU[key]);
      }
    }
  });
}

function loadSKUUninitialized() {
  test("loadSKU uninitialized", async () => {
    const db = new DatabaseHandler();
    await expect(db.loadSKU()).rejects.toThrow();
  });
}

function loadSKUItemInitialized() {
  test("loadSKUItem initialized", async () => {
    const db = new DatabaseHandler();
    await db.init();

    // Populate DB to test
    const insertedSKUItems = [];
    for (let i = 0; i < 10; i++) {
      insertedSKUItems.push(
        new SKUItem(randomString(), randomInt(), 1, todayDate())
      );
    }
    for (skuItem of insertedSKUItems) {
      await db.storeSKUItem(skuItem);
    }

    // Check data correctness
    const res = await db.loadSKUItem();
    expect(res.length).toStrictEqual(10);
    for (skuItem of insertedSKUItems) {
      foundSKUItem = res.find((r) => r.getRFID() === skuItem.getRFID());
      expect(foundSKUItem).toBeDefined();
      for (key of Object.keys(skuItem)) {
        if (Array.isArray(skuItem[key]))
          expect(skuItem[key]).toEqual(foundSKUItem[key]);
        else expect(skuItem[key]).toStrictEqual(foundSKUItem[key]);
      }
    }
  });
}

function loadSKUItemUninitialized() {
  test("loadSKUItem uninitialized", async () => {
    const db = new DatabaseHandler();
    await expect(db.loadSKUItem()).rejects.toThrow();
  });
}

function loadTestDescriptorInitialized() {
  test("loadTestDescriptor initialized", async () => {
    const db = new DatabaseHandler();
    await db.init();

    // Populate DB to test
    const insertedTestDescriptors = [];
    for (let i = 0; i < 10; i++) {
      insertedTestDescriptors.push(
        new TestDescriptor(null, randomString(), randomString(), randomInt())
      );
    }
    for (testDescriptor of insertedTestDescriptors) {
      await db.storeTestDescriptor(testDescriptor);
    }

    // Check data correctness
    const res = await db.loadTestDescriptor();
    expect(res.length).toStrictEqual(10);
    for (testDescriptor of insertedTestDescriptors) {
      foundTestDescriptor = res.find(
        (r) => r.getID() === testDescriptor.getID()
      );
      expect(foundTestDescriptor).toBeDefined();
      for (key of Object.keys(testDescriptor)) {
        if (Array.isArray(testDescriptor[key]))
          expect(testDescriptor[key]).toEqual(foundTestDescriptor[key]);
        else
          expect(testDescriptor[key]).toStrictEqual(foundTestDescriptor[key]);
      }
    }
  });
}

function loadTestDescriptorUninitialized() {
  test("loadTestDescriptor uninitialized", async () => {
    const db = new DatabaseHandler();
    await expect(db.loadTestDescriptor()).rejects.toThrow();
  });
}

function loadTestResultInitialized() {
  test("loadTestResult initialized", async () => {
    const db = new DatabaseHandler();
    await db.init();

    // Populate DB to test
    const insertedTestResults = [];
    for (let i = 0; i < 10; i++) {
      insertedTestResults.push(
        new TestResult(null, todayDate(), 0, randomInt(), randomString())
      );
    }
    for (testResult of insertedTestResults) {
      await db.storeTestResult(testResult);
    }

    // Check data correctness
    const res = await db.loadTestResult();
    expect(res.length).toStrictEqual(10);
    for (testResult of insertedTestResults) {
      foundTestResult = res.find((r) => r.getID() === testResult.getID());
      expect(foundTestResult).toBeDefined();
      for (key of Object.keys(testResult)) {
        if (Array.isArray(testResult[key]))
          expect(testResult[key]).toEqual(foundTestResult[key]);
        else expect(testResult[key]).toStrictEqual(foundTestResult[key]);
      }
    }
  });
}

function loadTestResultUninitialized() {
  test("loadTestResult uninitialized", async () => {
    const db = new DatabaseHandler();
    await expect(db.loadTestResult()).rejects.toThrow();
  });
}

function loadUserInitialized() {
  test("loadUser initialized", async () => {
    const db = new DatabaseHandler();
    await db.init();

    // Populate DB to test
    const insertedUsers = [];
    for (let i = 0; i < 10; i++) {
      insertedUsers.push(
        new User(
          null,
          randomString(),
          randomString(),
          randomString(),
          "clerk",
          randomString()
        )
      );
    }
    for (user of insertedUsers) {
      await db.storeUser(user);
    }

    // Check data correctness
    const res = await db.loadUser();
    expect(res.length).toStrictEqual(10 + 6); // 6 initial users
    for (user of insertedUsers) {
      foundUser = res.find((r) => r.getID() === user.getID());
      expect(foundUser).toBeDefined();
      for (key of Object.keys(user)) {
        if (Array.isArray(user[key])) expect(user[key]).toEqual(foundUser[key]);
        else expect(user[key]).toStrictEqual(foundUser[key]);
      }
    }
  });
}

function loadUserUninitialized() {
  test("loadUser uninitialized", async () => {
    const db = new DatabaseHandler();
    await expect(db.loadUser()).rejects.toThrow();
  });
}
