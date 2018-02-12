var express = require('express');
var router = express.Router();
var passport = require('passport');

require('../config/passport')(passport); // pass passport for configuration

/* GET login page. */
router.get('/', function(req, res) {
	res.render('login', { message: req.flash('loginMessage') } );
});

router.get('/landingPage', isLoggedIn, function(req, res) {
	res.render('landingPage.ejs', {
		user : req.user
	});
});

router.post('/authenticate', passport.authenticate('local-login', {
	successRedirect : '/login/landingPage', // redirect to the secure profile section
	failureRedirect : '/login', // redirect back to the login page if there is an error
	failureFlash : true // allow flash messages
}));

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}


module.exports = router;
