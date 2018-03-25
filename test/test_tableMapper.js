var assert = require('assert');
var mapper = require('../mappers/tableMapper');
var mongoose = require('mongoose');
const APP_DB = 'mongodb://127.0.0.1/eventplanner_db';

describe('tableMapper testing suite', function() {
	//After all tests reconnect to APP_DB
	before(function(){
		mongoose.connect(APP_DB);
	});

	it('should create a new table', function(done) {
		mapper.createTable(12,[],5,['a','b','c','d','e'],1,function(err,res){
			assert.equal(err,null);
			assert.equal(res.tableNumber,12);
			done();
		});
	});

	it('should find tables by eventId', function(done) {
		mapper.findTablesByEventId(1,function(err,result){
			assert.notEqual(result[0].tableNumber,0);
			done();
		});
	});

	it('should edit table', function(done) {

		var updatedTable = new Table({tableNumber:11, tableLabels:[], size:5,seatLabels:[],eventId:1});

		mapper.editTable(1,12,updatedTable,function(err,res){
			assert.equal(res.tableNumber,11);
			done();
		});
	});

	it('should delete table',function(done){
		
		var l;

		mapper.findTablesByEventId(1, function(err2,result) {
			l = result.length;
			
			mapper.deleteTable(1,11,function(err){
				assert.equal(err,null);
				mapper.findTablesByEventId(1, function(err2,res) {
					assert.equal(err2,null);
					assert.equal(res.length,l-1);
					done();
				});
			});
		});
	});
});

