const mongoose = require("mongoose");
const {Schema} = mongoose;
const reviewSchema = new mongoose.Schema({
    comment: String,
    rating:{
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default:Date.now()
    },
    author:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
});

const Review = mongoose.model('Review',reviewSchema)
module.exports = Review;

//& LISTING TO REVIEW IS A ONE TO MANY RELATION FOR A SINGLE LISTING THERE CAN BE MULTIPLE REVIEWS 