var express = require('express');
var router = express.Router();
var isLoggedIn = require('../config/utils').isLoggedIn;
const ticketMapper = require('../mappers/ticketMapper');

router.get('/', isLoggedIn, function(req, res) {
	ticketMapper.getUserTickets(req.user._id, function(err,tickets) {
		if (err)
		{
			req.flash('err', err);
		}
		else
		{
			res.render('ticketList', {tickets, err: req.flash('err'),succ: req.flash('succ') });
		}
	});
});

module.exports = router;
