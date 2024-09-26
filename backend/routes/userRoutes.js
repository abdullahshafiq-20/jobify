import express from 'express';
import { auth, superAdminAuth } from '../middleware/authMiddleware.js';
import { createUser, updateUser, deleteUser, getUsers } from '../controllers/userController.js';

const router = express.Router();

router.post('/', auth, superAdminAuth, createUser);
router.put('/:id', auth, superAdminAuth, updateUser);
router.delete('/:id', auth, superAdminAuth, deleteUser);
router.get('/', auth, superAdminAuth, getUsers);

export default router;