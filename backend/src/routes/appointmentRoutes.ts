import { Router } from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
} from '../controllers/appointmentController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { appointmentLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.route('/')
  .post(appointmentLimiter, createAppointment)
  .get(protectAdmin, getAppointments);

router.route('/:id')
  .get(protectAdmin, getAppointmentById)
  .delete(protectAdmin, deleteAppointment);

router.route('/:id/status')
  .patch(protectAdmin, updateAppointmentStatus);

export default router;
