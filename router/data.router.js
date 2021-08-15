const express = require('express');
const router = express.Router();

const controller = require('../controllers/data.controller');
const middleware = {
    auth: require('../middlewares/auth.middleware')
};

router.get('/get', controller.findByChannelId);

module.exports = router;