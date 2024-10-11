const Listing = require("../models/listing.js")
const Review = require("../models/review.js")

module.exports.postReview=async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    const newreview = new Review(req.body);
    newreview.author = req.user._id;
    listing.populate("reviews")
    console.log(newreview);
    listing.reviews.push(newreview);
    await newreview.save();
    await listing.save();
    res.redirect(`/listings/${id}`);

}

module.exports.deleteReview=async (req, res) => {
    let { id, reviewId } = req.params;

    let listing = await Listing.findById(id);
    // let review = await Review.findById(reviewId);
    listing.reviews.pull(reviewId);
    await listing.save();
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}