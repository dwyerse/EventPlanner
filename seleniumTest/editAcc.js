var assert = require('assert');

describe('Edit Account tests', function() {
	browser.url('/edit/account');
	it('should have the correct title', function() {
		var title = browser.getTitle();
		return assert.equal(title, 'Edit Account');
	});

	it('should have form POST to /edit/account', function() {
		return new Promise(function(resolve) {
			var postUrl = browser.getAttribute('#form', 'action');
			var formMethod = browser.getAttribute('#form', 'method');
			assert.equal(formMethod, 'post');
			assert.equal(postUrl, 'http://localhost:3000/edit/account');
			resolve();
		});
	});
});
