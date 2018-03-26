var express = require('express');
var router = express.Router();
var eventMapper = require('../mappers/eventMapper');
var milestoneMapper = require('../mappers/milestoneMapper');
var Milestones = require('../models/milestones')
var isLoggedIn = require('../config/utils').isLoggedIn;

router.get('/:event_id',isLoggedIn, function(req, res) {	
	eventMapper.findEventBy_event_id(req.params.event_id,function(err,result){
		if(err){
			res.send(err);
		}
		milestoneMapper.findMilestonesByEventId(req.params.event_id,function(error,milestones){
			if(err){
				res.send(error);
			}
			res.render('live',{result:result,milestones:milestones,eventId:req.params.event_id});
		});
	});
});

router.post('/add/:eventId/:existsGoal',function(req,res){

	const newAmounts = {achieved:false,amount:req.body.amount,label:req.body.label};

	const newMilestone= {
		'amounts' : newAmounts,
		'eventId' : req.params.eventId	
	};

	if(req.params.existsGoal=='true'){

		milestoneMapper.findMilestonesByEventId(req.params.eventId,function(error,milestone){
			
			milestone.amounts.push(newAmounts);
			console.log(milestone.amounts);
			var editedMilestone = milestone;

			milestoneMapper.editMilestones(req.params.eventId,editedMilestone,function(error,created){
				res.redirect("/live/"+req.params.eventId);
			});
		});

		
	}
	else{
		milestoneMapper.createMilestones(new Milestone(newMilestone),function(error,created){
			res.redirect("/live/"+req.params.eventId);
		});
	}
	
});

router.post('/amount', function(req, res){
	//TODO
	res.send('10');
}); 

router.post('/achieved/:eventId/:totalRaised', function(req, res){
	var notFound = true;
	Milestones.findOne({eventId:req.params.eventId},function(err,miles){

		console.log(miles);

		for(var x=0;x<miles.amounts.length;x++){
			console.log(miles.amounts[x].amount);
			if(req.params.totalRaised>=miles.amounts[x].amount && miles.amounts[x].achieved == false){
				if(notFound){
					miles.amounts[x].achieved = true;	
					notFound = false;
					res.send('Achieved € ' + miles.amounts[x].amount + ' goal');
					miles.save(function () {									
						
					});
				}
				
			}
		}
		if(notFound){			
			res.send('None');
		}
	});
}); 

module.exports = router;