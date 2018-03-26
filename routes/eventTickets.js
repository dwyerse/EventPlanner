var express = require('express');
var router = express.Router();
const isLoggedIn = require('../config/utils').isLoggedIn;
const isAdminUser = require('../config/utils').isAdminUser;
const validatePaymentDetails = require('../config/utils').validatePaymentDetails;
const eventMapper = require('../mappers/eventMapper');
const ticketMapper = require('../mappers/ticketMapper');
const paymentMapper = require('../mappers/paymentMapper');
const ticketInfoMapper = require('../mappers/ticketInfoMapper');

const GENERAL_TICKET_TYPE = 'Ticket';
const TABLE_TICKET_TYPE = 'Table';

router.get('/:event_id', isLoggedIn, function(req, res) {
	let event_id = req.params.event_id;
	eventMapper.findEventBy_event_id(event_id, function(err,event) {
		ticketInfoMapper.getTicketInfo(event_id, function(err2, ticketInfo) {
			if(!ticketInfo){
				req.flash('err', 'Tickets not currently available');
				return res.redirect('/event/view/'+event_id);
			}
			res.render('buyTickets', {event, ticketInfo, err: req.flash('err'),succ: req.flash('succ') });
		});
	});
});

router.post('/:event_id', isLoggedIn, function(req, res) {
	let event_id = req.params.event_id;
	if(req.body.noTickets == 0 && req.body.noTables == 0) {
		req.flash('err', 'No tickets or tables were chosen');
		return res.redirect('/event/tickets/'+event_id);
	}
	if(validatePaymentDetails(req.body.cardNo, req.body.cvv, req.body.billingName, req.body.paymentAmount)) {
		eventMapper.findEventBy_event_id(event_id, function(err,event) {
			if(err){
				req.flash('err', err);
				return res.redirect('/event/tickets/'+event_id);
			}
			ticketInfoMapper.getTicketInfo(event_id, function(err, ticketInfo){
				if(err){
					req.flash('err', err);
					return res.redirect('/event/tickets/'+event_id);
				}
				let newPaymentObj = {event_id:event._id, amount: req.body.paymentAmount, user_id: req.user._id, type:'tickets'};
				paymentMapper.addPayment(newPaymentObj, function(err) {
					if(err){
						req.flash('err', err);
						return res.redirect('/event/tickets/'+event_id);
					}
					updateInviteeList(event, req.user.email, req.body.accessRequirements, req.body.dietaryRestrictions, function(err) {
						if(err){
							req.flash('err', err);
							return res.redirect('/event/tickets/'+event_id);
						}
						addTickets(ticketInfo, req.user._id, event._id, event_id, req.body.noTickets, req.body.noTables, function(err){
							if(err){
								req.flash('err', err);
								return res.redirect('/event/tickets/'+event_id);
							}
							req.flash('succ', 'Succesfully Purchased Tickets');
							return res.redirect('/event/view/'+event_id);
						});
					});
				});
			});
		});
	} else {
		req.flash('err', 'Invalid Payment Details');
		return res.redirect('/event/tickets/'+event_id);
	}
});

router.get('/setup/:event_id', isLoggedIn, isAdminUser, function(req, res) {
	let event_id = req.params.event_id;
	eventMapper.findEventBy_event_id(event_id, function(err,event) {
		if(err){
			req.flash('err', err);
			return res.redirect('/event/tickets/setup/'+event_id);
		}
		ticketInfoMapper.getTicketInfo(event_id, function(err2, ticketInfo) {
			if(ticketInfo){
				req.flash('err', 'Table settings already provided');
				return res.redirect('/event/view/'+event_id);
			}
			else if(err2){
				req.flash('err', err2);
				return res.redirect('/event/tickets/setup/'+event_id);
			}
			res.render('setupTickets', {event, ticketInfo, err: req.flash('err'),succ: req.flash('succ') });
		});
	});
});

router.post('/setup/:event_id', isLoggedIn, isAdminUser, function(req, res) {
	let event_id = req.params.event_id;
	let ticketInfoObj = {event_id:event_id, tables: {total:req.body.totalTables, price:req.body.tablePrice, size:req.body.tableSize,
		available:req.body.totalTables}, tickets: {total:req.body.totalTickets, price:req.body.ticketPrice, available:req.body.totalTickets}};
	ticketInfoMapper.addTicketInfo(ticketInfoObj, function(err){
		if(err){
			req.flash('err', err);
			res.redirect('/event/tickets/setup/'+event_id);
		} else {
			req.flash('succ', 'Updated Ticket Settings');
			res.redirect('/event/view/'+event_id);
		}
	});
});

function generateTickets(ticketInfo, userID, event_id, noTickets, noTables,callback){
	let newTicketObj = {price: ticketInfo.tickets.price, event:event_id, holder:userID, type: GENERAL_TICKET_TYPE};
	let totalTicketsToGenerate = parseFloat(noTables) + parseFloat(noTickets);
	let tickets = [];
	for(let i =0; i<totalTicketsToGenerate; i++){
		newTicketObj = {price: ticketInfo.tickets.price, event:event_id, holder:userID, type: GENERAL_TICKET_TYPE};
		if(i==noTickets) {
			newTicketObj.type = TABLE_TICKET_TYPE;
			newTicketObj.price = ticketInfo.tables.price;
		}
		tickets.push(newTicketObj);
	}
	callback(tickets);
}

function updateInviteeList(event, userEmail, accessRequirements, dietaryRestrictions, callback){
	let inviteeIndex =  event.invitees.findIndex(invitee => invitee.email === userEmail);
	let newInviteeList = event.invitees;
	if(inviteeIndex == -1){ //New invitee
		newInviteeList.push({email:userEmail, state:'Attending', accessRequirements:accessRequirements, dietaryRestrictions:dietaryRestrictions});
	} else { //Present invitee
		let invitee = newInviteeList[inviteeIndex];
		invitee.state = 'Attending';
		if(accessRequirements && accessRequirements.length>0)   //Won't overwrite if no info provided
			invitee.accessRequirements = accessRequirements;
		if(dietaryRestrictions && dietaryRestrictions.length>0)
			invitee.dietaryRestrictions = dietaryRestrictions;
		newInviteeList[inviteeIndex] = invitee;
	}
	eventMapper.updateInviteeList(event.event_id, newInviteeList,function(err, res) {
		callback(err,res);
	});
}

function addTickets(ticketInfo, userID, eventObjectID, event_id, noTickets, noTables,callback){
	generateTickets(ticketInfo, userID, eventObjectID, noTickets, noTables, function(tickets){
		ticketMapper.addTickets(tickets, function(err){
			if(err){
				return callback(err);
			}
			let ticketsAvailable = ticketInfo.tickets.available - noTickets;
			let tablesAvailable = ticketInfo.tables.available - noTables;
			ticketInfoMapper.updateTicketAvailability(event_id, ticketsAvailable, tablesAvailable, function(err){
				if(err){
					return callback(err);
				}
				return callback(null);
			});
		});
	});
}

module.exports = router;
