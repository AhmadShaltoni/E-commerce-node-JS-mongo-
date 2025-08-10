const express = require('express');
const path = require('path')
const csrf = require('csurf');
const db = require('./data/database')
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const checkAuthStatusMiddleware = require('./middlewares/check-auth')
const cartMiddleware  = require('./middlewares/cart')
const updateCartPricesMiddleware = require('./middlewares/update-cart-prices')
const notFoundMiddleware = require('./middlewares/not-found')
const authRouter = require('./routes/auth.routes')
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.route');
const cartRoutes = require('./routes/cart.route');
const ordersRoutes = require('./routes/orders.routes')
const protectRoutesMiddleware = require('./middlewares/protect-routes');
const expressSession = require('express-session');
const createSessionConfig = require('./config/session');
const app = express();
const errorHandlerMiddleware = require('./middlewares/error-handler');
const sessionConfig = createSessionConfig();
app.set('view engine' , 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))
app.use('/products/assets', express.static('product-data'));

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(cartMiddleware)
app.use(updateCartPricesMiddleware)
app.use(checkAuthStatusMiddleware)
app.use(addCsrfTokenMiddleware);
app.use(authRouter);
app.use(productsRoutes);
app.use(baseRoutes);
app.use('/cart',cartRoutes)
app.use('/orders',protectRoutesMiddleware, ordersRoutes)
app.use('/admin',protectRoutesMiddleware, adminRoutes);
app.use(notFoundMiddleware)

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
