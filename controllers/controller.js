const asyncHandler = require('express-async-handler')
const queries = require('../db/queries')
const bcrypt = require('bcryptjs')

exports.home = asyncHandler(async (req, res, next) => {
    const messages = await queries.getMessages();

    res.render('index', { title: 'Home', content: 'home', messages: messages });
})

exports.getSignUp = asyncHandler(async (req, res, next) => {
    res.render('index', { title: 'Sign Up', content: 'signup', errors: false, data: req.body })
})

exports.postSignUp = asyncHandler(async (req, res, next) => {
    

    try {
        bcrypt.hash(req.body.password, 10, async (err, password) => {
            if (err) {
                return next(err)
            } else {
                queries.addUser(req.body.username, password, req.body.first_name, req.body.last_name)

                res.redirect('/')
            }
        })
    } catch (err) {
        return next(err)
    }

})