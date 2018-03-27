var eventMapper = require('../mappers/eventMapper');
var EventModel = require('../models/event');

var mailer = require('../config/mailer');

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

function usersThatHavePaid(payments, event, inviteeUsers){
	let eventPayments = payments.filter(payment=>payment.event_id===event._id+'');
	let idsOfPayers = eventPayments.map(payment=>payment.user_id);
	let userHasPaid = inviteeUsers.map(invitee=>(idsOfPayers.indexOf(invitee._id+'') > -1)?invitee.email:'');
	let inviteePaymentStatus = [];
	for (var i = 0; i < event.invitees.length; i++) {
		if(userHasPaid.indexOf(event.invitees[i].email)>-1){
			inviteePaymentStatus.push('Has Paid');
		}
		else{
			inviteePaymentStatus.push('Has Not Paid');
		}
	}
	return inviteePaymentStatus;
}

function mailPendingInvitees(event, callback){
	let err;
	for (var i = 0; i < event.invitees.length; i++) {
		if(event.invitees[i].state==='Pending'){
			mailer.sendInvitation([event.invitees[i].email],event,function(error){
				if(error){
					err = error;
				}
			});
		}
	}
	return callback(err);
}

module.exports = {updateInvitees, mailPendingInvitees, usersThatHavePaid};