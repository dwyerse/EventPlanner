var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var eventSchema = new Schema;

eventSchema.add({
	title: { type: String, required: true },
	location: { type: String, required: true},
	date:{type:Date,required:true,default:Date.now()},
	description:{ type: String, required: true },
	event_id:{type:Number,required:true,unique:true},
	creators:[{ type: Schema.Types.ObjectId, ref: 'User' }],
	invitees:[{
		email: String,
		state: String,
		accessRequirements: String,
		dietaryRestrictions: String
	}],
	liveState:{type: Number}
});

eventSchema.pre('save', function (next) {
	if (this.isNew){
		//EventModel.count().then(res => {
		//this.event_id = res; // Increment count
		//next();
		//});
		var newEvent = this;

		EventModel.findOne().sort('-event_id').exec(function(err, res) {
			if (res) {
				newEvent.event_id = res.event_id + 1;				
			}

			next();
		});
	}
	else{
		next();
	}
});

EventModel = mongoose.model('event',eventSchema);
module.exports = EventModel;
