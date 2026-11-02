import mongoose, { Document, Schema } from 'mongoose';

export type BookingStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Out for Delivery'
  | 'Active'
  | 'Completed'
  | 'Cancelled';

export interface IRental extends Document {
  userId: mongoose.Types.ObjectId | string;
  productId: mongoose.Types.ObjectId | string;
  productSnapshot: {
    name: string;
    category: string;
    image: string;
    pricePerMonth: number;
    securityDeposit: number;
  };
  startDate: Date;
  endDate: Date;
  duration: number; // in months
  monthlyRent: number;
  totalPrice: number;
  securityDeposit: number;
  bookingStatus: BookingStatus;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    landmark?: string;
  };
  contactPhone: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const rentalSchema = new Schema<IRental>(
  {
    userId: {
      type: Schema.Types.Mixed, // allows ObjectId or string identifier
      required: [true, 'User ID is required for a rental booking'],
      ref: 'User',
      index: true,
    },
    productId: {
      type: Schema.Types.Mixed,
      required: [true, 'Product ID is required for a rental booking'],
      ref: 'Product',
      index: true,
    },
    productSnapshot: {
      name: { type: String, required: true },
      category: { type: String, required: true },
      image: { type: String, default: '' },
      pricePerMonth: { type: Number, required: true },
      securityDeposit: { type: Number, default: 0 },
    },
    startDate: {
      type: Date,
      required: [true, 'Rental start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'Rental end date is required'],
    },
    duration: {
      type: Number,
      required: [true, 'Rental duration in months is required'],
      min: [1, 'Rental duration must be at least 1 month'],
    },
    monthlyRent: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price cannot be negative'],
    },
    securityDeposit: {
      type: Number,
      default: 0,
    },
    bookingStatus: {
      type: String,
      enum: [
        'Pending',
        'Confirmed',
        'Out for Delivery',
        'Active',
        'Completed',
        'Cancelled',
      ],
      default: 'Pending',
      index: true,
    },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      landmark: { type: String, default: '' },
    },
    contactPhone: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Rental = mongoose.models.Rental || mongoose.model<IRental>('Rental', rentalSchema);
export default Rental;
