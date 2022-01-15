const express = require('express');
const router = express.Router();
const controller = {
    webhook: require('../controllers/webhook.controller')
};
const middleware = {
    auth: require('../middlewares/auth.middleware')
};

router.post('/create', middleware.auth.verifyJWT, controller.webhook.create);
router.patch('/update/:id', middleware.auth.verifyJWT, controller.webhook.update);
router.delete('/delete/:id', middleware.auth.verifyJWT, controller.webhook.delete);
router.get('/get/:id', middleware.auth.verifyJWT, controller.webhook.get);
router.get('/owned', middleware.auth.verifyJWT, controller.webhook.getOwned);

router.post('/toggle/:id', middleware.auth.verifyJWT, controller.webhook.toggleActive);

module.exports = router;
