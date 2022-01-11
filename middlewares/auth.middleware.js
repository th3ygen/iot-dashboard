const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const helper = require('../helpers/basic.helper');
const PrettyError = require('pretty-error');

const pe = new PrettyError();

const Key = mongoose.model('Key');

module.exports = {
    verifyJWT: (req, res, next) => {
        try {
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
        } catch (e) {
            /* helper.log(pe.render(e), "ROUTE: /api/channel/verifyJWT", "red"); */
            res.status(401).json({
                msg: 'invalid token',
            });
        }

    }
};