var express = require('express');
var router = express.Router();
var Table = require('../models/table');
var tableMapper = require('../mappers/tableMapper');
var eventMapper = require('../mappers/eventMapper');
var isLoggedIn = require('../config/utils').isLoggedIn;
var isAdminUser = require('../config/utils').isAdminUser;

router.get('/:event_id',isLoggedIn, isAdminUser, function(req, res) {
	eventMapper.findEventBy_event_id(req.params.event_id,function(err,result){

		var eventName = result.title;

		tableMapper.findTablesByEventId(req.params.event_id,function(err,table){
			res.render('table', {table:table,event_id:req.params.event_id,eventName:eventName, succ: req.flash('succ')});
		});	
	});	
});

router.post('/edit/:event_id/:tableNumber/:labelAmount',isLoggedIn, isAdminUser, function(req, res) {
	
	var Labels = [];
	var Seats = [];
	var data = req.body;
	for(var item in data){
		if(item.split('-')[0] == 'label'){
			Labels.push(req.body[item]);
		}
		else{
			Seats.push(req.body[item]);
		}
	}
	var tableObj = new Table({tableNumber:req.params.tableNumber,tableLabels:Labels,size:req.params.labelAmount,seatLabels:Seats,eventId:req.params.event_id});
	tableMapper.editTable(req.params.event_id,req.params.tableNumber,tableObj,function(err){
		if(err){
			req.flash('err', err);
		}
		else{
			req.flash('succ', 'Successfully changed the table plan!');
		}
		
		res.redirect('/table/'+req.params.event_id);	
	});
});


router.post('/create/:event_id/',isLoggedIn, isAdminUser, function(req, res) {

	tableMapper.findTablesByEventId(req.params.event_id, function(err2,result) {
		
		l = result.length;
		var data = [];
		var length = req.body.seats; // user defined length

		for(var i = 0; i < length; i++) {
			data.push('Attendee');
		}
		tableMapper.createTable(l+1,[],req.body.seats,data,req.params.event_id,function(err){
			if(err){
				req.flash('err', err);
			}
			else{
				req.flash('succ', 'Successfully created a table!');
			}
			res.redirect('/table/'+req.params.event_id);	
		});
	});
});

router.post('/delete/:event_id/:tableNumber',isLoggedIn, isAdminUser, function(req, res) {

	tableMapper.deleteTable(req.params.event_id,req.params.tableNumber,function(){		
		res.redirect('/table/'+req.params.event_id);
	});

});

module.exports = router;