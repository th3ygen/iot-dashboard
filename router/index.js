const express = require('express');
const router = express.Router();

router.use('/user', require('./user.router'));
router.use('/auth', require('./auth.router'));
router.use('/channel', require('./channel.router'));
router.use('/api', require('./api'));

module.exports = router;
