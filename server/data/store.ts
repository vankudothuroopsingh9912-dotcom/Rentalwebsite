import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { initialProducts, SeedProduct } from './seedData.js';
import { isMongoDBActive } from '../config/db.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Rental, { BookingStatus } from '../models/Rental.js';

export interface UserRecord {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  role: 'user' | 'admin';
  address?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RentalRecord {
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
  duration: number;
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
}

const DATA_FILE = path.resolve(process.cwd(), '.rentease_store.json');

class DataStore {
  public users: UserRecord[] = [];
  public products: SeedProduct[] = [];
  public rentals: RentalRecord[] = [];

  constructor() {
    this.init();
  }

  private init() {
    // Check if persistence file exists
    if (fs.existsSync(DATA_FILE)) {
      try {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.users && parsed.products && parsed.rentals) {
          this.users = parsed.users;
          this.products = parsed.products;
          this.rentals = parsed.rentals;
          return;
        }
      } catch (e) {
        console.warn('Failed to parse cached store file, re-seeding.', e);
      }
    }

    // Default Seed
    const adminPassword = bcrypt.hashSync('Admin@123', 10);
    const userPassword = bcrypt.hashSync('User@123', 10);

    this.users = [
      {
        _id: 'usr-admin-01',
        name: 'RentEase Administrator',
        email: 'admin@rentease.com',
        phone: '+1 (555) 019-2831',
        password: adminPassword,
        role: 'admin',
        address: '100 Silicon Way, Tech Tower, San Francisco, CA',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: 'usr-demo-01',
        name: 'John Miller',
        email: 'john@example.com',
        phone: '+1 (555) 438-9201',
        password: userPassword,
        role: 'user',
        address: '742 Evergreen Terrace, Springfield, OR',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    this.products = [...initialProducts];

    // Seed sample rentals for John
    const now = new Date();
    const futureDate = new Date();
    futureDate.setMonth(now.getMonth() + 6);

    const pastDate = new Date();
    pastDate.setMonth(now.getMonth() - 3);

    this.rentals = [
      {
        _id: 'rent-001',
        userId: 'usr-demo-01',
        productId: 'prod-f-001',
        productSnapshot: {
          name: 'Nordic Haven L-Shaped Sectional Sofa',
          category: 'Furniture',
          image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
          pricePerMonth: 45,
          securityDeposit: 90,
        },
        startDate: now.toISOString(),
        endDate: futureDate.toISOString(),
        duration: 6,
        monthlyRent: 45,
        totalPrice: 45 * 6 + 90,
        securityDeposit: 90,
        bookingStatus: 'Active',
        shippingAddress: {
          street: '742 Evergreen Terrace',
          city: 'Springfield',
          state: 'OR',
          zipCode: '97477',
          landmark: 'Near Springfield Elementary',
        },
        contactPhone: '+1 (555) 438-9201',
        notes: 'Please call before delivery',
        createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: 'rent-002',
        userId: 'usr-demo-01',
        productId: 'prod-el-001',
        productSnapshot: {
          name: 'LG C3 55-Inch 4K OLED evo Smart Cinema TV',
          category: 'Electronics',
          image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80',
          pricePerMonth: 49,
          securityDeposit: 100,
        },
        startDate: now.toISOString(),
        endDate: futureDate.toISOString(),
        duration: 3,
        monthlyRent: 49,
        totalPrice: 49 * 3 + 100,
        securityDeposit: 100,
        bookingStatus: 'Confirmed',
        shippingAddress: {
          street: '742 Evergreen Terrace',
          city: 'Springfield',
          state: 'OR',
          zipCode: '97477',
        },
        contactPhone: '+1 (555) 438-9201',
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: 'rent-003',
        userId: 'usr-demo-01',
        productId: 'prod-ka-001',
        productSnapshot: {
          name: 'Breville Barista Touch Impress Espresso Machine',
          category: 'Kitchen Appliances',
          image: 'https://images.unsplash.com/photo-1517668808822-9ebd02ae4a43?auto=format&fit=crop&w=1000&q=80',
          pricePerMonth: 38,
          securityDeposit: 80,
        },
        startDate: pastDate.toISOString(),
        endDate: now.toISOString(),
        duration: 3,
        monthlyRent: 38,
        totalPrice: 38 * 3 + 80,
        securityDeposit: 80,
        bookingStatus: 'Completed',
        shippingAddress: {
          street: '742 Evergreen Terrace',
          city: 'Springfield',
          state: 'OR',
          zipCode: '97477',
        },
        contactPhone: '+1 (555) 438-9201',
        createdAt: pastDate.toISOString(),
        updatedAt: now.toISOString(),
      },
    ];

    this.save();
  }

  public save() {
    try {
      fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(
          {
            users: this.users,
            products: this.products,
            rentals: this.rentals,
          },
          null,
          2
        ),
        'utf-8'
      );
    } catch (err) {
      // In-memory fallback if file write fails in read-only environment
    }
  }

  public async syncWithMongooseIfActive() {
    if (!isMongoDBActive()) return;

    try {
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        for (const u of this.users) {
          const newUser = new User(u);
          await newUser.save();
        }
      }

      const prodCount = await Product.countDocuments();
      if (prodCount === 0) {
        for (const p of this.products) {
          const newP = new Product(p);
          await newP.save();
        }
      }

      const rentCount = await Rental.countDocuments();
      if (rentCount === 0) {
        for (const r of this.rentals) {
          const newR = new Rental(r);
          await newR.save();
        }
      }
    } catch (e) {
      console.warn('Mongoose auto-seed note:', e);
    }
  }
}

export const store = new DataStore();
