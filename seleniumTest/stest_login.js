var assert = require('assert');
describe('login tests', function() {

	/*
	mongoose.connect(APP_DB);
	mapper.addUser('TestName','test@test.test','test','admin','fakesalt',function(err){return err;});
	*/

	//Set browser to localhost:3000
	//Note: localhost set as default domain in config file
	browser.url('/login');
	it('should have the correct title', function() {
		return new Promise(function(resolve) {
			var title = browser.getTitle();
			assert.equal(title, 'Login');
			resolve();
		});
	});
	it('should fail when input fields are blank', function() {
		return new Promise(function(resolve) {
			browser.click('#submitId');
			var url = browser.getUrl();
			assert.equal(url, 'http://localhost:3000/login');
			resolve();
		});
	});
	it('should give error when user is not in database', function() {
		return new Promise(function(resolve) {
			browser.setValue('#emailInput', 'NonExistentUser@test.test');
			browser.setValue('#passwordInput', 'test');
			browser.click('#submitId');
			var url = browser.getUrl();
			assert.equal(url, 'http://localhost:3000/login');
			var message = browser.getText('#messageId');
			assert.equal(message, 'No user found.');
			resolve();
		});
	});
	/*
	it('should give error when password is wrong', function() {
		return new Promise(function(resolve) {
			browser.setValue('#emailInput', 'test@test.test');
			browser.setValue('#passwordInput', 'wrongPassword');
			browser.click('#submitId');
			var url = browser.getUrl();
			assert.equal(url, 'http://localhost:3000/login');
			var message = browser.getText('#messageId');
			assert.equal(message, 'Oops! Wrong password.');
			resolve();
		});
	});
	
	it('should log in correctly', function() {
		return new Promise(function(resolve) {
			browser.click('#submitId');
			var url = browser.getUrl();
			assert.equal(url, 'http://localhost:3000/login');
			resolve();
		});
	});
	*/
	

});
