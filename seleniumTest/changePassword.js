var assert = require('assert');

describe('Change Password tests', function() {
	browser.url('/edit/password');
	it('should have the correct title', function() {
		var title = browser.getTitle();
		return assert.equal(title, 'Change Password');
	});

	it('Should have form POST to /edit/password', function() {
		return new Promise(function(resolve) {
			var postUrl = browser.getAttribute('#form', 'action');
			assert.equal(browser.getAttribute('#form', 'method'), 'post');
			assert.equal(postUrl, 'http://localhost:3000/edit/password');
			resolve();
		});
	});
});
