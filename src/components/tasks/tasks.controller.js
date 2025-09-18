const Task = require('./tasks.model');

// GET /api/tasks
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const tasks = await Task.find({ user: userId }).sort({ date: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { name, date, isDone } = req.body;

    if (!name || name.length < 1 || name.length > 96) {
      return res.status(400).json({ message: 'Name must be 1–96 chars' });
    }

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(date)) {
      return res.status(400).json({ message: "Date must be 'YYYY-MM-DD'" });
    }
    const todayStr = new Date().toISOString().slice(0, 10);
    if (date < todayStr) {
      return res.status(400).json({ message: 'Date must be today or later' });
    }

    const newTask = await Task.create({
      name,
      date,
      isDone: isDone || false,
      user: userId,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PATCH /api/tasks/:id/status
exports.updateTaskStatus = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const task = await Task.findOne({ _id: req.params.id, user: userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.isDone = !task.isDone;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
