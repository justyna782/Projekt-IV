const mongoose = require('mongoose');
const Joi = require('joi');


const Task = new mongoose.model('Task', new mongoose.Schema({
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
        required: true,
        default: (new Date()).setDate((new Date()).getDate() + 2)
    },
    user_id: {
        type: String,
        required: true
    },
    task_done: {
        type: Boolean,
        default: false
    }
}));

function validateTask(task) {
    const schema = {
        task_done: Joi.boolean(),
        task_name: Joi.string().min(1).required(),
        task_end_date: Joi.date(),
        task_description: Joi.string()
    };
    return Joi.validate(task, schema);
}


exports.Task = Task;
exports.validate = validateTask;
