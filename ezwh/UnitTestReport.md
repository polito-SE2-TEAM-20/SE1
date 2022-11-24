# Unit Testing Report

Date: 20/05/2022

Version: 1.0

# Contents

- [Black Box Unit Tests](#black-box-unit-tests)

- [White Box Unit Tests](#white-box-unit-tests)

# Black Box Unit Tests

    <Define here criteria, predicates and the combination of predicates for each function of each class.
    Define test cases to cover all equivalence classes and boundary conditions.
    In the table, report the description of the black box test case and (traceability) the correspondence with the Jest test case writing the
    class and method name that contains the test case>
    <Jest tests  must be in code/server/unit_test  >

### **Class DatabaseHandler - method loadInternalOrder**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case                  |
| -------------- | --------------- | ---------------------------- | ------------------------------- |
| Y              | Y               | DB correctly working         | loadInternalOrder initialized   |
| N              | N               | Not working DB               | loadInternalOrder uninitialized |

### **Class DatabaseHandler - method loadItem**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case         |
| -------------- | --------------- | ---------------------------- | ---------------------- |
| Y              | Y               | DB correctly working         | loadItem initialized   |
| N              | N               | Not working DB               | loadItem uninitialized |

### **Class DatabaseHandler - method loadPosition**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case             |
| -------------- | --------------- | ---------------------------- | -------------------------- |
| Y              | Y               | DB correctly working         | loadPosition initialized   |
| N              | N               | Not working DB               | loadPosition uninitialized |

### **Class DatabaseHandler - method loadRestockOrder**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case                 |
| -------------- | --------------- | ---------------------------- | ------------------------------ |
| Y              | Y               | DB correctly working         | loadRestockOrder initialized   |
| N              | N               | Not working DB               | loadRestockOrder uninitialized |

### **Class DatabaseHandler - method loadReturnOrder**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case                |
| -------------- | --------------- | ---------------------------- | ----------------------------- |
| Y              | Y               | DB correctly working         | loadReturnOrder initialized   |
| N              | N               | Not working DB               | loadReturnOrder uninitialized |

### **Class DatabaseHandler - method loadSKU**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case        |
| -------------- | --------------- | ---------------------------- | --------------------- |
| Y              | Y               | DB correctly working         | loadSKU initialized   |
| N              | N               | Not working DB               | loadSKU uninitialized |

### **Class DatabaseHandler - method loadSKUItem**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case            |
| -------------- | --------------- | ---------------------------- | ------------------------- |
| Y              | Y               | DB correctly working         | loadSKUItem initialized   |
| N              | N               | Not working DB               | loadSKUItem uninitialized |

### **Class DatabaseHandler - method loadTestDescriptor**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case                   |
| -------------- | --------------- | ---------------------------- | -------------------------------- |
| Y              | Y               | DB correctly working         | loadTestDescriptor initialized   |
| N              | N               | Not working DB               | loadTestDescriptor uninitialized |

### **Class DatabaseHandler - method loadTestResult**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case               |
| -------------- | --------------- | ---------------------------- | ---------------------------- |
| Y              | Y               | DB correctly working         | loadTestResult initialized   |
| N              | N               | Not working DB               | loadTestResult uninitialized |

### **Class DatabaseHandler - method loadUser**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case         |
| -------------- | --------------- | ---------------------------- | ---------------------- |
| Y              | Y               | DB correctly working         | loadUser initialized   |
| N              | N               | Not working DB               | loadUser uninitialized |

### **Class DatabaseHandler - method deleteInternalOrder**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case                    |
| -------------- | --------------- | ---------------------------- | --------------------------------- |
| Y              | Y               | DB correctly working         | deleteInternalOrder initialized   |
| N              | N               | Not working DB               | deleteInternalOrder uninitialized |

### **Class DatabaseHandler - method deleteItem**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case           |
| -------------- | --------------- | ---------------------------- | ------------------------ |
| Y              | Y               | DB correctly working         | deleteItem initialized   |
| N              | N               | Not working DB               | deleteItem uninitialized |

### **Class DatabaseHandler - method deletePosition**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case               |
| -------------- | --------------- | ---------------------------- | ---------------------------- |
| Y              | Y               | DB correctly working         | deletePosition initialized   |
| N              | N               | Not working DB               | deletePosition uninitialized |

### **Class DatabaseHandler - method deleteRestockOrder**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case                   |
| -------------- | --------------- | ---------------------------- | -------------------------------- |
| Y              | Y               | DB correctly working         | deleteRestockOrder initialized   |
| N              | N               | Not working DB               | deleteRestockOrder uninitialized |

### **Class DatabaseHandler - method deleteReturnOrder**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case                  |
| -------------- | --------------- | ---------------------------- | ------------------------------- |
| Y              | Y               | DB correctly working         | deleteReturnOrder initialized   |
| N              | N               | Not working DB               | deleteReturnOrder uninitialized |

### **Class DatabaseHandler - method deleteSKU**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case          |
| -------------- | --------------- | ---------------------------- | ----------------------- |
| Y              | Y               | DB correctly working         | deleteSKU initialized   |
| N              | N               | Not working DB               | deleteSKU uninitialized |

### **Class DatabaseHandler - method deleteSKUItem**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case              |
| -------------- | --------------- | ---------------------------- | --------------------------- |
| Y              | Y               | DB correctly working         | deleteSKUItem initialized   |
| N              | N               | Not working DB               | deleteSKUItem uninitialized |

### **Class DatabaseHandler - method deleteTestDescriptor**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case                     |
| -------------- | --------------- | ---------------------------- | ---------------------------------- |
| Y              | Y               | DB correctly working         | deleteTestDescriptor initialized   |
| N              | N               | Not working DB               | deleteTestDescriptor uninitialized |

### **Class DatabaseHandler - method deleteTestResult**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case                 |
| -------------- | --------------- | ---------------------------- | ------------------------------ |
| Y              | Y               | DB correctly working         | deleteTestResult initialized   |
| N              | N               | Not working DB               | deleteTestResult uninitialized |

### **Class DatabaseHandler - method deleteUser**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case           |
| -------------- | --------------- | ---------------------------- | ------------------------ |
| Y              | Y               | DB correctly working         | deleteUser initialized   |
| N              | N               | Not working DB               | deleteUser uninitialized |

### **Class DatabaseHandler - method storeInternalOrder**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case                   |
| -------------- | --------------- | ---------------------------- | -------------------------------- |
| Y              | Y               | DB correctly working         | storeInternalOrder initialized   |
| N              | N               | Not working DB               | storeInternalOrder uninitialized |

### **Class DatabaseHandler - method storeItem**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case          |
| -------------- | --------------- | ---------------------------- | ----------------------- |
| Y              | Y               | DB correctly working         | storeItem initialized   |
| N              | N               | Not working DB               | storeItem uninitialized |

### **Class DatabaseHandler - method storePosition**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case              |
| -------------- | --------------- | ---------------------------- | --------------------------- |
| Y              | Y               | DB correctly working         | storePosition initialized   |
| N              | N               | Not working DB               | storePosition uninitialized |

### **Class DatabaseHandler - method storeRestockOrder**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case                  |
| -------------- | --------------- | ---------------------------- | ------------------------------- |
| Y              | Y               | DB correctly working         | storeRestockOrder initialized   |
| N              | N               | Not working DB               | storeRestockOrder uninitialized |

### **Class DatabaseHandler - method storeReturnOrder**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case                 |
| -------------- | --------------- | ---------------------------- | ------------------------------ |
| Y              | Y               | DB correctly working         | storeReturnOrder initialized   |
| N              | N               | Not working DB               | storeReturnOrder uninitialized |

### **Class DatabaseHandler - method storeSKU**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case         |
| -------------- | --------------- | ---------------------------- | ---------------------- |
| Y              | Y               | DB correctly working         | storeSKU initialized   |
| N              | N               | Not working DB               | storeSKU uninitialized |

### **Class DatabaseHandler - method storeSKUItem**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case             |
| -------------- | --------------- | ---------------------------- | -------------------------- |
| Y              | Y               | DB correctly working         | storeSKUItem initialized   |
| N              | N               | Not working DB               | storeSKUItem uninitialized |

### **Class DatabaseHandler - method storeTestDescriptor**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case                    |
| -------------- | --------------- | ---------------------------- | --------------------------------- |
| Y              | Y               | DB correctly working         | storeTestDescriptor initialized   |
| N              | N               | Not working DB               | storeTestDescriptor uninitialized |

### **Class DatabaseHandler - method storeTestResult**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case                |
| -------------- | --------------- | ---------------------------- | ----------------------------- |
| Y              | Y               | DB correctly working         | storeTestResult initialized   |
| N              | N               | Not working DB               | storeTestResult uninitialized |

### **Class DatabaseHandler - method storeUser**

**Criteria**

- DB initialized

**Predicates**

| Criteria       | Predicate |
| -------------- | --------- |
| DB initialized | Yes       |
|                | No        |

**Combination of predicates**:

| DB initialized | Valid / Invalid | Description of the test case | Jest test case          |
| -------------- | --------------- | ---------------------------- | ----------------------- |
| Y              | Y               | DB correctly working         | storeUser initialized   |
| N              | N               | Not working DB               | storeUser uninitialized |

### **Class Position - method getAllPositions**

**Criteria**

- Position object initialized

**Predicates**

| Criteria                    | Predicate |
| --------------------------- | --------- |
| Position object initialized | Yes       |
|                             | No        |

**Combination of predicates**:

| Position object initialized | Valid / Invalid | Description of the test case | Jest test case|
| -------------- | --------------- | ---------------------------- | -------------------------- |
| Y              | Y               | Position returned correctly  | get positions              |
| N              | N               | Error                        | get positions              |

### **Class Position - method createPosition**

**Criteria**

- Position object initialized

**Predicates**

| Criteria                    | Predicate |
| --------------------------- | --------- |
| Position object initialized | Yes       |
|                             | No        |

**Combination of predicates**:

| Position object initialized | Valid / Invalid | Description of the test case | Jest test case|
| -------------- | --------------- | ---------------------------- | -------------------------- |
| Y              | Y               | Position created correctly   | create position            |
| N              | N               | Error                        | create position            |

### **Class Position - method updatePosition**

**Criteria**

- Position object initialized

**Predicates**

| Criteria                    | Predicate |
| --------------------------- | --------- |
| Position object initialized | Yes       |
|                             | No        |

**Combination of predicates**:

| Position object initialized | Valid / Invalid | Description of the test case | Jest test case|
| -------------- | --------------- | ---------------------------- | -------------------------- |
| Y              | Y               | Position updated correctly   | update position            |
| N              | N               | Error                        | update position            |

### **Class Position - method updatePositionId**

**Criteria**

- Position object initialized

**Predicates**

| Criteria                    | Predicate |
| --------------------------- | --------- |
| Position object initialized | Yes       |
|                             | No        |

**Combination of predicates**:

| Position object initialized | Valid / Invalid | Description of the test case | Jest test case|
| -------------- | --------------- | ---------------------------- | -------------------------- |
| Y              | Y               | PositionID updated correctly | update position id         |
| N              | N               | Error                        | update position id         |

### **Class Position - method deletePosition**

**Criteria**

- Position object initialized

**Predicates**

| Criteria                    | Predicate |
| --------------------------- | --------- |
| Position object initialized | Yes       |
|                             | No        |

**Combination of predicates**:

| Position object initialized | Valid / Invalid | Description of the test case | Jest test case|
| -------------- | --------------- | ---------------------------- | -------------------------- |
| Y              | Y               | PositionID deleted correctly | delete position            |
| N              | N               | Error                        | delete position            |

### **Class SKUItem - method testGetAllSKUitems**

**Criteria**

- SKUItem object initialized

**Predicates**

| Criteria                    | Predicate |
| --------------------------- | --------- |
| SKUItem object initialized  | Yes       |
|                             | No        |

**Combination of predicates**:

| SKUItem object initialized | Valid / Invalid | Description of the test case | Jest test case |
| -------------- | --------------- | ---------------------------- | -------------------------- |
| Y              | Y               | SKUItem returned correctly   | get SKUitems               |
| N              | N               | Error                        | get SKUitems               |

### **Class SKUItem - method getAvailableSKUitems**

**Criteria**

- SKUItem object initialized

**Predicates**

| Criteria                    | Predicate |
| --------------------------- | --------- |
| SKUItem object initialized  | Yes       |
|                             | No        |

**Combination of predicates**:

| SKUItem object initialized | Valid / Invalid | Description of the test case | Jest test case |
| -------------- | --------------- | ---------------------------- | -------------------------- |
| Y              | Y               | SKUItem returned correctly   | get available SKUitems     |
| N              | N               | Error                        | get available SKUitems     |

### **Class SKUItem - method getSKUitemRFID**

**Criteria**

- SKUItem object initialized

**Predicates**

| Criteria                    | Predicate |
| --------------------------- | --------- |
| SKUItem object initialized  | Yes       |
|                             | No        |

**Combination of predicates**:

| SKUItem object initialized | Valid / Invalid | Description of the test case | Jest test case |
| -------------- | --------------- | ---------------------------- | -------------------------- |
| Y              | Y               | SKUItem returned correctly   | get SKUitem by RFID        |
| N              | N               | Error                        | get SKUitem by RFID        |

### **Class SKUItem - method createSKUItem**

**Criteria**

- SKUItem object initialized

**Predicates**

| Criteria                    | Predicate |
| --------------------------- | --------- |
| SKUItem object initialized  | Yes       |
|                             | No        |

**Combination of predicates**:

| SKUItem object initialized | Valid / Invalid | Description of the test case | Jest test case |
| -------------- | --------------- | ---------------------------- | -------------------------- |
| Y              | Y               | SKUItem created correctly    | create SKUitem             |
| N              | N               | Error                        | create SKUitem             |

### **Class SKUItem - method updateSKUItem**

**Criteria**

- SKUItem object initialized

**Predicates**

| Criteria                    | Predicate |
| --------------------------- | --------- |
| SKUItem object initialized  | Yes       |
|                             | No        |

**Combination of predicates**:

| SKUItem object initialized | Valid / Invalid | Description of the test case | Jest test case |
| -------------- | --------------- | ---------------------------- | -------------------------- |
| Y              | Y               | SKUItem updated correctly    | update SKUitem             |
| N              | N               | Error                        | update SKUitem             |

### **Class SKUItem - method deleteSKUItem**

**Criteria**

- SKUItem object initialized

**Predicates**

| Criteria                    | Predicate |
| --------------------------- | --------- |
| SKUItem object initialized  | Yes       |
|                             | No        |

**Combination of predicates**:

| SKUItem object initialized | Valid / Invalid | Description of the test case | Jest test case |
| -------------- | --------------- | ---------------------------- | -------------------------- |
| Y              | Y               | SKUItem deleted correctly    | delete SKUitem             |
| N              | N               | Error                        | delete SKUitem             |

### **Class TestDescriptor - method getAllTestDescriptors**

**Criteria**

- TestDescriptor object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| TestDescriptor object initialized | Yes       |
|                                   | No        |

**Combination of predicates**:

| TestDescriptor object initialized | Valid / Invalid | Description of the test case | Jest test case  |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | TestDescriptor returned correctly | get all test descriptors      |
| N              | N               | Error                             | get all test descriptors      |

### **Class TestDescriptor - method getTestDescriptor**

**Criteria**

- TestDescriptor object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| TestDescriptor object initialized | Yes       |
|                                   | No        |

**Combination of predicates**:

| TestDescriptor object initialized | Valid / Invalid | Description of the test case | Jest test case  |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | TestDescriptor returned correctly | get test descriptor by id     |
| N              | N               | Error                             | get test descriptor by id     |

### **Class TestDescriptor - method createTestDescriptor**

**Criteria**

- TestDescriptor object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| TestDescriptor object initialized | Yes       |
|                                   | No        |

**Combination of predicates**:

| TestDescriptor object initialized | Valid / Invalid | Description of the test case | Jest test case  |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | TestDescriptor created correctly  | create test descriptor        |
| N              | N               | Error                             | create test descriptor        |

### **Class TestDescriptor - method updateTestDescriptor**

**Criteria**

- TestDescriptor object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| TestDescriptor object initialized | Yes       |
|                                   | No        |

**Combination of predicates**:

| TestDescriptor object initialized | Valid / Invalid | Description of the test case | Jest test case  |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | TestDescriptor updated correctly  | update test descriptor        |
| N              | N               | Error                             | update test descriptor        |

### **Class TestDescriptor - method deleteTestDescriptor**

**Criteria**

- TestDescriptor object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| TestDescriptor object initialized | Yes       |
|                                   | No        |

**Combination of predicates**:

| TestDescriptor object initialized | Valid / Invalid | Description of the test case | Jest test case  |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | TestDescriptor deleted correctly  | delete test descriptor        |
| N              | N               | Error                             | delete test descriptor        |

### **Class ReturnOrder - method getReturnOrders**

**Criteria**

- ReturnOrder object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| ReturnOrder object initialized    | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | ReturnOrder returned correctly    | get all return orders         |
| N              | N               | Error                             | get all return orders         |

### **Class ReturnOrder - method getReturnOrder**

**Criteria**

- ReturnOrder object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| ReturnOrder object initialized    | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | ReturnOrder returned correctly    | get return order              |
| N              | N               | Error                             | get return order              |

### **Class ReturnOrder - method createReturnOrder**

**Criteria**

- ReturnOrder object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| ReturnOrder object initialized    | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | ReturnOrder created  correctly    | create return order           |
| N              | N               | Error                             | create return order           |

### **Class ReturnOrder - method deleteReturnOrder**

**Criteria**

- ReturnOrder object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| ReturnOrder object initialized    | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | ReturnOrder deleted  correctly    | delete return order           |
| N              | N               | Error                             | delete return order           |

### **Class Item - method getAllItems**

**Criteria**

- Item object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| Item object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | Item returned  correctly          | get Items                     |
| N              | N               | Error                             | get Items                     |

### **Class Item - method getItemById**

**Criteria**

- Item object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| Item object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | Item returned  correctly          | get item by id                    |
| N              | N               | Error                             | get item by id                     |

### **Class Item - method createItem**

**Criteria**

- Item object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| Item object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | Item created correctly          | create item                |
| N              | N               | Error                             | create item                 |

### **Class Item - method updateItem**

**Criteria**

- Item object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| Item object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | Item updated correctly          | update item                |
| N              | N               | Error                             | update item                 |

### **Class Item - method deleteItem**

**Criteria**

- Item object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| Item object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | Item deleted correctly          | delete item                |
| N              | N               | Error                             | delete item                 |

### **Class TestResult - method getTestResults**

**Criteria**

- TestResult object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| TestResult object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | TestResult returned correctly       | get test results by rfid       |
| N              | N               | Error                             |get test results by rfid  |

### **Class TestResult - method getTestResultById**

**Criteria**

- TestResult object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| TestResult object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | TestResult returned correctly       | get test results by rfid and id      |
| N              | N               | Error                             |get test results by rfid and id |

### **Class TestResult - method createTestResult**

**Criteria**

- TestResult object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| TestResult object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | TestResult created correctly       | create test results     |
| N              | N               | Error                             |create test result |

### **Class TestResult - method updateTestResult**

**Criteria**

- TestResult object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| TestResult object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | TestResult updated correctly       | update test result    |
| N              | N               | Error                             |update test result  |

### **Class TestResult - method deleteTestResult**

**Criteria**

- TestResult object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| TestResult object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | TestResult deleted correctly       | delete test result    |
| N              | N               | Error                             |delete test result  |

### **Class RestockOrder - method getRestockOrders**

**Criteria**

- RestockOrder object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| RestockOrder object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | RestockOrder returned correctly       | get restock orders    |
| N              | N               | Error                             |get restock orders  |

### **Class RestockOrder - method getRestockOrdersIssued**

**Criteria**

- RestockOrder object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| RestockOrder object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | RestockOrder returned correctly       | get issued restock orders    |
| N              | N               | Error                             |get issued restock orders  |

### **Class RestockOrder - method getRestockOrderById**

**Criteria**

- RestockOrder object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| RestockOrder object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | RestockOrder returned correctly       | get restock orders by id  |
| N              | N               | Error                             |get restock orders by id |

### **Class RestockOrder - method getReturnItemsById**

**Criteria**

- RestockOrder object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| RestockOrder object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | Items returned correctly       | get items by id    |
| N              | N               | Error                             |get items by id  |

### **Class RestockOrder - method createRestockOrder**

**Criteria**

- RestockOrder object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| RestockOrder object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | RestockOrder created correctly       | create restock order   |
| N              | N               | Error                             |create restock order  |

### **Class RestockOrder - method updateRestockOrder**

**Criteria**

- RestockOrder object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| RestockOrder object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | RestockOrder updated correctly       | update restock order state  |
| N              | N               | Error                             |update restock order state  |

### **Class RestockOrder - method updateSKUItems**

**Criteria**

- RestockOrder object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| RestockOrder object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | SKUItems added correctly   | update restock order skuItems  |
| N              | N               | Error                             |update restock order skuItems |

### **Class RestockOrder - method updateTransportNote**

**Criteria**

- RestockOrder object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| RestockOrder object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | Transport node updated correctly  | update restock order transport note  |
| N              | N               | Error                             |update restock order transport note |

### **Class RestockOrder - method deleteRestockOrder**

**Criteria**

- RestockOrder object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| RestockOrder object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| ReturnOrder object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | RestockOrder deleted correctly    |delete restock order |
| N              | N               | Error                             |delete restock order|

### **Class User_Datainterface - method getSuppliers**

**Criteria**

- User_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| User_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| User_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | suppliers returned correctly   |get suppliers |
| N              | N               | Error                             |get suppliers|


### **Class User_Datainterface - method getUsers**
**Criteria**

- User_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| User_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| User_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | Users returned correctly   |get users |
| N              | N               | Error                             |get users|

### **Class User_Datainterface - method createUser**

**Criteria**

- User_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| User_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| User_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | User created correctly   |create user |
| N              | N               | Error                             |create user|

### **Class User_Datainterface - method updateUsertype**
**Criteria**

- User_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| User_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| User_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | User type updated correctly   |update user type |
| N              | N               | Error                             |update user type|

### **Class User_Datainterface - method deleteUser**
**Criteria**

- User_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| User_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| User_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | User deleted successfully   |delete user|
| N              | N               | Error                             |delete user|

### **Class User_Datainterface - method loginManager**

**Criteria**

- User_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| User_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| User_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | manager login session succesful   |login manager |
| N              | N               | Error                             |login manager|

### **Class User_Datainterface - method logincustomer**

**Criteria**

- User_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| User_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| User_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | customer login session succesful   |login customer |
| N              | N               | Error                             |login customer|

### **Class User_Datainterface - method loginsupplier**

**Criteria**

- User_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| User_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| User_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | supplier login session succesful   |login supplier |
| N              | N               | Error                             |login supplier|

### **Class User_Datainterface - method loginclerk**

**Criteria**

- User_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| User_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| User_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | clerk login session succesful   |login clerk |
| N              | N               | Error                             |login clerk|

### **Class User_Datainterface - method loginQualityemployee**

**Criteria**

- User_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| User_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| User_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | Quality Check Employee login session succesful   |login Quality check employee |
| N              | N               | Error                             |login Quality check employee|

### **Class User_Datainterface - method loginDeliveryemployee**
**Criteria**

- User_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| User_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| User_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | Delivery Employee login session succesful   |login Delivery employee |
| N              | N               | Error                             |login Quality Delivery employee|

### **Class SKU_Datainterface - method getALLSKU**

**Criteria**

- SKU_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| SKU_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| SKU_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | SKUs returned correctly  |get all SKUs |
| N              | N               | Error                             |get all SKUs|

### **Class SKU_Datainterface - method getSKU**

**Criteria**

- SKU_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| SKU_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| SKU_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | concerned SKU returned correctly  |get SKU |
| N              | N               | Error                             |get SKU|

### **Class SKU_Datainterface - method createSKU**

**Criteria**

- SKU_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| SKU_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| SKU_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | SKU created correctly  |create SKU |
| N              | N               | Error                             |create SKU|

### **Class SKU_Datainterface - method updateSKU**
**Criteria**

- SKU_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| SKU_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| SKU_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | SKU updated correctly  |update SKU |
| N              | N               | Error                             |update SKU|

### **Class SKU_Datainterface - method AddModifyposition**

**Criteria**

- SKU_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| SKU_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| SKU_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | position of SKU added or modified correctly  |add or modify position |
| N              | N               | Error                             |add or modify position|

### **Class SKU_Datainterface - method deleteSKU**

**Criteria**

- SKU_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| SKU_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| SKU_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | SKUs deleted correctly  |delete SKU  |
| N              | N               | Error                             |delete SKU|

### **Class InternalOrder_Datainterface - method getInternalOrders**

**Criteria**

- InternalOrder_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| InternalOrder_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| InternalOrder_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | Internal Orders returned correctly  |get Internal Orders |
| N              | N               | Error                             |get internal Orders|

### **Class InternalOrder_Datainterface - method getIssuedInternalOrders**

**Criteria**

- InternalOrder_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| InternalOrder_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| InternalOrder_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | Issued Internal Orders returned correctly  |get Issued Internal Orders |
| N              | N               | Error                             |get Issued internal Orders|

### **Class InternalOrder_Datainterface - method getAcceptedInternalOrders**

**Criteria**

- InternalOrder_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| InternalOrder_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| InternalOrder_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               |Accepted Internal Orders returned correctly  |get Accepted Internal Orders |
| N              | N               | Error                             |get Accepted internal Orders|

### **Class InternalOrder_Datainterface - method get_InternalOrder**

**Criteria**

- InternalOrder_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| InternalOrder_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| InternalOrder_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | Concerned Internal Order returned correctly  |get Internal Order |
| N              | N               | Error                             |get internal Order|

### **Class InternalOrder_Datainterface - method createInternalOrder**

**Criteria**

- InternalOrder_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| InternalOrder_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| InternalOrder_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | Internal Order created correctly  |create Internal Order |
| N              | N               | Error                             |create internal Order|

### **Class InternalOrder_Datainterface - method updateInternalOrder**

**Criteria**

- InternalOrder_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| InternalOrder_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:


| InternalOrder_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | Internal Order updated correctly  |update Internal Order |
| N              | N               | Error                             |update internal Order|

### **Class InternalOrder_Datainterface - method deleteInternalOrder**

**Criteria**

- InternalOrder_Datainterface object initialized

**Predicates**

| Criteria                          | Predicate |
| --------------------------------- | --------- |
| InternalOrder_Datainterface object initialized           | Yes       |
|                                   | No        |

**Combination of predicates**:

| InternalOrder_Datainterface object initialized | Valid / Invalid | Description of the test case | Jest test case     |
| -------------- | --------------- | --------------------------------- | ----------------------------- |
| Y              | Y               | Internal Order deleted correctly  |delete Internal Order|
| N              | N               | Error                             |delete internal Order|





# White Box Unit Tests

### Test cases definition

| Unit name | Jest test case |
| --------- | -------------- | --- |
|           |                |
|           |                |
|           |                |     |

### Code coverage report

![Imgur](https://i.imgur.com/CIMyjMm.png)

### Loop coverage analysis

No significative loops found
