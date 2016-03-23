var express,router,User;

express = require('express');
router = express.Router();
User = require('../models/').UserModel;
var user_actions = require('../controllers/users/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
  return res.send('respond with a resource');
});

router.post('/login',user_actions.login);

router.post('/loginjson',function(){

});

router.post('/register',(req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var _user = new User({
    name : username,
    password : password
  });

  return _user.saveAsync().then((users) => {
    var user = users[0];
    return res.redirect('/login');
  }).catch((err) => {
    res.status(200).json({

    });
  });
});

router.get('/login',(req, res) => {
  return res.redirect('../login');
});

router.get('/register',function(req, res){
  return res.redirect('../register');
});


module.exports = router;
