var express = require('express');
var router = express.Router();
var isLoggedIn = require('../config/utils').isLoggedIn;
const eventMapper = require('../mappers/eventMapper');

router.get('/:event_id', isLoggedIn, function(req, res) {
	let event_id = req.params.event_id;
	eventMapper.findEventBy_event_id(event_id, function(err,event) {
		res.render('buyTickets', {event, ticketsAvailable:28, ticketPrice:30,err: req.flash('err'),succ: req.flash('succ') });
	});
});

module.exports = router;
