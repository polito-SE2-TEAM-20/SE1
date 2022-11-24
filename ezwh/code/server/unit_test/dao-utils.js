const DatabaseHandler = require("../dbms");
const { compareObjects } = require("./test-utils");

function basicCRUDtest(
  testName,
  dbLoadFunction,
  dbStoreFunction,
  dbDeleteFunction,
  object1,
  object2,
  objectGetIdFunction,
  objectUpdateFunction,
  objectUpdateValue,
  initialCount = 0
) {
  test(testName, async () => {
    const db = new DatabaseHandler();
    await db.init();

    // Check initial state
    let res = await db[dbLoadFunction]();
    expect(res.length).toStrictEqual(initialCount);

    // Insert objects
    await db[dbStoreFunction](object1);
    await db[dbStoreFunction](object2);

    // Check automatic Id
    if (objectGetIdFunction) {
      expect(object1[objectGetIdFunction]()).toEqual(expect.anything());
      expect(object2[objectGetIdFunction]()).toEqual(expect.anything());
      expect(object2[objectGetIdFunction]()).not.toStrictEqual(
        object1[objectGetIdFunction]()
      );
    }

    // Check data persistency in DB
    res = await db[dbLoadFunction]();
    expect(res.length).toStrictEqual(initialCount + 2);
    let res1 = res.find(
      (r) => r[objectGetIdFunction]() === object1[objectGetIdFunction]()
    );
    let res2 = res.find(
      (r) => r[objectGetIdFunction]() === object2[objectGetIdFunction]()
    );

    for (key of Object.keys(object1)) {
      if (Array.isArray(object1[key])) expect(object1[key]).toEqual(res1[key]);
      else expect(object1[key]).toStrictEqual(res1[key]);
    }
    for (key of Object.keys(object2)) {
      if (Array.isArray(object2[key])) expect(object2[key]).toEqual(res2[key]);
      else expect(object2[key]).toStrictEqual(res2[key]);
    }

    // Check object update
    object1[objectUpdateFunction](objectUpdateValue);
    await db[dbStoreFunction](object1);
    res = await db[dbLoadFunction]();
    res1 = res.find(
      (r) => r[objectGetIdFunction]() === object1[objectGetIdFunction]()
    );
    res2 = res.find(
      (r) => r[objectGetIdFunction]() === object2[objectGetIdFunction]()
    );

    expect(res.length).toStrictEqual(initialCount + 2);
    for (key of Object.keys(object1)) {
      if (Array.isArray(object1[key])) expect(object1[key]).toEqual(res1[key]);
      else expect(object1[key]).toStrictEqual(res1[key]);
    }
    for (key of Object.keys(object2)) {
      if (Array.isArray(object2[key])) expect(object2[key]).toEqual(res2[key]);
      else expect(object2[key]).toStrictEqual(res2[key]);
    }

    // Test object delete
    await db[dbDeleteFunction](object1);
    res = await db[dbLoadFunction]();
    expect(res.length).toStrictEqual(initialCount + 1);
    res2 = res.find(
      (r) => r[objectGetIdFunction]() === object2[objectGetIdFunction]()
    );
    for (key of Object.keys(object2)) {
      if (Array.isArray(object2[key])) expect(object2[key]).toEqual(res2[key]);
      else expect(object2[key]).toStrictEqual(res2[key]);
    }
  });
}

function basicDeleteTest(
  testName,
  items,
  dbLoadFunction,
  dbStoreFunction,
  dbDeleteFunction
) {
  test(testName, async () => {
    const db = new DatabaseHandler();
    await db.init();

    for (let item of items) {
      await db[dbStoreFunction](item);
    }

    const initialCount = (await db[dbLoadFunction]()).length;
    db[dbDeleteFunction](items[0]);
    const newCount = (await db[dbLoadFunction]()).length;
    expect(initialCount - 1).toStrictEqual(newCount);
  });
}

function basicUninitializedDeleteTest(testName, deleteFunction, deleteItem) {
  test(testName, async () => {
    const db = new DatabaseHandler();
    await expect(db[deleteFunction](deleteItem)).rejects.toThrow();
  });
}

function basicStoreTest(
  testName,
  dbLoadFunction,
  dbStoreFunction,
  item,
  objectGetIdFunction
) {
  test(testName, async () => {
    const db = new DatabaseHandler();
    await db.init();

    const initialCount = (await db[dbLoadFunction]()).length;
    await db[dbStoreFunction](item);

    const res = await db[dbLoadFunction]();
    expect(res.length).toStrictEqual(initialCount + 1);

    const found = res.find(
      (r) => r[objectGetIdFunction]() === item[objectGetIdFunction]()
    );
    compareObjects(item, found);
  });
}

function basicUninitializedStoreTest(testName, storeFunction, object) {
  test(testName, async () => {
    const db = new DatabaseHandler();
    await expect(db[storeFunction](object)).rejects.toThrow();
  });
}

module.exports = {
  basicCRUDtest,
  basicDeleteTest,
  basicUninitializedDeleteTest,
  basicStoreTest,
  basicUninitializedStoreTest,
};
