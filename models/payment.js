var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paymentSchema = new Schema({
	event_id: {type:String}, //optional
	amount: {type: Number, required:true},
	user_id: { type: String, required:true},
	paidAt:{type:Date}
});
Payment = mongoose.model('payment',paymentSchema);

module.exports = Payment;
