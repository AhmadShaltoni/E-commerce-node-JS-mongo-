const express = require('express');
const path = require('path')
const csrf = require('csurf');
const db = require('./data/database')
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const checkAuthStatusMiddleware = require('./middlewares/check-auth')
const authRouter = require('./routes/auth.routes')
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.route');
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
app.use(checkAuthStatusMiddleware)
app.use(addCsrfTokenMiddleware);
app.use(authRouter);
app.use(productsRoutes);
app.use(baseRoutes);
app.use('/admin',adminRoutes);

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
