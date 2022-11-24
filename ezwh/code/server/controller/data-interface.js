const { _createPosition, _updatePosition, _updatePositionId, _getAllPositions, _deletePosition } = require("./position.js");
const {  _getAllSKUitems,  _getAvailableSKUitems,  _getSKUitemRFID,  _createSKUItem,  _updateSKUItem,  _deleteSKUItem } = require("./SKUitem.js");
const {  _getReturnOrders,  _getReturnOrder,  _createReturnOrder,  _deleteReturnOrder } = require("./return_order.js")
const {  _getAllTestDescriptors,  _getTestDescriptor,  _createTestDescriptor,  _updateTestDescriptor,  _deleteTestDescriptor} = require("./test_descriptor.js");
const {createInternalOrder, updateInternalOrder, deleteInternalOrder, getInternalOrders, getIssuedInternalOrders, getAcceptedInternalOrders, get_InternalOrder} = require("./InternalOrder_datainterface.js");
const {createUser, updateUserType, deleteUser, getSuppliers, getUsers, loginManager, loginCustomer, loginSupplier, loginClerk, loginQualityEmployee, loginDeliveryEmployee} = require("./User_Datainterface.js");
const {createSKU, updateSKU, deleteSKU, AddModifyposition, getAllSKU, getSKU} = require("./SKU_datainterface.js");
const {_getItems, _getItem, _createItem, _updateItem, _deleteItem} = require("./item.js");
const {_getSKUItemTestResults, _getSKUItemTestResult, _createTestResult, _updateTestResult, _deleteTestResult} = require("./TestResult.js");
const {_getRestockOrders, _getIssuedRestockOrders, _getRestockOrder, _getRestockOrderReturnItems, _createRestockOrder, _updateRestockOrderState, _restockOrderAddSKUItems, _restockOrderAddTransportNote, _deleteRestockOrder} = require("./RestockOrder.js");

class DataInterface {
  constructor(db) {
    this.db = db;
  }

  
  createPosition(positionId, aisleID, row, col, maxWeight, maxVolume) {
    return _createPosition(this.db, positionId, aisleID, row, col, maxWeight, maxVolume);
  }
  
  updatePosition(positionId, aisleID, row, col, maxWeight, maxVolume,occupiedWeight,occupiedVolume) {
    return _updatePosition(this.db, positionId, aisleID, row, col, maxWeight, maxVolume,occupiedWeight,occupiedVolume);
  }
  
  updatePositionId(positionId, newPositionId) {
    return _updatePositionId(this.db, positionId, newPositionId);
  }
  
  getAllPositions() {
    return _getAllPositions(this.db);
  }
  
  deletePosition(positionId) {
    return _deletePosition(this.db, positionId);
  }
  
  getAllSKUitems() {
    return _getAllSKUitems(this.db);
  }
  
  getAvailableSKUitems(skuid) {
    return _getAvailableSKUitems(this.db, skuid);
  }
  
  getSKUitemRFID(rfid) {
    return _getSKUitemRFID(this.db, rfid);
  }
  
  createSKUItem(rfid, SKUid, dateOfStock) {
    return _createSKUItem(this.db, rfid, SKUid, dateOfStock);
  }
  
  updateSKUItem(rfid, new_rfid, new_available, new_dateofstock) {
    return _updateSKUItem(this.db, rfid, new_rfid, new_available, new_dateofstock);
  }
  
  deleteSKUItem(rfid) {
    return _deleteSKUItem(this.db, rfid);
  }

  getReturnOrders() {
    return _getReturnOrders(this.db);
  }

  getReturnOrder(id) {
    return _getReturnOrder(this.db, id);
  }

  createReturnOrder(returnDate, products, restockOrderId) {
    return _createReturnOrder(this.db, returnDate, products, restockOrderId);
  }

  deleteReturnOrder(id) {
    return _deleteReturnOrder(this.db, id);
  }

  getAllTestDescriptors() {
    return _getAllTestDescriptors(this.db);
  }

  getTestDescriptor(ID) {
    return _getTestDescriptor(this.db, ID);
  }

  createTestDescriptor(name, procedureDescription, sku) {
    return _createTestDescriptor(this.db, name, procedureDescription, sku);
  }

  updateTestDescriptor(ID, name, procedureDescription, sku) {
    return _updateTestDescriptor(this.db, ID, name, procedureDescription, sku);
  }

  deleteTestDescriptor(ID) {
    return _deleteTestDescriptor(this.db, ID);
  }
  
  CreateInternalOrder(issueDate, products, customerId) {
    return createInternalOrder(this.db, issueDate, products, customerId);
  }

