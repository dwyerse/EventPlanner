var assert = require('assert');
var request = require('request');
var mongoose = require('mongoose');
const APP_DB = 'mongodb://127.0.0.1/eventplanner_db';
const APP_URL = 'http://localhost:3000';

describe('Server testing suite', function() {
	it('test if localhost is running', function(done) {
		request(APP_URL, function(error, response) {
			assert.equal(error, null);
			assert.equal(response.statusCode, 200);
			done();
		});
	});
});

describe('Mongoose connections', function() {
	mongoose.connect(APP_DB);
	it('mongoose is connected ', function(done) {
		assert.equal(mongoose.connection.readyState,1);
		done();
	});

});
