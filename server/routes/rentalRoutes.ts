import { Router } from 'express';
import {
  createRental,
  getMyRentals,
  getRentalById,
  cancelRental,
} from '../controllers/rentalController.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

// All rental operations require an authenticated user session
router.use(verifyToken);

router.post('/', createRental);
router.get('/my-rentals', getMyRentals);
router.get('/:id', getRentalById);
router.put('/:id/cancel', cancelRental);

export default router;
