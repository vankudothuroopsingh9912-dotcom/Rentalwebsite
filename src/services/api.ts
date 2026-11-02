import axios from 'axios';
import { Product, RentalBooking, User, AdminStats, BookingStatus } from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('rentease_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to handle auth expiry gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token if invalid
      if (localStorage.getItem('rentease_token')) {
        localStorage.removeItem('rentease_token');
        localStorage.removeItem('rentease_user');
      }
    }
    return Promise.reject(error);
  }
);

// Auth Endpoints
export const authService = {
  register: async (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword?: string;
  }) => {
    const res = await api.post<{
      success: boolean;
      message: string;
      token: string;
      user: User;
    }>('/auth/register', userData);
    return res.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const res = await api.post<{
      success: boolean;
      message: string;
      token: string;
      user: User;
    }>('/auth/login', credentials);
    return res.data;
  },

  getMe: async () => {
    const res = await api.get<{ success: boolean; user: User }>('/auth/me');
    return res.data;
  },

  updateProfile: async (profileData: Partial<User>) => {
    const res = await api.put<{ success: boolean; message: string; user: User }>(
      '/auth/profile',
      profileData
    );
    return res.data;
  },
};

// Products Endpoints
export const productService = {
  getProducts: async (params?: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    availability?: boolean;
    page?: number;
    limit?: number;
  }) => {
    const res = await api.get<{
      success: boolean;
      total: number;
      page: number;
      totalPages: number;
      limit: number;
      products: Product[];
    }>('/products', { params });
    return res.data;
  },

  getProductById: async (id: string) => {
    const res = await api.get<{ success: boolean; product: Product }>(`/products/${id}`);
    return res.data;
  },

  createProduct: async (productData: Partial<Product>) => {
    const res = await api.post<{ success: boolean; message: string; product: Product }>(
      '/products',
      productData
    );
    return res.data;
  },

  updateProduct: async (id: string, productData: Partial<Product>) => {
    const res = await api.put<{ success: boolean; message: string; product: Product }>(
      `/products/${id}`,
      productData
    );
    return res.data;
  },

  deleteProduct: async (id: string) => {
    const res = await api.delete<{ success: boolean; message: string; productId: string }>(
      `/products/${id}`
    );
    return res.data;
  },
};

// Rentals Endpoints
export const rentalService = {
  createRental: async (data: {
    productId: string;
    duration: number;
    startDate?: string;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      landmark?: string;
    };
    contactPhone: string;
    notes?: string;
  }) => {
    const res = await api.post<{
      success: boolean;
      message: string;
      rental: RentalBooking;
    }>('/rentals', data);
    return res.data;
  },

  getMyRentals: async () => {
    const res = await api.get<{
      success: boolean;
      count: number;
      rentals: RentalBooking[];
    }>('/rentals/my-rentals');
    return res.data;
  },

  getRentalById: async (id: string) => {
    const res = await api.get<{ success: boolean; rental: RentalBooking }>(`/rentals/${id}`);
    return res.data;
  },

  cancelRental: async (id: string) => {
    const res = await api.put<{
      success: boolean;
      message: string;
      rental: RentalBooking;
    }>(`/rentals/${id}/cancel`);
    return res.data;
  },
};

// Admin Endpoints
export const adminService = {
  getUsers: async () => {
    const res = await api.get<{
      success: boolean;
      count: number;
      users: (User & { totalRentals: number; activeRentals: number })[];
    }>('/admin/users');
    return res.data;
  },

  getRentals: async (status?: string) => {
    const res = await api.get<{
      success: boolean;
      count: number;
      rentals: RentalBooking[];
    }>('/admin/rentals', { params: { status } });
    return res.data;
  },

  updateStatus: async (id: string, status: BookingStatus) => {
    const res = await api.put<{
      success: boolean;
      message: string;
      rental: RentalBooking;
    }>(`/admin/rentals/${id}/status`, { status });
    return res.data;
  },

  getStats: async () => {
    const res = await api.get<{
      success: boolean;
      stats: AdminStats;
    }>('/admin/stats');
    return res.data;
  },
};

export default api;
