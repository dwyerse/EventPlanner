var express = require('express');
var router = express.Router();
var eventMapper = require('../mappers/eventMapper');
var menuMapper = require('../mappers/menuMapper');
var isLoggedIn = require('../config/utils').isLoggedIn;
var isAdminUser = require('../config/utils').isAdminUser;
EventModel = require('../models/event');

router.get('/edit/:event_id',isLoggedIn, isAdminUser, function(req, res) {
	eventMapper.findEventBy_event_id(req.params.event_id,function(err,result){
		if(err){
			res.send(err);
		}
		menuMapper.findMenusByEvent(req.params.event_id).then(function(menuResult){
			res.render('editEvent', {result,err: req.flash('err'),succ: req.flash('succ'), menus:menuResult});
		});
	});
});


router.post('/edit/:event_id',isLoggedIn, isAdminUser, function(req, res) {
	if(validUpdateParams(req.body)){
		var eventObj = new EventModel({title:req.body.title,location:req.body.location,date:req.body.date,description:req.body.description,event_id:req.params.event_id,creators:[],invitees:[]});
		//We corrupt the invitees and creator array here by resetting it to empty
		eventMapper.updateEventDetailsBy_event_id(req.params.event_id,eventObj,
			function(error,result) {
				if (!result) {
					req.flash('err', 'Event not updated');
				} else if (error) {
					req.flash('err', error);
				} else{
					req.flash('succ', 'Succesfully updated event');
					return res.redirect('/event/view/'+ result.event_id);
				}
				res.redirect('/event/edit' + req.params.event_id);
			});
	} else {
		req.flash('err', 'Not all details provided');
		res.redirect('/event/edit' + req.params.event_id);
	}
});

function validUpdateParams(body){
	return (body.title&&body.location&&body.date&&body.description);
}
module.exports = router;
