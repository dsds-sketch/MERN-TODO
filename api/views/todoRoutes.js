const express = require('express');
const router = express.Router();
const Todo = require('../models/todoModels');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Todo.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new task
router.post('/', async (req, res) => {
  try {
    const task = new Todo({
      description: req.body.description,
      completed: false,
    });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: 'Bad request' });
  }
});

// PUT update a task
router.put('/:id', async (req, res) => {
  try {
    if (!req.params.id || !mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    const task = await Todo.findByIdAndUpdate(
      req.params.id,
      { description: req.body.description, completed: req.body.completed },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: 'Bad request', error: err.message });
  }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  try {
    if (!req.params.id || !mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    const task = await Todo.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;