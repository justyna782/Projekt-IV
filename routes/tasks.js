const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { Task, validateTaskChange, validateTaskCreate } = require('../models/tasks')
const validateObjectId = require('../middleware/validateObjectId');

router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ user_id: req.user._id }).sort('task_name');
  res.send(tasks);
});


router.post('/', auth, async (req, res) => {
  const { error } = validateTaskCreate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let task = new Task({
    task_name: req.body.task_name,
    task_description: req.body.task_description,
    task_end_date: req.body.task_end_date,
    task_done: false,
    user_id: req.user._id
  });
  task = await task.save();
  res.send(task);
});


router.put('/:id', [auth, validateObjectId], async (req, res) => {
  const { error } = validateTaskChange(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = await Task.findByIdAndUpdate(req.params.id,
    {
      task_name: req.body.task_name,
      task_description: req.body.task_description,
      task_end_date: req.body.task_end_date,
      task_done: req.body.task_done,
    }, { new: true });

  if (!task) return res.status(404).send('The task with given ID was not found.');

  res.send(task);
});


router.delete('/:id', [auth, validateObjectId], async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.id);

  if (!task) return res.status(404).send('The task with the given ID was not found.');

  res.send(task);
});

module.exports = router;
