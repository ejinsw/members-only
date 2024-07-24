var express = require('express');
const { body, validationResult } = require('express-validator')
var router = express.Router();
const controller = require('../controllers/controller')
const queries = require('../config/db/queries')

/* GET home page. */
router.get('/', controller.home);

router.get('/log-in', controller.getLogin)

router.post('/log-in', controller.postLogin)

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
        user: req.user,
        content: 'signup',
        errors: errors.array(),
        data: req.body
      });
    }
    next();
  },
  controller.postSignUp)

router.get('/code', controller.getCode)
router.post('/code', controller.postCode)

router.get('/log-out', controller.getLogout)

router.get ('/write-message', controller.getWriteMessage)
router.post ('/write-message', controller.postWriteMessage)
router.post ('/delete-message', controller.postDeleteMessage)

module.exports = router;
