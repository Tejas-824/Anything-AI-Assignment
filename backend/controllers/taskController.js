const Task = require('../models/Task');
const ApiError = require('../utils/apiError');

const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      user: req.user._id
    });

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    next(error);
  }
};
    const getTasks = async (req, res, next) => {
  try {
    let tasks;

    if (req.user.role === 'admin') {
      tasks = await Task.find().populate('user', 'name email role');
    } else {
      tasks = await Task.find({ user: req.user._id });
    }

    res.status(200).json({
      message: 'Tasks fetched successfully',
      tasks
    });
  } catch (error) {
    next(error);
  }
};
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('user', 'name email role');

    if (!task) {
      return next(new ApiError(404, 'Task not found'));
    }

    if (req.user.role !== 'admin' && task.user._id.toString() !== req.user._id.toString()) {
      return next(new ApiError(403, 'Access denied'));
    }

    res.status(200).json({
      message: 'Task fetched successfully',
      task
    });
  } catch (error) {
    next(error);
  }
};
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ApiError(404, 'Task not found'));
    }

    if (req.user.role !== 'admin' && task.user.toString() !== req.user._id.toString()) {
      return next(new ApiError(403, 'Access denied'));
    }

    task.title = req.body.title ?? task.title;
    task.description = req.body.description ?? task.description;
    task.status = req.body.status ?? task.status;

     const updatedTask = await task.save();

    res.status(200).json({
      message: 'Task updated successfully',
      task: updatedTask
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ApiError(404, 'Task not found'));
    }

    if (req.user.role !== 'admin' && task.user.toString() !== req.user._id.toString()) {
      return next(new ApiError(403, 'Access denied'));
    }

    await task.deleteOne();

    res.status(200).json({
      message: 'Task deleted successfully'
    });

   } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};