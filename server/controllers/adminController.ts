import { Request, Response } from 'express';
import { store } from '../data/store.js';
import { BookingStatus } from '../models/Rental.js';

export const getAdminUsers = async (req: Request, res: Response) => {
  try {
    const users = store.users.map((u) => {
      const userRentals = store.rentals.filter((r) => r.userId === u._id);
      return {
        id: u._id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        role: u.role,
        address: u.address,
        createdAt: u.createdAt,
        totalRentals: userRentals.length,
        activeRentals: userRentals.filter((r) => r.bookingStatus === 'Active').length,
      };
    });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminRentals = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    let list = store.rentals.map((r) => {
      const user = store.users.find((u) => u._id === r.userId);
      return {
        ...r,
        customerName: user ? user.name : 'Unknown Customer',
        customerEmail: user ? user.email : 'N/A',
      };
    });

    if (status && typeof status === 'string' && status !== 'All') {
      list = list.filter((r) => r.bookingStatus.toLowerCase() === status.toLowerCase());
    }

    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return res.status(200).json({
      success: true,
      count: list.length,
      rentals: list,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRentalStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses: BookingStatus[] = [
      'Pending',
      'Confirmed',
      'Out for Delivery',
      'Active',
      'Completed',
      'Cancelled',
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const rental = store.rentals.find((r) => r._id === id);
    if (!rental) {
      return res.status(404).json({
        success: false,
        message: 'Rental booking not found.',
      });
    }

    const oldStatus = rental.bookingStatus;
    rental.bookingStatus = status;
    rental.updatedAt = new Date().toISOString();

    // If marked as Completed or Cancelled from Active/Pending, check stock logic if appropriate
    if (status === 'Cancelled' && oldStatus !== 'Cancelled') {
      const product = store.products.find((p) => p._id === rental.productId);
      if (product) {
        product.stock += 1;
        product.availability = true;
      }
    } else if (status === 'Completed' && oldStatus !== 'Completed') {
      const product = store.products.find((p) => p._id === rental.productId);
      if (product) {
        product.stock += 1;
        product.availability = true;
      }
    }

    store.save();

    return res.status(200).json({
      success: true,
      message: `Booking status updated to ${status}.`,
      rental,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = store.users.length;
    const totalProducts = store.products.length;
    const totalRentals = store.rentals.length;

    const activeRentals = store.rentals.filter((r) => r.bookingStatus === 'Active').length;
    const pendingRentals = store.rentals.filter((r) => r.bookingStatus === 'Pending').length;
    const outForDelivery = store.rentals.filter((r) => r.bookingStatus === 'Out for Delivery').length;
    const completedRentals = store.rentals.filter((r) => r.bookingStatus === 'Completed').length;
    const cancelledRentals = store.rentals.filter((r) => r.bookingStatus === 'Cancelled').length;

    const totalRevenue = store.rentals
      .filter((r) => r.bookingStatus !== 'Cancelled')
      .reduce((sum, r) => sum + r.totalPrice, 0);

    const outOfStockProducts = store.products.filter((p) => !p.availability || p.stock === 0).length;

    return res.status(200).json({
      success: true,
      stats: {
        totalRevenue,
        totalUsers,
        totalProducts,
        totalRentals,
        activeRentals,
        pendingRentals,
        outForDelivery,
        completedRentals,
        cancelledRentals,
        outOfStockProducts,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
