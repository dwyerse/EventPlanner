var express = require('express');
var router = express.Router();
var eventMapper = require('../mappers/eventMapper');
var userMapper = require('../mappers/userMapper');
var path = require('path');
var menuMapper = require('../mappers/menuMapper');
var fs = require('fs');
var isLoggedIn = require('../config/utils').isLoggedIn;
var isAdminUser = require('../config/utils').isAdminUser;
EventModel = require('../models/event');
const EVENT_SUB_PREFIX = 'Event_';
var mailer = require('../config/mailer');

router.get('/view/:event_id',isLoggedIn, function(req, res) {
	var isSubscribed = req.user.subscriptions.includes(EVENT_SUB_PREFIX + req.params.event_id);
	eventMapper.findEventBy_event_id(req.params.event_id,function(err,result){
		if(err){
			res.send(err);
		}
		menuMapper.findMenusByEvent(req.params.event_id).then(function(menuResult){
			res.render('event', {result,err: req.flash('err'),succ: req.flash('succ'), menus:menuResult, isSubscribed});
		});
	});
});

router.get('/create',isLoggedIn, isAdminUser, function(req, res) {
	res.render('createEvent', {err: req.flash('err'),succ: req.flash('succ')} );
});

router.get('/edit/:event_id',isLoggedIn, isAdminUser, function(req, res) {
	eventMapper.findEventBy_event_id(req.params.event_id,function(err,result){
		if(err){
			res.send(err);
		}
		menuMapper.findMenusByEvent(req.params.event_id).then(function(menuResult){
			res.render('editEvent', {result,err: req.flash('err'),succ: req.flash('succ'), menus:menuResult});
		});
	});
});

router.get('/guests/:event_id',isLoggedIn, isAdminUser, function(req, res) {
	eventMapper.findEventBy_event_id(req.params.event_id,function(err,result){
		if(err){
			res.send(err);
		}

		res.render('viewGuestDetails', {result,err: req.flash('err'),succ: req.flash('succ')});
	});
});

router.post('/create',isLoggedIn, isAdminUser, function(req, res) {
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

router.post('/edit/:event_id',isLoggedIn, isAdminUser, function(req, res) {
	if(validUpdateParams(req.body)){
		var eventObj = new EventModel({title:req.body.title,location:req.body.location,date:req.body.date,description:req.body.description,event_id:req.params.event_id,creators:[],invitees:[]});
		eventMapper.updateEventDetailsBy_event_id(req.params.event_id,eventObj,
			function(error,result) {
				if (!result) {
					req.flash('err', 'Event not updated');
				} else if (error) {
					req.flash('err', error);
				} else{
					req.flash('succ', 'Succesfully updated event');
					sendUpdateEmail(result);
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
		res.render('uploadMenu', {menus:result, event_id:id, message: req.flash('uploadMessage') } );
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

	if (!req.files.uploadedFile){
		res.redirect('/event/edit/' + req.params.event_id + '/addMenu');
	}
	else{
		var eventId = req.params.event_id;
		var menuId;
		var filename;
		var filepath = path.join(__dirname, '../menus');
		[menuId,filepath,filename] = getNewFilename(filepath, eventId);

		let uploadedFile = req.files.uploadedFile;
		if(uploadedFile.mimetype!=='application/pdf'){
			req.flash('uploadMessage', 'Uploaded file must be in pdf format');
			res.redirect('/event/edit/' + req.params.event_id + '/addMenu');
		}
		else if(!req.body.menuName){
			req.flash('uploadMessage', 'Uploaded file must be have a name');
			res.redirect('/event/edit/' + req.params.event_id + '/addMenu');
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

router.post('/unsubscribe', isLoggedIn, function(req, res){
	if(req.body.event_id){
		var newSub = EVENT_SUB_PREFIX + req.body.event_id;
		userMapper.updateUserSubs(req.user.email, newSub,false, function(err,updatedUser){
			if(err || !updatedUser) {
				req.flash('err', 'Unable to unsubscribe to this event');
			} else {
				req.flash('succ', 'Succesfully unsubscribed to this event');
				res.redirect('/event/view/'+req.body.event_id);
			}
		});
	}
});

router.post('/subscribe', isLoggedIn, function(req, res){
	if(req.body.event_id){
		var newSub = EVENT_SUB_PREFIX + req.body.event_id;
		userMapper.updateUserSubs(req.user.email, newSub,true, function(err,updatedUser){
			if(err || !updatedUser) {
				req.flash('err', 'Unable to subscribe to this event');
			} else {
				req.flash('succ', 'Succesfully subscribed to this event');
				res.redirect('/event/view/'+req.body.event_id);
			}
		});
	}
});

function sendUpdateEmail(event) {
	var sub = EVENT_SUB_PREFIX + event.event_id;
	userMapper.findSubscribedUsers(sub, function(err , emails){
		if(!err && emails && emails.length>0){
			mailer.sendEventNotification(emails, event, 'updated');
		}
	});
}

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
