
if(process.env.NODE_ENV!="production"){
require('dotenv').config()
}
// console.log(process.env.secret)
const express = require("express");
const app = express();
app.listen(8080, () => console.log("Server Started!"));
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate=require('ejs-mate');
const expressErr=require("./utils/expressErr.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js')
const Listing = require('./models/listing.js')
//Router
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);


// const mongooseURL = "mongodb://127.0.0.1:27017/wanderlust";
const dbURL = process.env.ATLAS_DB_URL;
async function main() {
  await mongoose.connect(dbURL);
}
main()
  .then(() => console.log("Connected to DB!"))
  .catch((err) => console.log(err));

  //Session options
const store = MongoStore.create({
    mongoUrl: dbURL,
    crypto:{
      secret:process.env.SECRET,
    },
    touchAfter: 24*60*60,
  })
  store.on("error",()=>console.log("Error in Mongo Session Store",err));
const sessionOptions = {
  secret:process.env.SECRET,
  resave : false,
  saveUninitialized :true,
  cookie : {
    expires:Date.now() + 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
    httpOnly:true
  },
  store,
}
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(passport.initialize());
app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser=req.user;
  next();
})

//User registration
// app.get("/demoUser",async (req,res)=>{
//   let fakeUser = new User({
//     email : "student@gmail.com",
//     username:"Prathamrk.7",
//     name:"Pratham Kataria"
//   });
//   let registerdUser = await User.register(fakeUser,"helloworld");
//   res.send(registerdUser)
// })


//Listings
app.use("/listings",listingRouter)


//Reviews
app.use("/listings/:id/reviews/",reviewRouter)

//User
app.use("/",userRouter)

//filter

//Error handling
app.use((req,res,next)=>{
  next(new expressErr(404,"Sorry, Page Not Found!"))
})
app.use((err,req,res,next)=>{
  let {status=500,message="Something went wrong!"}=err;
  res.status(status).render("err.ejs",{message})
})

