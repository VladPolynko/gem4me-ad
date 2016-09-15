var express = require('express');
var router = express.Router();
var config = require('../database/database.config');
var Group = config.group;

router.get('/:userPhone', function (request, response) {
  var userPhone = request.params.userPhone;

  Group.find({ author: userPhone }, function (err, groups) {
    if (err) { return response.send(err); }

    response.json(groups)
  });
});

router.post('/', function (request, response) {
  var group = request.body.group;

  var newGroup = new Group();
  newGroup.name = group.name;
  newGroup.author = group.author;

  newGroup.save(function (err) {
    if (err) { return response.send(err); }

    response.end();
  });
});

router.put('/:groupId', function (request, response) {
  var groupId = request.params.groupId;
  var group = request.body.group;

  Group.update({_id: groupId},
      {
        $set: {
          name: group.name,
          author: group.author,
          hasAdvertising: group.hasAdvertising
        }
      }, function (err) {
        if (err) { return response.send(err); }

        response.end();
      });
});

module.exports = router;
