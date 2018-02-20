var express = require('express');
var router = express.Router();
var eventMapper = require('../mappers/eventMapper');
var isLoggedIn = require('../config/utils').isLoggedIn;
var isAdminUser = require('../config/utils').isAdminUser;
EventModel = require('../models/event');

router.get('/register/guest/:event_id',isLoggedIn, isAdminUser, function(req, res) {
	eventMapper.findEventBy_event_id(req.params.event_id,function(err,result){
		if(err){
			res.send(err);
		}
		res.render('registerGuest', {result,err: req.flash('err'),succ: req.flash('succ')});
	});
});

router.post('/register/guest/:event_id',isLoggedIn, isAdminUser, function(req, res) {
	if(validUpdateParams(req.body)){

		var guestEmail = req.body.guestEmail;
		//var guestAccessRequirements = req.body.accessRequirements;
		//var guestDietaryRestrictions = req.body.dietaryRestrictions;

		var currentEventId = req.params.event_id;

		eventMapper.findEventBy_event_id(currentEventId, function(err, result) {
			if (!result) {
				req.flash('err', 'Event not found');
				res.redirect('/');
			} else if (error) {
				req.flash('err', error);
			} else {

				var updatedInvitees = result[0].invitees;
				updatedInvitees.push({email:guestEmail, state:'attending'});

				var updatedEventObj = new EventModel({title:result[0].title,location:result[0].location,date:result[0].date,description:result[0].description,event_id:result[0].event_id,creators:[],invitees:updatedInvitees});
				//We corrupt the invitees and creator array here by resetting it to empty
				eventMapper.updateEventDetailsBy_event_id(result[0].event_id,updatedEventObj,
					function(error,result) {
						if (!result) {
							req.flash('err', 'Event not updated');
						} else if (error) {
							req.flash('err', error);
						} else{
							req.flash('succ', 'Succesfully registered guest');
							return res.redirect('/event/view/'+ result[0].event_id);
						}
						res.redirect('/event/view' + req.params.event_id);
					}
				);
			}
		});

		
	} else {
		req.flash('err', 'Not all details provided');
		res.redirect('/event/view' + req.params.event_id);
	}
});


function validUpdateParams(body){
	return (body.title&&body.location&&body.date&&body.description);
}
module.exports = router;
