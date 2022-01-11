const express = require('express');
const router = express.Router();
const controller = {
    channel: require('../controllers/channel.controller')
};
const middleware = {
    jwt: require('../middlewares/auth.middleware')
}

router.get('/owned', middleware.jwt.verifyJWT, controller.channel.getOwned);
router.get('/id/:id', middleware.jwt.verifyJWT, controller.channel.getById);

router.get('/validateid', controller.channel.validateId);

router.post('/create', middleware.jwt.verifyJWT, controller.channel.create);

router.post('/addfield', middleware.jwt.verifyJWT, controller.channel.addField);
router.post('/updatekeys', middleware.jwt.verifyJWT, controller.channel.updateKeys);
router.delete('/delete/:id', middleware.jwt.verifyJWT, controller.channel.delete);


module.exports = router;
