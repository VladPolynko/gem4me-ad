var express = require('express');
var router = express.Router();
var configDb = require('./database/database.config.js');
var configApp = require('./app.config.js');
var authAPI = require('./router/auth.js');
var groupAPI = require('./router/group');
var advertisingAPI = require('./router/advertising.js');
var jwt = require('express-jwt');
var auth = jwt({ secret: configApp.TOKEN_SECRET, userProperty: 'user' });

configDb.connectToDataBase();

router.use('/auth', authAPI);
router.use('/groups', auth, groupAPI);
router.use('/advertising', auth, advertisingAPI);

module.exports = router;
