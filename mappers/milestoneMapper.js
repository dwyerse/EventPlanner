Milestones = require('../models/milestones');

function createMilestones(newMilestone,callback){
	newMilestone.save(function (err,product) {
		return callback(err,product);
	});
}

function findMilestonesByEventId(eventId,callback){		
	
	Milestone.findOne({eventId:eventId},function(err,res){
		if(err){
			return callback(err);
		}
		return callback(err,res);
	});

}

function editMilestones(eventId,newMilestone,callback){
	Milestone.findOneAndUpdate({eventId:eventId},newMilestone,function(err,res){
		if(err){
			return callback(err);
		}
		return callback(err,res);
	});	
}

function deleteMilestones(eventId,callback){
	Milestone.remove({eventId:eventId},function(err){		
			return callback(err);
	});
}

module.exports = {createMilestones, findMilestonesByEventId,editMilestones,deleteMilestones};