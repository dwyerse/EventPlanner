'use strict';
var crypto = require('crypto');

/* Generates random string of characters i.e salt. */
var genRandomString = function(length) {
	return crypto.randomBytes(Math.ceil(length/2))
		.toString('hex') /** convert to hexadecimal format */
		.slice(0,length);   /** return required number of characters */
};

/* Hash password with pbkdf2 and sha512. */
var generateHash = function(password, salt) {
	var hashValue = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex'); /** Hashing algorithm */
	return hashValue;
};

var createHash= function(userPassword) {
	var salt = genRandomString(16); /** Gives us salt of length 16 */
	return {
		hash: generateHash(userPassword, salt),
		salt:salt
	};
};

module.exports = {generateHash, createHash};
