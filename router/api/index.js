const express = require('express');
const router = express.Router();

router.use('/key', require('./key.api'));

module.exports = router;
