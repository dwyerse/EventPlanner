var express = require('express');
var router = express.Router();
var eventMapper = require('../mappers/eventMapper');
EventModel = require('../models/event');

router.get('/view/:event_id/:userEmail', function(req, res) {
	
	eventMapper.findEventBy_event_id(req.params.event_id,function(err,result){
		if(err){
			res.send(err);
		}
		var userEmail = req.params.userEmail;
		var index = result.invitees.findIndex(function( obj ) {
			return obj.email == userEmail;
		});

		if(index==-1){
			res.redirect('/');
		}
		else{
			res.render('invitationResponse', {result,index,userEmail,err: req.flash('err'),succ: req.flash('succ')});	
		}		
	});
});

router.post('/view/rsvp/:event_id/:userEmail',function(req,res){
	
	eventMapper.findEventBy_event_id(req.params.event_id,function(err,result){
		if(err){
			res.send(err);
		}		
		var inviteeList = result.invitees;	
		var userEmail = req.params.userEmail;
		
		inviteeList.remove({email:userEmail});
		var index = inviteeList.findIndex(function( obj ) {
			return obj.email == userEmail;
		});
		if (index !== -1) inviteeList.splice(index, 1);
		inviteeList.push({email:userEmail, state:req.body.response});		
		eventMapper.updateInviteeList(req.params.event_id,inviteeList,function(err){
			if(err){
				res.send(err);
			}
			res.redirect('/invitationResponse/view/' + +req.params.event_id +'/'+userEmail);
		});		
	});
});

module.exports = router;