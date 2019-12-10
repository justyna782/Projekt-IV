const mongoose = require('mongoose');

const Task = new mongoose.model('Task', new mongoose.Schema({
    task_id: {
        type: Integer,
        required: true
    },
    task_name: {
        type: String,
        required: true
    },
    task_description: {
        type: String,
        required: true
    },
    task_end_date: {
        type: Date,
        required: true
    },
    task_done: {
        type: Boolean,
        required: true
    },
    user_id: {
        type: Integer,
        required: true
    }
}));

exports.Task=Task;