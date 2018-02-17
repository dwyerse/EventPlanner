var assert = require('assert');
var Event = require('../models/event');
var mapper = require('../mappers/eventMapper');
var mongoose = require('mongoose');
const TEST_DB = 'mongodb://127.0.0.1/test_eventplanner_db';
const APP_DB = 'mongodb://127.0.0.1/eventplanner_db';

describe('eventMapper testing suite', function() {
	//After all tests reconnect to APP_DB
	after(function(){
		mongoose.connect(APP_DB);
	});

	mongoose.connect(TEST_DB);
	var testEventId=-1;

	it('Model should be valid', function(done) {

		var anEvent = new Event({title:'Updated My Birthday',location:'Updated Dublin',date:'12/12/2007',description:'test description',event_id:12,creators:[],invitees:[]});
		anEvent.validate(function(err) {
			assert.equal(err,null);
			done();
		});
	});

	it('Model should be invalid if title is empty', function(done) {

		var anEvent = new Event;
		anEvent.validate(function(err) {
			assert.notEqual(err.errors.title,null);
			done();
		});
	});

	it('should remove all events from the collection', function(done) {
		mapper.deleteAllEvents(function(err){
			assert.equal(err,null);
			done();
		});
	});

	it('should create a new event with correct values', function(done) {
		var testInvitees = [{email:'test@email.com', state:'pending'},{email:'test2@email.com', state:'accepted'}];
		mapper.createEvent('My Birthday','Dublin','12/12/2007','test description',0,[],testInvitees,function(err,res){
			testEventId = res.event_id;
			assert.equal(err,null);
			assert.equal(res.title,'My Birthday');
			assert.equal(res.invitees.length, 2);
			done();
		});
	});

	it('should update event details by event_id', function(done) {
		var newEvent = new Event({title:'Updated My Birthday',location:'Updated Dublin',date:'12/12/2007',description:'test description',
			event_id:0,creators:[],invitees:[]});
		mapper.updateEventDetailsBy_event_id(testEventId,newEvent,function(err,res){
			assert.equal(err,null);
			assert.equal(res.event_id, testEventId);
			assert.equal(res.title,'Updated My Birthday');
			assert.equal(res.invitees.length, 2);
			done();
		});
	});

	it('should find updated event details by event_id', function(done) {
		mapper.findEventBy_event_id(testEventId,function(err,res){
			assert.equal(err,null);
			assert.equal(res.event_id, testEventId);
			assert.equal(res.title,'Updated My Birthday');
			done();
		});
	});

	it('should remove the test event', function(done){
		mapper.deleteEventByEventId(testEventId, function(err){
			assert.equal(err,null);
			mapper.findEventBy_event_id(testEventId, function(err2,res) {
				assert.equal(res,null);
				done();
			});
		});
	});
});
