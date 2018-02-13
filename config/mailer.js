var nodeMailer = require('nodemailer');
var fs = require('fs');
var emailConfig = JSON.parse(fs.readFileSync('config/mailerDetails.json'));
const adminAcc = '"Event Planner" <admin@eventplanner.com>';
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

function sendMail(receipient,bccRecipients, subject, body, callback){
	let mailOptions = {
		from: adminAcc,
		to: receipient,
		bcc: bccRecipients,
		subject: subject,
		text: body
	};
	transporter.sendMail(mailOptions, function(err,info) {
		//Return the messages to original caller
		return callback(err, info);
	});
}

module.exports = {sendMail};
