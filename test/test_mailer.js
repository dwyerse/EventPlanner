var assert = require('assert');
var mailer = require('../config/mailer');
const ADMIN_EMAIL = 'eventplanner.gp@gmail.com';

describe('Mailer Service testing suite', function() {
	it('should return an error with incorrect error', function(done) {
		mailer.sendMail(['gpEventPlannerError'],[],'Fake test','Fake Test', function(err, info){
			assert.notEqual(err,null);
			assert.equal(info, null);
			done();
		});
	});
	it('should successfully send email with valid options', function(done) {
		mailer.sendMail([ADMIN_EMAIL],[],'Mocha Test Spam','Mocha Test spam', function(err, info){
			assert.notEqual(info,null);
			assert.equal(err,null);
			done();
		});
	});
});
