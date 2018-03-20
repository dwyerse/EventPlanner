var express = require('express');
var router = express.Router();
const isLoggedIn = require('../config/utils').isLoggedIn;
const isAdminUser = require('../config/utils').isAdminUser;
const validatePaymentDetails = require('../config/utils').validatePaymentDetails;
const eventMapper = require('../mappers/eventMapper');
//const ticketMapper = require('../mappers/ticketMapper');
const paymentMapper = require('../mappers/paymentMapper');
const ticketInfoMapper = require('../mappers/ticketInfoMapper');

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
	//req.body.noTickets | req.body.noTables
	if(validatePaymentDetails(req.body.cardNo, req.body.cvv, req.body.billingName, req.body.paymentAmount)) {
		let newPaymentObj = {event_id:event_id, amount: req.body.paymentAmount, user_id: req.user._id};
		paymentMapper.addPayment(newPaymentObj, function(err) {
			if(err){
				req.flash('err', err);
				return res.redirect('/event/tickets/'+event_id);
			}
			//TODO: Create tickets
			//TODO: Update Ticket Info -available
			req.flash('succ', 'Succesfully Purchased Tickets');
			return res.redirect('/event/view/'+event_id);
		});
	} else {
		req.flash('err', 'Invalid Payment Details');
		return res.redirect('/event/tickets/'+event_id);
	}
});

router.get('/setup/:event_id', isLoggedIn, isAdminUser, function(req, res) {
	let event_id = req.params.event_id;
	eventMapper.findEventBy_event_id(event_id, function(err,event) {
		ticketInfoMapper.getTicketInfo(event_id, function(err2, ticketInfo) {
			if(!ticketInfo){
				ticketInfo = {event_id:event_id, ticketInfo};
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

module.exports = router;
