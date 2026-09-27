import { Router } from 'express';
import {
  getOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
} from '../controllers/offerController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/')
  .get(getOffers)
  .post(protectAdmin, createOffer);

router.route('/:id')
  .get(getOfferById)
  .put(protectAdmin, updateOffer)
  .delete(protectAdmin, deleteOffer);

export default router;
