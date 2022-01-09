const express = require('express');
const router = express.Router();
const _helper = require('../helpers/basic.helper');

const middlewares = {
    auth: require('../middlewares/auth.middleware'),
};

const controllers = {
    key: require('../controllers/key.controller'),
};

router.post('/create', middlewares.auth.verifyJWT, async (req, res) => {
    try {
        const result = await controllers.key.create(req.payload.username, req.payload.id);
        res.status(200).json(result);
    } catch (err) {
        _helper.log(`Unable to create key: ${err.message}`, 'error', 'red');
        res.status(500).json(err);
    }
});

router.get('/test', async (req, res) => {
    try {
        const key = req.query.key;
        const result = await controllers.key.test(key);

        res.status(200).json({
            message: (result) ? 'Key is valid' : 'Key is invalid',
        });
    } catch (err) {
        _helper.log(`Unable to test key router: ${err.message}`, 'error', 'red');
        res.status(500).json(err);
    }
});

router.get('/find', middlewares.auth.verifyJWT, async (req, res) => {
    try {
        const { id } = req.payload;
        const keys = await controllers.key.getKeys(id);

        res.status(200).json(keys);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;