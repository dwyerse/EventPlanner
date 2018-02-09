var assert = require('assert');

describe('homepage tests', function() {
	//Set browser to localhost:3000
	//Note: localhost set as default domain in config file
	browser.url('/');
	it('should have the correct title', function() {
		var title = browser.getTitle();
		assert.equal(title, 'Homepage');
	});
	it('should have welcome message', function() {
		var welcomeText = browser.getText('#welcome');
		assert.equal(welcomeText, 'Welcome to our site!');
	});
	it('should have functioning login button ref /login', function() {
		return new Promise(function(resolve) {
			var loginRef = browser.getAttribute('#loginBtn', 'href');
			assert.equal(loginRef, 'http://localhost:3000/login');
			resolve();
		});
	});
	it('should have functioning create button ref /create/admin', function() {
		return new Promise(function(resolve) {
			var createRef = browser.getAttribute('#createBtn', 'href');
			assert.equal(createRef, 'http://localhost:3000/create/admin');
			resolve();
		});
	});
});
