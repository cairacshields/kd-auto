var mongoose = require("mongoose");


var carSchema = new mongoose.Schema({
	name: String,
	color:String,
	mileage:Number,
	style:String,
	price:{type:Number, default:0},
	year:String,
	image:String
});

module.exports = mongoose.model("Car", carSchema);