const express = require('express');
const private = express.Router();
const public = express.Router();
const router = express.Router();

const middleware = require('../../middlewares/auth.middleware');

/* Restricted access */
private.post('/create', );

/* Public access */

router.use('/public', public);
router.use('/protected', middleware.verifyJWT, private);

module.exports = router;