Ticket = require('../models/ticket');

function addTickets(newTickets, callback){
	Ticket.insertMany(newTickets, function(err,res){
		callback(err,res);
	});
}

function getUserTickets(user_id, callback){
	Ticket.find({holder:user_id}).populate('event').exec(function(err,tickets) {
		callback(err,tickets);
	});
}

function deleteTicket(ticket_id, callback) {
	Ticket.remove({_id:ticket_id}, function(err) {
		callback(err);
	});
}

module.exports = {addTickets, getUserTickets, deleteTicket};
