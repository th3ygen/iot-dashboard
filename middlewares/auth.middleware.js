const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const helper = require('../helpers/basic.helper');

const Key = mongoose.model('Key');

module.exports = {
    verifyJWT: (req, res, next) => {
        if (!req.headers.auth) {
            return res.status(401).json({
                error: 'no token provided'
            });
        }

        const token = req.headers.auth;

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if (!payload) {
            return res.status(401).json({
                error: 'invalid token'
            });
        }

        req.token = token;
        req.payload = payload;

        next();
    }
};