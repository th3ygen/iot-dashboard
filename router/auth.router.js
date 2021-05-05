const express = require('express');
const router = express.Router();
const controller = {
    auth: require('../controllers/auth.controller')
};

router.post('/login', controller.auth.login);
router.post('/register', controller.auth.register);

module.exports = router;
