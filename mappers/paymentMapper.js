Payment = require('../models/payment');

function addPayment(newPaymentObj, callback){
	newPaymentObj.paidAt = new Date();
	var newPayment = new Payment(newPaymentObj);
	newPayment.save(function(err,result){
		callback(err,result);
	});
}

function getAllPayments(callback){
	Payment.find({}, function(err, payments) {
		callback(err,payments);
	});
}

function deletePayment(payment_id, callback) {
	Payment.remove({_id: payment_id}, function(err) {
		callback(err);
	});
}

module.exports = {addPayment, getAllPayments, deletePayment};
