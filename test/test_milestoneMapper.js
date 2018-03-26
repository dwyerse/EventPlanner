var assert = require('assert');
var Milestone = require('../models/milestones');
var mapper = require('../mappers/milestoneMapper');
var mongoose = require('mongoose');
const APP_DB = 'mongodb://127.0.0.1/eventplanner_db';
const TESTMILESTONE= {
	'amounts' : [{achieved:false,amount:100,label:"Low milestone"}],
	'eventId' : '9999'	
};
const TESTUPDATEDMILESTONE= {
	'amounts' : [{achieved:true,amount:200,label:"New milestone"}],
	'eventId' : '9999'	
};

describe('milestoneMapper testing suite', function() {
	before(function(){
		mongoose.connect(APP_DB);
	});

	it('should validate the milestone model successfully', function(done) {
		new Milestone(TESTMILESTONE).validate(function(err){
			assert.equal(err,null);
			done();
		});
	});

	it('should add Milestone to the database without error', function(done) {
		mapper.createMilestones(new Milestone(TESTMILESTONE), function(err,res){
			assert.equal(err,null);
			assert.equal(res.amounts.amount,TESTMILESTONE.amounts.amount);
			assert.equal(res.amounts.achieved,TESTMILESTONE.amounts.achieved);
			assert.equal(res.amounts.label,TESTMILESTONE.amounts.label);
			assert.equal(res.eventId,TESTMILESTONE.eventId);
			done();
		});
	});

	it('should edit Milestone ', function(done) {
		mapper.editMilestones(TESTMILESTONE.eventId,TESTUPDATEDMILESTONE, function(err,res){
			assert.equal(err,null);
			assert.equal(res.amounts.amount,TESTUPDATEDMILESTONE.amounts.amount);
			assert.equal(res.amounts.achieved,TESTUPDATEDMILESTONE.amounts.achieved);
			assert.equal(res.amounts.label,TESTUPDATEDMILESTONE.amounts.label);
			assert.equal(res.eventId,TESTUPDATEDMILESTONE.eventId);
			done();
		});
	});

	it('should delete Milestone ', function(done) {
		mapper.deleteMilestones(TESTMILESTONE.eventId, function(err,res){
			assert.equal(err,null);
			done();
		});
	});


});
