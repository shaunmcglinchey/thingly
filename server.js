// Fetch the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var thingController = require('./controllers/thing');

// Connect to our mongo DB using mongoose
mongoose.connect('mongodb://localhost:27017/thingly');

// Create the Express application
var app = express();

// Use the body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));

// Define the port our server will run on
var port = process.env.PORT || 4000;

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /things
router.route('/things')
    .post(thingController.postThings)
    .get(thingController.getThings);

// Create endpoint handlers for /things/:thing_id
router.route('/things/:thing_id')
    .get(thingController.getThing)
    .put(thingController.putThing)
    .delete(thingController.deleteThing);

// Register all our routes under the /api path
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Roll up, roll up! Insert your things todo here: ' + port);