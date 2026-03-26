const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const protect = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/errorMiddleware');
const {
  createTaskValidation,
  updateTaskValidation
} = require('../validations/taskValidation');

const router = express.Router();

router.use(protect);

router.post('/', createTaskValidation, validateRequest, createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTaskValidation, validateRequest, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;