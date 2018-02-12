var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema;
userSchema.add({ 
	name: { type: String, required: true },
	email: { type: String, required: true,unique:true},
	password:'string',
	type:'string'
});
userSchema.index({email:1},{unique: true});
User = mongoose.model('user',userSchema);
module.exports = User;

