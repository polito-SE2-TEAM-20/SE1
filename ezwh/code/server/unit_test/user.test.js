const DatabaseHandler = require("../dbms");
const DataInterface = require ("../controller/data-interface");
const {deleteDb} = require ("./test-utils");
//const { expect } = require("chai");
// const { expect } = require("chai");

describe('testControllerUser', ()=>{
    beforeEach(() => {
        deleteDb()
    });
    testGetSuppliers();
    testGetUsers();
    testCreateUser("zzz@ezwh.com", "Khushdil", "Shah", "testpassword", "supplier");
    testUpdateUserType("abc@ezwh.com", "clerk", "Quality Check Employee");
    testDeleteUser("xyz@ezwh.com", "customer");
    testLoginManager("man@ezwh.com", "testpassword");
    testLoginCustomer("cus@ezwh.com", "testpassword");
    testLoginSupplier("supppp@ezwh.com", "testpassword");
    testLoginClerk("clerk10@ezwh.com", "testpassword");
    testLoginQualityCheckEmployee("qce@ezwh.com", "testpassword");
    testLoginDeliveryEmployee("de@ezwh.com","testpassword");
});

function testGetSuppliers(){
    test('get suppliers', async () => {
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const u = {username: "user10@ezwh.com", name:"Dalla", surname: "Qasim",
                   password: "testpassword10", type:"Supplier"     
                  }
        const u_1={username: "user11@ezwh.com", name:"Regina", surname: "Eman",
        password: "testpassword10", type:"manager"}

        await datainterface.CreateUser(u.username, u.name, u.surname, u.password, u.type); 
        await datainterface.CreateUser(u_1.username, u_1.name, u_1.surname, u_1.password, u_1.type); 
        var res = await datainterface.GetSuppliers();
        
        // console.log('Get Suppliers: ');
        // console.log(res);
        expect(res.length).toStrictEqual(1);
        const usr = res[0];
        expect(usr.id).toStrictEqual(7)
        expect(usr.name).toStrictEqual(u.name);
        expect(usr.surname).toStrictEqual(u.surname);
        expect(usr.email).toStrictEqual(u.username);
        // expect(usr.password).toStrictEqual(u.password);
        // expect(usr.type).toStrictEqual(u.type);
    })
}

function testGetUsers(){
    test('Get Users (except manager)', async () => {
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        const u = {username: "user10@ezwh.com", name:"Dalla", surname: "Qasim",
                   password: "testpassword10", type:"supplier"     
                  }
        const u_1={username: "user11@ezwh.com", name:"Regina", surname: "Eman",
        password: "testpassword10", type:"manager"}

        const u_2 = {username: "user12@ezwh.com", name:"Zlatan", surname: "Ibra",
                   password: "testpassword10", type:"Clerk"     
                  }
        const u_3={username: "user13@ezwh.com", name:"Luka", surname: "Modric",
        password: "testpassword10", type:"Quality Check Employee"};
        
        await datainterface.CreateUser(u.username, u.name, u.surname, u.password, u.type); 
        await datainterface.CreateUser(u_1.username, u_1.name, u_1.surname, u_1.password, u_1.type); 
        await datainterface.CreateUser(u_2.username, u_2.name, u_2.surname, u_2.password, u_2.type); 
        await datainterface.CreateUser(u_3.username, u_3.name, u_3.surname, u_3.password, u_3.type); 
        
        var res = await datainterface.GetUsers();

        // console.log('Get users except ');
        // console.log(res);
        expect(res.length).toStrictEqual(8);
        
        const usr1 = res[5];
        const usr2 = res[6];
        const usr3 = res[7];
        
        // expect(usr1.id).toStrictEqual(1)
        // console.log(usr1.name, u.name);
        expect(usr1.name).toStrictEqual(u.name);
        expect(usr1.surname).toStrictEqual(u.surname);
        expect(usr1.email).toStrictEqual(u.username);
        expect(usr1.type).toStrictEqual(u.type);


        // expect(usr2.id).toStrictEqual(2)
        expect(usr2.name).toStrictEqual(u_2.name);
        expect(usr2.surname).toStrictEqual(u_2.surname);
        expect(usr2.email).toStrictEqual(u_2.username);
        expect(usr2.type).toStrictEqual(u_2.type);

        // expect(usr3.id).toStrictEqual(3)
        expect(usr3.name).toStrictEqual(u_3.name);
        expect(usr3.surname).toStrictEqual(u_3.surname);
        expect(usr3.email).toStrictEqual(u_3.username);
        expect(usr3.type).toStrictEqual(u_3.type);

    })
}

