var express = require('express');
var router = express.Router();
var eventMapper = require('../mappers/eventMapper');
var path = require('path');
var menuMapper = require('../mappers/menuMapper');
var fs = require('fs');
var isLoggedIn = require('../config/utils').isLoggedIn;
EventModel = require('../models/event');

router.get('/view/:event_id',isLoggedIn, function(req, res) {
	eventMapper.findEventBy_event_id(req.params.event_id,function(err,result){
		if(err){
			res.send(err);
		}
		menuMapper.findMenusByEvent(req.params.event_id).then(function(menuResult){
			res.render('event', {result,err: req.flash('err'),succ: req.flash('succ'), menus:menuResult});
		});
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
		menuMapper.findMenusByEvent(req.params.event_id).then(function(menuResult){
			res.render('editEvent', {result,err: req.flash('err'),succ: req.flash('succ'), menus:menuResult});
		});
	});
});

router.post('/create',isLoggedIn, function(req, res) {
	if(validUpdateParams(req.body)){
		eventMapper.createEvent(req.body.title,req.body.location,req.body.date,req.body.description,0,[req.user._id],[],
			function(error,result) {
				if (!result) {
					req.flash('err', 'Event not created');
				} else if (error) {
					req.flash('err', error);
				} else{
					req.flash('succ', 'Succesfully created event');
					return res.redirect('/event/view/'+ result.event_id);
				}
				res.redirect('/event/create');
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
				} else{
					req.flash('succ', 'Succesfully updated event');
					return res.redirect('/event/view/'+ result.event_id);
				}
				res.redirect('/event/edit' + req.params.event_id);
			});
	} else {
		req.flash('err', 'Not all details provided');
		res.redirect('/event/edit' + req.params.event_id);
	}
});


//Add Menu
router.get('/edit/:event_id/addMenu',isLoggedIn, function(req, res) {
	var id = req.params.event_id;
	menuMapper.findMenusByEvent(req.params.event_id).then(function(result){
		res.render('uploadMenu', {menus:result, event_id:id} );
	});
});

//View Menu
router.get('/viewMenu/:filename', isLoggedIn, function(req, res){
	var file='./menus/' + req.params.filename;
	fs.readFile(file, function (err,data){
		res.contentType('application/pdf');
		res.send(data);
	});
});

//Uploading process
router.post('/edit/:event_id/addMenu/upload', isLoggedIn,function(req, res) {

	if (!req.files){
		return res.send('No files were uploaded.');
	}
	else{
		var eventId = req.params.event_id;
		var menuId;
		var filename;
		var filepath = path.join(__dirname, '../menus');
		[menuId,filepath,filename] = getNewFilename(filepath, eventId);
		
		let uploadedFile = req.files.uploadedFile;
		if(uploadedFile.mimetype!=='application/pdf'){
			res.send('Uploaded file must be in pdf format');
		}
		else{
			uploadedFile.mv(filepath, function(err) {
				if (err){
					return res.status(500).send(err);
				}
				menuMapper.createMenu(req.body.menuName, filename, eventId, menuId, filepath, function(){});
				res.redirect('/event/edit/' + req.params.event_id + '/addMenu');
			});
		}
	}
});

function getNewFilename(filepath, eventId){
	var count = 0;
	while(fs.existsSync(filepath + '/' + eventId + '_' + count + '.pdf')) {
		count++;
	}
	return [count,filepath + '/' + eventId + '_' + count + '.pdf', eventId + '_' + count + '.pdf'];
}

function validUpdateParams(body){
	return (body.title&&body.location&&body.date&&body.description);
}
module.exports = router;
