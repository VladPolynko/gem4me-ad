var jwt = require('jsonwebtoken');
var moment = require('moment');
var credentials = require('../app.config.js');

function createJWT(userPhone) {
  var payload = {
    _id: userPhone,
    iat: moment().unix(),
    exp: moment().add(1, 'days').unix()
  };

  return jwt.sign(payload, credentials.TOKEN_SECRET);
}

function decodeJWT(token) {
  return jwt.decode(token);
}

module.exports.createJWT = createJWT;
module.exports.decodeJWT = decodeJWT;
