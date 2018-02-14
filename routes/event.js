var express = require('express');
var router = express.Router();
var eventMapper = require('../mappers/eventMapper');
EventModel = require('../models/event');

router.get('/:event_id', function(req, res) {
	eventMapper.findEventBy_event_id(req.params.event_id,function(err,result){
		if(err){
			res.send(err);
		}
		res.render('event', {result});
	});
});

router.get('/create', function(req, res) {
	res.render('createEvent', {} );
});

router.get('/edit/:event_id', function(req, res) {
	eventMapper.findEventBy_event_id(req.params.event_id,function(err,result){
		if(err){
			res.send(err);
		}
		res.render('editEvent', {result});
	});	
});

router.post('/goToEdit/:event_id',function(req,res){
	res.redirect('/event/edit/'+req.params.event_id);
});

router.post('/create', function(req, res) {	
	if(validUpdateParams(req.body)){		
		eventMapper.createEvent(req.body.name,req.body.location,req.body.date,req.body.description,11,[],[],
			function(error,result) {
				if (!result) {
					req.flash('err', 'Event not created');
				} else if (error) {
					req.flash('err', error);
				}
				res.redirect('/event/create');
			});
	} else {
		req.flash('err', 'Not all details provided');
		res.redirect('/event/create');
	}

});

router.post('/edit/:event_id', function(req, res) {
	if(validUpdateParams(req.body)){		
		var eventObj = new EventModel({name:req.body.name,location:req.body.location,date:req.body.date,description:req.body.description,event_id:req.params.event_id,creators:[],invitees:[]});
		eventMapper.updateEventBy_event_id(req.params.event_id,eventObj,
			function(error,result) {
				if (!result) {
					req.flash('err', 'Event not created');
				} else if (error) {
					req.flash('err', error);
				}
				res.redirect('/event/' + req.params.event_id);
			});
	} else {
		req.flash('err', 'Not all details provided');
		res.redirect('/event/create');
	}
});


function validUpdateParams(body){
	return (body.name&&body.location&&body.date&&body.description);
}
module.exports = router;