  const Listing = require('./models/listing')
  const Review = require('./models/review')
  module.exports.isLoggedIn=(req,res,next)=>{
    
    if(!req.isAuthenticated()){
    //redirect url after login
    req.session.redirectUrl = req.originalUrl;
    req.flash("error","User must Logged in!");
    return res.redirect("/login");
  }
  next();
}
module.exports.saveRedirectUrl = (req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next()
}
module.exports.isOwner = async (req,res,next)=>{
  let { id } = req.params;
  let checkListing = await Listing.findById(id)
  if(!checkListing.owner._id.equals(res.locals.currentUser._id)){
    req.flash("error", "You are not the owner of this listing!")
    return res.redirect(`/listings/${id}`);
  }
  next()
}
module.exports.isReviewAuthor = async (req,res,next)=>{
  let { id, reviewId } = req.params;
  let checkAuthor = await Review.findById(reviewId)
  if(!checkAuthor.author.equals(res.locals.currentUser._id)){
    req.flash("error", "You are not the author of this Review!")
    return res.redirect(`/listings/${id}`);
  }
  next()
}