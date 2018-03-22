var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ticketInfoSchema = new Schema({
	event_id: {type:String, required:true, unique:true},
	tables: {
		total : Number,
		available: Number,
		price : Number,
		size : Number
	},
	tickets: {
		total: Number,
		available: Number,
		price: Number
	}
});
ticketInfoSchema.index({event_id:1}, {unique: true});
TicketInformation = mongoose.model('ticketInformation',ticketInfoSchema);

module.exports = TicketInformation;
