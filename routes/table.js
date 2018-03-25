var express = require('express');
var router = express.Router();
var Table = require('../models/table');
var tableMapper = require('../mappers/tableMapper');
var isLoggedIn = require('../config/utils').isLoggedIn;
var isAdminUser = require('../config/utils').isAdminUser;

router.get('/:event_id',isLoggedIn, isAdminUser, function(req, res) {
	tableMapper.findTablesByEventId(req.params.event_id,function(err,table){
		res.render('table', {table:table, succ: req.flash('succ')});
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

module.exports = router;