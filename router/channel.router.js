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
router.get('/public/:id', controller.channel.getPublic);
router.get('/public', controller.channel.getAllPublic);

router.get('/validateid', controller.channel.validateId);

router.post('/create', middleware.jwt.verifyJWT, controller.channel.create);
router.post('/update/:id', middleware.jwt.verifyJWT, controller.channel.update);

router.post('/addfield', middleware.jwt.verifyJWT, controller.channel.addField);
router.post('/updatekeys', middleware.jwt.verifyJWT, controller.channel.updateKeys);
router.delete('/delete/:id', middleware.jwt.verifyJWT, controller.channel.delete);

router.post('/assignFilters', middleware.jwt.verifyJWT, controller.channel.assignFilters);

router.get('/fields/data/:id', controller.channel.getFieldsData);
router.post('/visibility/:id', middleware.jwt.verifyJWT, controller.channel.setVisibility);
router.get('/visibility/:id', controller.channel.getVisibility);

router.post('/like/:id', middleware.jwt.verifyJWT, controller.channel.like);
router.get('/likes/:id', controller.channel.getTotalLikes);

router.get('/view/:id', controller.channel.addView);

module.exports = router;
