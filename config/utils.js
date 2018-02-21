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

module.exports = {isLoggedIn, isAdminUser};
