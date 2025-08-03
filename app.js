const express = require('express');
const path = require('path')
const db = require('./data/database')
const authRouter = require('./routes/auth.routes')
const app = express();
app.set('view engine' , 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))
app.use(authRouter);

db.connectToDatabase()
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err);
    });