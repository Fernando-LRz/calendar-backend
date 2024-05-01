const { response } = require('express');

const signUp = (req, res = response) => {
    const { name, email, password } = req.body;

    res.status(201).json({
        ok: true,
        msg: 'Sign Up',
        name,
        email,
        password
    });
}

const login = (req, res = response) => {
    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'Log In',
        email,
        password
    });
}

const validateToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Validate Token'
    });
}

module.exports = {
    signUp,
    login,
    validateToken
}