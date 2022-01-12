const express = require('express');
const router = express.Router();

const controller = require('../controllers/filter.controller');
const middleware = {
    auth: require('../middlewares/auth.middleware')
};

router.post('/create', middleware.auth.verifyJWT, controller.create);
router.get('/owned', middleware.auth.verifyJWT, controller.getOwned);
router.get('/id/:id', middleware.auth.verifyJWT, controller.getById);

router.patch('/update', middleware.auth.verifyJWT, controller.update);


module.exports = router;