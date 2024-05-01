const { Router } = require('express');
const { check } = require('express-validator');

const { signUp, login, validateToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.post(
    '/', 
    [
        check('email', 'The email is not valid').isEmail(),
        check('password', 'The password is required').not().isEmpty(),
        validateFields
    ],
    login
);

router.post(
    '/signup', 
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is not valid').isEmail(),
        check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
        validateFields
    ],
    signUp
);

router.get('/validate', validateToken);

module.exports = router;