EventModel = require('../models/event');

function createEvent(event,callback){
	var newEvent = new EventModel(event);
	newEvent.save(function (err,product) {
		return callback(err,product);
	});
}

function findAllEvents(callback) {
	EventModel.find({}, function(err,events){
		if(err){
			return callback(err);
		}
		return callback(events);
	});
}

function findEventBy_event_id(event_id,callback){
	EventModel.findOne({ event_id:event_id }, function(err,res){
		return callback(err,res);
	});
}

function updateEventBy_event_id(event_id,eventObj,callback){

	EventModel.findOne({ event_id:event_id }, function(err,res){

		if(err){
			return callback(err);
		}
		if(!res){
			return callback(err,[]);
		}

		res.title = eventObj.title;
		res.location = eventObj.location;
		res.date = eventObj.date;
		res.description = eventObj.description;
		res.event_id = eventObj.event_id;
		res.creators = eventObj.creators;
		res.invitees = eventObj.invitees;
		res.liveState = eventObj.liveState;

		res.save(function (err, updatedEvent) {
			return callback(err,updatedEvent);
		});
	});
}
//Only updates info provided in edit page
function updateEventDetailsBy_event_id(event_id,eventObj,callback){
	EventModel.findOne({ event_id:event_id }, function(err,res){
		if(err){
			return callback(err);
		}
		if(!res){
			return callback(err,[]);
		}

		res.title = eventObj.title;
		res.location = eventObj.location;
		res.date = eventObj.date;
		res.description = eventObj.description;

		res.save(function (err, updatedEvent) {
			return callback(err,updatedEvent);
		});
	});
}



function findInviteeEmails(event_id, callback){
	EventModel.findOne({event_id:event_id}, 'invitees.email', function(err,event) {
		var emails;
		if(!err){
			emails = event.invitees.map((invitee) => {return invitee.email;});
		}
		return callback(err,emails);
	});
}

function findAttendeeEmails(event_id, callback){
	findAttendees(event_id, function(err,attendees){
		var emails;
		if(!err){
			emails = attendees.map((attendee) => {return attendee.email;});
		}
		return callback(err,emails);
	});
}

function findAttendees(event_id, callback){
	EventModel.findOne({event_id:event_id}, 'invitees', function(err,event) {
		var attendees;
		if(!err){
			attendees = event.invitees.filter((invitee) => {return invitee.state == 'Attending';});
		}
		return callback(err,attendees);
	});
}

function updateInviteeList(event_id,inviteeList,callback){
	EventModel.findOne({ event_id:event_id }, function(err,res){
		if(err){
			return callback(err);
		}
		if(!res){
			return callback(err,[]);
		}

		res.invitees = inviteeList;

		res.save(function (err, updatedEvent) {
			return callback(err,updatedEvent);
		});

	});
}

function setLiveState(event_id,liveState,callback){
	EventModel.findOne({ event_id:event_id }, function(err,res){
		if(err){
			return callback(err);
		}
		if(!res){
			return callback(err,[]);
		}
		res.liveState = liveState;
		res.save(function (err, updatedEvent) {
			return callback(err,updatedEvent);
		});
	});
}

function deleteEventByEventId(event_id, callback){
	EventModel.remove({event_id:event_id}, function(err) {
		return callback(err);
	});
}

function deleteAllEvents(callback){
	EventModel.remove({},function(err,res){
		return callback(err,res);
	});
}


module.exports = {createEvent,updateEventBy_event_id,setLiveState,updateInviteeList,updateEventDetailsBy_event_id,findEventBy_event_id,deleteEventByEventId,deleteAllEvents,findAttendees,findInviteeEmails,findAttendeeEmails, findAllEvents};
