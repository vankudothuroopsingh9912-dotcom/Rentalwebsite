import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PackageCheck,
  Calendar,
  Truck,
  RotateCcw,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Phone,
  FileText,
} from 'lucide-react';
import { rentalService } from '../services/api';
import { RentalBooking, BookingStatus } from '../types';

export const MyRentalsPage: React.FC = () => {
  const [rentals, setRentals] = useState<RentalBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [expandedRentalId, setExpandedRentalId] = useState<string | null>(null);

  const fetchRentals = async () => {
    try {
      const res = await rentalService.getMyRentals();
      if (res.success) {
        setRentals(res.rentals);
      }
    } catch (err) {
      console.error('Error fetching rentals:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  const handleCancel = async (id: string) => {
    if (!window.confirm('Are you sure you want to cancel this rental booking? Your deposit and rental payment will be refunded.')) {
      return;
    }

    setCancellingId(id);
    setActionMessage(null);
    try {
      const res = await rentalService.cancelRental(id);
      if (res.success) {
        setActionMessage({
          type: 'success',
          text: 'Booking cancelled successfully. Refund initiated.',
        });
        await fetchRentals();
      }
    } catch (err: any) {
      setActionMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to cancel booking.',
      });
    } finally {
      setCancellingId(null);
    }
  };

  const statusColors: Record<BookingStatus, { bg: string; text: string; border: string }> = {
    Pending: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
    Confirmed: { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' },
    'Out for Delivery': { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' },
    Active: { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' },
    Completed: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
    Cancelled: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  };

  const filteredRentals = filterStatus === 'All'
    ? rentals
    : rentals.filter((r) => r.bookingStatus.toLowerCase() === filterStatus.toLowerCase());

  // Visual Tracker Step Indicator
  const renderTracker = (status: BookingStatus) => {
    if (status === 'Cancelled') {
      return (
        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
          <XCircle className="w-4 h-4 shrink-0" />
          <span>This rental booking was cancelled. Any charged amounts have been queued for refund.</span>
        </div>
      );
    }

    const steps = ['Pending', 'Confirmed', 'Out for Delivery', 'Active', 'Completed'];
    const currentStepIndex = steps.indexOf(status);

    return (
      <div className="py-3">
        <div className="flex items-center justify-between relative">
          {/* Connector bar */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
          <div
            className="absolute top-1/2 left-4 h-0.5 bg-teal-500 -translate-y-1/2 z-0 transition-all duration-500"
            style={{
              width: `${Math.max(0, (currentStepIndex / (steps.length - 1)) * 100)}%`,
            }}
          ></div>

          {steps.map((st, idx) => {
            const isCompleted = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div key={st} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-teal-600 text-white ring-4 ring-teal-100'
                      : isCompleted
                      ? 'bg-teal-500 text-white'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span
                  className={`text-[10px] mt-1.5 font-semibold text-center hidden sm:block ${
                    isCurrent ? 'text-teal-700' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                  }`}
                >
                  {st}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-1">
              Order Management
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              My Rental Bookings
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Track live delivery status, view tenure agreements, and manage subscriptions
            </p>
          </div>

          <Link
            to="/products"
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors self-start sm:self-auto"
          >
            Explore More Products
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {['All', 'Active', 'Pending', 'Confirmed', 'Out for Delivery', 'Completed', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                filterStatus === st
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {actionMessage && (
          <div
            className={`p-4 rounded-2xl mb-6 text-xs font-medium flex items-center gap-2 ${
              actionMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {actionMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{actionMessage.text}</span>
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-3xl h-44 animate-pulse border border-slate-200"></div>
            ))}
          </div>
        ) : filteredRentals.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center max-w-lg mx-auto my-12">
            <PackageCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 font-heading mb-1">
              No rental bookings found
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {filterStatus !== 'All'
                ? `You have no rental bookings with status "${filterStatus}".`
                : 'You have not booked any rental products yet.'}
            </p>
            <Link
              to="/products"
              className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredRentals.map((rental) => {
              const statusStyle = statusColors[rental.bookingStatus] || {
                bg: 'bg-slate-100',
                text: 'text-slate-700',
                border: 'border-slate-200',
              };

              const canCancel =
                rental.bookingStatus === 'Pending' || rental.bookingStatus === 'Confirmed';
              const isExpanded = expandedRentalId === rental._id;

              const formattedStart = new Date(rental.startDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });
              const formattedEnd = new Date(rental.endDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div
                  key={rental._id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:border-slate-300 transition-all"
                >
                  {/* Top Bar: Booking ID, Date & Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold font-mono text-slate-900">
                        #{rental._id}
                      </span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-500">
                        Booked on {new Date(rental.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {rental.bookingStatus}
                      </span>
                    </div>
                  </div>

                  {/* Main Item Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-5 flex items-center gap-4">
                      <img
                        src={rental.productSnapshot?.image}
                        alt={rental.productSnapshot?.name}
                        className="w-20 h-20 rounded-2xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold text-teal-700">
                          {rental.productSnapshot?.category}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug truncate">
                          {rental.productSnapshot?.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Duration: <span className="font-semibold text-slate-800">{rental.duration} Months</span> ({formattedStart} to {formattedEnd})
                        </p>
                      </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-500">Monthly Rent:</span>
                        <p className="text-sm font-bold text-slate-900 mt-0.5">
                          ${rental.monthlyRent}/mo
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500">Security Deposit:</span>
                        <p className="text-sm font-bold text-emerald-800 mt-0.5">
                          ${rental.securityDeposit} (Refundable)
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:col-span-3 flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          setExpandedRentalId(isExpanded ? null : rental._id)
                        }
                        className="py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                      >
                        {isExpanded ? 'Hide Details' : 'View Details'}
                      </button>

                      {canCancel && (
                        <button
                          onClick={() => handleCancel(rental._id)}
                          disabled={cancellingId === rental._id}
                          className="py-2 px-3 text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors"
                        >
                          {cancellingId === rental._id ? 'Cancelling...' : 'Cancel'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Visual Status Tracker Bar */}
                  <div className="mt-6 pt-5 border-t border-slate-100">
                    {renderTracker(rental.bookingStatus)}
                  </div>

                  {/* Expanded Detailed Accordion */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-slate-100 bg-slate-50/70 -mx-6 -mb-6 p-6 rounded-b-3xl text-xs space-y-4 animate-in fade-in duration-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Address */}
                        <div>
                          <p className="font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-teal-600" /> Delivery Location
                          </p>
                          <p className="text-slate-700 leading-relaxed">
                            {rental.shippingAddress.street}<br />
                            {rental.shippingAddress.city}, {rental.shippingAddress.state} {rental.shippingAddress.zipCode}
                            {rental.shippingAddress.landmark && (
                              <span className="block text-slate-500 text-[11px] mt-0.5">
                                Landmark: {rental.shippingAddress.landmark}
                              </span>
                            )}
                          </p>
                        </div>

                        {/* Contact & Notes */}
                        <div>
                          <p className="font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-teal-600" /> Contact & Notes
                          </p>
                          <p className="text-slate-700">Phone: {rental.contactPhone}</p>
                          <p className="text-slate-500 mt-1 italic">
                            {rental.notes ? `"${rental.notes}"` : 'No delivery instructions specified.'}
                          </p>
                        </div>

                        {/* Charges breakdown */}
                        <div>
                          <p className="font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-teal-600" /> Financial Itemization
                          </p>
                          <div className="space-y-1 text-slate-600">
                            <div className="flex justify-between">
                              <span>Tenure ({rental.duration} mos × ${rental.monthlyRent}):</span>
                              <span className="font-semibold text-slate-900">${rental.monthlyRent * rental.duration}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Security Deposit:</span>
                              <span className="font-semibold text-slate-900">${rental.securityDeposit}</span>
                            </div>
                            <div className="flex justify-between pt-1 border-t border-slate-200 font-bold text-slate-900">
                              <span>Total Booking Value:</span>
                              <span className="text-teal-700 font-black">${rental.totalPrice}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
