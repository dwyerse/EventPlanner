User = require('../models/user');
const ADMINUSER= {
	'name' : 'Admin Account',
	'email' : 'admin@eventplanner',
	'password' : '9bdbc3c894ad2cf5bc2b70ab4773b854d0a9c4f7db79bc6c497cecbc4a676cba',
	'type' : 'admin',
	'salt' : 'a548ce51589fff7a',
	'subscriptions' : []
};

function allUsers(callback){
	User.find(function (err,users) {
		return callback(err,users);
	});
}

function addUser(name,email,password,type,salt,subscriptions,callback){
	var newUser = new User({name: name,email: email,password:password,type:type,salt:salt,subscriptions:subscriptions});
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
	User.findOne({ _id:id }, function(err,res){
		return callback(err,res);
	});
}

function findUserByEmail(email,callback){
	User.findOne({ email:email }, function(err,res){
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
		res.subscriptions = userObj.subscriptions;
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

function deleteUserByEmail(email, callback){
	User.remove({email:email}, function(err) {
		return callback(err);
	});
}

function addAdminUser(callback){
	User.update({email:ADMINUSER.email}, ADMINUSER, {upsert:true}, function(err) {
		callback(err);
	});
}

function updateUserSubs(email, newSub, callback) {
	if(newSub){
		User.findOneAndUpdate({email:email}, {$push: {subscriptions: newSub}}, {new:true},function(err,res){
			return callback(err,res);
		});
	}
}
module.exports = {allUsers,addUser,findUserById,findUserByName,findUserByEmail,updateUserByEmail,deleteAllUsers,deleteUserByEmail,addAdminUser,updateUserSubs};
