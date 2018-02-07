var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema;
userSchema.add({ 
	name: { type: String, required: true },
	email: { type: String, required: true },
	password:'string',
	type:'string'
});
User = mongoose.model('user',userSchema);
module.exports = User;

