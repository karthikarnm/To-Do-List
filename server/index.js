// Import necessary modules and packages
const express = require('express'); // Express.js for creating the server
const mongoose = require('mongoose'); // Mongoose for MongoDB object modeling
const dotenv = require('dotenv').config(); // Dotenv for managing environment variables

const cors = require('cors'); // Cors for handling Cross-Origin Resource Sharing

const routing = require('./routes/ToDoRoutes.js'); // Importing your custom routes from ToDoRoutes.js

// Set the port for the server
const PORT = 4000;

// MongoDB connection URL (replace with your own credentials)
const URL = "mongodb+srv://karanamkarthi5:kk@cluster0.gxpfz7s.mongodb.net/To-Do-List"

// Create an instance of the Express application
const app = express();

// Middleware to parse incoming request data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to handle Cross-Origin Resource Sharing
app.use(cors());

// Connect to MongoDB
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// Use the custom routes defined in ToDoRoutes.js
app.use('/', routing);

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});
