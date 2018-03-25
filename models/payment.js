var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paymentSchema = new Schema({
	event_id: {type:String}, //optional
	amount: {type: Number, required:true},
	user_id: { type: String, required:true},
	type: {type:String},
	paidAt:{type:Date}
});
Payment = mongoose.model('payment',paymentSchema);

module.exports = Payment;
