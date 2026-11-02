import { Router } from 'express';
import {
  getAdminUsers,
  getAdminRentals,
  updateRentalStatus,
  getAdminStats,
} from '../controllers/adminController.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = Router();

// Admin-only routes
router.use(verifyToken, verifyAdmin);

router.get('/users', getAdminUsers);
router.get('/rentals', getAdminRentals);
router.put('/rentals/:id/status', updateRentalStatus);
router.get('/stats', getAdminStats);

export default router;
