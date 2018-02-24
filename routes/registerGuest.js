var express = require('express');
var router = express.Router();
var eventMapper = require('../mappers/eventMapper');
var userMapper = require('../mappers/userMapper');
var isLoggedIn = require('../config/utils').isLoggedIn;
var isAdminUser = require('../config/utils').isAdminUser;
EventModel = require('../models/event');

router.get('/guest/:event_id',isLoggedIn, isAdminUser, function(req, res) {
	eventMapper.findEventBy_event_id(req.params.event_id,function(err,result){
		if(err){
			res.send(err);
		}
		res.render('registerGuest', {result,err: req.flash('err'),succ: req.flash('succ')});
	});
});

router.post('/guest/:event_id',isLoggedIn, isAdminUser, function(req, res) {

	if(validGuestParams(req.body)){

		var guestEmail = req.body.guestEmail;
		var guestAccessRequirements = req.body.accessRequirements;
		var guestDietaryRestrictions = req.body.dietaryRestrictions;

		var currentEventId = req.params.event_id;

		userMapper.findUserByEmail(guestEmail, function(err, result) {
			// Only register guest if their email is found
			if (!result || isEmpty(result)) {
				req.flash('err', 'Guest email not found');
				res.redirect(req.params.event_id);
			} else if (err) {
				req.flash('err', err);
			} else {
				eventMapper.findEventBy_event_id(currentEventId, function(err, result) {
					if (!result) {
						req.flash('err', 'Event not found');
						res.redirect('/');
					} else if (err) {
						req.flash('err', err);
					} else {
						var alreadyRegistered = false;

						for (var i = 0; i < result.invitees.length; i++)
						{
							if (result.invitees[i].email === guestEmail)
							{
								alreadyRegistered = true;
							}
						}

						if (!alreadyRegistered)
						{
							result.invitees.push({email:guestEmail, state:'attending', accessRequirements:guestAccessRequirements, dietaryRestrictions:guestDietaryRestrictions});

							eventMapper.updateEventBy_event_id(result.event_id, result, function(error,result) {
								if (!result) {
									req.flash('err', 'Event not updated');
								} else if (error) {
									req.flash('err', error);
								} else {
									req.flash('succ', 'Succesfully registered guest');
									return res.redirect('/event/view/'+ result.event_id);
								}
								res.redirect('/event/view/' + req.params.event_id);
							});
						}
						else
						{
							req.flash('err', 'Guest has already been registered');
							res.redirect('/register/guest/' + req.params.event_id);
						}
				
					}
				});
						
			}

		});
		
	} else {
		req.flash('err', 'Not all details provided');
		res.redirect('/event/view/' + req.params.event_id);
	}
});

function isEmpty(obj) {
	// null and undefined are "empty"
	if (obj == null) return true;

	// Assume if it has a length property with a non-zero value
	// that that property is correct.
	if (obj.length > 0)    return false;

	if (obj.length === 0)  return true;

	if (typeof obj !== 'object') return true;

	// Does it have any properties of its own?
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false;
	}

	return true;
}

function validGuestParams(body){
	return (body.guestEmail && body.accessRequirements && body.dietaryRestrictions);
}

module.exports = router;
