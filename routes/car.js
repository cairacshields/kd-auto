	var express = require("express"),
		router  = express.Router({mergeParams:true});

	var Car     = require("../models/car"),
		Contact = require("../models/contact"),
		User    = require("../models/user");

	//Requiring the middleware file will give use access to the functions used as middleware in our routes. 
	//** Note that we aren't directly linking to middleware/index.js, because whenever we require a directory such as middleware, node will automatically search for an index.js file to require... UNLESS we directly specify another file to look for. 
	// So basically the below require statement is require("../middleware/index.js");
	var middleware = require("../middleware");

	






	router.get("/", function(req, res){
		res.redirect("/index");
	});
	router.get("/index",function(req, res){

		Car.find({}, function(error,car){
			if(error){
				console.log(error);
			}else{
				res.render("index", {car:car});
			}
		});

	});


	// SHOW ROUTE

	router.get("/car/:id", function(req, res){
		Car.findById(req.params.id, function(error, car){
			if(error){
				console.log(error);
			}else{
				res.render("show", {car:car});
			}
		});
	});


	//Contact Route
	//We will check to make sure a user is logged in before we allow them to send an inquiry if we don't make sure that they're logged in, we won't ensure that we have access to their username and 'id', which could potentially trigger an error.
	router.post("/car/:id/contact", middleware.isLoggedIn,function(req, res){
		Contact.create(req.body.car, function(error, data){
			if(error){
				console.log(error);
			}else{
				data.sender.id = req.user._id;
				data.sender.username = req.user.username;
				data.save();
				req.flash("success", "Inquiry has been sent, we'll contact you in 48 hours!")
				res.redirect("/car/" + req.params.id);
			}
		}); 

	});


	//Show saved vehicles 
	router.get("/car/:id/saved", function(req, res){
		User.findById(req.params.id, function(error, user){
			if(error){
				console.log(error);
				req.flash("error", "Could not locate user, please try again!");
				res.redirect("back");
			}else{
				console.log(user);
				res.render("saved", {user:user});
			}
		});
	});


	//Backend logic for saving a vehicle 
	router.post("/car/:id/save",middleware.isLoggedIn ,function(req,res){
		Car.findById(req.params.id, function(error, car){
			if(error){
				console.log(error);
				req.flash("error", "Could not find This Car");
				res.redirect("back");
			}else{
				User.findById(req.user._id, function(error, user){
					if(error){
						console.log(error);
						req.flash("error", "Could not locate your information to save, please try again!");
						res.redirect("back");
					}else{
						user.cars.push(car);
						user.save(function(error, data){
							if(error){
								console.log(error);
								req.flash("error", "Unable to save vehicle, please try again");
								res.redirect("back");
							}else{
								req.flash("success", "Vehicle saved successfully!");
								res.redirect("/");
							}
						});
					}
				});
			}
		});
	});

//Be sure to send the 'router' out at the end, so that any other file that requires this file will have access to the routes.
module.exports = router;