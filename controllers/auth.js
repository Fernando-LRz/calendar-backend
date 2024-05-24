const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { generateJWT } = require('../helpers/generateJWT');

const signUp = async(req, res = response) => {
    const { email, password } = req.body;

    try {        
        const user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'Email is already registered'
            });
        }

        const newUser = new User(req.body);

        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);

        await newUser.save();
        const token = await generateJWT(newUser.id, newUser.name);
    
        res.status(201).json({
            ok: true,
            uid: newUser.id,
            name: newUser.name,
            token
        });

    } catch (error) {
        // console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'An error occurred, please try again later'
        });
    }
}

const login = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: 'The email is not registered'
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password is incorrect'
            });
        }

        const token = await generateJWT(user.id, user.name);
        
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        // console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'An error occurred, please try again later'
        });
    }

}

const revalidateToken = async(req, res = response) => {
    const { uid, name } = req;
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        token
    });
}

module.exports = {
    signUp,
    login,
    revalidateToken
}