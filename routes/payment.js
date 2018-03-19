var express = require('express');
var router = express.Router();
var isLoggedIn = require('../config/utils').isLoggedIn;

router.post('/', isLoggedIn, function(req, res) {
	let event_id = req.body.event_id;
	if(validatePaymentDetails(req.body.cardNo, req.body.cvv, req.body.billingName)) {
		req.flash('succ', 'Succesfully bought tickets');
		res.redirect('/event/view/'+event_id);
	}
});

//Mock payment system validation
//This would be replaced in production for some 3rd party card validation API call etc
function validatePaymentDetails(cardNo, cvv, billingName) {
	if(cardNo, cvv, billingName){
		return true;
	}
}
module.exports = router;
