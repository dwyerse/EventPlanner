var assert = require('assert');

describe('homepage tests', function() {
//Set browser to localhost:3000
//Note: localhost set as default domain in config file
	browser.url('/');
	it('should have the correct title', function() {
		var title = browser.getTitle();
		assert.equal(title, 'Homepage');
	});
	it('Should have welcome message', function() {
		var welcomeText = browser.getText('#welcome');
		assert.equal(welcomeText, 'Welcome to our site!');
	});
});
