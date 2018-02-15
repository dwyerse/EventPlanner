var assert = require('assert');
//var request = require('request');

describe('Create account testing suite', function() {
	browser.url('/create/admin');
	it('should have the correct title', function() {
		return new Promise(function(resolve){
			var title = browser.getTitle();
			assert.equal(title, 'Create Administrator Account');
			resolve();
		});
	});

	it('should have the form POST to /create/admin', function() {
		return new Promise(function(resolve) {
			var postUrl = browser.getAttribute('#form', 'action');
			var formMethod = browser.getAttribute('#form', 'method');
			assert.equal(formMethod, 'post');
			assert.equal(postUrl, 'http://localhost:3000/create/admin');
			resolve();
		});
	});
});