var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tableSchema = new Schema({
	tableNumber: {type:Number,required:true},
	tableLabels: {type:[String], required:true},
	seatLabels:{type:[String], required: true},
	eventId: {type:Number, required: true}
});

Table = mongoose.model('table',tableSchema);
module.exports = Table;
