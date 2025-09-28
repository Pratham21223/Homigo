if(process.env.NODE_ENV!="production"){
require('dotenv').config()
}
const mongoose=require('mongoose');
const initData=require('./data.js');
const Listing = require('../models/listing.js');

// const mongooseURL="mongodb://127.0.0.1:27017/wanderlust"
const dbURL = "mongodb+srv://prathamrk7:Pratham3004@cluster0.rjpgelr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
console.log(dbURL)
async function main() {
  await mongoose.connect(dbURL);
}
main()
  .then(() => console.log("Connected to DB!"))
  .catch((err) => console.log(err));

  const initDb=async() =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner : "68d93eb4c8447c257feac048"}))
    await Listing.insertMany(initData.data);
  }

  initDb();