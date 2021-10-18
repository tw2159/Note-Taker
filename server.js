// Load the Express package as a module
const express = require("express");

// Access the exported service
const app = express();
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

// Parse the incoming request object as strings or arrays or JSON object
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up the public directory for serving static files
app.use(express.static("public"));

// Define the routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);
  
// Start listening to incoming requests
// If process.env.PORT is not defined, port number 3000 is used
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
