var passportLocalMongoose = require("passport-local-mongoose"),
	LocalStrategy         = require("passport-local"),
	expressSanitizer 	  = require("express-sanitizer"),
	expressSession        = require("express-session"),
	methodOverride        = require("method-override"),
	flash		          = require("connect-flash"),
	passport              = require("passport"),
	bodyParser            = require("body-parser"),
	mongoose              = require("mongoose"),
	express               = require("express"),
	Car					  = require("./models/car"),
	User				  = require("./models/user"),
	Contact 			  = require("./models/contact"),
	carRoutes             = require("./routes/car"),
	indexRoutes           = require("./routes/index"),
	app                   = express();

	//mongoose.connect("mongodb://localhost/kd_auto_sales");
	mongoose.connect("mongodb://cairacshields:Babygirl21@ds213338.mlab.com:13338/autokd")
	//Configure app settings

	app.set("view engine", "ejs");
	app.use(expressSession({secret:"love your life", resave:false, saveUninitialized:false}));
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(methodOverride("_method"));
	app.use(flash());
	app.use(express.static(__dirname + "/public"));
	app.use(passport.initialize());
	app.use(passport.session());

	//The below middleware will be called on every route request, it will set the local var 'currentUser' to the logged in user if there is one.
	app.use(function(req, res, next){
		res.locals.currentUser = req.user;
		//Be sure to add the flash message values to locals so we can have access to them in every template 
		res.locals.error = req.flash("error");
		res.locals.success = req.flash("success");
		next();
	});


/* SETUP PASSPORT CONFIG */
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



/*   ******** add in the modularized ROUTES ********** */


app.use(carRoutes);
app.use(indexRoutes);


	app.get("*", function(req, res){
		res.send("There is nothing on this route");
	});

app.listen(process.env.PORT || 3000, function(){
	console.log("Server Started!");
}) ;