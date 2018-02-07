var express = require('express');
var router = express.Router();

var exampleUser = {
	fName: 'Luke',
	lName: 'Agnew',
	phoneNumber: '0851234567',
	email: 'email@email.com',
	password: 'password123',
	passwordConfirm: 'password123',
	subscribed : true
};

/* GET create account page. */
router.get('create/account', function(req, res) {
	res.render('createAcc', {user:exampleUser });
});

//Handle POST
//Can find form values at req.body.ELEMNAMEHERE
router.post('create/account', function(req,res){
	res.sendStatus(200).send('Success!');
	res.redirect('/edit/account');
});


module.exports = router;