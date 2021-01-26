////////////// formulaire et commande produit//////
class Contact{
    constructor(name, firstname, mail, address, city){
        this.lastName = name;
        this.firstName = firstname;
        this.email = mail;
        this.address = address;
        this.city = city;
    }
}

class Order{
    constructor(contact, products){
        this.contact = contact;
        this.products = products;
    }
}