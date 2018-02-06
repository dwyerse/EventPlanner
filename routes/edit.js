var express = require('express');
var router = express.Router();

var exampleUser = {
	email: 'email@email.com',
	fName: 'Sean',
	lName: 'Durban',
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
	res.sendStatus(200).send('success');
});
router.post('/account', function(req,res){
	if(req.body.inputfName && req.body.inputfName=='S'){
		res.flash('succ', 'Success!');
		res.redirect('/edit/account');
	} else {
		res.flash('err', 'Invalid email provided');
		res.render('editAcc', {user:exampleUser});
	}
});


module.exports = router;
