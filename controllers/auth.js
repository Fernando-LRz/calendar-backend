const { response } = require('express');
const User = require('../models/User');

const signUp = async(req, res = response) => {
    const { email } = req.body;

    try {        
        const user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'Email is already registered'
            });
        }

        const newUser = new User(req.body);
        await newUser.save();
    
        res.status(201).json({
            ok: true,
            uid: newUser.id,
            name: newUser.name
        });

    } catch (error) {
        // console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'An error occurred, please try again later'
        })
    }
}

const login = (req, res = response) => {
    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'Log In'
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