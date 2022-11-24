const fs = require("fs");
const crypto = require("crypto");

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

function deleteDb() {
  try {
    fs.unlinkSync("db.sqlite3");
  } catch (err) {}
}

function randomString(length = 5) {
  return crypto.randomBytes(length).toString("hex");
}

function randomInt(max = 100) {
  return Math.floor(Math.random() * max);
}

function todayDate() {
  return new Date().toISOString().split("T")[0];
}

function generateInternalOrders(count = 10) {
  generated = [];
  for (let i = 0; i < 10; i++) {
    generated.push(
      new InternalOrder(null, todayDate(), "ISSUED", [], randomInt())
    );
  }
  return generated;
}

function generateItems(count = 10) {
  generated = [];
  for (let i = 0; i < 10; i++) {
    generated.push(
      new Item(null, randomString(), randomInt(), randomInt(), randomInt())
    );
  }
  return generated;
}

function generatePositions(count = 10) {
  generated = [];
  for (let i = 0; i < 10; i++) {
    generated.push(
      new Position(
        String(randomInt()),
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
  return generated;
}

function generateRestockOrders(count = 10) {
  generated = [];
  for (let i = 0; i < 10; i++) {
    generated.push(
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
  return generated;
}

function generateReturnOrders(count = 10) {
  generated = [];
  for (let i = 0; i < 10; i++) {
    generated.push(new ReturnOrder(null, todayDate(), [], randomInt()));
  }
  return generated;
}

function generateSKUs(count = 10) {
  generated = [];
  for (let i = 0; i < 10; i++) {
    generated.push(
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
  return generated;
}

function generateSKUItems(count = 10) {
  generated = [];
  for (let i = 0; i < 10; i++) {
    generated.push(new SKUItem(randomString(), randomInt(), 1, todayDate()));
  }
  return generated;
}

function generateTestDescriptors(count = 10) {
  generated = [];
  for (let i = 0; i < 10; i++) {
    generated.push(
      new TestDescriptor(null, randomString(), randomString(), randomInt())
    );
  }
  return generated;
}

function generateTestResults(count = 10) {
  generated = [];
  for (let i = 0; i < 10; i++) {
    generated.push(
      new TestResult(null, todayDate(), 0, randomInt(), randomString())
    );
  }
  return generated;
}

function generateUsers(count = 10) {
  generated = [];
  for (let i = 0; i < 10; i++) {
    generated.push(
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
  return generated;
}

function compareObjects(obj1, obj2) {
  for (key of Object.keys(obj1)) {
    if (Array.isArray(obj1[key])) expect(obj1[key]).toEqual(obj2[key]);
    else expect(obj1[key]).toStrictEqual(obj2[key]);
  }
}

module.exports = {
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
  compareObjects,
};
