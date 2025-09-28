const express = require("express");
const User = require('../models/user.js');



//Signup
module.exports.signupForm=(req,res)=>{
    res.render("users/signup.ejs");
}
module.exports.signup=async(req,res,next)=>{
    try{
    let {username,password,name,email} = req.body;
    const newUser = new User({email,name,username});
    const registerdUser = await User.register(newUser,password);
    console.log(registerdUser);
    req.login(registerdUser,async (err)=>{
        if(err){
            return next(err);
        }
        await req.flash("success",`Welcome ${name}, to Wanderlust!`);
        res.redirect("/listings");
    })
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup")
    }
}

//login
module.exports.loginForm=(req,res)=>{
    res.render("users/login.ejs")
}
module.exports.login=async (req,res)=>{
    let {username} = req.body;
    console.log(username)
    let LoggedinUser = await User.findOne({username:username});
    console.log(LoggedinUser);
    req.flash("success",`Welcome back to Wanderlust, ${LoggedinUser.name}!`);
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

//Logout
module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out now!")
        res.redirect("/listings");
    })
}