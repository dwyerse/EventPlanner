var express = require('express');
var router = express.Router();
User = require('../models/user');

router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

router.get('/allUsers',function(req,res){
	User.find(function (err, users) {
		if (err) res.send(err);
		res.json(users);
	});	
});

router.get('/addUser',function(req,res){	
	addUser('TestName',1234,'test@test.ie','testpassword');
	res.redirect('/');
});

router.get('/findUserByName',function(req,res){	
	findUserById('TestName',function(response){
		res.send(response);
	});
});

router.get('/findUserById',function(req,res){	
	findUserByName(123,function(response){
		res.send(response);
	});
});

function addUser(name,email,password,callback){
	var newUser = new User({name: name,email: email,password:password}); 
	newUser.save(function (err) {
		if (err) return callback(err);
		return callback(err,newUser);
	});		
}

function findUserByName(name,callback){
	User.find({ name:name }, function(err,res){
		if (err) return;
		return callback(res);
	});	
}

function findUserById(id,callback){
	User.find({ _id:id }, function(err,res){
		if (err) return;
		return callback(res);
	});	
}

module.exports = router;
