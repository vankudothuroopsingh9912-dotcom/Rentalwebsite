# RentEase – Modern MERN Stack Rental Platform

RentEase is a full-stack MERN rental marketplace where users can browse, rent, and manage furniture, home appliances, electronics, office equipment, and kitchen appliances with flexible monthly tenure subscriptions, zero maintenance worries, and doorstep delivery.

---

## 🚀 Key Features

### 1. Catalog & Product Discovery
- **5 Core Rental Categories**: Furniture, Home Appliances, Electronics, Office Equipment, Kitchen Appliances.
- **Dynamic Pricing Engine**: Automated tenure discounts (5% off for 3 months, 10% off for 6 months, 20% off for 12 months, 25% off for 24 months).
- **Refundable Security Deposits**: Transparent calculations with 100% deposit return guarantees.
- **Search & Filtering**: Real-time keyword search, category filtering, price range slider, in-stock toggle, and multi-field sorting (Price asc/desc, Rating, Featured).
- **Interactive Delivery Pincode Checker**: Instant delivery availability simulation (48-72 hour SLAs).

### 2. User Authentication & Profile
- **JWT-Based Authentication**: Secure stateless session tokens stored with authorization interceptors.
- **Bcrypt Password Hashing**: Industry-standard cryptographic salt hashing.
- **Role-Based Access Control (RBAC)**: Distinct Customer (`user`) and Administrator (`admin`) capabilities.
- **User Dashboard**: Profile management (name, phone, shipping addresses), lifetime booking metrics, and active rental status overviews.
- **One-Click Demo Logins**: Instant switch between Demo Customer and Administrator in the login screen for evaluator convenience.

### 3. Rental Booking & Management
- **Booking Flow**: Multi-product rental cart with per-item tenure configuration, preferred start dates, and shipping information.
- **Booking Status Lifecycle**:
  - `Pending` ➔ `Confirmed` ➔ `Out for Delivery` ➔ `Active` ➔ `Completed` ➔ `Cancelled`
- **Visual Status Tracker**: Step-by-step progress bar showing live delivery & lease progress.
- **Self-Service Cancellation**: Eligible bookings (`Pending` or `Confirmed`) can be cancelled with automatic stock restoration and deposit refunds.

### 4. Admin Management Console
- **Platform Analytics**: Gross rental revenue, active subscriptions, pending dispatches, registered users, and inventory status.
- **Product Inventory CRUD**: Add new products, update pricing, adjust stock levels, toggle availability, and delete records.
- **Order Dispatch Management**: Real-time status dropdown to transition orders between lifecycle states.
- **User Directory**: View customer profiles, contact numbers, and total lifetime rental volume.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, React Router DOM, Tailwind CSS, Axios, Lucide Icons |
| **Backend** | Node.js, Express.js REST API |
| **Database** | MongoDB & Mongoose Object Modeling (Dual-Mode: Cloud Atlas / Local MongoDB + Built-in Persistent Store) |
| **Security & Auth** | JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, Role-based Middlewares |
| **Testing** | Automated Backend Integration Test Suite (`npm test`) |

---

## 📁 Project Directory Structure

