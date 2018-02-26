var assert = require('assert');
var User = require('../models/user');
var mapper = require('../mappers/userMapper');
var mongoose = require('mongoose');
const APP_DB = 'mongodb://127.0.0.1/eventplanner_db';
const TESTUSER= {
	'name' : 'Test Account',
	'email' : 'test@eventplanner',
	'password' : 'password',
	'type' : 'admin',
	'eventsAttended': [],
	'salt' : 'salt'
};
describe('userMapper testing suite', function() {
	before(function(){
		mongoose.connect(APP_DB);
	});

	it('should validate the user model successfully', function(done) {
		new User(TESTUSER).validate(function(err){
			assert.equal(err,null);
			done();
		});
	});

	it('User model should be invalid if name is empty', function(done) {
		var aUser = new User;
		aUser.validate(function(err) {
			assert.notEqual(err.errors.name,null);
			done();
		});
	});

	it('should add user to the database without error', function(done) {
		mapper.addUser(TESTUSER.name,TESTUSER.email,TESTUSER.password,TESTUSER.type,TESTUSER.eventsAttended,TESTUSER.salt, function(err,res){
			assert.equal(err,null);
			assert.equal(res.name,TESTUSER.name);
			assert.equal(res.email,TESTUSER.email);
			done();
		});
	});

	it('should throw error if email is not unique', function(done) {
		mapper.addUser(TESTUSER.name,TESTUSER.email,TESTUSER.password,TESTUSER.type,TESTUSER.eventsAttended,TESTUSER.salt, function(err){
			assert.notEqual(err,null);
			done();
		});
	});

	it('should return an error if a required field is empty ', function(done) {
		mapper.addUser(null,'email@email.ie','password','admin',[],'fakesalt',function(err){
			assert.notEqual(err,null);
			done();
		});
	});

	it('should return all users', function(done) {
		mapper.allUsers(function(err,res){
			assert.equal(err,null);
			assert.notEqual(res.length,0);
			done();
		});
	});

	it('should find previously saved user by name', function(done) {
		mapper.findUserByName(TESTUSER.name,function(err,res){
			assert.equal(err,null);
			assert.equal(res[0].name,TESTUSER.name);
			done();
		});
	});

	it('shouldnt find non-existent user by name', function(done) {
		mapper.findUserByName('unsavedUserName',function(err,res){
			assert.equal(res.length,0);
			done();
		});
	});

	it('should update user', function(done) {
		var userObj = new User({name: 'UpdatedName',email: TESTUSER.email,password:'updatedPassword',type:'updatedadmin',eventsAttended:[0],salt:'newfakesalt'});
		mapper.updateUserByEmail(TESTUSER.email,userObj,function(err,res){
			assert.equal(userObj.name,res.name);
			assert.equal(userObj.email,res.email);
			assert.equal(userObj.password,res.password);
			done();
		});
	});

	it('should remove the test user', function(done){
		mapper.deleteUserByEmail(TESTUSER.email, function(err){
			assert.equal(err,null);
			done();
		});
	});

});
