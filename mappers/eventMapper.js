EventModel = require('../models/event');

function createEvent(name,location,date,description,event_id,creators,invitees,callback){
	var newEvent = new EventModel({name:name,location:location,date:date,description:description,event_id:event_id,creators:creators,invitees:invitees});
	newEvent.save(function (err,product) {
		return callback(err,product);
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

		res.name = eventObj.name;
		res.location = eventObj.location;
		res.date = eventObj.date;
		res.description = eventObj.description;
		res.event_id = eventObj.event_id;
		res.creators = eventObj.creators;
		res.invitess = eventObj.invitees;

		res.save(function (err, updatedEvent) {
			return callback(err,updatedEvent);
		});
	});
}

function deleteAllEvents(callback){
	EventModel.remove({},function(err,res){
		return callback(err,res);
	});
}

module.exports = {createEvent,updateEventBy_event_id,findEventBy_event_id,deleteAllEvents};
