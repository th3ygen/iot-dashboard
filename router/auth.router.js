const express = require('express');
const router = express.Router();
const controller = {
    auth: require('../controllers/auth.controller')
};
const middleware = {
    auth: require('../middlewares/auth.middleware')
};

router.post('/login', controller.auth.login);
router.post('/register', controller.auth.register);
router.delete('/delete/:id', [middleware.auth.verifyJWT, middleware.auth.adminOnly], controller.auth.delete);

router.get('/list', [middleware.auth.verifyJWT, middleware.auth.adminOnly], controller.auth.getAll);

router.post('/create', [middleware.auth.verifyJWT, middleware.auth.adminOnly], controller.auth.create);
router.get('/user/:id', [middleware.auth.verifyJWT, middleware.auth.adminOnly], controller.auth.get);
router.patch('/user/:id', [middleware.auth.verifyJWT, middleware.auth.adminOnly], controller.auth.update);

module.exports = router;
