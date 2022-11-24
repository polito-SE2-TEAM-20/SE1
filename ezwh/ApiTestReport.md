# Integration and API Test Report

Date: 25/05/2022

Version: 1.0

# Contents

- [Dependency graph](#dependency graph)

- [Integration approach](#integration)

- [Tests](#tests)

- [Scenarios](#scenarios)

- [Coverage of scenarios and FR](#scenario-coverage)
- [Coverage of non-functional requirements](#nfr-coverage)

# Dependency graph

## High level dependency graph

![Imgur](https://i.imgur.com/IjoEI6q.jpeg)

## Detailed dependency graph

This diagram shows the dependencies relative to the Position API, for the other ones is the same

![Imgur](https://i.imgur.com/cqSFABX.jpeg)

# Integration approach

Due to the layered architecture of the application, the choosen test approach is bottom up.

First step: unit test of the models which has been skipped because the models are used only to contain data and their functions are only getters and setters.

Second step: unit testing of the DatabaseHandler, the class that directly interacts with the database. This class uses the models but we didn't mock them because they are supposed correct and used only to pass data. Here we tested only the state of the database (initialized or not) and checked the correctness of the inserted and retrieved data. The input validation is done in the upper levels so it is tested in the integration testing.

Third step: integration testing of the controller package which contains the DataInterface class, which is used by the API and uses the DataInterface. It contains the business logic so the correctness of the returned data is tested. The db functions aren't mocked because they are tested before and supposed correct.

Fourth step: API testing. Here we do API requests with various kind of input to test all the possible responses in scenarios where the user gives correct informations or not.

# Integration Tests

Due to the approach that we chose, we did not use mock functions and the details about the tests are in the UnitTestReport

# API testing - Scenarios

# Coverage of Scenarios and FR

| Scenario ID | Functional Requirements covered | Mocha Test(s)              |
| ----------- | ------------------------------- | -------------------------- |
| 2-1         | FR3.1.1                         | Creating a new Position    |
| 2-3 2-4     | FR3.1.4                         | Updating a Position        |
| 2-2         | FR3.1.1                         | Updating a positionID      |
| ...         | FR3.1.3                         | Getting all Positions      |
| 2-5         | FR3.1.2                         | Deleting a Position        |
| ...         | FR5.8.1                         | Creating a new SKUitem     |
| ...         | FR6.9                           | Getting SKUitem by rfid    |
| ...         | FR6.10                          | Deleting a SKUitem         |
| 12-1        |                                 | Creating a Test Descriptor |
| 12-2        |                                 | Updating a Test Descriptor |
| 12-3        |                                 | Deleting a Test Descriptor |
| 6-2         | FR5.9                           | Creating a Return Order    |
| ...         |                                 |                            |
| ...         |                                 |                            |
| ...         |                                 |                            |
| ...         |                                 |                            |
| 1           | FR2.3                           | getAllSKUTest              |
| 1           | FR2.4                           | getSingleSKUTest           |
| 1-1         | FR2.1                           | insertSKUTest              |
| 1-3         | FR2.1                           | updateSKUTest              |
| 1-2         | FR2.1                           | setSKUPositionTest         |
| 1           | FR2.2                           | deleteSKUTest              |
|3-2|FR5.1|create restock order|
|...|FR 5.5|create restock order|
|...|FR5.6|create restock order|
|5-1|FR5.7|update restock order|
|5-1-1|FR5.7|update restock order|
|...|FR5.8|update restock order|
|5-2|FR5.8.2|get return items by id|
|5-2-1|FR5.8.2|get test result by id and rfid|
|5-2-2|FR5.8.2|get test result by id and rfid|
|5-2-3|FR5.8.2|create test result by rfid|
|11-1|FR7|create item|
|11-2|FR7|update item|
|4-1|1.1|create user|
|4-2|1.5|update user|
|4-3|1.2|delete user|
|...|1.3|List all users except manager|
|...|1.4|Login by type|
|9|6.1|Create internal Order|
|9|6.2|Create internal Order|
|9|6.3|Create Internal Order|
|9|6.4|Create Internal Order|
|9|6.5|Create Internal Order|
|9-1|6.7| Update Internal Order|
|9-2|6-6| Update Internal Order|
|9-3|6.6|Update Internal Order|

# Coverage of Non Functional Requirements

| Non Functional Requirement | Test name                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| NFR1, NFR4, NFR7, NFR8     | Creating a new Position,Updating a Position,Updating a positionID                            |
| NFR1, NFR3, NFR6, NFR9     | Creating a new SKUitem, Getting SKUitem by rfid, Updating a SKUitem                          |
| NFR1, NFR2, NFR3           | Getting all Test Descriptors                                                                 |
| NFR1, NFR2, NFR3           | Creating a Test Descriptor                                                                   |
| NFR1, NFR2, NFR3           | Updating a Test Descriptor                                                                   |
| NFR1, NFR2, NFR3           | Deleting a Test Descriptor                                                                   |
| NFR1, NFR2, NFR3           | Getting Test Descriptor by id                                                                |
| NFR1, NFR2, NFR3, NFR9     | Getting all Return Orders                                                                    |
| NFR1, NFR2, NFR3, NFR9     | Getting Return Order by id                                                                   |
| NFR1, NFR2, NFR3, NFR9     | Creating a Return Order                                                                      |
| NFR1, NFR2, NFR3, NFR9     | Deleting a Return Order                                                                      |
| NFR5                       | getAllSKUTest, getSingleSKUTest but not checked because inconsistent with the API definition |
|NFR3, NFR9|create restock order, create testResult|
|NFR6|addSKUItemsRestockOrder |
|NFR 1,NFR 2,NFR3|login sessions of Users, Create User, Update User, Delete User, getting all Users, getting list of suppliers|
|NFR 1, NFR2, NF3, NFR9| Getting all internal Orders, Getting accepted Internal Orders, Getting Refused internal orders| 
|NFR 1, NFR2, NF3, NFR9| Getting internal orders by id|
|NFR 1, NFR2, NF3, NFR9| Creating Internal Order|     
|NFR 1, NFR2, NF3, NFR9| Updating Internal order|
|NFR 1, NFR2, NF3, NFR9| Deleting internal order|    
