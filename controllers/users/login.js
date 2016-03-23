var login;

login = function(req, res){
  var User = req.model.UserModel;
  var username = req.body.username;
  var password = req.body.password;
  var user = new User({
    name : username,
    password : password
  });
  var cb = function(err,sur){
    var half_hour;
    if(err){
      req.session.current_user = void 0;
      console.error(err);
      return res.status(200).json({
        data: {},
        status: {
          code: err.code,
          msg: err.name + ' : ' + err.err
        }
      });
    } else {
      req.session.current_user = sur;
      half_hour = 3600000 / 2;
      req.session.cookie.expires = new Date(Date.now() + half_hour);
      req.session.cookie.maxAge = half_hour;
      console.error(req.session.current_user);
      return res.redirect('/home');
    }
  };
  console.log(user.is_exist);
  return user.is_exist;
};

module.exports = login;
