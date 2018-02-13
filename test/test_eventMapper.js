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

	it('Model should be invalid if name is empty', function(done) {

		var anEvent = new Event;
		anEvent.validate(function(err) {
			assert.notEqual(err.errors.name,null);
			done();
		});
	});

	it('should remove all events from the collection', function(done) {

		mapper.deleteAllEvents(function(err){
			assert.equal(err,null);
			done();
		});
	});

	it('should create new event', function(done) {
		mapper.createEvent('My Birthday','Dublin','12/12/2007','test description',12,[],[],
		function(err){
			assert.equal(err,null);
			done();
		});		
	});

	it('should update event by ID', function(done) {
		var newEvent = new Event({name:'Updated My Birthday',location:'Updated Dublin',date:'12/12/2007',description:'test description',event_id:12,creators:[],invitees:[]});
		mapper.updateEventBy_event_id(12,newEvent,
		function(err){
			assert.equal(err,null);
			done();
		});
	});	

	it('should remove all events from the collection', function(done) {

		mapper.deleteAllEvents(function(err){
			assert.equal(err,null);
			done();
		});
	});
	
});
