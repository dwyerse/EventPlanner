User = require('../models/user');

function allUsers(callback){
	User.find(function (err,users) {
		return callback(err,users);
	});
}

function addUser(name,email,password,type,salt,callback){
	var newUser = new User({name: name,email: email,password:password,type:type,salt:salt});
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

function findUserByEmail(email,callback){
	User.find({ email:email }, function(err,res){
		return callback(err,res);
	});
}

function updateUserByEmail(email,userObj,callback){

	User.findOne({ email:email }, function(err,res){
		res.name = userObj.name;
		res.email = userObj.email;
		res.type = userObj.type;
		res.password = userObj.password;
		res.salt = userObj.salt;
		res.save(function (err, updatedUser) {
			return callback(err,updatedUser);
		});
	});

}

function deleteAllUsers(callback){
	User.remove({},function(err,res){
		return callback(err,res);
	});
}
module.exports = {allUsers,addUser,findUserById,findUserByName,findUserByEmail,updateUserByEmail,deleteAllUsers};
