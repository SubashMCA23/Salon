import { Router } from 'express';
import { loginAdmin, getMe, logoutAdmin } from '../controllers/authController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/login', authLimiter, loginAdmin);
router.get('/me', protectAdmin, getMe);
router.post('/logout', protectAdmin, logoutAdmin);

export default router;
