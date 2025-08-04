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

    getUserWithSameEmail() {
        return db.getDb().collection('users').findOne({ email: this.email });
    }

    async existsAlready() {
        const existingUser = await this.getUserWithSameEmail();
        if (existingUser) {
            return true;
        }
        return false;
    }

    async hasMatchingPassword(hashedPassword) {
        return bcrypt.compare(this.password , hashedPassword);
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
