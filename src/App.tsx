import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { MyRentalsPage } from './pages/MyRentalsPage';
import { CartBookingPage } from './pages/CartBookingPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen selection:bg-teal-500 selection:text-white">
            <ScrollToTop />
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* 1. Home Page */}
                <Route path="/" element={<HomePage />} />

                {/* 2. About Us */}
                <Route path="/about" element={<AboutUsPage />} />

                {/* 3. Products / Rental Catalog */}
                <Route path="/products" element={<ProductsPage />} />

                {/* 4. Product Details */}
                <Route path="/products/:id" element={<ProductDetailsPage />} />

                {/* 5. User Registration */}
                <Route path="/register" element={<RegisterPage />} />

                {/* 6. User Login */}
                <Route path="/login" element={<LoginPage />} />

                {/* 7. User Dashboard (Protected) */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <UserDashboardPage />
                    </ProtectedRoute>
                  }
                />

                {/* 8. My Rentals (Protected) */}
                <Route
                  path="/my-rentals"
                  element={
                    <ProtectedRoute>
                      <MyRentalsPage />
                    </ProtectedRoute>
                  }
                />

                {/* 9. Cart / Rental Booking */}
                <Route path="/cart" element={<CartBookingPage />} />

                {/* 10. Contact Us */}
                <Route path="/contact" element={<ContactUsPage />} />

                {/* 11. Admin Dashboard (Protected, Admin Only) */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all 404 Route */}
                <Route
                  path="*"
                  element={
                    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
                      <h1 className="text-4xl font-extrabold text-slate-900 font-heading mb-2">
                        404 - Page Not Found
                      </h1>
                      <p className="text-sm text-slate-500 mb-6">
                        The requested page could not be located on the RentEase platform.
                      </p>
                      <a
                        href="/"
                        className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl"
                      >
                        Return Home
                      </a>
                    </div>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
