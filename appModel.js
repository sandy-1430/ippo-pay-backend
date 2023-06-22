const mongoose = require('mongoose');

const todoModel =  new mongoose.Schema({
    list: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('todoList', todoModel)
