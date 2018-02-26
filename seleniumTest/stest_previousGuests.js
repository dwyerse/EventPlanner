var assert = require('assert');
//var request = require('request');

describe('View Previous Guests testing suite', function() {
	browser.url('/previous/guests');
	it('should have the correct title', function() {
		return new Promise(function(resolve){
			var title = browser.getTitle();
			assert.equal(title, 'Previous Guests');
			resolve();
		});
	});

	it('should have the form POST to /previous/guests', function() {
		return new Promise(function(resolve) {
			var postUrl = browser.getAttribute('#form', 'action');
			var formMethod = browser.getAttribute('#form', 'method');
			assert.equal(formMethod, 'post');
			assert.equal(postUrl, 'http://localhost:3000/previous/guests');
			resolve();
		});
	});
});