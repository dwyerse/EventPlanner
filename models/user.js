var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema;

userSchema.add({
	name: { type: String, required: true },
	email: { type: String, required: true,unique:true},
	password:{ type: String, required: true },
	type:{ type: String, required: true },
	eventsAttended:[{ 
		event_id: Number,
		event_title: String
	}],
	salt:{ type: String, required: true }
});
userSchema.index({email:1}, {unique: true});
User = mongoose.model('user',userSchema);
module.exports = User;
