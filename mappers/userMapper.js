User = require('../models/user');

function allUsers(callback){
	User.find(function (err,users) {
		return callback(err,users);
	});	
}

function addUser(name,email,password,type,callback){
	var newUser = new User({name: name,email: email,password:password,type:type}); 
	newUser.save(function (err,product) {
		return callback(err,product);
	});		
}

function findUserByName(name,callback){
	User.find({name:name }, function(err,res){
		return callback(err,res);
	});	
}

function findUserById(id,callback){
	User.find({ _id:id }, function(err,res){
		return callback(err,res);
	});	
}

function updateNameById(id,name,callback){

	User.findById(id, function (err, user) {
		if (err) return callback(err);
		
		user.name = name;
		user.save(function (err, updatedUser) {
			return(err,updatedUser);
		});
	});
}

function deleteAllUsers(callback){
	User.remove({},function(err,res){
		return callback(err,res);
	});
}



module.exports = {allUsers,addUser,findUserById,findUserByName,updateNameById,deleteAllUsers};