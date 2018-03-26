Milestone = require('../models/milestone');

function createMilestone(amounts,eventId,callback){
	var newMilestone = new Milestone({amounts:amounts, eventId:eventId});
	newMilestone.save(function (err,product) {
		return callback(err,product);
	});
}

function findMilestoneByEventId(eventId,callback){		
	
	Milestone.findOne({eventId:eventId},function(err,res){
		if(err){
			return callback(err);
		}
		return callback(err,res);
	});

}

function editMilestone(eventId,newObj,callback){
	Milestone.findOne({eventId:eventId}, function(err,res){
		if(err){
			return callback(err);
		}
		else{

			res.amount = newObj.amount;
			res.eventId = newObj.eventId;	

			res.save(function (err, updated) {
				return callback(err,updated);
			});

		}
	});	
}

function deleteMilestone(eventId,callback){
	Milestone.remove({eventId:eventId},function(err){		
			return callback(err);
	});
}

module.exports = {createMilestone, findMilestoneByEventId,editMilestone,deleteMilestone};