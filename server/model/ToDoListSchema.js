const mongoose = require('mongoose');

const ToDoListSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ToDoList', ToDoListSchema)