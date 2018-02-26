var express = require('express');
var router = express.Router();
var userMapper = require('../mappers/userMapper');
var isLoggedIn = require('../config/utils').isLoggedIn;
var hashing = require('../config/hashing');

router.get('/account',isLoggedIn, function(req, res) {
	res.render('editAcc', { user: req.user,err: req.flash('err'),succ: req.flash('succ')});
});

router.get('/password', isLoggedIn, function(req, res) {
	res.render('changePassword', {err: req.flash('err'),succ: req.flash('succ')});
});

//Handle POST requests
//Need to replace exampleUser here with req.user
router.post('/password', isLoggedIn, function(req, res) {
	if (req.body.inputPassword1 == req.body.inputPassword2) {
		var {hash, salt} = hashing.createHash(req.body.inputPassword1);
		var updatedUser = {name: req.user.name, email: req.user.email, password:hash, type:req.user.type, eventsAttended:req.user.eventsAttended, salt:salt};
		userMapper.updateUserByEmail(req.user.email, updatedUser, function(error,result) {
			if (!result) {
				req.flash('err', 'User not found');
			} else if (error) {
				req.flash('err', error);
			} else {
				req.flash('succ', 'Successfully changed password!');
			}
			res.redirect('/edit/password');
		});
	} else {
		req.flash('err', 'Passwords do not match');
		res.redirect('/edit/password');
	}
});
//Need to replace password string with req.user.password
router.post('/account', isLoggedIn, function(req, res) {
	if(validUpdateParams(req.body)){
		var updatedUser =  {name: req.body.inputName, email: req.body.inputEmail, password:req.user.password, type:req.user.type, eventsAttended:req.user.eventsAttended, salt:req.user.salt};
		userMapper.updateUserByEmail(req.user.email, updatedUser, function(error,result) {
			if (!result) {
				req.flash('err', 'User not found');
			} else if (error) {
				req.flash('err', error);
			} else {
				//We need to update the passport stored user here with 'result'
				req.flash('succ', 'Successfully updated account!');
			}
			res.redirect('/edit/account');
		});
	} else {
		req.flash('err', 'Not all details provided');
		res.redirect('/edit/account');
	}
});
//Validate all correct params included in POST
function validUpdateParams(body){
	return (body.inputName && body.inputEmail);
}

module.exports = router;
