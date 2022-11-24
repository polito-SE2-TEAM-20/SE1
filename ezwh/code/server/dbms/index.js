sqlite = require("sqlite3");

const {
  _loadPosition,
  _storePosition,
  _deletePosition,
} = require("./position");
const {
  _loadTestDescriptor,
  _storeTestDescriptor,
  _deleteTestDescriptor,
} = require("./test-descriptor");
const {
  _loadTestResult,
  _storeTestResult,
  _deleteTestResult,
} = require("./test-result");
const {
  _loadReturnOrder,
  _storeReturnOrder,
  _deleteReturnOrder,
} = require("./return-order");
const { _loadSKU, _storeSKU, _deleteSKU } = require("./sku");
const { _loadUser, _storeUser, _deleteUser } = require("./user");
const {
  _loadInternalOrder,
  _storeInternalOrder,
  _deleteInternalOrder,
} = require("./internal-order");
const { _loadSKUItem, _storeSKUItem, _deleteSKUItem } = require("./skuitem");
const {
  _loadRestockOrder,
  _storeRestockOrder,
  _deleteRestockOrder,
} = require("./restock-order");
const { _loadItem, _storeItem, _deleteItem } = require("./item");

class DatabaseHandler {
  constructor() {
    this.db = new sqlite.Database("db.sqlite3", (err) => {
      if (err) throw err;
    });
  }

  init() {
    return new Promise((resolve, reject) => {
      const initTableQueries = [
        "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, name VARCHAR, surname VARCHAR, username VARCHAR, password VARCHAR, type VARCHAR)",
        "CREATE TABLE IF NOT EXISTS internalorder (id INTEGER PRIMARY KEY, issuedate DATE, state VARCHAR, customer INTEGER)",
        "CREATE TABLE IF NOT EXISTS position (id VARCHAR PRIMARY KEY, aisle VARCHAR, row VARCHAR, col VARCHAR, maxweight INTEGER, maxvolume INTEGER, occupiedweight INTEGER, occupiedvolume INTEGER)",
        "CREATE TABLE IF NOT EXISTS testdescriptor (id INTEGER PRIMARY KEY, name VARCHAR, description VARCHAR, sku INTEGER)",
        "CREATE TABLE IF NOT EXISTS returnorder (id INTEGER PRIMARY KEY, returndate DATE, restockorder INTEGER)",
        "CREATE TABLE IF NOT EXISTS sku (id INTEGER PRIMARY KEY, description VARCHAR, weight INTEGER, volume INTEGER, price INTEGER, notes VARCHAR, position VARCHAR, availablequantity INTEGER)",
        "CREATE TABLE IF NOT EXISTS restockorder (id INTEGER PRIMARY KEY, issuedate DATE, state VARCHAR, supplier INTEGER, transportnoteDeliverydate DATE)",
        "CREATE TABLE IF NOT EXISTS skuitem (rfid VARCHAR PRIMARY KEY, available BOOL, sku INTEGER, dateofstock DATE, restockorder INTEGER, internalorder INTEGER, returnorder INTEGER)",
        "CREATE TABLE IF NOT EXISTS testresult (id INTEGER PRIMARY KEY, date DATE, result BOOL, testdescriptor INTEGER, skuitem VARCHAR)",
        "CREATE TABLE IF NOT EXISTS item (id INTEGER PRIMARY KEY, description VARCHAR, price FLOAT, sku INTEGER, supplier INTEGER)",
        "CREATE TABLE IF NOT EXISTS product (internalorder INTEGER, sku INTEGER, quantity INTEGER)", // Relationship between internalorder and sku
        "CREATE TABLE IF NOT EXISTS restockorderproduct (restockorder INTEGER, sku INTEGER, description VARCHAR, price FLOAT, qty INTEGER)", // Relationship between restockorder and sku
        "INSERT INTO user (name, surname, username, password, type) VALUES ('name', 'surname', 'user1@ezwh.com', 'testpassword', 'Internal Customer'), ('name', 'surname', 'qualityEmployee1@ezwh.com', 'testpassword', 'Quality Check Employee'), ('name', 'surname', 'clerk1@ezwh.com', 'testpassword', 'Clerk'), ('name', 'surname', 'deliveryEmployee1@ezwh.com', 'testpassword', 'Delivery Employee'), ('name', 'surname', 'supplier1@ezwh.com', 'testpassword', 'supplier'), ('name', 'surname', 'manager1@ezwh.com', 'testpassword', 'manager')",
      ];

      this.db.exec(initTableQueries.join("; "), (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }

  loadPosition() {
    return _loadPosition(this.db);
  }

  storePosition(p) {
    return _storePosition(this.db, p);
  }

  deletePosition(p) {
    return _deletePosition(this.db, p);
  }

  loadTestDescriptor() {
    return _loadTestDescriptor(this.db);
  }

  storeTestDescriptor(d) {
    return _storeTestDescriptor(this.db, d);
  }

  deleteTestDescriptor(d) {
    return _deleteTestDescriptor(this.db, d);
  }

  loadTestResult() {
    return _loadTestResult(this.db);
  }

  storeTestResult(d) {
    return _storeTestResult(this.db, d);
  }

  deleteTestResult(d) {
    return _deleteTestResult(this.db, d);
  }

  loadReturnOrder() {
    return _loadReturnOrder(this.db);
  }

  storeReturnOrder(o) {
    return _storeReturnOrder(this.db, o);
  }

  deleteReturnOrder(o) {
    return _deleteReturnOrder(this.db, o);
  }

  loadSKU() {
    return _loadSKU(this.db);
  }

  storeSKU(sku) {
    return _storeSKU(this.db, sku);
  }

  deleteSKU(sku) {
    return _deleteSKU(this.db, sku);
  }

  loadUser() {
    return _loadUser(this.db);
  }

  storeUser(u) {
    return _storeUser(this.db, u);
  }

  deleteUser(u) {
    return _deleteUser(this.db, u);
  }

  loadInternalOrder() {
    return _loadInternalOrder(this.db);
  }

  storeInternalOrder(o) {
    return _storeInternalOrder(this.db, o);
  }

  deleteInternalOrder(o) {
    return _deleteInternalOrder(this.db, o);
  }

  loadSKUItem() {
    return _loadSKUItem(this.db);
  }

  storeSKUItem(i) {
    return _storeSKUItem(this.db, i);
  }

  deleteSKUItem(i) {
    return _deleteSKUItem(this.db, i);
  }

  loadRestockOrder() {
    return _loadRestockOrder(this.db);
  }

  storeRestockOrder(o) {
    return _storeRestockOrder(this.db, o);
  }

  deleteRestockOrder(o) {
    return _deleteRestockOrder(this.db, o);
  }

  loadItem() {
    return _loadItem(this.db);
  }

  storeItem(i) {
    return _storeItem(this.db, i);
  }

  deleteItem(i) {
    return _deleteItem(this.db, i);
  }

  
}

module.exports = DatabaseHandler;
