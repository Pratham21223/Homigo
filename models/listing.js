const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")
const listingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: {
    filename: { type: String },
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyfX2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D",
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyfX2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D"
          : v,
    },
  },
  price: { type: Number,default:0 },
  location: { type: String },
  country: { type: String },
  reviews:[{
    type:Schema.Types.ObjectId,
    ref:"Review"
  }],
  owner:{
    type : Schema.Types.ObjectId,
    ref : "User"
  },
  category:{
    type:String,
    enum:["Trending","Rooms","Iconic Cities","Mountains","Castles","Amazing Pools","Camping","Farms","Desert"]
  }
});

listingSchema.post("findOneAndDelete",async (listing) => {
  if(listing){
  await Review.deleteMany({_id:{$in : listing.reviews}})
  }
})
const Listing = mongoose.model("Listing", listingSchema);


module.exports = Listing;
