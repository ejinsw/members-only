require('dotenv').config();
const asyncHandler = require('express-async-handler')
const queries = require('../config/db/queries')
const bcrypt = require('bcryptjs')
const passport = require('../config/passport')

exports.home = asyncHandler(async (req, res, next) => {
    const messages = await queries.getMessages();

    res.render('index', { title: 'Home', signedIn: req.user, content: 'home', messages: messages });
})

exports.getSignUp = asyncHandler(async (req, res, next) => {
    res.render('index', { title: 'Sign Up', signedIn: req.user, content: 'signup', errors: false, data: req.body })
})

exports.postSignUp = asyncHandler(async (req, res, next) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Add the new user to the database
        await queries.addUser(req.body.username, hashedPassword, req.body.first_name, req.body.last_name);

        passport.authenticate('local', {
            successRedirect: '/code',
            failureRedirect: '/sign-up',
            failureFlash: 'Something went wrong'
        })(req, res, next);
    } catch (err) {
        return next(err)
    }

})

exports.getCode = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        res.redirect('/')
    }

    res.render('index', { title: 'Enter Code', signedIn: req.user, content: 'code', inputWrongCode: false })
})

exports.postCode = asyncHandler(async (req, res, next) => {
    if (req.body.code === process.env.CODE) {
        queries.validateMembership(req.user.id);
    } else {
        res.render('index', { title: 'Enter Code', signedIn: req.user, content: 'code', inputWrongCode: true })
    }

    res.redirect('/')
})

exports.getLogin = asyncHandler(async (req, res, next) => {
    const errors = req.flash('error')

    res.render('index', { title: 'Login', signedIn: req.user, content: 'login', errors: errors, data: req.body })
})

exports.postLogin = asyncHandler(async (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/log-in',
        failureFlash: 'Incorrect username or password'
    })(req, res, next);
})

exports.getLogout = asyncHandler(async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
})