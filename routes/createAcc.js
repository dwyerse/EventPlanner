var express = require('express');
var router = express.Router();
var userMapper = require('../mappers/userMapper');
var hashing = require('../config/hashing');

/* GET create account page. */
router.get('/admin', function(req, res) {
	res.render('createAcc', {err: req.flash('err'), succ: req.flash('succ') });
});

//Handle POST requests
//Can find form values at req.body.ELEMNAMEHERE
router.post('/admin', function(req,res){

	if (validUserParams(req.body)) {
		if (req.body.inputPassword === req.body.inputConfirmPassword) {
			var {hash, salt} = hashing.createHash(req.body.inputPassword);

			var userType = 'user';

			userMapper.addUser(req.body.inputName, req.body.inputEmail, hash, userType, salt, function(error, result) {
				if (!result) {
					req.flash('err', 'User could not be created');
				} else if (error) {
					req.flash('err', error);
				} else {
					req.flash('succ', 'Successfully created new admin account!');
				}
				res.redirect('/login');
			});
		} else {
			req.flash('err', 'Passwords do not match');
			res.redirect('/create/admin');
		}
	} else {
		req.flash('err', 'Not all details provided');
		res.redirect('/create/admin');
	}
});

//Validate all correct params included in POST
function validUserParams(body) {
	return (body.inputName && body.inputEmail && body.inputPassword && body.inputConfirmPassword);
}

module.exports = router;
