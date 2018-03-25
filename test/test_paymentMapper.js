var assert = require('assert');
var mapper = require('../mappers/paymentMapper');
var mongoose = require('mongoose');
const APP_DB = 'mongodb://127.0.0.1/eventplanner_db';
const TEST_PAYMENT = {
	'event_id': '99999',
	'amount': 100,
	'user_id': '99999',
	'type': 'tickets'
};


describe('paymentMapper testing suite', function() {
	before(function(){
		mongoose.connect(APP_DB);
	});

	let payment_id = 1;

	it('should validate the payment model successfully', function(done) {
		new Payment(TEST_PAYMENT).validate(function(err){
			assert.equal(err,null);
			done();
		});
	});

	it('should add payment to the database without error', function(done) {
		mapper.addPayment(TEST_PAYMENT, function(err,res) {
			assert.equal(err,null);
			payment_id = res._id;
			assert.equal(res.event_id, TEST_PAYMENT.event_id);
			done();
		});
	});

	it('should return an error if a required field is null ', function(done) {
		let invalidTicketObj = {event_id:0, amount:10};
		mapper.addPayment(invalidTicketObj,function(err){
			assert.notEqual(err,null);
			done();
		});
	});

	it('should find all payments', function(done) {
		mapper.getAllPayments(function(err,res) {
			assert.equal(err,null);
			assert.notEqual(res, null);
			assert.notEqual(res.length, 0);
			done();
		});
	});

	it('should remove test payment with _id', function(done) {
		mapper.deletePayment(payment_id, function(err) {
			assert.equal(err,null);
			done();
		});
	});

});
