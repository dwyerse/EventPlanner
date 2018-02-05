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


