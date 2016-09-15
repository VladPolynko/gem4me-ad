var express = require('express');
var router = express.Router();
var configDb = require('./database/database.config.js');
var authAPI = require('./router/auth.js');
var groupAPI = require('./router/group');

configDb.connectToDataBase();

router.use('/auth', authAPI);
router.use('/groups', groupAPI);

module.exports = router;
