// Importing the mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Defining the schema for the 'Post' model
const postschema = mongoose.Schema(
    {
        // Unique identifier for the post (String type, required field)
        postid: {type: String, required:true},

        // Title or name of the post (String type, required field)
        postname: {type: String, required: true},

        // Category of the post (String type, required field)
        postCategory: {type: String, required: true},

        // Description of the post (String type, required field)
        postDescription: {type: String, required: true}
    }
);

// Creating and exporting the 'Post' model using the defined schema
module.exports = mongoose.model('Post', postschema);
