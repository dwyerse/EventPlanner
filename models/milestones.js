var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var milestoneSchema = new Schema({
	amounts: {type:[{achieved: Boolean,amount: Number,label:String}],required:true},
	eventId: {type:Number, required: true}
});

Milestone = mongoose.model('milestone',milestoneSchema);
module.exports = Milestone;