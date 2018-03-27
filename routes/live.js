var express = require('express');
var router = express.Router();
var eventMapper = require('../mappers/eventMapper');
var milestoneMapper = require('../mappers/milestoneMapper');
var paymentMapper = require('../mappers/paymentMapper');
var Payment = require('../models/payment');
var Milestones = require('../models/milestones');
var isLoggedIn = require('../config/utils').isLoggedIn;
var isAdminUser = require('../config/utils').isAdminUser;

router.get('/:event_id',isLoggedIn, function(req, res) {	
	eventMapper.findEventBy_event_id(req.params.event_id,function(err,result){
		if(err){
			res.send(err);
		}
		if(!result){
			res.redirect('/');
		}
		milestoneMapper.findMilestonesByEventId(req.params.event_id,function(error,milestones){
			if(err){
				res.send(error);
			}
			var total = 0;
			Payment.find({event_id:req.params.event_id},function(error,payments){
				for(var i=0;i<payments.length;i++){
					total += payments[i].amount;
				}
				if (req.user.type === 'admin'){
					res.render('live',{result:result,milestones:milestones,isAdminUser:true,eventId:req.params.event_id,totalRaised:total,err: req.flash('err'),succ: req.flash('succ')});
				}
				else{
					res.render('live',{result:result,milestones:milestones,isAdminUser:false,eventId:req.params.event_id,totalRaised:total,err: req.flash('err'),succ: req.flash('succ')});
				}
				
			});
			
		});
	});
});

router.post('/add/:eventId/:existsGoal',isLoggedIn,isAdminUser,function(req,res){

	const newAmounts = {achieved:false,amount:req.body.amount,label:req.body.label};

	const newMilestone= {
		'amounts' : newAmounts,
		'eventId' : req.params.eventId	
	};

	if(req.params.existsGoal=='true'){

		milestoneMapper.findMilestonesByEventId(req.params.eventId,function(error,milestone){
			
			milestone.amounts.push(newAmounts);
			var editedMilestone = milestone;

			milestoneMapper.editMilestones(req.params.eventId,editedMilestone,function(){
				res.redirect('/live/'+req.params.eventId);
			});
		});

		
	}
	else{
		milestoneMapper.createMilestones(new Milestone(newMilestone),function(){
			res.redirect('/live/'+req.params.eventId);
		});
	}
	
});

router.post('/amount/:event_id',isLoggedIn, function(req, res){
	var total = 0;
	Payment.find({event_id:req.params.event_id},function(error,result){
		for(var i=0;i<result.length;i++){
			total += result[i].amount;
		}
		res.send(''+total);
	});	
}); 

router.post('/donate', function(req, res){
	
	let newPaymentObj = {
		event_id: req.body.eventId,
		amount: req.body.donationValue,
		user_id: req.user._id,
		type: 'Donation'
	};
	paymentMapper.addPayment(newPaymentObj, function(err) {

		if(err){
			res.redirect('/');
		}
		else{
			req.flash('succ', 'Thank you for your donation!');
			res.redirect('/live/'+req.body.eventId);
		}

	});

}); 

router.post('/achieved/:eventId/:totalRaised',isLoggedIn, function(req, res){

	Milestones.findOne({eventId:req.params.eventId},function(err,miles){
		if(miles!=null){
			var achArr = [];
			for(var x=0;x<miles.amounts.length;x++){			
				if(req.params.totalRaised>=miles.amounts[x].amount){
					achArr.push(x);
					miles.amounts[x].achieved = true;				
					miles.save();										
				}
			}
			res.send(achArr);
		}
	});
}); 

module.exports = router;