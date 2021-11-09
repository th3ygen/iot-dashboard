const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.status(200).json({
        msg: 'nice'
    });
})

router.use('/user', require('./user.router'));
router.use('/auth', require('./auth.router'));
router.use('/channel', require('./channel.router'));
router.use('/data', require('./data.router'));
router.use('/key', require('./key.router'));
router.use('/api', require('./api'));

require('./mqtt.router');

module.exports = router;
