var express = require('express');
var router = express.Router();
var eventMapper = require('../mappers/eventMapper');
var path = require('path');
var menuMapper = require('../mappers/menuMapper');
var userMapper = require('../mappers/userMapper');
var inviteList = require('./inviteList');
var fs = require('fs');
var isLoggedIn = require('../config/utils').isLoggedIn;
var isAdminUser = require('../config/utils').isAdminUser;
EventModel = require('../models/event');
const EVENT_SUB_PREFIX = 'Event_';
const NEWEVENTS_SUB = 'Event_new';
var mailer = require('../config/mailer');
const ADMIN_ACCOUNT = 'admin';

router.get('/view/:event_id',isLoggedIn, function(req, res) {
	var isSubscribed = req.user.subscriptions.includes(EVENT_SUB_PREFIX + req.params.event_id);
	eventMapper.findEventBy_event_id(req.params.event_id,function(err,result){
		if(err){
			res.send(err);
		}
		menuMapper.findMenusByEvent(req.params.event_id).then(function(menuResult) {
			if(req.user.type == ADMIN_ACCOUNT){
				res.render('eventAdmin', {result, err: req.flash('err'), succ: req.flash('succ'), menus:menuResult, isSubscribed, isAdmin:true});
			} else {
				res.render('eventUser', {result, err: req.flash('err'), succ: req.flash('succ'), menus:menuResult, isSubscribed});
			}
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
		userMapper.allUsers(function(error,userResult){
			let userEmails = userResult.map(invitee=>invitee.email);
			let usersWithAllInfoAvailable = result.invitees.map(invitee=>
				(userEmails.indexOf(invitee.email) > -1)?userResult[userEmails.indexOf(invitee.email)]:
					{email:invitee.email});
			res.render('viewGuestDetails', {result,usersWithAllInfoAvailable,err: req.flash('err'),succ: req.flash('succ')});
		});
		
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
					sendCreateNotfication(result);
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

//Attendee Report
router.get('/view/:event_id/attendeeReport',isLoggedIn,isAdminUser,function(req,res){
	eventMapper.findEventBy_event_id(req.params.event_id,function(err,result){
		if(err){
			res.send(err);
		}
		userMapper.allUsers(function(error,userResult){
			var attending = [];
			var names = [];
			for (var i = 0; i < result.invitees.length; i++) {
				if(result.invitees[i].state=='Attending'||result.invitees[i].state=='Attending'){
					var userExists = false;
					for (var j = 0; j < userResult.length; j++) {
						if(userResult[j].email==result.invitees[i].email){
							userExists = true;
							names.push(userResult[j].name);
							break;
						}
					}
					if(!userExists){
						names.push('');
					}
					attending.push(result.invitees[i]);
				}
			}
			res.render('attendeeReport', {attending:attending, names:names, err: req.flash('err'), succ: req.flash('succ')});
		});
	});
});

//Add invitee
router.post('/view/:event_id/addInvitee',isLoggedIn,isAdminUser,function(req,res){
	eventMapper.findEventBy_event_id(req.params.event_id,function(error,result){
		if(!req.body.email){
			res.redirect('/event/view/' + req.params.event_id);
		}
		else{
			var emailAlreadyExists = false;
			for (var i = 0; i < result.invitees.length; i++) {
				if(req.body.email==result.invitees[i].email){
					emailAlreadyExists = true;
					break;
				}
			}
			if(emailAlreadyExists){
				req.flash('err', 'Invitee failed to be added: invitee already exists');
				res.redirect('/event/view/' + req.params.event_id);
			}
			else{

				var newInvitees = result.invitees;
				newInvitees.push({email: req.body.email, state: 'Pending'});
				inviteList.updateInvitees(newInvitees,req.params.event_id,result, function(err){
					if(err){
						req.flash('err', 'Invitee failed to be added');
					}
				});
				mailer.sendInvitation([req.body.email],result,function(err){
					if(err){
						req.flash('err', 'Email not sent');
					}
				});
				req.flash('succ', 'Invitee added');
				res.redirect('/event/view/' + req.params.event_id);
			}
		}
	});
});

//Remove invitee
router.post('/view/:event_id/removeInvitee', isLoggedIn, isAdminUser,function(req,res){
	eventMapper.findEventBy_event_id(req.params.event_id,function(error,result){

		var newInvitees = [];
		for (var i = 0; i < result.invitees.length; i++) {
			if(req.body.inviteeId!=i){
				newInvitees.push(result.invitees[i]);
			}
		}
		inviteList.updateInvitees(newInvitees,req.params.event_id,result, function(err){
			if(err){
				req.flash('err', 'Invitee failed to be removed');
			}
		});
		req.flash('succ', 'Invitee removed');
		res.redirect('/event/view/' + req.params.event_id);
	});
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


function sendCreateNotfication(event){
	userMapper.findSubscribedUsers(NEWEVENTS_SUB, function(err,subEmails) {
		if(!err){
			return mailer.sendEventNotification(subEmails, event, 'created');
		}
	});
}

router.post('/contact',isAdminUser, isLoggedIn, function(req, res){
	getRecipientEmails(req.body.select, req.body.event_id, function(err,emails) {
		if(err){
			req.flash('err', err);
		}
		else if(emails && emails.length>0){
			req.flash('succ', 'Successfully sent email');
			mailer.sendMail([], emails, req.body.subject, req.body.message);
		}
		res.redirect('/event/view/'+req.body.event_id);
	});
});

function getRecipientEmails(select, event_id, callback){
	if(select == 'attendees'){
		eventMapper.findAttendeeEmails(event_id, function(err, attendees){
			callback(err,attendees);
		});
	} else if(select == 'invitees') {
		eventMapper.findInviteeEmails(event_id, function(err,invitees){
			callback(err,invitees);
		});
	} else if(select == 'subscribers'){
		var sub = EVENT_SUB_PREFIX + event_id;
		userMapper.findSubscribedUsers(sub, function(err , subscribers){
			callback(err,subscribers);
		});
	}
}

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
