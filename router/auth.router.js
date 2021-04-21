const express = require('express');
const router = express.Router();
const controller = {
    auth: require('../controllers/auth.controller')
};

router.get('/test', (req, res) => {
    res.status(200).json({
        msg: 'nc'
    });
})
router.post('/login', controller.auth.login);
router.post('/register', controller.auth.register);

module.exports = router;
