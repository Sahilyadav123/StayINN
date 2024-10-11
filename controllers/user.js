const User = require("../models/user.js");
const passport = require("passport");

module.exports.signup=(req, res) => {
    res.render("users/signup.ejs");
}

module.exports.postSignup = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash("error", "Email already in use. Please use a different email.");
            return res.redirect("/signup");
        }


        const newUser = new User({
            username: username,
            email: email,
        })

        const registered = await User.register(newUser, password);
        console.log(registered);
        req.login(registered, (err) => {

            if (err) {
                return next(err);
            }
            req.flash("success", `Welcome to StayInn, ${username}!`);
            res.redirect("/listings");
        });

    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }

}

module.exports.login = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.postLogin =  async (req, res) => {
    const redirectUrl = req.session.returnTo || '/listings';  // Redirect to the saved URL or a default URL
    delete req.session.returnTo;
    const { username, password } = req.body;
    req.flash("success", `Welcome ${username} !!!`);
    res.redirect(redirectUrl);
}

module.exports.logout =  (req, res) => {
    req.logout((err) => {

        if (!err) {
            req.flash("success", "logged out successfully");
            res.redirect("/listings");
        }
        else {
            req.flash("error", err.message);
            res.redirect("/listings");
        }

    });
}   