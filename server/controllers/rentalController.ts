import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import { store, RentalRecord } from '../data/store.js';
import { isMongoDBActive } from '../config/db.js';
import Rental from '../models/Rental.js';

export const createRental = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    const {
      productId,
      duration = 3,
      startDate,
      shippingAddress,
      contactPhone,
      notes = '',
    } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required.' });
    }

    const product = store.products.find((p) => p._id === productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    if (!product.availability || product.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Sorry, this product is currently out of stock.',
      });
    }

    const dur = Math.max(1, parseInt(duration, 10) || 1);
    const start = startDate ? new Date(startDate) : new Date();
    const end = new Date(start);
    end.setMonth(start.getMonth() + dur);

    // Duration discount logic:
    // 6+ months: 10% monthly discount
    // 12+ months: 20% monthly discount
    let discountMultiplier = 1;
    if (dur >= 12) {
      discountMultiplier = 0.8;
    } else if (dur >= 6) {
      discountMultiplier = 0.9;
    }

    const discountedMonthly = Math.round(product.pricePerMonth * discountMultiplier);
    const totalRent = discountedMonthly * dur;
    const securityDeposit = product.securityDeposit || 0;
    const totalPrice = totalRent + securityDeposit;

    const address = shippingAddress || {
      street: '123 Market Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      landmark: '',
    };

    const newRental: RentalRecord = {
      _id: 'rent-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      userId,
      productId: product._id,
      productSnapshot: {
        name: product.name,
        category: product.category,
        image: product.images[0] || '',
        pricePerMonth: discountedMonthly,
        securityDeposit,
      },
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      duration: dur,
      monthlyRent: discountedMonthly,
      totalPrice,
      securityDeposit,
      bookingStatus: 'Pending',
      shippingAddress: address,
      contactPhone: contactPhone || req.user?.email || 'N/A',
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Decrement stock
    product.stock = Math.max(0, product.stock - 1);
    if (product.stock === 0) product.availability = false;

    store.rentals.unshift(newRental);
    store.save();

    if (isMongoDBActive()) {
      try {
        const mongoRental = new Rental(newRental);
        await mongoRental.save();
      } catch (err) {
        console.warn('MongoDB sync note on create rental:', err);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Rental booking submitted successfully! We are preparing your order.',
      rental: newRental,
    });
  } catch (error: any) {
    console.error('Error creating rental:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyRentals = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    const userRentals = store.rentals
      .filter((r) => r.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return res.status(200).json({
      success: true,
      count: userRentals.length,
      rentals: userRentals,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getRentalById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const isAdmin = req.user?.role === 'admin';

    const rental = store.rentals.find((r) => r._id === id);
    if (!rental) {
      return res.status(404).json({ success: false, message: 'Rental booking not found.' });
    }

    if (!isAdmin && rental.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to this rental booking.',
      });
    }

    return res.status(200).json({
      success: true,
      rental,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const cancelRental = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const isAdmin = req.user?.role === 'admin';

    const rental = store.rentals.find((r) => r._id === id);
    if (!rental) {
      return res.status(404).json({ success: false, message: 'Rental booking not found.' });
    }

    if (!isAdmin && rental.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to cancel this booking.',
      });
    }

    // Cancellation check: only Pending or Confirmed can be cancelled
    if (rental.bookingStatus !== 'Pending' && rental.bookingStatus !== 'Confirmed') {
      return res.status(400).json({
        success: false,
        message: `Bookings with status "${rental.bookingStatus}" cannot be self-cancelled. Please contact customer support.`,
      });
    }

    rental.bookingStatus = 'Cancelled';
    rental.updatedAt = new Date().toISOString();

    // Restore product stock
    const product = store.products.find((p) => p._id === rental.productId);
    if (product) {
      product.stock += 1;
      product.availability = true;
    }

    store.save();

    return res.status(200).json({
      success: true,
      message: 'Rental booking has been cancelled successfully. Your deposit and charges will be refunded.',
      rental,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
