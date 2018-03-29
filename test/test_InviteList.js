var assert = require('assert');
var mapper = require('../mappers/eventMapper');
var eventID;
const testInvitees = [{email:'test@email.com', state:'Pending'},{email:'test2@email.com', state:'Attending'}];
const TEST_EVENT = {
	title:'Test Event', location:'Test Location',
	date:'01/01/2018',description:'test description',event_id:0,
	creators:[],invitees:testInvitees,liveState:0 };
var inviteList = require('../routes/inviteList');

describe('Invite list testing suite', function() {

	it('Should have at least one event in database', function(done) {
		mapper.createEvent(TEST_EVENT,function(err,res){
			eventID = res.event_id;
			TEST_EVENT.event_id = res.event_id;
			assert.equal(err,null);
			assert.equal(res.title,TEST_EVENT.title);
			done();
		});
	});

	it('Should be able to add invitee', function(done){
		var newInvitees = TEST_EVENT.invitees;
		newInvitees.push({email: 'new test', state: 'Pending'});
		inviteList.updateInvitees(newInvitees,eventID,TEST_EVENT, function(error){
			mapper.findEventBy_event_id(eventID,function(err,res){
				assert.equal(error,null);
				assert.equal(err,null);
				assert.equal(res.event_id, eventID);
				assert.equal(res.invitees[2].email,newInvitees[2].email);
				done();
			});
		});
	});
	it('Should be able to remove invitee', function(done){
		var newInvitees = [{email:'test@email.com', state:'Pending'},{email:'test2@email.com', state:'Attending'}];
		inviteList.updateInvitees(newInvitees,eventID,TEST_EVENT, function(error){
			mapper.findEventBy_event_id(eventID,function(err,res){
				assert.equal(error,null);
				assert.equal(err,null);
				assert.equal(res.event_id, eventID);
				assert.equal(res.invitees.length,2);
				done();
			});
		});
	});
	it('Should remove new event', function(done) {
		mapper.deleteEventByEventId(eventID,function(err){
			assert.equal(err,null);
			done();
		});
	});
});
