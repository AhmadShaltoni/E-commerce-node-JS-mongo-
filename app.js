const express = require('express');
const path = require('path')
const csrf = require('csurf');
const db = require('./data/database')
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const authRouter = require('./routes/auth.routes')
const expressSession = require('express-session');
const createSessionConfig = require('./config/session');
const app = express();
const errorHandlerMiddleware = require('./middlewares/error-handler');
const sessionConfig = createSessionConfig();
app.set('view engine' , 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false })); 

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(addCsrfTokenMiddleware);
app.use(authRouter);
app.use(errorHandlerMiddleware);
db.connectToDatabase()
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err);
    });
