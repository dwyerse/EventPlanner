var assert = require('assert');
var hashing = require('../config/hashing');

describe('Password security testing suite', function() {
	it('Identical passwords should return same hash using same salt', function(done) {
		var password = 'testPassword3442';
		var {hash, salt} = hashing.createHash(password);
		var hash2 = hashing.generateHash(password, salt);
		assert.equal(hash, hash2);
		done();
	});
});
