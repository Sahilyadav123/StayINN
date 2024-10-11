const Listing = require("../models/listing")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });



module.exports.index = async (req, res) => {
    const allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
}

module.exports.new = async (req, res) => {

    res.render("listings/new.ejs");
}

module.exports.show = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews", populate: {
            path: "author",
        }
    }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for is not found");
        res.redirect("/listings");
    }
    const isOwner = req.user && req.user._id.equals(listing.owner._id);
    const logged = req.session.returnTo = req.originalUrl;

    res.render("listings/show.ejs", { listing, isOwner });
}

module.exports.create = async (req, res, next) => {
    let coordinate = await geocodingClient.forwardGeocode({
        query: `${req.body.location}, ${req.body.country}`, 
        limit: 1,
    }).send();


    console.log(coordinate.body.features[0].geometry);  
    // let {
    //     title,
    //     description,
    //     price, 
    //     location,
    //     // location,
    //     country, 
    //     } = req.body;

    // if(!title || !description || !price || !location ){
    //     next(new ExpressError(404,"Send valid data for listing"));
    // }
    // let sample = new Listing({
    //     title: newListing.title,
    //     description: newListing.description,
    //     price: newListing.price,
    //     image: newListing.image,
    //     location: newListing.location,
    //     country: newListing.country, 
    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url);
    // console.log(filename);
    const newListing = new Listing(req.body);
    newListing.owner = req.user._id;
    newListing.image = {
        url, filename
    }
    newListing.geometry=coordinate.body.features[0].geometry;
    let saved=await newListing.save();
    console.log(saved);
    req.flash("success", "New Listing created")
    res.redirect("/listings");
}

module.exports.edit = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
    res.render("listings/edit.ejs", { listing });
}

module.exports.update = async (req, res) => {

    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body });
    if (typeof req.file != "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {
            url, filename
        }
        await listing.save();
    }

    req.flash("update", "Listing has been updated")
    res.redirect(`/listings/${id}`);
}

module.exports.delete = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("delete", "Listing has been deleted");
    res.redirect("/listings");
}