function testCreateUser(username, name, surname, password, type){
    test('Create User', async ()=>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.CreateUser(username, name, surname, password, type);
        var res = await datainterface.GetUsers();
        // console.log(res);
        expect (res.length).toStrictEqual(6);
        const usr = res[5];

        // console.log(usr);
        // console.log(usr.email, username);
        // expect(usr.username).toStrictEqual(username);
        expect(usr.name).toStrictEqual(name);
        expect(usr.surname).toStrictEqual(surname);
        // expect(usr.password).toStrictEqual(password);
        expect(usr.type).toStrictEqual(type);
    })
}

function testUpdateUserType(username, oldType, newType){
    test ('Update User Type', async ()=>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        
        await datainterface.CreateUser(username,"Yes", "Man", "testpassword", oldType);
        await datainterface.UpdateUserType(username, oldType, newType);
        var res = await datainterface.GetUsers();
        // console.log(res);
        expect(res.length).toStrictEqual(6);

        const usr = res[5];
        expect(usr.email).toStrictEqual(username);
        expect(usr.type).toStrictEqual(newType);
    })
}

function testDeleteUser(username, type){
    test('Delete User', async()=>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.CreateUser(username, "yes", "man", "testpassword", type);
        var res = await datainterface.GetUsers();
        // console.log(res);
        expect(res.length).toStrictEqual(6);
        // console.log(username, type);
        await datainterface.DeleteUser(username, type);
        var res=await datainterface.GetUsers();
        console.log(res);
        expect(res.length).toStrictEqual(5);

    })
}

function testLoginManager(username, password){
    test('Login Manager', async ()=>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.CreateUser(username, "Cris", "Ronaldo",password, "manager");
        var res = await datainterface.LoginManager(username, password);
        // console.log(res);
        expect(res.length).toStrictEqual(1);
        const usr=res[0];
        expect(usr.email).toStrictEqual(username);
        expect(usr.name).toStrictEqual("Cris");
        expect(usr.surname).toStrictEqual("Ronaldo");
    })
}

function testLoginCustomer(username, password){
    test('Login Customer', async ()=>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.CreateUser(username, "Cris", "Ronaldo",password, "customer");
        var res = await datainterface.LoginCustomer(username, password);
        expect(res.length).toStrictEqual(1);
        const usr=res[0];
        expect(usr.email).toStrictEqual(username);
        expect(usr.name).toStrictEqual("Cris");
        expect(usr.surname).toStrictEqual("Ronaldo");
    })
}

function testLoginSupplier(username,password){
    test('Login Supplier', async ()=>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.CreateUser(username, "Cris", "Ronaldo",password, "supplier");
        var res = await datainterface.LoginSupplier(username, password);
        expect(res.length).toStrictEqual(1);
        const usr=res[0];
        expect(usr.email).toStrictEqual(username);
        expect(usr.name).toStrictEqual("Cris");
        expect(usr.surname).toStrictEqual("Ronaldo");
    })
}

function testLoginClerk(username,password){
    test('Login Clerk', async ()=>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.CreateUser(username, "Cris", "Ronaldo",password, "Clerk");
        var res = await datainterface.LoginClerk(username, password);
        expect(res.length).toStrictEqual(1);
        const usr=res[0];
        expect(usr.email).toStrictEqual(username);
        expect(usr.name).toStrictEqual("Cris");
        expect(usr.surname).toStrictEqual("Ronaldo");
    })
}

function testLoginQualityCheckEmployee(username,password){
    test('Login Quality Check Employee', async ()=>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.CreateUser(username, "Cris", "Ronaldo",password, "Quality Check Employee");
        var res = await datainterface.LoginQualityEmployee(username, password);
        expect(res.length).toStrictEqual(1);
        const usr=res[0];
        expect(usr.email).toStrictEqual(username);
        expect(usr.name).toStrictEqual("Cris");
        expect(usr.surname).toStrictEqual("Ronaldo");
    })
}

function testLoginDeliveryEmployee(username,password){
    test('Login Delivery Employee', async ()=>{
        const db = new DatabaseHandler();
        await db.init();
        const datainterface = new DataInterface(db);

        await datainterface.CreateUser(username, "Cris", "Ronaldo", password, "Delivery Employee");
        var res = await datainterface.LoginDeliveryEmployee(username, password);
        // console.log(res);
        expect(res.length).toStrictEqual(1);
        const usr=res[0];
        expect(usr.email).toStrictEqual(username);
        expect(usr.name).toStrictEqual("Cris");
        expect(usr.surname).toStrictEqual("Ronaldo");
    })
}








