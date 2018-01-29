var assert = require('assert');
var request = require('request');

describe('testing suite', function() {
	
	it('adding 6 and 2', function() {
		var two = 2;
		var six = 6;
		var result = two + six;
		assert.equal(8, result);
	});

	it('test if localhost is running', function(done) {
		request('http://localhost:3000', function (error, response, body) {
			assert.equal(error, null);
			assert.equal(response.statusCode, 200);
			console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			done();
		});
	});
});