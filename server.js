// Importing the 'https' module to create an HTTPS server
const http = require('https');

// Importing the custom application logic from the 'app.js' file
const app = require('./app');

// Importing the 'fs' module to work with the file system
const fs = require('fs');

// Defining the port number where the server will listen for incoming requests
const port = 3000

// Creating an HTTPS server using the 'https.createServer' method
// The server is configured with SSL/TLS key and certificate files
const server = http.createServer(
    {
        // Reading the private key from the 'privatekey.pem' file
        key: fs.readFileSync('keys/privatekey.pem'),

        // Reading the SSL/TLS certificate from the 'certificate.pem' file
        cert: fs.readFileSync('keys/certificate.pem')
    }, 
    // Passing the custom application logic ('app') to handle incoming requests
    app);

// Making the server listen on the specified port number
server.listen(port, () => {
    // Callback function executed once the server starts listening
    console.log(`Server is running on port ${port}`);
});
