const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync=require("../utils/wrapAsync.js");
const reviewController = require('../controllers/reviews.js')
const {isLoggedIn, isOwner, isReviewAuthor} = require('../middleware.js')

//Post review
router.post("/",isLoggedIn,reviewController.createReview)

//Delete Review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview))

module.exports = router;