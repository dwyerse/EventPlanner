/*var assert = require('assert');
//var request = require('request');

describe('Register Guest testing suite', function() {
	browser.url('/register/guest/:event_id');
	it('should have the correct title', function() {
		return new Promise(function(resolve){
			var title = browser.getTitle();
			assert.equal(title, 'Register Guest for Event');
			resolve();
		});
	});

	it('should have the form POST to /register/guest/:event_id', function() {
		return new Promise(function(resolve) {
			var postUrl = browser.getAttribute('#form', 'action');
			var formMethod = browser.getAttribute('#form', 'method');
			assert.equal(formMethod, 'post');
			assert.equal(postUrl, 'http://localhost:3000/register/guest/:event_id');
			resolve();
		});
	});
});*/