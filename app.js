const express = require('express');
const path = require('path')
const authRouter = require('./routes/auth.routes')
const app = express();
app.set('view engine' , 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))
app.use(authRouter);

app.listen(3000)
