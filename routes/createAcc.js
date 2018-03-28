var express = require('express');
var router = express.Router();
var userMapper = require('../mappers/userMapper');
var hashing = require('../config/hashing');
const NEWEVENTS_SUB = 'Event_new';

/* GET create account page. */
router.get('/account', function(req, res) {
	res.render('createAcc', {err: req.flash('err'), succ: req.flash('succ') });
});

//Handle POST requests
//Can find form values at req.body.ELEMNAMEHERE
router.post('/account', function(req,res){

	if (validUserParams(req.body)) {
		if (req.body.inputPassword === req.body.inputConfirmPassword) {
			var {hash, salt} = hashing.createHash(req.body.inputPassword);

			var userType = 'user';
			var subscriptions = (req.body.subscribed && req.body.subscribed=='on')? [NEWEVENTS_SUB]:[];
			userMapper.addUser(req.body.inputName, req.body.inputEmail, req.body.inputTelephone, hash, userType, salt, subscriptions, [], function(error, result) {
				if (!result) {
					req.flash('err', 'User could not be created');
				} else if (error) {
					req.flash('err', error);
				} else {
					req.flash('succ', 'Successfully created new account!');
				}
				res.redirect('/login');
			});
		} else {
			req.flash('err', 'Passwords do not match');
			res.redirect('/create/account');
		}
	} else {
		req.flash('err', 'Not all details provided');
		res.redirect('/create/account');
	}
});

//Validate all correct params included in POST
function validUserParams(body) {
	return (body.inputName && body.inputEmail && body.inputPassword && body.inputConfirmPassword);
}

module.exports = router;
