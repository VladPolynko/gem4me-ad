var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes.js');
var app = express();

var port = Number(process.env.PORT || 8000);

app.use('/', express.static('client'));
app.use('/node_modules', express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  next();
});

app.use('/api', routes);

app.listen(port);