```text
├── index.html                   # HTML entry point with fonts & metadata
├── package.json                 # Project dependencies & scripts
├── server.ts                    # Full-stack Express server + Vite dev middleware
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite bundler & Tailwind configuration
│
├── server/                      # Backend Architecture
│   ├── config/
│   │   └── db.ts                # MongoDB & Mongoose connection manager
│   ├── controllers/
│   │   ├── authController.ts    # Register, login, getMe, updateProfile
│   │   ├── productController.ts # Product catalog, search, admin CRUD
│   │   ├── rentalController.ts  # Booking creation, my rentals, cancellation
│   │   └── adminController.ts   # Platform analytics, orders & users
│   ├── data/
│   │   ├── seedData.ts          # Curated seed products with rich imagery & specs
│   │   └── store.ts             # Persistence and dual-mode data layer
│   ├── middleware/
│   │   └── auth.ts              # JWT verification & verifyAdmin guards
│   ├── models/
│   │   ├── User.ts              # Mongoose user schema & password methods
│   │   ├── Product.ts           # Mongoose product schema & category enums
│   │   └── Rental.ts            # Mongoose rental schema & booking statuses
│   ├── routes/
│   │   ├── authRoutes.ts        # /api/auth/* endpoints
│   │   ├── productRoutes.ts     # /api/products/* endpoints
│   │   ├── rentalRoutes.ts      # /api/rentals/* endpoints
│   │   └── adminRoutes.ts       # /api/admin/* endpoints
│   └── tests/
│       └── api.test.ts          # Automated integration testing suite
│
└── src/                         # Frontend Architecture
    ├── components/
    │   ├── common/
    │   │   ├── ProductCard.tsx  # Product card with zero-pill typography
    │   │   └── ProtectedRoute.tsx # Route protection & admin guards
    │   └── layout/
    │       ├── Navbar.tsx       # Responsive navigation, cart count & dropdowns
    │       └── Footer.tsx       # Trust badges, links & newsletter
    ├── context/
    │   ├── AuthContext.tsx      # Auth state, login/register/logout & demo switchers
    │   └── CartContext.tsx      # Rental items, duration & pricing calculations
    ├── pages/
    │   ├── HomePage.tsx         # Hero, categories, featured, calculator, reviews
    │   ├── AboutUsPage.tsx      # Mission, circular economy, team & metrics
    │   ├── ProductsPage.tsx     # Full catalog with search, filters & pagination
    │   ├── ProductDetailsPage.tsx # Gallery, tenure calculator, pincode checker
    │   ├── CartBookingPage.tsx  # Checkout, shipping address & payment options
    │   ├── LoginPage.tsx        # Sign in with demo customer/admin buttons
    │   ├── RegisterPage.tsx     # Registration with form validation
    │   ├── UserDashboardPage.tsx# User profile, metrics & recent activity
    │   ├── MyRentalsPage.tsx    # Live booking tracking & cancellation
    │   ├── AdminDashboardPage.tsx # Products CRUD, order statuses & user lists
    │   └── ContactUsPage.tsx    # Inquiries form, contact channels & FAQs
    ├── services/
    │   └── api.ts               # Axios client with JWT interceptor
    └── types/
        └── index.ts             # TypeScript domain interfaces
```

---

## 🔑 Demo Credentials

To evaluate the platform immediately without filling registration forms:

| Role | Email | Password | Access Capabilities |
|---|---|---|---|
| **Administrator** | `admin@rentease.com` | `Admin@123` | Full admin dashboard, product creation/editing, inventory stock management, and rental status transitions |
| **Customer** | `john@example.com` | `User@123` | Browse catalog, book rentals, view active orders, and cancel bookings |

*Tip: Quick one-click buttons for both accounts are available on the `/login` page.*

---

## 📡 REST API Documentation

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create a new user account (Name, Email, Mobile Number, Password).
- `POST /api/auth/login` - Authenticate user & receive JWT token.
- `GET /api/auth/me` - Retrieve current user profile (Requires `Bearer <token>`).
- `PUT /api/auth/profile` - Update user profile information.

### Products (`/api/products`)
- `GET /api/products` - List products with query filtering (`category`, `search`, `minPrice`, `maxPrice`, `sortBy`, `page`, `limit`).
- `GET /api/products/:id` - Fetch single product specifications & image gallery.
- `POST /api/products` - Create new rental product (Admin only).
- `PUT /api/products/:id` - Update product details, stock, or price (Admin only).
- `DELETE /api/products/:id` - Remove product from catalog (Admin only).

### Rentals (`/api/rentals`)
- `POST /api/rentals` - Book rental item with tenure duration & delivery address.
- `GET /api/rentals/my-rentals` - Fetch authenticated user's rental history.
- `GET /api/rentals/:id` - Retrieve rental booking details.
- `PUT /api/rentals/:id/cancel` - Cancel eligible booking (`Pending` or `Confirmed`).

### Admin (`/api/admin`)
- `GET /api/admin/users` - Directory of registered users and rental volumes.
- `GET /api/admin/rentals` - Master list of all rental orders with customer details.
- `PUT /api/admin/rentals/:id/status` - Transition booking status (`Pending` ➔ `Confirmed` ➔ `Out for Delivery` ➔ `Active` ➔ `Completed` ➔ `Cancelled`).
- `GET /api/admin/stats` - Platform financial & operational metrics.

---

## 🧪 Automated Testing

Execute the automated backend test suite:

```bash
npm test
```

This verifies:
- Database seed integrity across all 5 product categories.
- Bcrypt password hashing and user role permissions.
- Duration discounting mathematics (6-month and 12-month tier calculations).
- Rental creation and customer order histories.

---

## ⚙️ Installation & Running Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   PORT=3000
   JWT_SECRET=your_jwt_secret_key_here
   MONGODB_URI=mongodb://127.0.0.1:27017/rentease
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Production Build**:
   ```bash
   npm run build
   npm start
   ```
