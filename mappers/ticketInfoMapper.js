TicketInformation = require('../models/ticketInformation');

function addTicketInfo(newTicketInfoObj, callback){
	var newTicketInfo = new TicketInformation(newTicketInfoObj);
	newTicketInfo.save(function(err,result){
		callback(err,result);
	});
}

function getTicketInfo(event_id, callback){
	TicketInformation.findOne({event_id:event_id}, function(err, ticketInfo) {
		callback(err,ticketInfo);
	});
}

function updateTicketAvailability(event_id, ticketsAvailable, tablesAvailable,  callback){
	TicketInformation.findOneAndUpdate({event_id:event_id}, {$set: {'tickets.available' : ticketsAvailable, 'tables.available': tablesAvailable}}, {new:true}, function(err,result){
		callback(err,result);
	});
}

function deleteTicketInfo(event_id, callback) {
	TicketInformation.remove({event_id:event_id}, function(err) {
		callback(err);
	});
}

module.exports = {addTicketInfo, getTicketInfo, updateTicketAvailability, deleteTicketInfo};
