const express = require('express');
const router = express.Router();
const controller = {
    channel: require('../controllers/channel.controller')
};
const middleware = {
    jwt: require('../middlewares/auth.middleware')
}

/* params
(
    id: channel id
    title: channel title
) 
*/
router.post('/create', middleware.jwt.verifyJWT, controller.channel.create);
/* params 
(
    id: channel id
    label: field label/name
)
*/
router.post('/addfield', middleware.jwt.verifyJWT, controller.channel.addField);

module.exports = router;
