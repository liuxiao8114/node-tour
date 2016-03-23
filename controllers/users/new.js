var create = (req, res) => {
  var User = req.model.UserModel;

  var _user = new User({
    name : 'xiao',
    password : 3385
  });
  _user.save((err,user) => {
    if(err){
      console.log(err);
      throw err;
    } else{
      console.log(err);
    }
  });
};

exports.create = create;
