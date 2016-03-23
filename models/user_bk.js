var mongodb = require('./db');

function User(user){
  this.name = user.name;
  this.password = user.password;
}

User.prototype.save = function(){
  var user = {
    name : this.name,
    password : this.password,
    email : this.email
  };
  mongodb.open(function(err, db){
    if(){

    }
    db.collection('users',function(err,collection){
      if(){

      }

      collection.insert(user,{
        safe : true
      },function(){
        mongodb.close();
        if(err){
          return callback(err);
        }
        callback(null,user[0]);
      });
    });
  });
};

Uer.get = function(name,callback){
  if(){

  }

  db.collection('users',function(){

  });

};
