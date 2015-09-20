// Load required packages
var Thing = require('../models/thing');

// TODO: add validation on parameters
// TODO: add checks for injection attacks

// Create a new endpoint for POSTS
exports.postThings = function(req, res) {
    // Use our Things model
    var thing = new Thing();

    // populate the properties on our object with the values from the incoming POST request
    thing.description = req.body.description;
    thing.note = req.body.note;

    // Save our thing
    thing.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'New thing added to your todo list!', data: thing });
    });
};

// Create a GET endpoint /api/things for fetching all to-do's
exports.getThings = function(req, res) {
    // Use our Things model
    Thing.find(function(err, things) {
        if (err)
            res.send(err);

        res.json(things);
    });
};

// Create a GET endpoint /api/things/:thing_id for fetching a single thing
exports.getThing = function(req, res) {
    // Use our To-do model to fetch a single to-do item
    Thing.findById(req.params.thing_id, function(err, thing) {
        if (err)
            res.send(err);

        res.json(thing);
    });
};

// Create a PUT endpoint /api/things/:thing_id for updating a single thing
exports.putThing = function(req, res) {
    // Using our Thing model fetch the thing that we want to update
    Thing.findById(req.params.thing_id, function(err, thing) {
        if (err)
            res.send(err);

        // Update the thing's description
        thing.description = req.body.description;

        // Save the thing
        thing.save(function(err) {
            if (err)
                res.send(err);

            res.json(thing);
        });
    });
};

// Create a DELETE endpoint /api/things/:thing_id for deleting a single thing
exports.deleteThing = function(req, res) {
    // Using our Thing model fetch the thing that we want to delete
    Thing.findByIdAndRemove(req.params.thing_id, function(err, thing) {
        if (err)
            res.send(err);

        res.json({ message: 'Thing removed from your todo list!' });
    })
};