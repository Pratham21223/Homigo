const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email : {type:String, required:true},
    name: {type:String, require:true}
 //Username and Passwords are created automatically by passport local mongoose
})

userSchema.plugin(passportLocalMongoose) //Automatically created username and password

module.exports = mongoose.model("User", userSchema);