var express = require('express');
var router = express.Router();
//var isLoggedIn = require('../config/utils').isLoggedIn;
var path = require('path');
var menuMapper = require('../mappers/menuMapper');
var fs = require('fs');

/* GET page. */
router.get('/', function(req, res) {
	menuMapper.findMenusByEvent(0).then(function(result){
		res.render('uploadMenu', {menus:result} );
	});
});

router.get('/:filename', function(req, res){
	var file='./menus/' + req.params.filename;
	fs.readFile(file, function (err,data){
		res.contentType('application/pdf');
		res.send(data);
	});
});

router.post('/upload', function(req, res) {

	if (!req.files){
		return res.send('No files were uploaded.');
	}
	else{
		var eventId = 0;
		var menuId;
		var filename;
		var filepath = path.join(__dirname, '../menus');
		[menuId,filepath,filename] = getNewFilename(filepath, eventId);
		
		let uploadedFile = req.files.uploadedFile;
		if(uploadedFile.mimetype!=='application/pdf'){
			res.send('Uploaded file must be in pdf format');
		}
		else{
			uploadedFile.mv(filepath, function(err) {
				if (err){
					return res.status(500).send(err);
				}
				menuMapper.createMenu(req.body.menuName, filename, eventId, menuId, filepath, function(){});
				res.redirect('/uploadMenu');
			});
		}
	}
});

function getNewFilename(filepath, eventId){
	var count = 0;
	while(fs.existsSync(filepath + '/' + eventId + '_' + count + '.pdf')) {
		count++;
	}
	return [count,filepath + '/' + eventId + '_' + count + '.pdf', eventId + '_' + count + '.pdf'];
}

module.exports = router;
