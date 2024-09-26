import express from 'express';
import { auth, adminAuth } from '../middleware/authMiddleware.js';
import { createJob, updateJob, deleteJob, getJobs, getJob } from '../controllers/jobController.js';

const router = express.Router();

router.post('/', auth, adminAuth, createJob);
router.put('/:id', auth, adminAuth, updateJob);
router.delete('/:id', auth, adminAuth, deleteJob);
router.get('/', auth, getJobs);
router.get('/:id', auth, getJob);

export default router