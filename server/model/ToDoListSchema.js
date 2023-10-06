// Import the mongoose library
const mongoose = require('mongoose');

// Define a Mongoose schema for the ToDoList
const ToDoListSchema = new mongoose.Schema({
    // Define a field 'item' with type String
    item: {
        type: String,
        required: true // The 'item' field is required
    }
});

// Export the Mongoose model for ToDoList using the defined schema
module.exports = mongoose.model('ToDoList', ToDoListSchema);
