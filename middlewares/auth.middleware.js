const jwt = require('jsonwebtoken');

module.exports = {
    verify: (req, res, next) => {
        if (!req.headers.auth) {
            return res.status(401).json({
                error: 'no token provided'
            });
        }

        const token = req.headers.auth;

        const payload = jwt.verify(token);

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