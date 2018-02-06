var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema;
userSchema.add({ 
	name: 'string',
	id:'number',
	email: 'string',
	password:'string'
});
User = mongoose.model('user',userSchema);
module.exports = User;

