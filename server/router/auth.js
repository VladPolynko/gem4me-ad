var bCrypt = require('bcrypt-nodejs');
var _ = require('lodash');
var express = require('express');
var router = express.Router();
var config = require('../database/database.config');
var User = config.user;
var tokenUtils = require('../utils/tokenUtils.js');

function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

router.post('/login', function (request, response) {
  var credentials = request.body.credentials;

  User.findOne({ phone: credentials.phone }, function (err, user) {
    if (err) { return response.status(500).send(err); }
    if (!user) { return response.status(401).json({ message: 'Invalid phone or password' }); }
    if (!isValidPassword(user, credentials.password)) { return response.status(401).json({ message: 'Invalid phone or password' }); }

    response.status(200).json({ user: _.omit(user, ['password']), token: tokenUtils.createJWT(user._id) });
  });
});

router.post('/register', function (request, response) {
  var credentials = request.body.credentials;

  User.findOne(credentials, function (err, user) {
    if (err) { return response.send(err); }
    if (user) { return response.json({ message: 'User exist with this credentials' }); }

    var newUser = new User();
    newUser.phone = credentials.phone;
    newUser.password = createHash(credentials.password);

    newUser.save(function (err) {
      if (err) { return response.send(err); }

      response.end();
    })
  });
});

router.post('/logout', function (request, response) {
  response.end();
});

module.exports = router;
