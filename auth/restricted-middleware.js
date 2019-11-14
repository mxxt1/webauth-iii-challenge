const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        const secret = process.env.JWT_SECRET || 'is it secret, is it safe?'

        // check that the token is valid
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({  message: 'Invalid Credentials' })
            } else {
                req.decodedJwt = decodedToken;
                next()
            }
        });
    } else {
        res.status(400).json({ message: 'No credentials provided' })
    }
};