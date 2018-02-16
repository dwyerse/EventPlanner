var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var menuSchema = new Schema({menuName: String, filename: String, path: String, menuId: Number, eventId: Number});

Menu = mongoose.model('menu',menuSchema);
module.exports = Menu;
