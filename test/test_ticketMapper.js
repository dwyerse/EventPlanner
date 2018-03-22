var assert = require('assert');
var mapper = require('../mappers/ticketMapper');
var eventMapper = require('../mappers/eventMapper');
var mongoose = require('mongoose');
const APP_DB = 'mongodb://127.0.0.1/eventplanner_db';
const TEST_TICKET = {
	'price': 30,
	'event': '99999',
	'holder': '999999',
	'type': 'attendee'
};
const TEST_EVENT = {
	title:'Test Event', location:'Test Location',
	date:'01/01/2018',description:'test description',event_id:0,
	creators:[],invitees:[] };

describe('ticketMapper testing suite', function() {

	var testEvent_id = -1;
	before(function(done){
		mongoose.connect(APP_DB);
		//event_id is Event Ref so must be valid event ObjectId
		eventMapper.createEvent(TEST_EVENT.title,TEST_EVENT.location,TEST_EVENT.date,TEST_EVENT.description,0,
			TEST_EVENT.creators,TEST_EVENT.invitees,function(err,res){
				testEvent_id = res.event_id;
				TEST_TICKET.event = res._id;
				assert.equal(err,null);
				done();
			});
	});

	after(function() {
		eventMapper.deleteEventByEventId(testEvent_id, function(err){
			assert.equal(err,null);
		});
	});

	let ticket_id = 1;

	it('should validate the ticket model successfully', function(done) {
		new Ticket(TEST_TICKET).validate(function(err){
			assert.equal(err,null);
			done();
		});
	});

	it('should add ticket to the database without error', function(done) {
		mapper.addTickets([TEST_TICKET], function(err,res) {
			assert.equal(err,null);
			ticket_id = res[0]._id;
			assert.equal(res[0].event, TEST_TICKET.event);
			done();
		});
	});

	it('should return an error if a required field is null ', function(done) {
		let invalidTicketObj = {price:10};
		mapper.addTickets([invalidTicketObj],function(err){
			assert.notEqual(err,null);
			done();
		});
	});

	it('should find ticket by user_id', function(done) {
		mapper.getUserTickets(TEST_TICKET.holder, function(err,res) {
			assert.equal(err,null);
			assert.notEqual(res, null);
			assert.equal(res.length, 1);
			done();
		});
	});

	it('should remove test ticket from the collection', function(done) {
		mapper.deleteTicket(ticket_id, function(err) {
			assert.equal(err,null);
			done();
		});
	});

});
