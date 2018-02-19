var express = require('express');
var router = express.Router();
var userMapper = require('../mappers/userMapper');
var isLoggedIn = require('../config/utils').isLoggedIn;
var isAdminUser = require('../config/utils').isAdminUser;

router.get('/admin',isLoggedIn, isAdminUser, function(req, res) {
	res.render('adminAccess', { user: req.user,err: req.flash('err'),succ: req.flash('succ')});
});

router.post('/admin', isLoggedIn, isAdminUser, function(req, res) {
	if(validEmail(req.body)){
		userMapper.findUserByEmail(req.body.userEmail, function(error, result) {
			if (!result) {
				req.flash('err', 'User email not found');
				res.redirect('/');
			} else if (error) {
				req.flash('err', error);
			} else {

				var adminType = 'admin';
				var adminGrantedUser =  {name: result[0].name, email: result[0].email, password:result[0].password, type: adminType, salt:result[0].salt};
		
				userMapper.updateUserByEmail(result[0].email, adminGrantedUser, function(error,result) {
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
			}

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