var assert = require('assert');
var mapper = require('../mappers/menuMapper');
var mongoose = require('mongoose');
const APP_DB = 'mongodb://127.0.0.1/eventplanner_db';

describe('menuMapper testing suite', function() {
	//After all tests reconnect to APP_DB
	before(function(){
		mongoose.connect(APP_DB);
	});

	it('should create a new menu', function(done) {
		mapper.createMenu('Yummy food','123_123.pdf',123,123,'localhost:3000/menus/123_123.pdf',function(err){
			assert.equal(err,null);
			done();
		});
	});

	it('should find menu by eventId', function(done) {
		mapper.findMenusByEvent(123).then(function(result){
			assert.equal(result[0].menuName,'Yummy food');
			done();
		});
	});

	it('should remove test menu from the collection', function(done) {
		mapper.deleteMenuByEventAndMenuId(123,123,function(err){
			assert.equal(err,null);
			done();
		});
	});

});
