Event = require('../models/event')

function createEvent(name,location,date,description,event_id,creators,invitees,callback){
	var newEvent = new Event({name:name,location:location,date:date,description:description,event_id:event_id,creators:creators,invitees:invitees});
	newEvent.save(function (err,product) {
		return callback(err,product);
	});
}

function updateEventBy_event_id(event_id,eventObj,callback){

	Event.findOne({ event_id:event_id }, function(err,res){
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
	User.remove({},function(err,res){
		return callback(err,res);
	});
}

module.exports = {createEvent,updateEventBy_event_id,deleteAllEvents};
