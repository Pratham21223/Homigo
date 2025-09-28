const express = require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const expressErr=require("../utils/expressErr.js");
const {listingSchema} = require("../schema.js")
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner} = require('../middleware.js')
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require('../cloudconfig.js')
const upload = multer({ storage });


const validateListing=(req,res,next)=>{
  let {error}=listingSchema.validate(req.body);
  if(error) {
    let errMsg=error.details.map((el)=>el.message).join(", ")
    throw new expressErr(400,error)
  }
  else next();
}
router.get("/filter",wrapAsync(listingController.filter))
router
.route("/")
.get(wrapAsync(listingController.index)) //Index route
.post(isLoggedIn,upload.single('image'),wrapAsync(listingController.createListing)); //Create listing route
// .post(upload.single('image'),(req,res)=>{
//   res.send(req.file)
// })
router.get("/new",isLoggedIn, listingController.renderNewForm); //New route
router
.route("/:id")
.get(wrapAsync(listingController.showListing)) //Show route
.put(isLoggedIn,isOwner,upload.single('image'),wrapAsync(listingController.updateListing)) //Update listing route
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing)); //Delete listing route


//Edit route
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports = router;