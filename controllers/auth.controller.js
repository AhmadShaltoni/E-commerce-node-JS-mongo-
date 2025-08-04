const User = require('../models/user.models');
const authUtil = require('../util/authentication')
const validation = require('../util/validation');
const sessionFlash = require('../util/session-flash');
const express = require('express');
function allProducts(req,res){
res.render('customer/products/all-products')
}

function getSignup(req, res){
    let sessionData = sessionFlash.getSessionData(req);
    if(!sessionData){
        sessionData = {
            email: '',
            fullname: '',
            password: '',
            confirmEmail: '',
            street: '',
            city: '',
            postal: ''
        }
    }
res.render('customer/auth/signup',{ inputData: sessionData});
}
async function signup(req, res, next){
    const { email, password, fullname, street, city, postal } = req.body;
    
    if(!validation.userDetailsAreValid(email, password, fullname, street, city, postal) || !validation.emailIsConfirmed(email, req.body['confirm-email'])) {
        sessionFlash.flashDataToSession(req, { 
            errorMessage: 'Invalid input - Password should be at least 6 characters long and email should be valid.',
            email: email,
            password: password,
            confirmEmail: req.body['confirm-email'],
            fullname: fullname,
            street: street,
            city: city,
            postal: postal
        },function(){
        res.redirect('/signup');

        })
        return;
    }
    const user = new User(email, password, fullname, street, city, postal);
 
    try{
        const existsAlready = await user.existsAlready();
    if (existsAlready) {
         sessionFlash.flashDataToSession(req, { 
            errorMessage: 'Invalid input - user already exists',
            email: email,
            password: password,
            confirmEmail: req.body['confirm-email'],
            fullname: fullname,
            street: street,
            city: city,
            postal: postal
        },function(){
        res.redirect('/signup');

        })
        return;
    }

    await user.signup();
    } catch (error){
        next(error)
        return;
    }
    res.redirect('/login');

}

function getLogin(req, res){
    let sessionData = sessionFlash.getSessionData(req);

    if(!sessionData){
        sessionData = {
            email: '',
            password: ''
        }
    }
res.render('customer/auth/login', { inputData: sessionData });
}

async function login(req, res){
    const user = new User(req.body.email, req.body.password);
   let existingUser ;
    try{
    existingUser = await user.getUserWithSameEmail();
        console.log("============ existingUser",existingUser);
        
   } catch (error){
    next(error);
    return
   }
   if(!req.body.email || !req.body.password){
  sessionFlash.flashDataToSession(req, { 
            errorMessage: 'please enter email and password to login',
            email: req.body.email,
            password:req.body.password
        },function(){
        res.redirect('/login');

        })
 return;
   }
   if (!existingUser) {

  sessionFlash.flashDataToSession(req, { 
            errorMessage: 'Invalid input - user does not exist',
            email: req.body.email,
            password:req.body.password
        },function(){
        res.redirect('/login');

        })
        return;
   }
   const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);
   if (!passwordIsCorrect) {  
console.log("============ password Is not Correct");
sessionFlash.flashDataToSession(req, { 
            errorMessage: 'Invalid input - password Is not Correct',
            email: req.body.email,
            password:req.body.password
        },function(){
               res.redirect('/login');
        })
        return;
   }
   authUtil.createUserSession(req,existingUser, function() {
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