User = require('../models/user');
const ADMINUSER= {
	'name' : 'Admin Account',
	'email' : 'eventplanner.gp@gmail.com',
	'password' : '9bdbc3c894ad2cf5bc2b70ab4773b854d0a9c4f7db79bc6c497cecbc4a676cba',
	'type' : 'admin',
	'eventsAttended' : [],
	'salt' : 'a548ce51589fff7a',
	'subscriptions' : []
};

function allUsers(callback){
	User.find(function (err,users) {
		return callback(err,users);
	});
}

function addUser(name,email,password,type,salt,subscriptions,eventsAttended, callback){
	var newUser = new User({name: name,email: email,password:password,type:type,salt:salt,subscriptions:subscriptions,eventsAttended:eventsAttended});
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
		res.eventsAttended = userObj.eventsAttended;
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

function findMultipleUsersByEmail(emails,callback){
	User.find( { email: { $in : emails }}, function(err,users){
		return callback(err,users);
	});
}

function addAdminUser(callback){
	User.update({email:ADMINUSER.email}, ADMINUSER, {upsert:true}, function(err) {
		callback(err);
	});
}

function findSubscribedUsers(sub, callback) {
	User.find({subscriptions:sub}, 'email', function(err,users) {
		var emails = users.map((user) => {return user.email;});
		return callback(err,emails);
	});
}

function updateUserSubs(email, newSub, isSub, callback) {
	if(newSub){
		//If subscribe we want to add. If unsub then want to remove from sub array
		var operator = isSub?  {$push: {subscriptions: newSub}} : {$pull: {subscriptions: newSub}};
		User.findOneAndUpdate({email:email}, operator, {new:true},function(err,res){
			return callback(err,res);
		});
	}
}

module.exports = {allUsers,addUser,findUserById,findUserByName,findUserByEmail,updateUserByEmail,deleteAllUsers,deleteUserByEmail,findMultipleUsersByEmail,addAdminUser,findSubscribedUsers,updateUserSubs};
