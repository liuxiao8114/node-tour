var mongoose = require('mongoose');
var promise = require('bluebird');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name : {
    type : String
  },
  password: {
    type: String,
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.methods.is_exist = function(cb){
  var query;
  query = {
    name : this.name,
    password : this.password
  };
//  return UserModel.findOne(query,cb);
  return this.model('UserModel').findOne(query, cb);
};

var UserModel = mongoose.model('UserModel',UserSchema);

promise.promisifyAll(UserModel);
promise.promisifyAll(UserModel.prototype);

var _user = new UserModel({
  name:'uncle sang',
  password:'ewrewrwer'
});

console.log(_user.is_exist());

module.exports = UserModel;
