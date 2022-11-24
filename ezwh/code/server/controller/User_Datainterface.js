'use strict';

const {User} = require ('../models/UserAndSubclasses');

function getSuppliers(db){
    return db.loadUser().then(users=>users.filter(supp=>supp.getType()==="Supplier").map(supp=>(
        {
            id:supp.getID(),
            name: supp.getname(),
            surname: supp.getSurname(),
            email: supp.getusername()

        }
    )))
    
}

function getUsers(db){
    return db.loadUser().then(users=>users.filter(u=>u.getType()!=="manager").map(u=>(
        {
            id:u.getID(),
            name: u.getname(),
            surname: u.getSurname(),
            email: u.getusername(),
            type: u.getType()
        }
    )))
}


function createUser(db, username, name, surname, password, type){
    return db.storeUser(new User(null, name, surname, username, type, password));
}

function updateUserType(db, username, oldType, newType){
    //We do not need oldtype here
    const action = db.loadUser()
        .then(users=>users.filter(u=>u.getusername()===username))
            .then(user_old=>{user_old[0].setType(newType); db.storeUser(user_old[0])})
                .then(()=>db.deleteUser(new User(oldType)));
    return action;
}

function deleteUser(db, username, type){
    const action = db.loadUser()
        .then(users=>users.filter(u=>u.getusername()===username && u.getType()===type && u.getType()!=="Manager"))
            .then(()=>db.deleteUser(new User(username, type)));
    /*let user_list = this.db.loadUser();
    let user_del = user_list.filter(user=> user.getusername()===username && user.getType()===type);
    let id=user_del.getID();
    const user_to_delete = this.db.getUser(id);
    if(user_to_delete.getType()!="manager"){
        this.db.deleteUser(user_to_delete);
    }*/
    return action;
}

function loginManager(db, username, password){
    //const user_list = await db.loadUser();
    return db.loadUser().then(users=>users.filter(user=> user.getType()==="manager" && user.getusername()===username && user.getPassword()===password).map(user=>
        ({
            id: user.getID(),
            name: user.getname(),
            surname: user.getSurname(),
            email: user.getusername(),

        })))

    /*let user_manager=user_log.map(function(user_log){
        if(user_log.getusername()===username && user_log.checkPassword(password)===true){
            const user_man={
                "id": User_log.getID(),
                "name": User_log.getname(),
                "surname": User_log.getSurname(),
                "email": User_log.getusername(),
            }
            return user_man;
        }
    });
    return user_manager;*/
}

function loginCustomer(db, username, password){
    return db.loadUser().then(users=>users.filter(user=> user.getType()==="customer" && user.getusername()===username && user.getPassword()===password).map(user=>
        ({
            id: user.getID(),
            name: user.getname(),
            surname: user.getSurname(),
            email: user.getusername(),

        })))
    /*let user_list = this.db.loadUser();
    user_log = user_list.filter(user=> user.getType()==="customer");
    let user_customer=user_log.map(function(user_log){
        if(user_log.getusername()===username && user_log.checkPassword(password)===true){
            const user_cust={
                "id": User_log.getID(),
                "name": User_log.getname(),
                "surname": User_log.getSurname(),
                "email": User_log.getusername(),
            }
            return user_cust;
        }
    });
    return user_customer;*/
}

function loginSupplier(db, username, password){
    return db.loadUser().then(users=>users.filter(user=> user.getType()==="supplier" && user.getusername()===username && user.getPassword()===password).map(user=>
        ({
            id: user.getID(),
            name: user.getname(),
            surname: user.getSurname(),
            email: user.getusername(),

        })))
    /* let user_list = this.db.loadUser();
    user_log = user_list.filter(user=> user.getType()==="supplier");
    let user_supplier=user_log.map(function(user_log){
        if(user_log.getusername()===username && user_log.checkPassword(password)===true){
            const user_s={
                "id": User_log.getID(),
                "name": User_log.getname(),
                "surname": User_log.getSurname(),
                "email": User_log.getusername(),
            }
            return user_s;
        }
    });
    return user_supplier;*/
}

function loginClerk(db, username, password){
    return db.loadUser().then(users=>users.filter(user=> user.getType()==="Clerk" && user.getusername()===username && user.getPassword()===password).map(user=>
        ({
            id: user.getID(),
            name: user.getname(),
            surname: user.getSurname(),
            email: user.getusername(),

        })))
    /*let user_list = this.db.loadUser();
    user_log = user_list.filter(user=> user.getType()==="clerk");
    let user_clerk=user_log.map(function(user_log){
        if(user_log.getusername()===username && user_log.checkPassword(password)===true){
            const user_c={
                "id": User_log.getID(),
                "name": User_log.getname(),
                "surname": User_log.getSurname(),
                "email": User_log.getusername(),
            }
            return user_c;
        }
    });
    return user_clerk;*/
}

function loginQualityEmployee(db, username, password){
    return db.loadUser().then(users=>users.filter(user=> user.getType()==="Quality Check Employee" && user.getusername()===username && user.getPassword()===password).map(user=>
        ({
            id: user.getID(),
            name: user.getname(),
            surname: user.getSurname(),
            email: user.getusername(),

        })))
    /*let user_list = this.db.loadUser();
    user_log = user_list.filter(user=> user.getType()==="Quality Employee");
    let user_Qemployee=user_log.map(function(user_log){
        if(user_log.getusername()===username && user_log.checkPassword(password)===true){
            const user_Q={
                "id": User_log.getID(),
                "name": User_log.getname(),
                "surname": User_log.getSurname(),
                "email": User_log.getusername(),
            }
            return user_Q;
        }
    });
    return user_Qemployee;*/
}

function loginDeliveryEmployee(db, username, password){
    return db.loadUser().then(users=>users.filter(user=> user.getType()==="Delivery Employee" && user.getusername()===username && user.getPassword()===password).map(user=>
        ({
            id: user.getID(),
            name: user.getname(),
            surname: user.getSurname(),
            email: user.getusername(),

        })))
    /*let user_list = this.db.loadUser();
    user_log = user_list.filter(user=> user.getType()==="Delivery Employee");
    let user_Demployee=user_log.map(function(user_log){
        if(user_log.getusername()===username && user_log.checkPassword(password)===true){
            const user_D={
                "id": User_log.getID(),
                "name": User_log.getname(),
                "surname": User_log.getSurname(),
                "email": User_log.getusername(),
            }
            return user_D;
        }
    });
    return user_Demployee;*/
}


module.exports = {

    getSuppliers,
    getUsers,
    createUser,
    updateUserType,
    deleteUser,
    loginManager,
    loginCustomer,
    loginSupplier,
    loginClerk,
    loginQualityEmployee,
    loginDeliveryEmployee
}







