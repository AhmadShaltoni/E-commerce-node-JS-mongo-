const User = require('../models/user.models');

function getSignup(req, res){
res.render('customer/auth/signup')
}
async function signup(req, res){
    const { email, password, fullname, street, city, postal } = req.body;
    const user = new User(email, password, fullname, street, city, postal);
    await user.signup();
    res.redirect('/login');
}

function getLogin(req, res){
res.render('customer/auth/login')
}

module.exports={
    getSignup,
    signup,
    getLogin,

}