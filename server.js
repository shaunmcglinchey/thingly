// Fetch the packages we need
var express = require('express');

// Create the Express application
var app = express();

// Define the port it will run on
var port = process.env.PORT || 4000;

// Create our Express router
var router = express.Router();

// Dummy route for testing
router.get('/', function(req, res) {
    res.json({ message: 'Your todo list is empty. Put your feet up!' });
});

// Register all our routes under the /api path
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Roll up, roll up! Insert your todos here: ' + port);