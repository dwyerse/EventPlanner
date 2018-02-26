var nodeMailer = require('nodemailer');
var fs = require('fs');
var emailConfig = JSON.parse(fs.readFileSync('config/mailerDetails.json'));
const adminAcc = '"Event Planner" <admin@eventplanner.com>';
const EVENT_BASE_URL = 'http://localhost:3000/event/';
let transporter = nodeMailer.createTransport({
	service: 'gmail',
	port: 25,
	secure: false,
	auth: {
		user: emailConfig.email,
		pass: emailConfig.password
	},
	tls: {
		rejectUnauthorised: false
	}});
//action could be 'created'/'updated'
function sendEventNotification(mailingList, eventDetails, action, result) {
	if(validEmailParams(mailingList,eventDetails) && action){
		var subject = `Event Notification - ${eventDetails.title}`;
		var body = `Dear User,\nThe following event has been ${action}: \n${eventDetails.title} \nDate: ${eventDetails.date}`+
				`\nLink to event: ${EVENT_BASE_URL}${eventDetails.event_id}`;
		sendMail([], mailingList, subject, body, (err,info) => {
			return result(err,info);
		});
	}
}

function sendInvitation(mailingList, eventDetails, result) {
	if(validEmailParams(mailingList,eventDetails)){
		var subject = `Invitation - ${eventDetails.title}`;
		var body = `Dear Guest,\nYou have been formally invited to following event: \n${eventDetails.title} \nDate: ${eventDetails.date}`+
			`\nDescription: ${eventDetails.description} \nLink to event: ${EVENT_BASE_URL}${eventDetails.event_id}`;
		sendMail([], mailingList, subject, body, (err,info) => {
			return result(err,info);
		});
	}
}
function sendMail(recipient,bccRecipients, subject, body, callback){
	let mailOptions = {
		from: adminAcc,
		to: recipient,
		bcc: bccRecipients,
		subject: subject,
		text: body
	};
	transporter.sendMail(mailOptions, function(err,info) {
		//Return the messages to original caller
		return callback(err, info);
	});
}

function validEmailParams(mailingList, eventDetails){
	if(mailingList && mailingList.length>0 && eventDetails.title && eventDetails.date
		&& eventDetails.description && eventDetails.event_id != null) {
		return true;
	}
	return false;
}
module.exports = {sendMail,sendInvitation,sendEventNotification};
