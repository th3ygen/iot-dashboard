const express = require('express');
const router = express.Router();
const controller = {
    channel: require('../controllers/channel.controller')
};
const middleware = {
    jwt: require('../middlewares/auth.middleware')
}

router.get('/add', middleware.jwt.verifyJWT, controller.channel.create);
router.get

module.exports = router;
