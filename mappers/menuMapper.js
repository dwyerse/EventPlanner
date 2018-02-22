Menu = require('../models/menu');

function createMenu(menuName, filename, eventId,menuId,path,callback){
	var newMenu = new Menu({menuName:menuName, filename:filename, menuId:menuId,eventId:eventId,path:path});
	newMenu.save(function (err,product) {
		return callback(err,product);
	});
}

function findMenusByEvent(eventId){
	
	return new Promise(function(resolve,reject){
		Menu.find({eventId:eventId}, function(err,res){
			if(err){
				reject(err);
			}
			else{
				resolve(res);
			}
		});
	});
}

function deleteMenuByEventAndMenuId(eventId, menuId, callback){
	Menu.remove({eventId:eventId,menuId:menuId},function(err,res){
		return callback(err,res);
	});
}

module.exports = {createMenu, findMenusByEvent, deleteMenuByEventAndMenuId};
