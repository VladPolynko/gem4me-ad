var express = require('express');
var router = express.Router();
var config = require('../database/database.config');
var Group = config.group;

router.get('/', function (request, response) {
  var user = request.user;

  Group.find({ author: user._id }, function (err, groups) {
    if (err) { return response.send(err); }

    response.json(groups)
  });
});

router.post('/', function (request, response) {
  var group = request.body.group;
  var user = request.user;

  var newGroup = new Group();
  newGroup.name = group.name;
  newGroup.author = user._id;

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
