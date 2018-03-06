const users = require('../../app/controllers/users.server.controller');
const passport = require('passport');

module.exports = function(app){
  app.route('/api/auth/signup').post(users.signup);
  app.route('/api/auth/signin').post(users.signin);
  app.route('/api/auth/signout').get(users.signout);

  app.get('/api/oauth/facebook',passport.authenticate('facebook',{
    failureRedirect:'/signin',
    scope:['email']
  }));
  app.get('/api/oauth/facebook/callback',	passport.authenticate('facebook',	{
		failureRedirect:	'/signin',
		successRedirect:	'/',
    scope:['email']
  }));
  app.get('/api/oauth/google',	passport.authenticate('google',	{
		failureRedirect:	'/signin',
		scope:	[
				'https://www.googleapis.com/auth/userinfo.profile',
				'https://www.googleapis.com/auth/userinfo.email'
		],
}));
app.get('/api/oauth/google/callback',	passport.authenticate('google',	{
		failureRedirect:	'/signin',
		successRedirect:	'/'
}));
};
