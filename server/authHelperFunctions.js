//Thank you Dakota and Jon
import jwt from 'jsonwebtoken'
import User from './models/userSchema.js'
//process.env.secret
import config from './config/config.js';
const jwt_secret = process.env.secret || config.secret;

// function to create tokens
export const signToken = (user) => {
    console.log("In sign tokeN" + user);
    const userData = user.toObject();
    delete userData.password;
    return jwt.sign(userData, jwt_secret)
};

// function to verify tokens
export const verifyToken = (req, res, next) => {
    const token = req.get('token') || req.body.token || req.query.token;

    // reject user if no token
    if(!token) return res.json({success: false, message: "No token provided"});

    // try to verify token
    jwt.verify(token, jwt_secret, (err, decodedData) => {
        // error check
        if(err) return res.json({success: false, message: "Error with token"});

        // find user associated with token
        User.findById(decodedData._id, (err, user) => {
            // reject token if no user
            if(!user) return res.json({success: false, message: "Error with token"});

            req.user = user;
            next();
        })
    })
};
