var express = require('express');
const { body, validationResult } = require('express-validator')
var router = express.Router();
const controller = require('../controllers/controller')
const queries = require('../db/queries')

/* GET home page. */
router.get('/', controller.home);

router.get('/sign-up', controller.getSignUp)

router.post('/sign-up',
  [
    body('username').custom(async value => {
      const user = await queries.getUser(value);
      if (user) {
        throw new Error('Username already in use');
      }
    }),
    body('password').isLength({ min: 8 }).withMessage('Minimum length is 8 characters')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('index', {
        title: 'Sign Up',
        content: 'signup',
        errors: errors.array(),
        data: req.body
      });
    }
    next();
  },
  controller.postSignUp)

router.get('/code', (req, res, next) => {
  res.render('index', {title: 'Enter Code', content: 'code'})
})

module.exports = router;
