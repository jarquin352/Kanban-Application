const mongoose = require('mongoose');

var taskTypeSchema = new mongoose.Schema({
    name: String, 
    color: String,
});

var TaskType = mongoose.model('taskTypes', taskTypeSchema);

module.exports = TaskType;