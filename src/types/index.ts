export type ProductCategory =
  | 'Furniture'
  | 'Home Appliances'
  | 'Electronics'
  | 'Office Equipment'
  | 'Kitchen Appliances';

export type BookingStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Out for Delivery'
  | 'Active'
  | 'Completed'
  | 'Cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  address?: string;
  avatar?: string;
  createdAt?: string;
}

export interface Product {
  _id: string;
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
  createdAt?: string;
}

export interface RentalBooking {
  _id: string;
  userId: string;
  productId: string;
  productSnapshot: {
    name: string;
    category: string;
    image: string;
    pricePerMonth: number;
    securityDeposit: number;
  };
  startDate: string;
  endDate: string;
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
  createdAt: string;
  updatedAt: string;
  customerName?: string;
  customerEmail?: string;
}

export interface CartBookingItem {
  product: Product;
  duration: number; // months: 1, 3, 6, 12, 24
  startDate?: string;
}

export interface AdminStats {
  totalRevenue: number;
  totalUsers: number;
  totalProducts: number;
  totalRentals: number;
  activeRentals: number;
  pendingRentals: number;
  outForDelivery: number;
  completedRentals: number;
  cancelledRentals: number;
  outOfStockProducts: number;
}
