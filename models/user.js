var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose");


var userSchema = new mongoose.Schema({
	username:String,
	password:String,
	//We are going to reference certain cars and save them in an array called cars
	cars:[mongoose.model('Car').schema]
});


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);