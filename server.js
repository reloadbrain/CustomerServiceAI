//Setup Dependables
var restify = require('restify');

//Setup DB
var mongoose = require('mongoose');

//Restify Settings
settings = {
	host: "0.0.0.0",
	port: 8080
};

//Mongoose Settings
mongoose.connect('mongodb://admin:admin@ds121349.mlab.com:21349/customerserviceai');

var server = restify.createServer({});

//Include Mongo Tables
var customer = require('./app/models/customers');
var complaint = require('./app/models/complaints');
var employee = require('./app/models/employees');
var order = require('./app/models/orders');
var product = require('./app/models/products');
var review = require('./app/models/reviews');

//Include Routes
require('./app/routes/default.js')(server);

//CORS
server.use(
	function crossOrigin(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		return next();
	}
);

//Start Server
server.listen(settings.port, settings.host, function () {
	if (process.env.NODE_ENV != "test") {
		console.log('%s listening at %s', server.name, server.url);
	}
});

module.exports = server;
