const users = require('../../app/controllers/users.server.controller');
const passport = require('passport');

module.exports = function(app){
  app.route('/users').post(users.create).get(users.list);
  app.route('/users/:userId').get(users.read).put(users.update).delete(users.delete);
  app.param('userId',users.userID);

  app.route('/signup').get(users.renderSignup).post(users.signup);
  app.route('/signin').get(users.renderSignin).post(passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/signin',
    failureFlash:true
  }));
  app.get('/signout',users.signout);

  app.get('/oauth/facebook',passport.authenticate('facebook',{
    failureRedirect:'/signin',
    scope:['email']
  }));
  app.get('/oauth/facebook/callback',	passport.authenticate('facebook',	{
		failureRedirect:	'/signin',
		successRedirect:	'/',
    scope:['email']
  }));
  app.get('/oauth/google',	passport.authenticate('google',	{
		failureRedirect:	'/signin',
		scope:	[
				'https://www.googleapis.com/auth/userinfo.profile',
				'https://www.googleapis.com/auth/userinfo.email'
		],
}));
app.get('/oauth/google/callback',	passport.authenticate('google',	{
		failureRedirect:	'/signin',
		successRedirect:	'/'
}));
};
