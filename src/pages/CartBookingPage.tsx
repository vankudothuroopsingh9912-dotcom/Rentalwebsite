import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Calendar,
  ShieldCheck,
  Truck,
  ArrowRight,
  ShoppingBag,
  CheckCircle2,
  CreditCard,
  Building2,
  DollarSign,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { rentalService } from '../services/api';

export const CartBookingPage: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateDuration,
    clearCart,
    calculateMonthlyRate,
  } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Booking Form Fields
  const [street, setStreet] = useState(user?.address || '');
  const [city, setCity] = useState('San Francisco');
  const [state, setState] = useState('CA');
  const [zipCode, setZipCode] = useState('94105');
  const [landmark, setLandmark] = useState('');
  const [contactPhone, setContactPhone] = useState(user?.phone || '');
  const [notes, setNotes] = useState('');
  const [startDate, setStartDate] = useState(
    new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0]
  );
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successBookingId, setSuccessBookingId] = useState<string | null>(null);

  const durationOptions = [
    { value: 1, label: '1 Month' },
    { value: 3, label: '3 Months (5% off)' },
    { value: 6, label: '6 Months (10% off)' },
    { value: 12, label: '12 Months (20% off)' },
    { value: 24, label: '24 Months (25% off)' },
  ];

  // Calculated totals
  const subtotalRent = items.reduce((sum, item) => {
    const rate = calculateMonthlyRate(item.product, item.duration);
    return sum + rate * item.duration;
  }, 0);

  const totalDeposits = items.reduce((sum, item) => {
    return sum + (item.product.securityDeposit || 0);
  }, 0);

  const grandTotalPayable = subtotalRent + totalDeposits;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isAuthenticated) {
      navigate('/login?redirect=/cart');
      return;
    }

    if (!street || !city || !state || !zipCode || !contactPhone) {
      setError('Please provide a complete shipping address and contact telephone number.');
      return;
    }

    if (items.length === 0) {
      setError('Your rental cart is empty. Please add at least one product.');
      return;
    }

    setSubmitting(true);
    try {
      let lastBookingId = '';
      // Create bookings sequentially for each item in the cart
      for (const item of items) {
        const res = await rentalService.createRental({
          productId: item.product._id,
          duration: item.duration,
          startDate,
          shippingAddress: {
            street,
            city,
            state,
            zipCode,
            landmark,
          },
          contactPhone,
          notes,
        });

        if (res.success && res.rental) {
          lastBookingId = res.rental._id;
        }
      }

      clearCart();
      setSuccessBookingId(lastBookingId);
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Failed to submit rental booking. Please verify your details.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (successBookingId) {
    return (
      <div className="bg-[#f8fafc] min-h-[75vh] py-16 flex items-center justify-center">
        <div className="max-w-lg w-full mx-4 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl text-center animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 font-heading mb-2">
            Rental Booking Confirmed!
          </h1>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            Your booking <span className="font-mono font-bold text-slate-800">#{successBookingId}</span> has been received. Our team is conducting initial verification and scheduling your delivery.
          </p>

          <div className="bg-slate-50 rounded-2xl p-4 text-xs text-slate-600 text-left mb-6 space-y-2 border border-slate-100">
            <div className="flex justify-between">
              <span className="text-slate-600">Expected Delivery Date:</span>
              <span className="font-semibold text-slate-800">Within 48-72 Hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Free Doorstep Assembly:</span>
              <span className="font-semibold text-emerald-700">Included</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Delivery Address:</span>
              <span className="font-semibold text-slate-800 text-right truncate max-w-[200px]">
                {street}, {city}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to="/my-rentals"
              className="w-full py-2.5 px-4 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
            >
              Track in My Rentals
            </Link>
            <Link
              to="/products"
              className="w-full py-2.5 px-4 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors"
            >
              Browse More Items
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-1">
            Checkout
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Rental Booking & Cart
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center max-w-lg mx-auto my-12">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-base font-bold text-slate-900 font-heading mb-1">
              Your rental cart is empty
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Browse our catalog of furniture, electronics, and home appliances to rent what you need with flexible tenures.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
            >
              Explore Rental Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Cart Items & Shipping Details (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Cart Items List */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Rental Items ({items.length})
                  </h2>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {items.map(({ product, duration }) => {
                    const monthlyRate = calculateMonthlyRate(product, duration);
                    const itemRentTotal = monthlyRate * duration;

                    return (
                      <div key={product._id} className="py-4 flex flex-col sm:flex-row gap-4 items-start">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-20 h-20 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-[11px] font-semibold text-teal-700">
                                {product.category}
                              </p>
                              <h3 className="text-sm font-bold text-slate-900 truncate">
                                {product.name}
                              </h3>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(product._id)}
                              className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-500">Tenure:</span>
                              <select
                                value={duration}
                                onChange={(e) =>
                                  updateDuration(product._id, parseInt(e.target.value, 10))
                                }
                                className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1"
                              >
                                {durationOptions.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="text-right">
                              <span className="text-xs font-bold text-slate-900">
                                ${monthlyRate}/mo
                              </span>
                              <span className="text-[11px] text-slate-500 block">
                                Total rent: ${itemRentTotal}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Details Card */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                  Doorstep Delivery Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        State / Province *
                      </label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        ZIP / Postal Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Contact Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Start Date
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Delivery Notes / Instructions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Service elevator available on 3rd floor; please call before arrival"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Payment (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs sticky top-28">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                  Rental Order Summary
                </h2>

                <div className="space-y-3 text-xs mb-6">
                  <div className="flex justify-between text-slate-600">
                    <span>Cumulative Monthly Rent:</span>
                    <span className="font-semibold text-slate-900">
                      ${items.reduce((s, i) => s + calculateMonthlyRate(i.product, i.duration), 0)}/mo
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Total Rent for Full Lease:</span>
                    <span className="font-semibold text-slate-900">${subtotalRent}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Refundable Security Deposit:</span>
                    <span className="font-semibold text-emerald-800">
                      ${totalDeposits} (100% refundable)
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Doorstep Setup & Installation:</span>
                    <span className="font-bold text-emerald-800 uppercase text-[11px]">Free ($0)</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Annual Maintenance Inclusions:</span>
                    <span className="font-bold text-emerald-800 uppercase text-[11px]">Included</span>
                  </div>

                  <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Total Due Today</span>
                      <span className="text-[10px] text-slate-600">(Rent for lease + Deposit)</span>
                    </div>
                    <span className="text-2xl font-black text-slate-900 font-heading">
                      ${grandTotalPayable}
                    </span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    <label
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'border-teal-600 bg-teal-50/50 ring-1 ring-teal-500'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="accent-teal-600"
                        />
                        <span className="text-xs font-semibold text-slate-800">Credit / Debit Card</span>
                      </div>
                      <CreditCard className="w-4 h-4 text-slate-500" />
                    </label>

                    <label
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-teal-600 bg-teal-50/50 ring-1 ring-teal-500'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                          className="accent-teal-600"
                        />
                        <span className="text-xs font-semibold text-slate-800">Instant UPI / QR</span>
                      </div>
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                        Fastest
                      </span>
                    </label>

                    <label
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-teal-600 bg-teal-50/50 ring-1 ring-teal-500'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="accent-teal-600"
                        />
                        <span className="text-xs font-semibold text-slate-800">Pay on Delivery & Setup</span>
                      </div>
                      <Truck className="w-4 h-4 text-slate-500" />
                    </label>
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 mb-4 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-teal-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? 'Confirming Rental Order...' : 'Confirm Rental Booking'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                {!isAuthenticated && (
                  <p className="text-[11px] text-slate-500 text-center mt-3">
                    You will be prompted to sign in or register to attach this booking to your account.
                  </p>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
