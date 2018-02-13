var express = require('express');
var router = express.Router();
var eventMapper = require('../mappers/eventMapper');
/* GET home page. */
router.get('/create', function(req, res) {
	res.render('createEvent', {} );
});

router.post('/create', function(req, res) {

	if(validUpdateParams(req.body)){		
		eventMapper.createEvent(req.body.name,req.body.location,req.body.date,req.body.description,11,[],[],
			function(error,result) {
				if (!result) {
					req.flash('err', 'Event not created');
				} else if (error) {
					req.flash('err', error);
				}
				res.redirect('/event/create');
			});
	} else {
		req.flash('err', 'Not all details provided');
		res.redirect('/event/create');
	}

});

function validUpdateParams(body){
	return (body.name);
}
module.exports = router;