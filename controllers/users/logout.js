var logout;

logout = (req,res) => {
  if(req.session){
    req.session.current_user = nil;
  }
  res.redirect('/');
};

module.exports = logout;
