const express = require('express');
const router = express.Router();
const controller = {
    channel: require('../controllers/channel.controller')
};
const middleware = {
    jwt: require('../middlewares/auth.middleware')
}

/* GET /validateid 
(
    id: channel id
)
*/
router.get('/owned', middleware.jwt.verifyJWT, controller.channel.getOwned);

/* GET /validateid 
(
    id: channel id
)
*/
router.get('/validateid', controller.channel.validateId);

/* POST /create
(
    id: channel id,
    title: channel title,
    description: channel description,
    field: field[0] name,
    fieldDesc: field[0] description
) 
*/
router.post('/create', middleware.jwt.verifyJWT, controller.channel.create);

/* POST /addfield
(
    id: channel id
    label: field label/name
)
*/
router.post('/addfield', middleware.jwt.verifyJWT, controller.channel.addField);

module.exports = router;
