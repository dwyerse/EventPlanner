var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema;
userSchema.add({ 
	name: { type: String, required: true },
	email: 'string',
	password:'string'
});
User = mongoose.model('user',userSchema);
module.exports = User;

