// Fetch the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Thing = require('./models/thing');

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

// Dummy route for testing
router.get('/', function(req, res) {
    res.json({ message: 'Your todo list is empty. Put your feet up!' });
});

// Define our things route
var thingsRoute = router.route('/things');

//TODO add validation on parameters

// Create a new endpoint for POSTS
thingsRoute.post(function(req, res) {
    // Use our Things model
    var thing = new Thing();

    // instantiate our object with the values from our incoming POST request
    thing.description = req.body.description;
    thing.note = req.body.note;

    // Save our thing
    thing.save(function(err) {
        if (err)
           res.send(err);

        res.json({ message: 'New thing added to your todo list!', data: thing });
    });
});

// Create a GET endpoint /api/things for fetching all to-do's
thingsRoute.get(function(req, res) {
    // Use our Things model
    Thing.find(function(err, things) {
        if (err)
           res.send(err);

        res.json(things);
    });
});

// Create a GET endpoint /api/things/:thing_id for fetching a single thing
var thingRoute = router.route('/things/:thing_id');

thingRoute.get(function(req, res) {
   // Use our To-do model to fetch a single to-do item
   Thing.findById(req.params.thing_id, function(err, thing) {
     if (err)
        res.send(err);

     res.json(thing);
   });
});

// Create a PUT endpoint /api/things/:thing_id for updating a single thing
thingRoute.put(function(req, res) {
    // First fetch the thing that we want to update
    Thing.findById(req.params.thing_id, function(err, thing) {
       if (err)
         res.send(err);

        console.log('new description: ' + req.body.description);
       // Update the thing's description
       thing.description = req.body.description;

       // Save the thing
       thing.save(function(err) {
           if (err)
             res.send(err);

           res.json(thing);
       });
    });
});


// Register all our routes under the /api path
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Roll up, roll up! Insert your things todo here: ' + port);