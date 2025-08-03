const db = require('../data/database');
const bcrypt = require('bcryptjs');
class User {
    constructor(email, password , fullname ,street, city, postal) {
        
        this.email = email;
        this.password = password;
        this.name = fullname;
        this.address = {
            street: street,
            city: city,
            postalCode: postal
        };
    }

   async signup() {
       const hashedPassword = await bcrypt.hash(this.password, 12);
       await db.getDb().collection('users').insertOne({
           email: this.email,
           password: hashedPassword,
           fullname: this.name,
            address: this.address
       })
    }
}

module.exports = User;
