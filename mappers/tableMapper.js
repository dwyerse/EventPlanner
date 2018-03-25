Table = require('../models/table');

function createTable(tableNumber,tableLabels,size,seatLabels,eventId,callback){
	var newTable = new Table({tableNumber:tableNumber, tableLabels:tableLabels, size:size,seatLabels:seatLabels,eventId:eventId});
	newTable.save(function (err,product) {
		return callback(err,product);
	});
}

function findTablesByEventId(eventId,callback){		
	Table.find({eventId:eventId}, function(err,res){
		if(err){
			return callback(err);
		}
		else{
			return callback(err,res);
		}
	});	
}

function editTable(eventId,tableNumber,tableObj,callback){
	Table.findOne({eventId:eventId,tableNumber:tableNumber}, function(err,res){
		if(err){
			return callback(err);
		}
		else{

			res.tableNumber = tableObj.tableNumber;
			res.tableLabels = tableObj.tableLabels;
			res.size = tableObj.size;
			res.seatLabels = tableObj.seatLabels;
			res.eventId = tableObj.eventId;

			res.save(function (err, updatedTable) {
				return callback(err,updatedTable);
			});

		}
	});	
}

function deleteTable(eventId,tableNumber,callback){
	Table.remove({eventId:eventId,tableNumber:tableNumber},function(){		
		Table.update({tableNumber:{$gt: tableNumber}},{ $inc: { tableNumber: -1} }, { multi: true }, function(error,result){			
			return callback(error,result);	
		});	
	});
}

module.exports = {createTable, findTablesByEventId,editTable,deleteTable};