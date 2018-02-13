var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var eventSchema = new Schema;

eventSchema.add({
	name: { type: String, required: true },
	location: { type: String, required: true},
	date:{type:Date,required:true,default:Date.now()},
	description:{ type: String, required: true },
	event_id:{type:Number,required:true},
	creators:[{ type: Schema.Types.ObjectId, ref: 'User' }],
	invitees:[{type:String}]
});

EventModel = mongoose.model('event',eventSchema);
module.exports = EventModel;