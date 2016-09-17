var express = require('express');
var router = express.Router();
var config = require('../database/database.config');
var Advertising = config.advertising;

router.get('/', function (request, response) {
  var user = request.user;

  Advertising.find({ author: user._id }, function (err, advertisingList) {
    if (err) { return response.send(err); }

    response.json(advertisingList);
  });
});

router.post('/', function (request, response) {
  var advertising = request.body.advertising;
  var user = request.user;

  var newAdvertising = new Advertising();
  newAdvertising.content = advertising;
  newAdvertising.author = user._id;

  newAdvertising.save(function (err) {
    if (err) { return response.send(err); }

    response.end();
  });
});

module.exports = router;
