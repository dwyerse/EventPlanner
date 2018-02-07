var assert = require('assert');

describe('Edit Account tests', function() {
//Set browser to localhost:3000
//Note: localhost set as default domain in config file
	browser.url('/edit/account');
	it('should have the correct title', function() {
		var title = browser.getTitle();
		return assert.equal(title, 'Edit Account');
	});

	it('Should have form POST to /edit/account', function() {
		var postUrl = browser.getAttribute('#form', 'action');
		var formMethod = browser.getAttribute('#form', 'method');
		assert.equal(formMethod, 'post');
		return assert.equal(postUrl, 'http://localhost:3000/edit/account');
	});
});
