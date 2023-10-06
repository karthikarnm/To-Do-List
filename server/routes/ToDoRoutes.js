// Import the Express Router module
const router = require('express').Router();

// Import the ToDoListSchema from the model file
const Schema = require('../model/ToDoListSchema');

// Define a route to handle the creation of a new item
router.post('/post/item', async (req, res) => {
    try {
        // Extract the 'item' property from the request body
        const { item } = req.body;

        // Create a new instance of the ToDoListSchema with the extracted item
        const newToDo = new Schema({
            item
        });

        // Save the newToDo instance to the database
        const result = await newToDo.save();

        // Log the result to the console and send the result as a JSON response
        console.log(result);
        res.json(result);
    } catch (err) {
        // If an error occurs, send an error message as a JSON response
        res.json({ message: err });
    }
})

// Define a route to handle the retrieval of all items
router.get('/get/item', async (req, res) => {
    try {
        // Retrieve all items from the database using the Schema model
        const result = await Schema.find();

        // Send the result as a JSON response
        res.json(result);
    } catch (err) {
        // If an error occurs, send an error message as a JSON response
        res.json({ message: err });
    }
})

// Define a route to handle the update of an item by ID
router.put('/update/item/:id', async (req, res) => {
    try {
        // Update the item in the database using the provided ID and request body
        const result = await Schema.findByIdAndUpdate(req.params.id, { $set: req.body });

        // Send the result as a JSON response
        res.json(result);
    } catch (err) {
        // If an error occurs, log the error, and send an error message as a JSON response
        console.log(err);
        res.json({ message: err });
    }
})

// Define a route to handle the deletion of an item by ID
router.delete('/delete/item/:id', async (req, res) => {
    try {
        // Delete the item from the database using the provided ID
        const result = await Schema.findByIdAndDelete(req.params.id);

        // Send a success message as a JSON response
        res.json("Deleted item");
    } catch (err) {
        // If an error occurs, send an error message as a JSON response
        res.json({ message: err });
    }
})

// Export the router for use in other parts of the application
module.exports = router;
