var assert = require('assert');
var mapper = require('../mappers/ticketInfoMapper');
var mongoose = require('mongoose');
const APP_DB = 'mongodb://127.0.0.1/eventplanner_db';
const TEST_TICKETINFO = {
	'event_id': '99999',
	'tables': {
		'total': 10,
		'available': 9,
		'price': 1000,
		'size': 8
	},
	'tickets': {
		'total': 100,
		'available': 65,
		'price': 45,
	}
};


describe('ticketInfoMapper testing suite', function() {
	before(function(){
		mongoose.connect(APP_DB);
	});

	it('should validate the ticketInfo model successfully', function(done) {
		new TicketInformation(TEST_TICKETINFO).validate(function(err){
			assert.equal(err,null);
			done();
		});
	});

	it('should add ticketInfo to the database without error', function(done) {
		mapper.addTicketInfo(TEST_TICKETINFO, function(err,res) {
			assert.equal(err,null);
			assert.equal(res.event_id, TEST_TICKETINFO.event_id);
			done();
		});
	});

	it('should return an error if a required field is null ', function(done) {
		let invalidTicketObj = {};
		invalidTicketObj.tickets = TEST_TICKETINFO.tickets;
		mapper.addTicketInfo(invalidTicketObj,function(err){
			assert.notEqual(err,null);
			done();
		});
	});

	it('should find ticketInfo by event_id', function(done) {
		mapper.getTicketInfo(TEST_TICKETINFO.event_id, function(err,res) {
			assert.equal(err,null);
			assert.equal(res.event_id, TEST_TICKETINFO.event_id);
			assert.notEqual(res.tables, null);
			done();
		});
	});

	it('should update ticketInfo by event_id', function(done) {
		mapper.updateTicketAvailability(TEST_TICKETINFO.event_id, 50, TEST_TICKETINFO.tables.available, function(err,res) {
			assert.equal(err, null);
			assert.equal(res.event_id, TEST_TICKETINFO.event_id);
			assert.equal(res.tickets.available, 50);
			done();
		});
	});

	it('should remove test ticketInfo from the collection', function(done) {
		mapper.deleteTicketInfo(TEST_TICKETINFO.event_id, function(err) {
			assert.equal(err,null);
			done();
		});
	});

});
