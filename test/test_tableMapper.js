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
		mapper.createTable(9999,[],['a','b','c','d','e'],9999,function(err,res){
			assert.equal(err,null);
			assert.equal(res.tableNumber,9999);
			done();
		});
	});

	it('should find tables by eventId', function(done) {
		mapper.findTablesByEventId(9999,function(err,result){
			assert.notEqual(result.length,0);
			done();
		});
	});

	it('should edit table', function(done) {

		var updatedTable = new Table({tableNumber:9998, tableLabels:[],seatLabels:[],eventId:9999});

		mapper.editTable(9999,9999,updatedTable,function(err,res){
			assert.equal(res.tableNumber,9998);
			done();
		});
	});

	it('should delete table',function(done){
		var l;
		mapper.findTablesByEventId(9999, function(err2,result) {
			l = result.length;			
			mapper.deleteTable(9999,9998,function(err){
				assert.equal(err,null);
				mapper.findTablesByEventId(9999, function(err2,res) {
					assert.equal(err2,null);
					assert.equal(res.length,l-1);
					done();
				});
			});
		});
	});
});

