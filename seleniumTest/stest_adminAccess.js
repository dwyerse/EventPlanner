var assert = require('assert');
//var request = require('request');

describe('Grant admin access testing suite', function() {
	browser.url('/grant/admin');
	it('should have the correct title', function() {
		return new Promise(function(resolve){
			var title = browser.getTitle();
			assert.equal(title, 'Grant Admin Access');
			resolve();
		});
	});

	it('should have the form POST to /grant/admin', function() {
		return new Promise(function(resolve) {
			var postUrl = browser.getAttribute('#form', 'action');
			var formMethod = browser.getAttribute('#form', 'method');
			assert.equal(formMethod, 'post');
			assert.equal(postUrl, 'http://localhost:3000/grant/admin');
			resolve();
		});
	});
});