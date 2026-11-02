import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  User as UserIcon,
  Search,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  Layers,
  LogOut,
  PackageCheck,
  LayoutDashboard,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const categories = [
    { name: 'All Categories', path: '/products' },
    { name: 'Furniture', path: '/products?category=Furniture' },
    { name: 'Home Appliances', path: '/products?category=Home%20Appliances' },
    { name: 'Electronics', path: '/products?category=Electronics' },
    { name: 'Office Equipment', path: '/products?category=Office%20Equipment' },
    { name: 'Kitchen Appliances', path: '/products?category=Kitchen%20Appliances' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 text-center flex items-center justify-center gap-3">
        <span className="flex items-center gap-1 font-medium text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" /> Special Offer
        </span>
        <span className="hidden sm:inline text-slate-400">·</span>
        <span>Save up to 20% on 12-month rentals + Free doorstep setup</span>
        <span className="hidden md:inline text-slate-400">·</span>
        <span className="hidden md:inline text-slate-300 font-medium">Zero security deposit options available</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400 font-bold shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5 text-teal-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 font-heading leading-tight">
                Rent<span className="text-teal-600">Ease</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">
                Smart Rentals
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/' ? 'text-teal-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              <button
                className={`text-sm font-semibold flex items-center gap-1.5 py-2 transition-colors ${
                  location.pathname.startsWith('/products')
                    ? 'text-teal-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Catalog
                <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
              </button>

              {categoriesOpen && (
                <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2.5 mt-0 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    Browse Category
                  </div>
                  {categories.map((c) => (
                    <Link
                      key={c.name}
                      to={c.path}
                      onClick={() => setCategoriesOpen(false)}
                      className="block px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-teal-600 transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/products"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/products' && !location.search
                  ? 'text-teal-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Products
            </Link>

            <Link
              to="/about"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/about' ? 'text-teal-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/contact' ? 'text-teal-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Header: Search Bar + Cart + User */}
          <div className="flex items-center gap-4">
            {/* Search Input on Desktop */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex relative items-center">
              <input
                type="text"
                placeholder="Search sofa, fridge, laptop..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-52 lg:w-64 pl-9 pr-4 py-2 text-xs bg-slate-100/80 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            </form>

            {/* Cart / Bookings Drawer Link */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              title="Rental Cart"
            >
              <ShoppingBag className="w-5 h-5 text-slate-800" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-teal-600 text-white text-[11px] font-bold flex items-center justify-center shadow-sm animate-pulse">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Session Buttons */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-left"
                >
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                  <div className="hidden xl:block">
                    <p className="text-xs font-bold text-slate-900 leading-none truncate max-w-[120px]">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-slate-600 capitalize">
                      {user.role === 'admin' ? 'Administrator' : 'Customer'}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-teal-600"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-400" />
                      User Dashboard
                    </Link>

                    <Link
                      to="/my-rentals"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-teal-600"
                    >
                      <PackageCheck className="w-4 h-4 text-slate-400" />
                      My Rentals
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-amber-700 hover:bg-amber-50"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        Admin Dashboard
                      </Link>
                    )}

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2.5">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          </form>

          <div className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
            >
              Rental Catalog
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
            >
              Contact Us
            </Link>

            {isAuthenticated ? (
              <>
                <div className="border-t border-slate-100 my-2 pt-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-sm font-medium text-slate-700 block hover:bg-slate-50"
                  >
                    User Dashboard
                  </Link>
                  <Link
                    to="/my-rentals"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-sm font-medium text-slate-700 block hover:bg-slate-50"
                  >
                    My Rentals
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 text-sm font-medium text-amber-700 block hover:bg-amber-50"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm font-medium text-rose-600 block hover:bg-rose-50"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-lg"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