  UpdateInternalOrder(id, newState){
    return updateInternalOrder(this.db, id, newState);
  }



  DeleteInternalOrder(id){
    return deleteInternalOrder(this.db, id);
  }

  GetInternalOrders(){
    return getInternalOrders(this.db);
  }

  GetIssuedInternalOrders(){
    return getIssuedInternalOrders(this.db);
  }

  GetAcceptedInternalOrders(){
    return getAcceptedInternalOrders(this.db);
  }

  GetInternalOrder(id){
    return get_InternalOrder(this.db, id);
  }

  CreateUser(username, name, surname, password, type){
    return createUser(this.db, username, name, surname, password, type);
  }

  UpdateUserType(username, oldType, newType){
    return updateUserType(this.db, username, oldType, newType);
  }

  DeleteUser(username, type){
    return deleteUser(this.db, username, type);
  }

  /*GetUserInfo(username){
    return  getUserInfo(this.db, username);
  }*/

  GetSuppliers(){
    return getSuppliers(this.db);
  }

  GetUsers(){
    return getUsers(this.db);
  }

  LoginManager(username, password){
    return loginManager(this.db, username, password);
  }

  LoginCustomer(username, password){
    return loginCustomer(this.db, username, password);
  }

  LoginSupplier(username, password){
    return loginSupplier(this.db, username, password);
  }

  LoginClerk(username, password){
    return loginClerk(this.db, username, password);
  }

  LoginQualityEmployee(username, password){
    return loginQualityEmployee(this.db, username, password);
  }

  LoginDeliveryEmployee(username, password){
    return loginDeliveryEmployee(this.db, username, password);
  }

  CreateSKU(Description, weight, volume, notes, price, quantity){
    return createSKU(this.db, Description, weight, volume, notes, price, quantity);
  }

  UpdateSKU(id, Description, weight, volume, notes, price, quantity){
    return updateSKU(this.db, id, Description, weight, volume, notes, price, quantity);
  }

  DeleteSKU(id){
    return deleteSKU(this.db, id);
  }

  addModifyposition(sku_id, position_id){
    return AddModifyposition(this.db, sku_id, position_id);
  }

  GetAllSKU(){
    return getAllSKU(this.db);
  }

 GetSKU(id){
    return getSKU(this.db, id);
  }


  GetAllItems(){
    return _getItems(this.db);
  }

  GetItem(id){
    return _getItem(this.db, id);
  }

  CreateItem(id, description, price, SKUId, supplierId){
    return _createItem(this.db, id, description, price, SKUId, supplierId);
  }

  UpdateItem(id, newDescription, newPrice){
    return _updateItem(this.db, id, newDescription, newPrice)
  }

  DeleteItem(id){
    return _deleteItem(this.db, id);
  }

  GetSKUItemTestResults(rfid){
    return _getSKUItemTestResults(this.db, rfid);
  }

  GetSKUItemTestResult(rfid, idTestResult){
    return _getSKUItemTestResult(this.db, rfid, idTestResult);
  }

  CreateTestResult(rfid, idTestDescriptor, date, result){
    return _createTestResult(this.db, rfid, idTestDescriptor, date, result);
  }

  UpdateTestResult(rfid, idTestResult, newTestDescriptor, newDate, newResult){
    return _updateTestResult(this.db, rfid, idTestResult, newTestDescriptor, newDate, newResult);
  }
  
  DeleteTestResult(rfid, idTestResult){
    return _deleteTestResult(this.db, rfid, idTestResult);
  }

  GetRestockOrders(){
    return _getRestockOrders(this.db);
  }

  GetIssuedRestockOrders(){
    return _getIssuedRestockOrders(this.db);
  }

  GetRestockOrder(id){
    return _getRestockOrder(this.db, id);
  }

  GetRestockOrderReturnItems(id){
    return _getRestockOrderReturnItems(this.db, id);
  }

  CreateRestockOrder(issueDate, products, supplierId){
    return _createRestockOrder(this.db, issueDate, products, supplierId);
  }

  UpdateRestockOrderState(id, newState){
    return _updateRestockOrderState(this.db, id, newState);
  }

  RestockOrderAddSKUItems(orderId, skuitems){
    return _restockOrderAddSKUItems(this.db, orderId, skuitems);
  }

  RestockOrderAddTransportNote(orderId, deliveryDate){
    return _restockOrderAddTransportNote(this.db, orderId, deliveryDate);
  }

  DeleteRestockOrder(orderId){
    return _deleteRestockOrder(this.db, orderId);
  }
}



module.exports = DataInterface;
