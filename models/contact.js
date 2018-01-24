var mongoose = require("mongoose");


var contactSchema = new mongoose.Schema({
	email:String,
	vehicle:String,
	//We can reference a users specific data using our 'User' model. Below we are grabbing the 'id' and the 'username' and storing it in the 'sender' object
	sender:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:'User'
		},
		username:String
	}
});

module.exports = mongoose.model("Contact",contactSchema);