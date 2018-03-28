var express = require('express');
var router = express.Router();
var userMapper = require('../mappers/userMapper');
var paymentMapper = require('../mappers/paymentMapper');
var isLoggedIn = require('../config/utils').isLoggedIn;
var isAdminUser = require('../config/utils').isAdminUser;
EventModel = require('../models/event');


router.get('/guests',isLoggedIn, isAdminUser, function(req, res) {
	userMapper.allUsers(function(err,result){
		if(err){
			res.send(err);
		}
		
		var filteredResult = result.filter(function(user){
			return (user.eventsAttended.length > 0);
		});

		paymentMapper.getAllPayments(function(err, payments) {

			var finalResult = [];

			for (var i = 0; i < filteredResult.length; i++) {
				var amountSpent = 0;
				var numDonations = 0;


				for (var j = 0; j < payments.length; j++) {
					if (filteredResult[i]._id == payments[j].user_id)
					{
						amountSpent = amountSpent + payments[j].amount;
						numDonations++;
					}
				}

				finalResult.push([filteredResult[i], [amountSpent, numDonations]]);
			}

			finalResult.sort(function(current, next){return next[1][0] - current[1][0];});

			res.render('previousGuests', {result: finalResult,err: req.flash('err'),succ: req.flash('succ')});
		
		});
	});
});

module.exports = router;
