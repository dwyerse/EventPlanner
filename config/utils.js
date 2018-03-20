function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}

function isAdminUser(req, res, next) {
	if (req.user.type === 'admin')
	{
		return next();
	}
	res.redirect('/login/landingPage');
}
//Mock payment system validation
//This would be replaced in production for some 3rd party card validation API call etc
function validatePaymentDetails(cardNo, cvv, billingName, amount) {
	if(cardNo && cvv && billingName && amount){
		return true;
	}
}

module.exports = {isLoggedIn, isAdminUser, validatePaymentDetails};
