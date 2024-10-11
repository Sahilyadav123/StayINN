const Listing = require("./models/listing.js");  
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req,res,next)=>{   
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash("delete","You are not logged in");
        res.redirect("/login");    
    }
    next();
}


module.exports.isOwner= async  (req,res,next)=>{
    const { id } = req.params;
    let listing=await Listing.findById(id);
    if(!req.user._id.equals(listing.owner._id)){
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req,res,next)=>{
    const { id,reviewId } = req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.user._id)){
        req.flash("error","This review was written by someone else");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

// const isLoggedIn = (req,res,next)=>{
//     if(!req.isAuthenticated()){
//         req.flash("delete","You are not logged in");
//         res.redirect("/login");    
//     }
//     next();
// }
// module.exports.isLoggedIn = isLoggedIn;