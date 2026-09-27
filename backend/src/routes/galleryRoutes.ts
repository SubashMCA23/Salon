import { Router } from 'express';
import {
  getGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} from '../controllers/galleryController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/')
  .get(getGallery)
  .post(protectAdmin, createGallery);

router.route('/:id')
  .get(getGalleryById)
  .put(protectAdmin, updateGallery)
  .delete(protectAdmin, deleteGallery);

export default router;
