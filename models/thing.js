// Load mongoose
var mongoose = require('mongoose');

// Define our schema for our list of items that we need to do
var ThingSchema = new mongoose.Schema({
    description: String,
    note: String,
    tags: [String],
    createdAt: Date,
    updatedAt: Date,
    dueAt: Date
});

// Export our Mongoose model
module.exports = mongoose.model('Thing', ThingSchema);