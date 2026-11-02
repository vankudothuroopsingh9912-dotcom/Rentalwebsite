import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  User as UserIcon,
  PackageCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Edit3,
  Save,
  ShoppingBag,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { rentalService } from '../services/api';
import { RentalBooking } from '../types';

export const UserDashboardPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [rentals, setRentals] = useState<RentalBooking[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit profile state
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const loadRentals = async () => {
      try {
        const res = await rentalService.getMyRentals();
        if (res.success) {
          setRentals(res.rentals);
        }
      } catch (err) {
        console.error('Failed to load user rentals:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRentals();
  }, []);

  const totalBookings = rentals.length;
  const activeRentals = rentals.filter((r) => r.bookingStatus === 'Active').length;
  const pendingRentals = rentals.filter(
    (r) => r.bookingStatus === 'Pending' || r.bookingStatus === 'Confirmed' || r.bookingStatus === 'Out for Delivery'
  ).length;
  const completedRentals = rentals.filter((r) => r.bookingStatus === 'Completed').length;

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const success = await updateProfile({ name, phone, address });
    setSaving(false);
    if (success) {
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-1">
              Account Overview
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Welcome back, {user?.name.split(' ')[0]}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage your active rental tenures, delivery statuses, and profile information
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/products"
              className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-xs"
            >
              Rent More Items
            </Link>
            <Link
              to="/my-rentals"
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors"
            >
              View All Rentals
            </Link>
          </div>
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Total Bookings</span>
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              {totalBookings}
            </p>
            <p className="text-[11px] text-slate-600 mt-1">Lifetime rental orders</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Active Rentals</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-800 font-heading">
              {activeRentals}
            </p>
            <p className="text-[11px] text-slate-600 mt-1">Currently in your home</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Pending & In Transit</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-amber-800 font-heading">
              {pendingRentals}
            </p>
            <p className="text-[11px] text-slate-600 mt-1">Processing / Scheduled</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500">Completed Rentals</span>
              <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                <PackageCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              {completedRentals}
            </p>
            <p className="text-[11px] text-slate-600 mt-1">Returned & deposits released</p>
          </div>
        </div>

        {/* Content Row: Profile Info (5 cols) & Recent Rentals (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Personal Profile
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                </button>
              )}
            </div>

            {saveSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-medium mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Default Address</label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter street, city, state, zip"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="py-2 px-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="py-2 px-4 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                  <img
                    src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || 'User')}`}
                    alt={user?.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">
                      {user?.name}
                    </h3>
                    <p className="text-xs text-slate-500 capitalize">{user?.role} Account</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                    <span className="truncate">{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{user?.phone || 'No phone registered'}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{user?.address || 'No default shipping address set'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recent Rentals Section */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Recent Rental Activity
              </h2>
              <Link
                to="/my-rentals"
                className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                View Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-16 bg-slate-50 rounded-xl animate-pulse"></div>
                ))}
              </div>
            ) : rentals.length === 0 ? (
              <div className="py-10 text-center">
                <ShoppingBag className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500 mb-4">You have not booked any rental products yet.</p>
                <Link
                  to="/products"
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800"
                >
                  Browse Catalog
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {rentals.slice(0, 3).map((r) => {
                  const statusColors: Record<string, string> = {
                    Pending: 'bg-amber-50 text-amber-800 border-amber-200',
                    Confirmed: 'bg-blue-50 text-blue-800 border-blue-200',
                    'Out for Delivery': 'bg-purple-50 text-purple-800 border-purple-200',
                    Active: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                    Completed: 'bg-slate-100 text-slate-700 border-slate-200',
                    Cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
                  };

                  return (
                    <div key={r._id} className="py-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={r.productSnapshot?.image}
                          alt={r.productSnapshot?.name}
                          className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-200"
                        />
                        <div className="truncate">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {r.productSnapshot?.name}
                          </p>
                          <p className="text-[11px] text-slate-600 mt-0.5">
                            {r.duration} Mo Lease · ${r.monthlyRent}/mo
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span
                          className={`inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-md border ${
                            statusColors[r.bookingStatus] || 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {r.bookingStatus}
                        </span>
                        <p className="text-[11px] text-slate-600 mt-1">
                          Total: ${r.totalPrice}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
