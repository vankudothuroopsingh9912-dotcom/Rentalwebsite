import mongoose, { Document, Schema } from 'mongoose';

export type ProductCategory = 
  | 'Furniture'
  | 'Home Appliances'
  | 'Electronics'
  | 'Office Equipment'
  | 'Kitchen Appliances';

export interface IProduct extends Document {
  name: string;
  category: ProductCategory;
  description: string;
  pricePerMonth: number;
  securityDeposit: number;
  images: string[];
  availability: boolean;
  stock: number;
  rating: number;
  reviewsCount: number;
  features: string[];
  specs: Record<string, string>;
  brand: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [120, 'Product name cannot exceed 120 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Furniture',
        'Home Appliances',
        'Electronics',
        'Office Equipment',
        'Kitchen Appliances',
      ],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    pricePerMonth: {
      type: Number,
      required: [true, 'Monthly rental price is required'],
      min: [1, 'Price per month must be at least $1'],
    },
    securityDeposit: {
      type: Number,
      default: 0,
      min: 0,
    },
    images: {
      type: [String],
      required: [true, 'At least one image is required'],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: 'Product must have at least one image',
      },
    },
    availability: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      default: 1,
      min: 0,
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 1,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    features: {
      type: [String],
      default: [],
    },
    specs: {
      type: Map,
      of: String,
      default: {},
    },
    brand: {
      type: String,
      default: 'RentEase Choice',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Text index for search
productSchema.index({ name: 'text', description: 'text', brand: 'text' });

export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);
export default Product;
