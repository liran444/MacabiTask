// Using require(); to include modules from external sources (files, etc...)
// Third Party modules:
const cors = require("cors");
const express = require("express");

// First Party modules:
const usersController = require("./controllers/users-controller");
const errorHandler = require("./errors/error-handler");

// Declaring a handler for express()
const server = express();

// Registering to middlewares:
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// Enables other domains to connect to my server
server.use(cors());

// Extracts the JSON from the body and creates a request.body object containing it:
server.use(express.json());

// On the event of HTTP request that ends with /users, usersController handles it
server.use("/users", usersController);

// Registering to an errorHandler middleware which will handle our errors
server.use(errorHandler);

// Declaring that we're listening to port 3001
server.listen(3001, () => console.log("Listening on http://localhost:3001"));
