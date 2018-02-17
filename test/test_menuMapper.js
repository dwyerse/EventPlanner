var assert = require('assert');
var mapper = require('../mappers/menuMapper');
var mongoose = require('mongoose');
const TEST_DB = 'mongodb://127.0.0.1/test_eventplanner_db';
const APP_DB = 'mongodb://127.0.0.1/eventplanner_db';

describe('menuMapper testing suite', function() {
	//After all tests reconnect to APP_DB
	after(function(){
		mongoose.connect(APP_DB);
	});

	mongoose.connect(TEST_DB);

	it('should remove all menus from the collection', function(done) {
		mapper.deleteAllMenus(function(err){
			assert.equal(err,null);
			done();
		});
	});

	it('should create a new menu', function(done) {
		mapper.createMenu('Yummy food','0_0.pdf',0,0,'localhost:3000/menus/0_0.pdf',function(err){
			assert.equal(err,null);
			done();
		});
	});

	it('should find menu by eventId', function(done) {
		mapper.findMenusByEvent(0).then(function(result){
			assert.equal(result[0].menuName,'Yummy food');
			done();
		});
	});

	it('should remove all menus from the collection', function(done) {
		mapper.deleteAllMenus(function(err){
			assert.equal(err,null);
			done();
		});
	});
});
