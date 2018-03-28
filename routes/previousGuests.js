var express = require('express');
var router = express.Router();
var userMapper = require('../mappers/userMapper');
var eventMapper = require('../mappers/eventMapper');
var paymentMapper = require('../mappers/paymentMapper');
var isLoggedIn = require('../config/utils').isLoggedIn;
var isAdminUser = require('../config/utils').isAdminUser;
EventModel = require('../models/event');


router.get('/guests',isLoggedIn, isAdminUser, function(req, res) {
	userMapper.allUsers(function(err,users){
		if(err){
			res.send(err);
		}

		var filteredResult = [];

		eventMapper.findAllEvents(function(events) {
			paymentMapper.getAllPayments(function(err, payments) {
				if (!err) {
					for (var i=0; i < users.length; i++) {
						var userEvents = [];
						
						for (var j=0; j < events.length; j++) {
							for (var k=0; k < events[j].invitees.length; k++) {
								if ((users[i].email == events[j].invitees[k].email) && events[j].invitees[k].state == 'Attending')
								{
									userEvents.push(events[j].title);
								}
							}
						}

						var amountSpent = 0;
						var numDonations = 0;

						for (var l=0; l < payments.length; l++) {
							if (users[i]._id == payments[l].user_id) {
								amountSpent = amountSpent + payments[l].amount;
								numDonations++;
							}
						}

						if (amountSpent > 0) {
							filteredResult.push([users[i].name, users[i].email, userEvents, amountSpent, numDonations]);
						}
					}

					filteredResult.sort(function(current, next){return next[3] - current[3];});
				}

				res.render('previousGuests', {result: filteredResult,err: req.flash('err'),succ: req.flash('succ')});	
			});
		});
	});
});

module.exports = router;
