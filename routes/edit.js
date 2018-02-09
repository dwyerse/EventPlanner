var express = require('express');
var router = express.Router();

var exampleUser = {
	email: 'email@email.com',
	name: 'Sean Durban',
	subscribed : false
};

/* GET edit page. */
router.get('/account', function(req, res) {
	res.render('editAcc', {user:exampleUser});
});

router.get('/password', function(req, res) {
	res.render('changePassword',{});
});

//Handle POST
//Can find form values at req.body.ELEMNAMEHERE
router.post('/password', function(req,res){
	if(req.body.inputPassword1 == req.body.inputPassword2){
		res.flash('succ', 'Successfully changed password!');
	} else {
		res.flash('err', 'Passwords do not match');
	}
	return res.redirect('/edit/password');
});
router.post('/account', function(req,res){
	if(req.body.inputName && req.body.inputEmail){
		res.flash('succ', 'Successfully edited account!');
	} else {
		res.flash('err', 'Not all details provided');
	}
	return res.redirect('/edit/account');
});


module.exports = router;
