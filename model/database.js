var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId =Schema.Types.ObjectId;
mongoose.connect("mongodb://localhost:27017/exhibition");

var dataBase = {
	mongoose:mongoose,
	Schema:Schema,
	ObjectId:ObjectId
};

module.exports = dataBase;