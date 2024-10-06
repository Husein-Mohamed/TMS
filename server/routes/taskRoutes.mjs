import express from 'express';
import { createTask, getTasksWithDeadlineStatus } from '../controller/taskController.mjs';
// import { createTask, getTasksWithDeadlineStatus } from '../controllers/taskController.js';

const router = express.Router();

// Task routes
router.post('/tasks', createTask);
router.get('/tasks', getTasksWithDeadlineStatus);

export default router;
