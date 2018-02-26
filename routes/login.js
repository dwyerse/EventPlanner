var express = require('express');
var router = express.Router();
var passport = require('passport');
var isLoggedIn = require('../config/utils').isLoggedIn;

/* GET login page. */
router.get('/', function(req, res) {
	res.render('login', { message: req.flash('loginMessage'),err: req.flash('err'),succ: req.flash('succ') });
});

router.get('/landingPage', isLoggedIn, function(req, res) {
	res.render('landingPage', {
		user : req.user
	});
});

router.post('/authenticate', passport.authenticate('local-login', {
	successRedirect : '/login/landingPage', // redirect to the secure profile section
	failureRedirect : '/login', // redirect back to the login page if there is an error
	failureFlash : true // allow flash messages
}));

module.exports = router;
