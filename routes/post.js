// Importing necessary modules and dependencies
const express = require('express');
const router = express.Router();
const Post = require('../models/post'); // Importing the Post model
const checkauth = require('../check-auth'); // Importing authentication middleware

// Route to get all posts
router.get('', checkauth, (req, res) => {
    // Finding all posts in the database
    Post.find().then((posts) => {
        // Sending a JSON response with the found posts
        res.json({
            message: 'Post found',
            posts: posts
        });
    });
});

// Route to create a new post
router.post('', checkauth, (req, res) => {
    // Creating a new Post instance with data from the request body
    const post = new Post({
        postid: req.body.postid,
        postname: req.body.postname,
        postCategory: req.body.postCategory,
        postDescription: req.body.postDescription
    });

    // Saving the new post to the database
    post.save().then(() => {
        // Sending a JSON response indicating successful post creation
        res.status(201).json({
            message: 'Post created',
            post: post
        });
    });
});

// Route to delete a post by ID
router.delete('/:id', checkauth, (req, res) => {
    // Deleting a post based on the provided ID parameter
    Post.deleteOne({ _id: req.params.id })
        .then(result => {
            // Checking if the post was deleted successfully
            if (result.deletedCount > 0) {
                res.status(200).json({ message: "Post Deleted" });
            } else {
                // Sending a 404 response if the post with the given ID was not found
                res.status(404).json({ message: "Post not found" });
            }
        })
        .catch(error => {
            // Handling errors and sending a 500 response in case of an error
            console.error(error);
            res.status(500).json({ message: "Error" });
        });
});

// Exporting the router to be used in other parts of the application
module.exports = router;
