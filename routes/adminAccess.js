var express = require('express');
var router = express.Router();
var userMapper = require('../mappers/userMapper');
var isLoggedIn = require('../config/utils').isLoggedIn;

router.get('/admin',isLoggedIn, function(req, res) {
	res.render('adminAccess', { user: req.user,err: req.flash('err'),succ: req.flash('succ')});
});

router.post('/admin', isLoggedIn, function(req, res) {
	if(validEmail(req.body)){
		var user = userMapper.findUserByEmail(req.user.email, function(error, result) {
			if (!result) {
				req.flash('err', 'User email not found');
			} else if (error) {
				req.flash('err', error);
			} else {
				req.flash('succ', 'Successfully found user!');
			}
		});

		var adminType = 'admin';
		var adminGrantedUser =  {name: user.name, email: user.email, password:user.password, type: adminType, salt:user.salt};
		
		userMapper.updateUserByEmail(user.email, adminGrantedUser, function(error,result) {
			if (!result) {
				req.flash('err', 'User email not found');
			} else if (error) {
				req.flash('err', error);
			} else {
				//We need to update the passport stored user here with 'result'
				req.flash('succ', 'Successfully granted admin access!');
			}
			res.redirect('/grant/admin');
		});
	} else {
		req.flash('err', 'Not all details provided');
		res.redirect('/grant/admin');
	}
});
//Validate all correct params included in POST
function validEmail(body){
	return (body.userEmail);
}

module.exports = router;