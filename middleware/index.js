//Here we can add any middleware functions that we have and add them to the middleware object before exporting that object, be sure to require this file in any file that you want to use the middleware functions in.
var middlewareObj = {};


	// ********************
	// Middleware functions
	// ********************


	//This function is used to check if a user is logged in or not, if they are, then they'll be taken to "/index"
	//If they are not logged in, they'll be redirected to "/login".
middlewareObj.isLoggedIn = function(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}
		req.flash("error", "You need to be logged in!");
		res.redirect("/login");
	}

module.exports = middlewareObj;