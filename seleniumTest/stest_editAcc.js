/*var assert = require('assert');
var testUser ={ _id: '5a81d81c086fec141cf002e1',
	name: 'Sean Durban',
	email: 'a2@a',
	password: 'ad1a76378fb0544137e8564f90af189ebf752e8ccee87c868f2109baf2d9d1e6',
	salt: '01b026c4fc359b27',
	__v: 0 };
describe('Edit Account tests', function() {
	browser.sessionStorage('POST', {key: 'user', value: testUser});
	browser.setCookie('post', {
			 name:'user',
			 value: testUser
	 });
	browser.url('/edit/account');
	it('should have the correct title', function() {
		return new Promise(function(resolve){
			var title = browser.getTitle();
			assert.equal(title, 'Edit Account');
			resolve();
		});
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
*/
