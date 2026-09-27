import { Router } from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonialStatus,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/')
  .get(getTestimonials)
  .post(createTestimonial);

router.route('/:id')
  .patch(protectAdmin, updateTestimonialStatus)
  .delete(protectAdmin, deleteTestimonial);

export default router;
