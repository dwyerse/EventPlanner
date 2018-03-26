var express = require('express');
var router = express.Router();
var eventMapper = require('../mappers/eventMapper');

var isLoggedIn = require('../config/utils').isLoggedIn;
EventModel = require('../models/event');


router.get('/:event_id',isLoggedIn, function(req, res) {	
	eventMapper.findEventBy_event_id(req.params.event_id,function(err,result){
		if(err){
			res.send(err);
		}
	
		res.render('live',{result:result});
	});
});

router.post('/amount', function(req, res){
	
	res.send("10");
}); 

module.exports = router;