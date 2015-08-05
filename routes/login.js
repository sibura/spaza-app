var loggin = function(req, res, next){
  if (req.session.user){
    return next();
  }
  // the user is not logged in redirect him to the login page
  res.redirect('login', {layout: false});
};