'use strict';
var crypto = require('crypto');

/* Generates random string of characters i.e salt. */
var genRandomString = function(length) {
	return crypto.randomBytes(Math.ceil(length/2))
		.toString('hex') /** convert to hexadecimal format */
		.slice(0,length);   /** return required number of characters */
};

/* Hash password with pbkdf2 and sha512. */
var hash = function(password, salt) {
	var hashValue = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex'); /** Hashing algorithm */
	return {
		salt:salt,
		passwordHash:hashValue
	};
};

var saltHashPassword = function(userpassword) {
	var salt = genRandomString(16); /** Gives us salt of length 16 */
	var passwordData = hash(userpassword, salt);
	//console.log('UserPassword = '+userpassword);
	//console.log('Passwordhash = '+passwordData.passwordHash);
	//console.log('nSalt = '+passwordData.salt);

	return passwordData;
};

saltHashPassword('MYPASSWORD');
saltHashPassword('MYPASSWORD');

module.exports = {saltHashPassword};