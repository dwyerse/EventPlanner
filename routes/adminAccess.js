var express = require('express');
var router = express.Router();
var userMapper = require('../mappers/userMapper');
var isLoggedIn = require('../config/utils').isLoggedIn;
var isAdminUser = require('../config/utils').isAdminUser;
var hasOwnProperty = Object.prototype.hasOwnProperty;

router.get('/admin',isLoggedIn, isAdminUser, function(req, res) {
	res.render('adminAccess', { user: req.user,err: req.flash('err'),succ: req.flash('succ')});
});

router.post('/admin', isLoggedIn, isAdminUser, function(req, res) {
	if(validEmail(req.body)){
		userMapper.findUserByEmail(req.body.userEmail, function(error, result) {
			if (!result || isEmpty(result)) {
				req.flash('err', 'User email not found');
				res.redirect('/grant/admin');
			} else if (error) {
				req.flash('err', error);
			} else {

				var adminType = 'admin';
				
				result.type = adminType;

				userMapper.updateUserByEmail(result.email, result, function(updateErr,updateRes) {
					if (!updateRes) {
						req.flash('err', 'User email not found');
					} else if (error) {
						req.flash('err', updateErr);
					} else {
						//We need to update the passport stored user here with 'result'
						req.flash('succ', 'Successfully granted admin access!');
					}
					res.redirect('/grant/admin');
				});
			}
		});

	} else {
		req.flash('err', 'No email provided');
		res.redirect('/grant/admin');
	}
});

function isEmpty(obj) {
	// null and undefined are "empty"
	if (obj == null) return true;

	// Assume if it has a length property with a non-zero value
	// that that property is correct.
	if (obj.length > 0)    return false;

	if (obj.length === 0)  return true;

	if (typeof obj !== 'object') return true;

	// Does it have any properties of its own?
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false;
	}

	return true;
}

//Validate all correct params included in POST
function validEmail(body){
	return (body.userEmail);
}

module.exports = router;