var express = require('express');
var router = express.Router();
var userMapper = require('../mappers/userMapper');
var isLoggedIn = require('../config/utils').isLoggedIn;
var hashing = require('../config/hashing');
const NEWEVENTS_SUB = 'Event_new';

router.get('/account',isLoggedIn, function(req, res) {
	if(req.user.subscriptions.includes(NEWEVENTS_SUB)){
		req.user.subscribed = true;
	}
	res.render('editAcc', { user: req.user,err: req.flash('err'),succ: req.flash('succ')});
});

router.get('/password', isLoggedIn, function(req, res) {
	res.render('changePassword', {err: req.flash('err'),succ: req.flash('succ')});
});

router.post('/password', isLoggedIn, function(req, res) {
	if (req.body.inputPassword1 == req.body.inputPassword2) {
		var {hash, salt} = hashing.createHash(req.body.inputPassword1);
		var updatedUser = req.user;
		updatedUser.password= hash;
		updatedUser.salt =salt;
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

router.post('/account', isLoggedIn, function(req, res) {
	if(validUpdateParams(req.body)){
		if(req.body.subscribed && req.body.subscribed=='on'){
			req.user.subscriptions.push(NEWEVENTS_SUB);
		} else { //Remove new event subscription if subscribed
			req.user.subscriptions=req.user.subscriptions.filter(sub => sub !== NEWEVENTS_SUB);
		}
		var updatedUser = req.user;
		updatedUser.name = req.body.inputName;
		updatedUser.subscriptions = req.user.subscriptions;
		userMapper.updateUserByEmail(req.user.email, updatedUser, function(error,result) {
			if(error){
				req.flash('err', error);
			} else if (!result) {
				req.flash('err', 'User not found');
			} else {
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
