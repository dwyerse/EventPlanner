var express = require('express');
var router = express.Router();
var eventMapper = require('../mappers/eventMapper');
var isLoggedIn = require('../config/utils').isLoggedIn;
EventModel = require('../models/event');

router.get('/view/:event_id',isLoggedIn, function(req, res) {
	eventMapper.findEventBy_event_id(req.params.event_id,function(err,result){
		if(err){
			res.send(err);
		}
		res.render('event', {result});
	});
});

router.get('/create',isLoggedIn, function(req, res) {
	res.render('createEvent', {err: req.flash('err'),succ: req.flash('succ')} );
});

router.get('/edit/:event_id',isLoggedIn, function(req, res) {
	eventMapper.findEventBy_event_id(req.params.event_id,function(err,result){
		if(err){
			res.send(err);
		}
		res.render('editEvent', {result,err: req.flash('err'),succ: req.flash('succ')});
	});
});

router.post('/goToEdit/:event_id',isLoggedIn,function(req,res){
	res.redirect('/event/edit/'+req.params.event_id);
});

router.post('/create',isLoggedIn, function(req, res) {
	if(validUpdateParams(req.body)){
		eventMapper.createEvent(req.body.title,req.body.location,req.body.date,req.body.description,0,[req.user._id],[],
			function(error,result) {
				if (!result) {
					req.flash('err', 'Event not created');
				} else if (error) {
					req.flash('err', error);
				}
				res.redirect('/event/view/'+ result.event_id);
			});
	} else {
		req.flash('err', 'Not all details provided');
		res.redirect('/event/create');
	}

});

router.post('/edit/:event_id',isLoggedIn, function(req, res) {
	if(validUpdateParams(req.body)){
		var eventObj = new EventModel({title:req.body.title,location:req.body.location,date:req.body.date,description:req.body.description,event_id:req.params.event_id,creators:[],invitees:[]});
		//We corrupt the invitees and creator array here by resetting it to empty
		eventMapper.updateEventDetailsBy_event_id(req.params.event_id,eventObj,
			function(error,result) {
				if (!result) {
					req.flash('err', 'Event not updated');
				} else if (error) {
					req.flash('err', error);
				}
				res.redirect('/event/view/' + req.params.event_id);
			});
	} else {
		req.flash('err', 'Not all details provided');
	}
});


function validUpdateParams(body){
	return (body.title&&body.location&&body.date&&body.description);
}
module.exports = router;
