var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ticketSchema = new Schema({
	ticket_id: {type:String, required: true, unique:true},
	price: {type: Number, required:true},
	event_id: { type:String , required:true},
	holder: { type: String, required:true},
	type:{type:String}
});
ticketSchema.index({ticket_id:1}, {unique: true});
Ticket = mongoose.model('ticket',ticketSchema);

ticketSchema.pre('save', function (next) {
	if (this.isNew){
		Ticket.count().then(res => {
			this.ticket_id = '' +res; // Increment count
			next();
		});
	} else {
		next();
	}
});

module.exports = Ticket;
