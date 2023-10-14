// Importing the mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Defining the schema for the 'User' model
const userschema = mongoose.Schema(
    {
        // Username of the user (String type, required field)
        username: {type: String, required: true},

        // Password of the user (String type, required field)
        password: {type: String, required: true}
    }
);

// Creating and exporting the 'User' model using the defined schema
module.exports = mongoose.model('User', userschema);