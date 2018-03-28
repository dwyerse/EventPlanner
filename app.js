/* eslint-disable */
//Dependencies
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var fileUpload = require('express-fileupload');
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

//Routes
var index = require("./routes/index");
var edit = require('./routes/edit');
var login = require("./routes/login");
var event = require('./routes/event');
var createAcc = require("./routes/createAcc");
var adminAccess = require("./routes/adminAccess");
var registerGuest = require('./routes/registerGuest');
var previousGuests = require('./routes/previousGuests');
var inviteResponse = require('./routes/invitationResponse');
var eventList = require('./routes/eventList');
var table = require('./routes/table');
var eventTickets = require('./routes/eventTickets');
var ticketList = require('./routes/ticketList');
var live = require('./routes/live')
var userMapper = require('./mappers/userMapper');
var http = require("http");
var app = express();



//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
const APP_DB = 'mongodb://127.0.0.1/eventplanner_db';
mongoose.connect(APP_DB);

//Get the default connection
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + APP_DB);
	userMapper.addAdminUser((err) => {
		if(err)
			console.log('Failed to add admin user ', err);
	});
});
// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('thisisthesecret'));
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

// required for passport
require('./config/passport')(passport); // pass passport for configuration
app.use(session({ secret: 'thisisthesecret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

/*For flash
app.use(session({
    secret: 'Flash001',
    resave: true,
    saveUninitialized:true}));
app.use(flash());*/

app.use("/",index);
app.use("/edit", edit);
app.use("/login", login);
app.use('/event/tickets', eventTickets);
app.use("/event", event);
app.use("/create", createAcc);
app.use("/grant", adminAccess);
app.use("/register", registerGuest);
app.use("/previous", previousGuests);
app.use("/invitationResponse", inviteResponse);
app.use('/events', eventList);
app.use('/table', table);
app.use('/tickets', ticketList);
app.use('/live',live);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//Create Server and listen on port 3000
var httpServer = http.createServer(app);
httpServer.listen(3000, function() {
  console.log("Server listening on port 3000");
});

module.exports = app;
