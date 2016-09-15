var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});
var groupSchema = new Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  hasAdvertising: { type: Boolean, required: true, default: false }
});
var advertisingSchema = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true }
});

var localDB = 'mongodb://localhost/get4me';

exports.user = mongoose.model('user', userSchema);
exports.group = mongoose.model('group', groupSchema);
exports.advertising = mongoose.model('advertising', advertisingSchema);
exports.connectToDataBase = function () {
  console.log('Server connect 2 database');

  return mongoose.connect(localDB);
};
