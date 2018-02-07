var assert = require('assert');

describe('Change Password tests', function() {
//Set browser to localhost:3000
//Note: localhost set as default domain in config file
	browser.url('/edit/password');
	it('should have the correct title', function() {
		var title = browser.getTitle();
		return assert.equal(title, 'Change Password');
	});

	it('Should have form POST to /edit/password', function() {
		var postUrl = browser.getAttribute('#form', 'action');
		assert.equal(browser.getAttribute('#form', 'method'), 'post');
		return assert.equal(postUrl, 'http://localhost:3000/edit/password');
	});
});
