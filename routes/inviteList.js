var eventMapper = require('../mappers/eventMapper');
var EventModel = require('../models/event');

function updateInvitees(newInvitees, event_id, event, callback) {

	var newEvent = new EventModel({
		title: event.title, location: event.location, date: event.date,
		description: event.description, event_id: event.event_id, creators: event.creators,
		invitees: newInvitees
	});
	eventMapper.updateEventBy_event_id(event_id, newEvent, function (err, res) {
		return callback(err,res);
	});
}
module.exports = {updateInvitees};