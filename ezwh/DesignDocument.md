# Design Document 


Authors: Francesco Grande, Muhammad Sarib Khan, Riccardo Tornesello, Silvio Tanzarella

Date: 27/04/2022

Version: 1.0


# Contents

- [High level design](#package-diagram)
- [Low level design](#class-diagram)
- [Verification traceability matrix](#verification-traceability-matrix)
- [Verification sequence diagrams](#verification-sequence-diagrams)

# Instructions

The design must satisfy the Official Requirements document, notably functional and non functional requirements, and be consistent with the APIs

# High level design 

![imgur](https://imgur.com/uBJRMSD.jpeg)

As described in the requirements, the EZWH software is divided in backend and frontend with the backend which exposes some API and the frontend accessible from the browser. So the frontend will implement the view and its logic, while the backend will implement controller and models. The two parts together form a layered MVC (model-view-controller) pattern.

## Frontend

![imgur](https://imgur.com/nz5iILr.jpeg)

Packages:

- view: contains the structure and the style of the frontend.
- logic: contains the functionalities of the frontend which gets the user's input and makes calls to the backend API.

## Backend

![imgur](https://imgur.com/kssAFCP.jpeg)

- controller: this package contains the controller layer which handles the calls to the REST API. Every API has its own function in this package. It implements the business logic.
- model: contains all the models with their properties and methods, useful to interact with the controller.
- dbms: contains the classes which interact with the database. Is useful to get, store, delete or update data from the DB and put it in a model.

# Low level design

![imgur](https://imgur.com/gJXbmeo.jpg)

# Verification traceability matrix

![imgur](https://imgur.com/6oWTWvL.jpg)

# Verification sequence diagrams 

![Imgur](https://i.imgur.com/XlwjGxn.jpg)

![Imgur](https://i.imgur.com/UzywU2F.jpg)

![Imgur](https://i.imgur.com/MnkY2sw.jpg)

![Imgur](https://i.imgur.com/YF2ETvK.jpg)

![Imgur](https://i.imgur.com/QhxyguE.jpg)

![Imgur](https://i.imgur.com/lBOlZFN.jpg)

