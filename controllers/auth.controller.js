const User = require('../models/user.models');
const authUtil = require('../util/authentication')
const validation = require('../util/validation');
function allProducts(req,res){
res.render('customer/products/all-products')
}

function getSignup(req, res){
res.render('customer/auth/signup')
}
async function signup(req, res, next){
    const { email, password, fullname, street, city, postal } = req.body;
    
    if(!validation.userDetailsAreValid(email, password, fullname, street, city, postal) || !validation.emailIsConfirmed(email, req.body['confirm-email'])) {
        res.redirect('/signup');
        return;
    }
    const user = new User(email, password, fullname, street, city, postal);
 
    try{
        const existsAlready = await user.existsAlready();
    if (existsAlready) {
        res.redirect('/signup');
        return;
    }
    
    await user.signup();
    } catch (error){
        next(reeor)
        return;
    }
    res.redirect('/login');

}

function getLogin(req, res){
res.render('customer/auth/login')
}

async function login(req, res){
    const user = new User(req.body.email, req.body.password);
   let existingUser ;
    try{
    existingUser = await user.getUserWithSameEmail();

   } catch (error){
    next(error);
    return
   }
   if (!existingUser) {
    console.log("User not found ++++++++++++++");
    
    res.redirect('/login');
       return;
   }
   const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);
   if (!passwordIsCorrect) {  

       res.redirect('/login');
       return;
   }
   authUtil.createUserSession(req,existingUser, function() {
    console.log("User logged in successfully ++++++++++++++");
   res.redirect('/products');
   })
}

function logout (req,res){
    authUtil.destroyUserAuthSession(req)
    res.redirect('/login')
}

module.exports={
    getSignup,
    signup,
    getLogin,
    allProducts,
    login,
    logout
}