const Task = require('../models/tasks')
const mongoose = require('mongoose');
const express=require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const tasks = await Task.find().sort('task_name');
    res.send(tasks);
  });

router.post('/', async(req, res)=>{
    let task = new Task({
        task_id: task.length+1,
        task_name: req.body.task_name,
        task_description: req.body.task_description,
        task_end_date: req.body.task_end_date,
        task_done: req.task_done,
        user_id: 1 // TO DO
    });

    task = await task.save();    
    
    res.send(task);
});


  module.exports = router;