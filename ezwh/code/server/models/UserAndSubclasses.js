'User strict';
 
class User{
    constructor(id, name, surname, username, type, password){
        this.id=id;
        this.name=name;
        this.surname=surname;
        this.username=username;
        this.type=type;
        this.password=password;
    }

    getID(){
        return this.id;
    }
    getname(){
        return this.name;
    }
    getSurname(){
        return this.surname;
    }
    getusername(){
        return this.username;
    }
    getType(){
        return this.type;
    }
    setType(type){
        this.type=type;
    }
    setId(id){
        this.id = id;
    }
    setname(name){
        this.name=name;
    }
    setsurname(surname){
        this.surname=surname;
    }
    setusername(username){
        this.username=username;
    }
    setpassword(password){
        this.password=password;
    }
    getPassword() {
        return this.password;
    }
}

class Supplier extends User{
    constructor(id, name, surname, username, password){
        super(id, name, surname, username, password, type="supplier");

    }

}

class Administrator extends User{
    constructor(id, name, surname, username, password){
        super(id, name, surname, username, password, type="administrator");

    }
}

class Employee extends User{
    constructor(id, name, surname, username, password){
        super(id, name, surname, username, password, type="Employee");

    }
}

class Manager extends Administrator{
    constructor(id, name, surname, username, password){
        super(id, name, surname, username, password, type="manager");

    }
}

class InternalCustomer extends Employee{
    constructor(id, name, surname, username, password){
        super(id, name, surname, username, password, type="Internal Customer");

    }
}

class QualityCheckEmployee extends Employee{
    constructor(id, name, surname, username, password){
        super(id, name, surname, username, password, type="Quality Check Employee");

    }
}

class DeliveryEmployee extends Employee{
    constructor(id, name, surname, username, password){
        super(id, name, surname, username, password, type="Delivery Employee");

    }
}

class Clerk extends Employee{
    constructor(id, name, surname, username, password){
        super(id, name, surname, username, password, type="Clerk");
    
    }
}

module.exports = { User, Supplier, Administrator, Employee, Manager, InternalCustomer, QualityCheckEmployee, DeliveryEmployee, Clerk };
