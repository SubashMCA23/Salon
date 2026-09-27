import { Router } from 'express';
import {
  createContactMessage,
  getContactMessages,
  toggleContactRead,
  deleteContactMessage,
} from '../controllers/contactController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.route('/')
  .post(contactLimiter, createContactMessage)
  .get(protectAdmin, getContactMessages);

router.route('/:id/read')
  .patch(protectAdmin, toggleContactRead);

router.route('/:id')
  .delete(protectAdmin, deleteContactMessage);

export default router;
