var assert = require('assert');
var request = require('request');
var mongoose = require('mongoose');

describe('Server testing suite', function() {
	it('test if localhost is running', function(done) {
		request('http://localhost:3000', function(error, response) {
			assert.equal(error, null);
			assert.equal(response.statusCode, 200);
			done();
		});
	});
});

describe('Mongoose connections', function() {
	
	//Set up default mongoose connection
	var mongoDB = 'mongodb://127.0.0.1/test_eventplanner_db';
	mongoose.connect(mongoDB);

	it('test mongoose is connected ', function(done) {
		assert.equal(mongoose.connection.readyState,1);
		done();
	});		
	
});