/*var assert = require('assert');
//var request = require('request');

describe('View Guest Details testing suite', function() {
	browser.url('/event/guests/:event_id');
	it('should have the correct title', function() {
		return new Promise(function(resolve){
			var title = browser.getTitle();
			assert.equal(title, 'Guest Details');
			resolve();
		});
	});

	it('should have the form POST to /event/guests/:event_id', function() {
		return new Promise(function(resolve) {
			var postUrl = browser.getAttribute('#form', 'action');
			var formMethod = browser.getAttribute('#form', 'method');
			assert.equal(formMethod, 'post');
			assert.equal(postUrl, 'http://localhost:3000/event/guests/:event_id');
			resolve();
		});
	});
});*/