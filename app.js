// Importing necessary modules and dependencies
const express = require('express'); // Importing Express framework
const app = express(); // Creating an instance of Express
const urlprefix = '/api'; // URL prefix for API routes
const mongoose = require('mongoose'); // Importing Mongoose for MongoDB connection
const Post = require('./models/post'); // Importing the Post model
const fs = require('fs'); // File system module for reading certificates
const cert = fs.readFileSync('Keys/certificate.pem'); // Reading SSL certificate

// SSL options for MongoDB connection
const options = {
    server: { sslCA: cert }
};

// MongoDB connection string
const connString = 'mongodb+srv://st10092380:qlpRdIJAXuZmoxIy@st10092380.ry16bwi.mongodb.net/';

// Importing route handlers for posts and users
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

// Connecting to MongoDB database
mongoose.connect(connString)
    .then(() => {
        console.log('Connected :)');
    })
    .catch((error) => {
        console.error('Error:', error);
        console.log('Not Connected :('); // Connection error
    }, options);

app.use(express.json()); // Middleware to parse JSON request bodies

// Allowing frontend to call the backend without origin restriction issues
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

// Route to test the API endpoint
app.get(urlprefix + '/', (req, res) => {
    res.send('Hello World');
});

// Routes for handling posts and users
app.use(urlprefix + '/posts', postRoutes); // Using posts routes with the specified URL prefix
app.use(urlprefix + '/users', userRoutes); // Using users routes with the specified URL prefix

module.exports = app; // Exporting the Express app for use in other parts of the application
