var express = require('express');
var router = express.Router();
var userMapper = require('../mappers/userMapper');

var exampleUser = {
	email: '1@tcd.ie',
	name: 'Sean Durban',
	subscribed: false
};

//all routes should be protected (require user logged in)
router.get('/account', function(req, res) {
	res.render('editAcc', { user: exampleUser });
});

router.get('/password', function(req, res) {
	res.render('changePassword', {});
});

//Handle POST
//Can find form values at req.body.ELEMNAMEHERE
router.post('/password', function(req, res) {
	if (req.body.inputPassword1 == req.body.inputPassword2) {
		exampleUser.password = req.body.inputPassword1;
		userMapper.updateUserByEmail(exampleUser.email, exampleUser, function(error,result) {
			if (!result) {
				res.flash('err', 'User not found');
			} else if (error) {
				res.flash('err', error);
			} else {
				res.flash('succ', 'Successfully changed password!');
			}
			res.redirect('/edit/password');
		});
	} else {
		res.flash('err', 'Passwords do not match');
		res.redirect('/edit/password');
	}
});
router.post('/account', function(req, res) {
	if (req.body.inputName && req.body.inputEmail) {
		res.flash('succ', 'Successfully edited account!');
	} else {
		res.flash('err', 'Not all details provided');
	}
	return res.redirect('/edit/account');
});

module.exports = router;
