// Importing necessary modules and dependencies
const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken library for JSON Web Token operations

// Exporting a middleware function for checking authentication
module.exports = (req, res, next) => {
    try {
        // Extracting the token from the request headers and verifying it
        const token = req.headers.authorization.split(' ')[1]; // Extracting the token from the 'Authorization' header
        jwt.verify(token, "flashMob69"); // Verifying the token with the secret key
        
        // If the token is valid, proceed to the next middleware or route handler
        next();
    } catch (err) {
        // Handling errors related to invalid tokens
        res.status(401).json({
            message: "Invalid token" // Sending a JSON response indicating invalid token
        });
    }
};
