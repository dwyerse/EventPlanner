var assert = require('assert');
var request = require('request');

describe('Server testing suite', function() {
	it('test if localhost is running', function(done) {
		request('http://localhost:3000', function(error, response) {
			assert.equal(error, null);
			assert.equal(response.statusCode, 200);
			done();
		});
	});
});

describe('Database testing suite', function() {
	//Import the mongoose module
	var mongoose = require('mongoose');
	//Set up default mongoose connection
	var mongoDB = 'mongodb://127.0.0.1/eventplanner_db';
	mongoose.connect(mongoDB);

	var User = require('../models/user');

	it('test mongoose is connected ', function(done) {
		assert.equal(mongoose.connection.readyState,1);
		done();
	});
		
	it('User model should be invalid if name is empty', function(done) {
		
		var aUser = new User;
		aUser.validate(function(err) {
			assert.notEqual(err.errors.name,null);
			done();
		});
	});	

	it('should add user to the database ', function(done) {
		var aUser = new User({name:'Seamus'});

		aUser.save(function (err) {
			assert.equal(err,null);
			assert.equal(!aUser.isNew,true); //Need to double check  the isNew property
			done();
		});	
		
	});

});