var express = require('express');
var router = express.Router();
User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res) {		
	res.render('index');
});

router.get('/getusers',function(req,res){	

	User.find(function (err, users) {
		if (err) res.send(err);
		res.json(users);
	});	
});

module.exports = router;
