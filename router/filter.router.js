const express = require('express');
const router = express.Router();

const controller = require('../controllers/filter.controller');
const middleware = {
    auth: require('../middlewares/auth.middleware')
};

router.get('/list', [middleware.auth.verifyJWT, middleware.auth.adminOnly], controller.list);

router.post('/create', middleware.auth.verifyJWT, controller.create);
router.get('/owned', middleware.auth.verifyJWT, controller.getOwned);
router.get('/id/:id', middleware.auth.verifyJWT, controller.getById);

router.patch('/updatetest/:id', middleware.auth.verifyJWT, controller.updateTest);
router.patch('/update', middleware.auth.verifyJWT, controller.update);

router.delete('/delete/:id', middleware.auth.verifyJWT, controller.delete);


module.exports = router;