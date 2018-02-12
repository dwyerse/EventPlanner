var assert = require('assert');
var hashing = require('../security/hashing');

describe('Password security testing suite', function() {
	it('password should not be hashed the same twice', function(done) {
		var password = 'testPassword3442';
		var {hash, salt} = hashing.createHash(password);
		var hash2 = hashing.generateHash(password, salt);
		assert.equal(hash, hash2);
		done();
	});
});
