var express = require('express');
var router = express.Router();
var userMapper = require('../mappers/userMapper');

var exampleUser = {
	email: '1@tcd.ie',
	name: 'Sean Durban',
	subscribed: false,
	salt: 'OGSalt'
};

//all routes should be protected (require user logged in)
router.get('/account', function(req, res) {
	res.render('editAcc', { user: exampleUser });
});
router.get('/account22', function() {
	return new Promise(function(resolve) {
		userMapper.addUser('Seamus','dwyerse@tcd.ie','password','admin','fakesalt',function(){
			resolve();
		});
	});
});

router.get('/password', function(req, res) {
	res.render('changePassword', {});
});

//Handle POST requests
//Need to replace exampleUser here with req.user
router.post('/password', function(req, res) {
	if (req.body.inputPassword1 == req.body.inputPassword2) {
		exampleUser.password = req.body.inputPassword1;
		var updatedUser =  { name: req.body.inputName, email: req.body.inputEmail, password:'xx21asd', salt:'OGSalt'};
		//{{hashedPassword, genSalt} = createNewHash(inputPassword1);
		//var updatedUser = {name: req.user.name, email: req.user.email, password:hashedPassword, salt:genSalt}
		userMapper.updateUserByEmail(exampleUser.email, updatedUser, function(error,result) {
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
//Need to replace password string with req.user.password
router.post('/account', function(req, res) {
	if(validUpdateParams(req.body)){
		var updatedUser =  { name: req.body.inputName, email: req.body.inputEmail, password:'xx21asd', salt:'OGSalt'};
		//var updatedUser =  {name: req.body.inputName, email: req.body.inputEmail, password:req.user.password, salt:req.user.salt};
		userMapper.updateUserByEmail('dwyerse@tcd.ie', updatedUser, function(error,result) {
			if (!result) {
				res.flash('err', 'User not found');
			} else if (error) {
				res.flash('err', error);
			} else {
				//We need to update the passport stored user here with 'result'
				res.flash('succ', 'Successfully updated account!');
			}
			res.redirect('/edit/account');
		});
	} else {
		res.flash('err', 'Not all details provided');
		res.redirect('/edit/account');
	}
});
//Validate all correct params included in POST
function validUpdateParams(body){
	return (body.inputName && body.inputEmail);
}

module.exports = router;
