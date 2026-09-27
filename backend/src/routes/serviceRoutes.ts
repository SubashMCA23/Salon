import { Router } from 'express';
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/')
  .get(getServices)
  .post(protectAdmin, createService);

router.route('/:id')
  .get(getServiceById)
  .put(protectAdmin, updateService)
  .delete(protectAdmin, deleteService);

export default router;
