var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var menuSchema = new Schema({
	menuName: { type: String, required: true },
	filename: { type: String, required: true },
	path: { type: String, required: true },
	menuId: { type: Number, required: true},
	eventId: {type: Number, required: true}
});

Menu = mongoose.model('menu',menuSchema);
module.exports = Menu;
