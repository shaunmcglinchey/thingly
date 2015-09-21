// Load required packages
var Thing = require('../models/thing');

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

        if (err) {
            var err = new Error('Sorry, the operation could not be completed. Please try later');
            err.status = 500;
            return next(err);
        }

        res.json({ message: 'New thing added to your todo list!', data: thing });
    });
};

// Create a GET endpoint /api/things for fetching all to-do's
exports.getThings = function(req, res) {
    // Use our Things model
    Thing.find(function(err, things) {

        if (err) {
            var err = new Error('Sorry, the operation could not be completed. Please try later');
            err.status = 500;
            return next(err);
        }

        res.json(things);
    });
};

// Create a GET endpoint /api/things/:thing_id for fetching a single thing
exports.getThing = function(req, res, next) {

    // Check that we have received a valid identifier
    if(!isValidIdentifier(req.params.thing_id)){
        console.log('invalid id');
        var err = new Error('Invalid ID provided');
        err.status = 400;
        return next(err);
    }

    // Use our To-do model to fetch a single to-do item
    Thing.findById(req.params.thing_id, function(err, thing) {

        if (err) {
            var err = new Error('Sorry, the operation could not be completed. Please try later');
            err.status = 500;
            return next(err);
        }

        // Respond with a suitable message if the requested item could not be found
        if (!thing) {
            var err = new Error('Item not found');
            err.status = 404;
            return next(err);
        }

        res.json(thing);
    });
};

// Create a PUT endpoint /api/things/:thing_id for updating a single thing
exports.putThing = function(req, res) {

    // Check that we have received a valid identifier
    if(!isValidIdentifier(req.params.thing_id)){
        var err = new Error('Invalid ID provided');
        err.status = 400;
        return next(err);
    }

    // Using our Thing model fetch the thing that we want to update
    Thing.findById(req.params.thing_id, function(err, thing) {

        if (err) {
            var err = new Error('Sorry, the operation could not be completed. Please try later');
            err.status = 500;
            return next(err);
        }

        // Respond with a suitable message if the requested item could not be found
        if (!thing) {
            var err = new Error('Item not found');
            err.status = 404;
            return next(err);
        }

        // Update the thing's description
        if(req.body) {

            if(req.body.description)
                thing.description = req.body.description;

            // Save the thing
            thing.save(function(err) {
                if (err)
                    res.send(err);

                res.json(thing);
            });
        }
    });
};

// Create a DELETE endpoint /api/things/:thing_id for deleting a single thing
exports.deleteThing = function(req, res, next) {

    // Check that we have received a valid identifier
    if(!isValidIdentifier(req.params.thing_id)){
        var err = new Error('Invalid ID provided');
        err.status = 400;
        return next(err);
    }

    // Find it then delete it
    Thing.findByIdAndRemove(req.params.thing_id, function(err, thing) {

        // Respond with a suitable error if the database operation resulted in an error
        if (err) {
            var err = new Error('Sorry, the operation could not be completed. Please try later');
            err.status = 500;
            return next(err);
        }

        // Respond with a suitable message if the requested item could not be found
        if (!thing) {
            var err = new Error('Item not found');
            err.status = 404;
            return next(err);
        }

        // Success, valid identifier received, object located and deleted. Inform the client
        res.send({ message: 'Item removed from your todo list!' });
    });
};

function isValidIdentifier(id) {
    if(id.match(/^[0-9a-fA-F]{24}$/)){
        return true;
    }
    return false;
}