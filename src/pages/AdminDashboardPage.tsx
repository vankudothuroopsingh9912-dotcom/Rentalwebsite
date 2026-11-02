import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Package,
  Users,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Truck,
  RotateCcw,
  Search,
  X,
  Filter,
} from 'lucide-react';
import { adminService, productService } from '../services/api';
import { Product, RentalBooking, User, AdminStats, BookingStatus, ProductCategory } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'rentals' | 'users'>('overview');

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [rentals, setRentals] = useState<RentalBooking[]>([]);
  const [users, setUsers] = useState<(User & { totalRentals: number; activeRentals: number })[]>([]);
  const [loading, setLoading] = useState(true);

  // Notifications
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Product Add / Edit Modal state
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [prodForm, setProdForm] = useState({
    name: '',
    category: 'Furniture' as ProductCategory,
    description: '',
    pricePerMonth: 35,
    securityDeposit: 70,
    stock: 5,
    brand: 'RentEase Choice',
    imageUrl: '',
    featuresText: 'Complimentary assembly\nSanitized packaging',
  });

  // Rental Filter
  const [rentalStatusFilter, setRentalStatusFilter] = useState<string>('All');

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, prodRes, rentRes, userRes] = await Promise.all([
        adminService.getStats(),
        productService.getProducts({ limit: 100 }),
        adminService.getRentals(),
        adminService.getUsers(),
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (prodRes.success) setProducts(prodRes.products);
      if (rentRes.success) setRentals(rentRes.rentals);
      if (userRes.success) setUsers(userRes.users);
    } catch (err: any) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProdForm({
      name: '',
      category: 'Furniture',
      description: '',
      pricePerMonth: 35,
      securityDeposit: 70,
      stock: 5,
      brand: 'RentEase Choice',
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
      featuresText: 'High durability performance fabric\nComplimentary delivery & setup',
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProdForm({
      name: prod.name,
      category: prod.category,
      description: prod.description,
      pricePerMonth: prod.pricePerMonth,
      securityDeposit: prod.securityDeposit,
      stock: prod.stock,
      brand: prod.brand,
      imageUrl: prod.images[0] || '',
      featuresText: prod.features?.join('\n') || '',
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const features = prodForm.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      name: prodForm.name,
      category: prodForm.category,
      description: prodForm.description,
      pricePerMonth: Number(prodForm.pricePerMonth),
      securityDeposit: Number(prodForm.securityDeposit),
      stock: Number(prodForm.stock),
      brand: prodForm.brand,
      images: [prodForm.imageUrl || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80'],
      features,
    };

    try {
      if (editingProduct) {
        const res = await productService.updateProduct(editingProduct._id, payload);
        if (res.success) {
          setMessage({ type: 'success', text: `Product "${res.product.name}" updated successfully.` });
        }
      } else {
        const res = await productService.createProduct(payload);
        if (res.success) {
          setMessage({ type: 'success', text: `New product "${res.product.name}" added to catalog.` });
        }
      }
      setShowProductModal(false);
      await loadData();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to save product.' });
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!window.confirm(`Delete product "${name}" permanently from the database?`)) return;

    try {
      const res = await productService.deleteProduct(id);
      if (res.success) {
        setMessage({ type: 'success', text: `Product "${name}" deleted.` });
        await loadData();
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to delete product.' });
    }
  };

  const handleUpdateStatus = async (rentalId: string, newStatus: BookingStatus) => {
    try {
      const res = await adminService.updateStatus(rentalId, newStatus);
      if (res.success) {
        setMessage({ type: 'success', text: `Booking #${rentalId} marked as ${newStatus}.` });
        await loadData();
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update status.' });
    }
  };

  const statusOptions: BookingStatus[] = [
    'Pending',
    'Confirmed',
    'Out for Delivery',
    'Active',
    'Completed',
    'Cancelled',
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-amber-600" /> Administrative Management Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Platform Administration
            </h1>
          </div>

          <button
            onClick={handleOpenAddProduct}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Add New Product
          </button>
        </div>

        {/* Global Feedback Banner */}
        {message && (
          <div
            className={`p-4 rounded-2xl mb-6 text-xs font-medium flex items-center justify-between ${
              message.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {message.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
            <button onClick={() => setMessage(null)} className="text-current opacity-70 hover:opacity-100">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl mb-8 w-fit overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Platform Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'products'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('rentals')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'rentals'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rental Bookings ({rentals.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'users'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Registered Users ({users.length})
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-semibold text-slate-500">Gross Rental Volume</span>
                <p className="text-3xl font-black text-slate-900 font-heading mt-2">
                  ${stats.totalRevenue.toLocaleString()}
                </p>
                <p className="text-[11px] text-emerald-800 font-medium mt-1">
                  Active contracted rentals
                </p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-semibold text-slate-500">Active Rentals in Homes</span>
                <p className="text-3xl font-black text-emerald-800 font-heading mt-2">
                  {stats.activeRentals}
                </p>
                <p className="text-[11px] text-slate-600 mt-1">Generating recurring rent</p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-semibold text-slate-500">Pending Deliveries</span>
                <p className="text-3xl font-black text-amber-800 font-heading mt-2">
                  {stats.pendingRentals + stats.outForDelivery}
                </p>
                <p className="text-[11px] text-slate-600 mt-1">Awaiting dispatch/setup</p>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs">
                <span className="text-xs font-semibold text-slate-500">Inventory Catalog</span>
                <p className="text-3xl font-black text-slate-900 font-heading mt-2">
                  {stats.totalProducts}
                </p>
                <p className="text-[11px] text-slate-600 mt-1">
                  {stats.outOfStockProducts} currently low stock
                </p>
              </div>
            </div>

            {/* Recent Orders Overview Table */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Latest Rental Orders Requiring Action
                </h3>
                <button
                  onClick={() => setActiveTab('rentals')}
                  className="text-xs font-bold text-teal-600 hover:text-teal-700"
                >
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="pb-3">Order ID</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Product</th>
                      <th className="pb-3">Tenure</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Quick Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {rentals.slice(0, 5).map((r) => (
                      <tr key={r._id} className="hover:bg-slate-50/70">
                        <td className="py-3.5 font-mono font-bold text-slate-900">#{r._id}</td>
                        <td className="py-3.5">
                          <p className="font-semibold text-slate-900">{r.customerName}</p>
                          <p className="text-[10px] text-slate-600">{r.contactPhone}</p>
                        </td>
                        <td className="py-3.5 font-medium">{r.productSnapshot?.name}</td>
                        <td className="py-3.5">{r.duration} Months</td>
                        <td className="py-3.5 font-bold text-slate-900">${r.totalPrice}</td>
                        <td className="py-3.5">
                          <span className="font-semibold text-[11px]">{r.bookingStatus}</span>
                        </td>
                        <td className="py-3.5 text-right">
                          <select
                            value={r.bookingStatus}
                            onChange={(e) =>
                              handleUpdateStatus(r._id, e.target.value as BookingStatus)
                            }
                            className="text-[11px] font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1"
                          >
                            {statusOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Catalog Inventory
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage items, prices, availability, and stock quantities
                </p>
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800"
              >
                <Plus className="w-3.5 h-3.5" /> Add Product
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="pb-3">Product</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Rent / Mo</th>
                    <th className="pb-3">Deposit</th>
                    <th className="pb-3">Stock</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {products.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-50/70">
                      <td className="py-3.5 flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{p.name}</p>
                          <p className="text-[10px] text-slate-600">{p.brand}</p>
                        </div>
                      </td>
                      <td className="py-3.5 font-medium">{p.category}</td>
                      <td className="py-3.5 font-bold text-slate-900">${p.pricePerMonth}</td>
                      <td className="py-3.5 text-slate-600">${p.securityDeposit}</td>
                      <td className="py-3.5 font-semibold">{p.stock} units</td>
                      <td className="py-3.5">
                        {p.availability && p.stock > 0 ? (
                          <span className="text-[11px] font-semibold text-emerald-800">
                            ● In Stock
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-rose-700">
                            ● Out of Stock
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p._id, p.name)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: RENTAL BOOKINGS */}
        {activeTab === 'rentals' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  All Rental Bookings
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update logistics dispatch, verify returns, and cancel orders
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Status:</span>
                <select
                  value={rentalStatusFilter}
                  onChange={(e) => setRentalStatusFilter(e.target.value)}
                  className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5"
                >
                  <option value="All">All Statuses</option>
                  {statusOptions.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="pb-3">Booking ID</th>
                    <th className="pb-3">Customer Details</th>
                    <th className="pb-3">Item Snapshot</th>
                    <th className="pb-3">Tenure</th>
                    <th className="pb-3">Total Value</th>
                    <th className="pb-3">Current Status</th>
                    <th className="pb-3 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {rentals
                    .filter((r) =>
                      rentalStatusFilter === 'All'
                        ? true
                        : r.bookingStatus.toLowerCase() === rentalStatusFilter.toLowerCase()
                    )
                    .map((r) => (
                      <tr key={r._id} className="hover:bg-slate-50/70">
                        <td className="py-3.5 font-mono font-bold text-slate-900">#{r._id}</td>
                        <td className="py-3.5">
                          <p className="font-bold text-slate-900">{r.customerName}</p>
                          <p className="text-[10px] text-slate-600">{r.shippingAddress?.city}, {r.shippingAddress?.state}</p>
                          <p className="text-[10px] text-slate-600 font-mono">{r.contactPhone}</p>
                        </td>
                        <td className="py-3.5">
                          <p className="font-semibold text-slate-900 line-clamp-1">
                            {r.productSnapshot?.name}
                          </p>
                          <p className="text-[10px] text-slate-600">{r.productSnapshot?.category}</p>
                        </td>
                        <td className="py-3.5">
                          <span className="font-semibold">{r.duration} Mos</span>
                          <span className="text-[10px] text-slate-600 block">${r.monthlyRent}/mo</span>
                        </td>
                        <td className="py-3.5">
                          <span className="font-bold text-slate-900">${r.totalPrice}</span>
                          <span className="text-[10px] text-slate-600 block">Dep: ${r.securityDeposit}</span>
                        </td>
                        <td className="py-3.5">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800">
                            {r.bookingStatus}
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          <select
                            value={r.bookingStatus}
                            onChange={(e) =>
                              handleUpdateStatus(r._id, e.target.value as BookingStatus)
                            }
                            className="text-xs font-semibold bg-white border border-slate-300 rounded-lg px-2 py-1 shadow-2xs"
                          >
                            {statusOptions.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: REGISTERED USERS */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Registered Platform Users
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Total {users.length} registered customers and admin accounts
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="pb-3">User</th>
                    <th className="pb-3">Contact</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Joined Date</th>
                    <th className="pb-3">Total Orders</th>
                    <th className="pb-3 text-right">Active Rentals</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/70">
                      <td className="py-3.5">
                        <p className="font-bold text-slate-900">{u.name}</p>
                        <p className="text-[10px] text-slate-600">{u.id}</p>
                      </td>
                      <td className="py-3.5">
                        <p className="font-medium text-slate-800">{u.email}</p>
                        <p className="text-[10px] text-slate-600">{u.phone}</p>
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            u.role === 'admin'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 text-slate-500">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-3.5 font-bold text-slate-900">{u.totalRentals}</td>
                      <td className="py-3.5 text-right font-bold text-emerald-800">
                        {u.activeRentals}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Product Modal for Add / Edit */}
        {showProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  {editingProduct ? 'Update Rental Product' : 'Add New Rental Product'}
                </h3>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={prodForm.name}
                    onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                    placeholder="e.g. Ergonomic Executive Mesh Chair"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                    <select
                      value={prodForm.category}
                      onChange={(e) =>
                        setProdForm({ ...prodForm, category: e.target.value as ProductCategory })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      <option value="Furniture">Furniture</option>
                      <option value="Home Appliances">Home Appliances</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Office Equipment">Office Equipment</option>
                      <option value="Kitchen Appliances">Kitchen Appliances</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Brand</label>
                    <input
                      type="text"
                      value={prodForm.brand}
                      onChange={(e) => setProdForm({ ...prodForm, brand: e.target.value })}
                      placeholder="e.g. Herman Miller, Sony, LG"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Price / Mo ($) *</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={prodForm.pricePerMonth}
                      onChange={(e) =>
                        setProdForm({ ...prodForm, pricePerMonth: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Deposit ($)</label>
                    <input
                      type="number"
                      min="0"
                      value={prodForm.securityDeposit}
                      onChange={(e) =>
                        setProdForm({ ...prodForm, securityDeposit: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Stock Count</label>
                    <input
                      type="number"
                      min="0"
                      value={prodForm.stock}
                      onChange={(e) => setProdForm({ ...prodForm, stock: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={prodForm.imageUrl}
                    onChange={(e) => setProdForm({ ...prodForm, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={prodForm.description}
                    onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                    placeholder="Detailed description of features, materials, and condition..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Features (one per line)
                  </label>
                  <textarea
                    rows={2}
                    value={prodForm.featuresText}
                    onChange={(e) => setProdForm({ ...prodForm, featuresText: e.target.value })}
                    placeholder="Feature 1&#10;Feature 2"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 font-mono text-[11px]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 font-bold rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg shadow-xs"
                  >
                    {editingProduct ? 'Save Updates' : 'Add to Catalog'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
