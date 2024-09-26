import express from 'express';
import { auth, adminAuth } from '../middleware/authMiddleware.js';
import { createCompany, updateCompany, deleteCompany, getCompanies, getCompany } from '../controllers/companyController.js';

const router = express.Router();

router.post('/', auth, adminAuth, createCompany);
router.put('/:id', auth, adminAuth, updateCompany);
router.delete('/:id', auth, adminAuth, deleteCompany);
router.get('/',auth,getCompanies);
router.get('/:id', auth, getCompany);

export default router;