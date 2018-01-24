//Routes for auth and other misc things 

var express = require("express"),
	router  = express.Router({mergeParams:true});

var passport = require("passport"),
	User     = require("../models/user");




	// **************
	//Register routes
	// **************
	router.get("/register", function(req, res){
		res.render("register");
	});

	router.post("/register", function(req, res){
		User.register(new User({username:req.body.username}), req.body.password, function(error, user){
			if(error){
				console.log(error);
				return res.render("register");
			}
			passport.authenticate("local")(req,res, function(){
				res.redirect("/index");
			});
		});
	});

	//*************
	// Login Routes
	// ************

	router.get("/login", function(req, res){
		res.render("login");
	});

	router.post("/login", passport.authenticate("local", 
		{
			successRedirect: "/index",
			failureRedirect: "/login"
		}),
		function(req, res){

	});


	//Logout logic route
	router.get("/logout", function(req, res){
		req.logout();
		req.flash("success", "You've logged out!");
		res.redirect("/login");
	});



	module.exports = router;
