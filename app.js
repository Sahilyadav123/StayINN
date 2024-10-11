if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}


const express = require("express")
const app = express();
const mongoose = require("mongoose");
const port = 3002;

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const { ListingSchema, ReviewSchema } = require("./schema");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const { isLoggedIn } = require("./middleware.js");
const { isOwner } = require("./middleware.js");
const { isReviewAuthor } = require("./middleware.js");
const listingController = require("./controllers/listing.js");
const reviewController = require("./controllers/review.js");
const userController = require("./controllers/user.js")
const multer  = require('multer')
const {storage,cloudinary} = require("./cloudConfig.js");
const upload = multer({ storage })  
const MongoStore = require('connect-mongo');


const url=process.env.ATLASDB_URL;

main().then(() => {
    console.log("Connected")
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect(url);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

const store=MongoStore.create({
    mongoUrl:url,
    crypto:{
        secret:process.env.SECRET_CODE
    },
    touchAfter:24*3600
})
//!creating a session request
const sessionOptions = {
    store,
    secret: process.env.SECRET_CODE,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

app.get("/", (req, res) => {
    res.render("listings/home.ejs");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // this is used to login singup

passport.serializeUser(User.serializeUser()); // to store user info into the session
passport.deserializeUser(User.deserializeUser()); // to remove user info from the session 




app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.del = req.flash("delete");
    res.locals.update = req.flash("update");
    res.locals.error = req.flash("error");
    res.locals.user = req.user;
    next();

})


// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "deltastudent"
//     })

//     const registerUser = await User.register(fakeUser, "password"); // this consist of (user,password,callback)
//     res.send(registerUser);
// })
const validateListing = (req, res, next) => {
    let result = ListingSchema.validate(req.body);

    if (result.error) {
        next(new ExpressError(400, result.error));
    }

    else {
        next();
    }

    // console.log(result);
}

const validateReview = (req, res, next) => {
    let result = ReviewSchema.validate(req.body);
    if (result.error) {
        next(new ExpressError(400, result.error));
    }
    else {
        next();
    }
}


app.route("/listings").get( wrapAsync(listingController.index))
.post( isLoggedIn
    ,upload.single("image")
    ,wrapAsync(listingController.create))
// app.get("/listings", wrapAsync(listingController.index));

//new
app.get("/listings/new", isLoggedIn, wrapAsync(listingController.new));


//create route
// app.post("/listings", isLoggedIn, validateListing, wrapAsync(listingController.create));

//show route

//!routing show update and delete
app.route("/listings/:id").get( wrapAsync(listingController.show)).
put(isLoggedIn, isOwner,upload.single("image"),validateListing, wrapAsync(listingController.update)).
delete(isOwner, wrapAsync(listingController.delete));


// app.get("/listings/:id", wrapAsync(listingController.show));

//edit form
app.get("/listings/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.edit));

//update form   
// app.put("/listings/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.update));

//delete form
// app.delete("/listings/:id", isOwner, wrapAsync(listingController.delete));


//! REVIEWS 

//post reviews
app.post("/listings/:id/reviews", isLoggedIn, validateReview, wrapAsync(reviewController.postReview));

app.delete("/listings/:id/reviews/:reviewId", isLoggedIn,isReviewAuthor, reviewController.deleteReview)


//& this is user part 
//!login and signup part

//* SIGNUP PART

app.route("/signup").get(userController.signup).
post( wrapAsync(userController.postSignup))
// app.get("/signup", userController.signup)

// app.post("/signup", wrapAsync(userController.postSignup));

//! login route 

app.route("/login").get(userController.login).
post( passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }),userController.postLogin)

// app.get('/login', userController.login)

// app.post('/login', passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }),userController.postLogin)

app.get('/logout',userController.logout)


app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
}); 


app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    // console.log(err);
    res.status(status);

    // res.status(status).json({ message });
    res.render("listings/error.ejs", { err });
});


app.listen(port, () => {
    console.log("Server is listening at port", port);
});
