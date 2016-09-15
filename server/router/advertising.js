var express = require('express');
var router = express.Router();
var config = require('../database/database.config');
var Advertising = config.advertising;

router.get('/:userPhone', function (request, response) {
  var userPhone = request.params.userPhone;

  Advertising.find({ author: userPhone }, function (err, advertisingList) {
    if (err) { return response.send(err); }

    response.json(advertisingList);
  });
});

router.post('/', function (request, response) {
  var advertising = request.body.data.advertising;
  var author = request.body.data.author;

  var newAdvertising = new Advertising();
  newAdvertising.content = advertising;
  newAdvertising.author = author;

  newAdvertising.save(function (err) {
    if (err) { return response.send(err); }

    response.end();
  });
});

module.exports = router;
