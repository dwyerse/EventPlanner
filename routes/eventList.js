var express = require('express');
var router = express.Router();
var isLoggedIn = require('../config/utils').isLoggedIn;
const eventMapper = require('../mappers/eventMapper');

router.get('/', isLoggedIn, function(req, res) {
	eventMapper.findAllEvents((events) => {
		res.render('eventList', {events: events, err: req.flash('err'),succ: req.flash('succ') });
	});
});

module.exports = router;
