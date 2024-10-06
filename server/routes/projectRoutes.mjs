import express from 'express';
import { createProject, deleteProject, updateProject } from '../controller/projectController.mjs';
// import { createProject, updateProject, deleteProject } from '../controllers/projectController.js';

const router = express.Router();

// Project routes
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

export default router;
