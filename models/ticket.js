var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ticketSchema = new Schema({
	price: {type: Number, required:true},
	event_id: { type:String , required:true},
	holder: { type: String, required:true},
	type:{type:String}
});
Ticket = mongoose.model('ticket',ticketSchema);

module.exports = Ticket;
