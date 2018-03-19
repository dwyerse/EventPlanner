Ticket = require('../models/ticket');

function addTicket(newTicketObj, callback){
	var newTicket = new Ticket(newTicketObj);
	newTicket.save(function(err,result){
		callback(err,result);
	});
}

function getUserTickets(user_id, callback){
	Ticket.find({holder:user_id}, function(err, tickets) {
		callback(err,tickets);
	});
}

function deleteTicket(ticket_id, callback) {
	Ticket.remove({ticket_id:ticket_id}, function(err) {
		callback(err);
	});
}

module.exports = {addTicket, getUserTickets, deleteTicket};
