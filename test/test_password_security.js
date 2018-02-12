var assert = require('assert');
var hashing = require('../security/hashSaltPassword');
//var request = require('request');

describe('Password security testing suite', function() {
	it('password should not be hashed the same twice', function(done) {
		var passwordOne = 'testPassword';
		var hashPasswordOne = hashing.saltHashPassword(passwordOne);

		var passwordTwo = 'testPassword';
		var hashPasswordTwo = hashing.saltHashPassword(passwordTwo);

		assert.notEqual(hashPasswordOne.passwordHash, hashPasswordTwo.passwordHash); 

		//var hash = hashPassword.passwordHash;
		//var salt = hashPassword.salt;

		done();

	});
});