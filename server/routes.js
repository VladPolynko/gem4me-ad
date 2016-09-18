var express = require('express');
var router = express.Router();
var configDb = require('./database/database.config.js');
var authAPI = require('./router/auth.js');
var groupAPI = require('./router/group');
var advertisingAPI = require('./router/advertising.js');

configDb.connectToDataBase();

router.use('/auth', authAPI);
router.use('/groups', groupAPI);
router.use('/advertising', advertisingAPI);

module.exports = router;
