TicketInformation = require('../models/ticketInformation');

function addTicketInfo(newTicketInfoObj, callback){
	new TicketInformation(newTicketInfoObj).validate(function(err){
		if(err) {
			return callback(err,null);
		}
		TicketInformation.findOneAndUpdate({event_id:newTicketInfoObj.event_id}, newTicketInfoObj, {upsert:true, new:true}, function(err,result){
			callback(err,result);
		});
	});
}

function getTicketInfo(event_id, callback){
	TicketInformation.findOne({event_id:event_id}, function(err, ticketInfo) {
		callback(err,ticketInfo);
	});
}

function deleteTicketInfo(event_id, callback) {
	TicketInformation.remove({event_id:event_id}, function(err) {
		callback(err);
	});
}

module.exports = {addTicketInfo, getTicketInfo, deleteTicketInfo};
