import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowLeft,
  Share2,
  MapPin,
  Clock,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { productService } from '../services/api';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/common/ProductCard';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [duration, setDuration] = useState<number>(6); // Default 6 months tenure
  const [zipCode, setZipCode] = useState<string>('');
  const [zipChecked, setZipChecked] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await productService.getProductById(id);
        if (res.success && res.product) {
          setProduct(res.product);
          setSelectedImage(0);

          // Fetch related in same category
          const relatedRes = await productService.getProducts({
            category: res.product.category,
            limit: 4,
          });
          if (relatedRes.success) {
            setRelatedProducts(relatedRes.products.filter((p) => p._id !== id).slice(0, 3));
          }
        }
      } catch (err) {
        console.error('Failed to load product details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-teal-500/20 border-t-teal-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Loading product details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-900 font-heading mb-3">
          Product Not Found
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          The requested rental product may have been archived or removed from the inventory.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Rental Catalog
        </Link>
      </div>
    );
  }

  // Duration discounting calculations
  const durationPlans = [
    { months: 1, label: '1 Month', discountPercent: 0, badge: 'Flexible' },
    { months: 3, label: '3 Months', discountPercent: 5, badge: 'Popular' },
    { months: 6, label: '6 Months', discountPercent: 10, badge: '10% OFF' },
    { months: 12, label: '12 Months', discountPercent: 20, badge: 'Best Value (20% OFF)' },
    { months: 24, label: '24 Months', discountPercent: 25, badge: '25% OFF' },
  ];

  const currentPlan = durationPlans.find((p) => p.months === duration) || durationPlans[2];
  const discountedMonthly = Math.round(
    product.pricePerMonth * (1 - currentPlan.discountPercent / 100)
  );
  const totalRentOverTenure = discountedMonthly * duration;
  const securityDeposit = product.securityDeposit || 0;
  const upfrontGrandTotal = totalRentOverTenure + securityDeposit;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleRentNow = () => {
    addToCart(product, duration);
    navigate('/cart');
  };

  const handleAddToCart = () => {
    addToCart(product, duration);
  };

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.trim().length >= 4) {
      setZipChecked(true);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-8">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-slate-900">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-slate-900">
              Catalog
            </Link>
            <span>/</span>
            <Link
              to={`/products?category=${encodeURIComponent(product.category)}`}
              className="hover:text-slate-900 font-medium text-teal-700"
            >
              {product.category}
            </Link>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copiedLink ? 'Link Copied!' : 'Share'}
          </button>
        </div>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm mb-16">
          {/* Left Column: Image Gallery (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Primary High-Res Viewport */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute top-4 left-4">
                {product.availability && product.stock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/95 backdrop-blur-sm text-xs font-semibold text-emerald-800 shadow-sm border border-emerald-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/95 backdrop-blur-sm text-xs font-semibold text-rose-700 shadow-sm border border-rose-100">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    Currently Rented Out
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border-2 transition-all shrink-0 ${
                      selectedImage === idx
                        ? 'border-teal-600 ring-2 ring-teal-500/20'
                        : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Inclusions Pill Strip */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-medium text-slate-800">
                <Truck className="w-4 h-4 text-teal-600" />
                <span>Free delivery and professional doorstep installation</span>
              </div>
              <div className="flex items-center gap-2 font-medium text-slate-800">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Zero repair fees during active lease tenure</span>
              </div>
              <div className="flex items-center gap-2 font-medium text-slate-800">
                <RotateCcw className="w-4 h-4 text-teal-600" />
                <span>Free annual maintenance & deep sanitization</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Duration Selector & Checkout (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Header / Brand info */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
              <span className="text-teal-700 font-bold">{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.brand}</span>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1 font-semibold text-slate-900">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating.toFixed(1)}</span>
                <span className="text-slate-600 font-normal">({product.reviewsCount} verified reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading leading-tight mb-4">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Interactive Tenure / Duration Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-teal-600" /> Select Rental Duration:
                </label>
                <span className="text-xs text-teal-700 font-semibold">
                  Longer plans = Lower monthly cost
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {durationPlans.map((plan) => {
                  const isSelected = duration === plan.months;
                  const price = Math.round(
                    product.pricePerMonth * (1 - plan.discountPercent / 100)
                  );
                  return (
                    <button
                      key={plan.months}
                      onClick={() => setDuration(plan.months)}
                      className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/50 ring-2 ring-teal-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-900">{plan.label}</span>
                      <div className="mt-1">
                        <span className="text-base font-black text-slate-900 font-heading">
                          ${price}
                        </span>
                        <span className="text-[10px] text-slate-500">/mo</span>
                      </div>
                      <span
                        className={`text-[9px] font-semibold mt-1.5 block ${
                          isSelected ? 'text-teal-700' : 'text-slate-600'
                        }`}
                      >
                        {plan.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calculated Pricing Summary Box */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-3 border-b border-slate-200 gap-2">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Monthly Rental Rate:</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-black text-slate-900 font-heading">
                      ${discountedMonthly}
                    </span>
                    <span className="text-xs text-slate-500">/ month</span>
                    {currentPlan.discountPercent > 0 && (
                      <span className="text-xs text-slate-400 line-through">
                        ${product.pricePerMonth}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-500">Refundable Security Deposit:</span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    ${securityDeposit}
                    <span className="text-[11px] font-normal text-emerald-800 ml-1.5">
                      (100% returned at end of tenure)
                    </span>
                  </p>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between text-xs text-slate-600">
                <span>
                  Total for {duration} {duration === 1 ? 'Month' : 'Months'} Rental:
                </span>
                <span className="font-bold text-slate-900 text-sm">
                  ${totalRentOverTenure} + ${securityDeposit} deposit ={' '}
                  <span className="text-teal-700 font-black">${upfrontGrandTotal}</span>
                </span>
              </div>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="mb-6">
              <form onSubmit={handleZipCheck} className="flex items-center gap-2 max-w-sm">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => {
                      setZipCode(e.target.value);
                      setZipChecked(false);
                    }}
                    placeholder="Enter delivery ZIP / Postal code"
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors"
                >
                  Check Area
                </button>
              </form>

              {zipChecked && (
                <p className="text-[11px] text-emerald-800 font-medium mt-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Express delivery available for {zipCode} (Delivered within 48-72 hours)
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
              <button
                onClick={handleAddToCart}
                disabled={!product.availability || product.stock <= 0}
                className="w-full py-3 px-5 border border-slate-300 hover:border-slate-900 text-slate-900 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 bg-white"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Rental Cart
              </button>

              <button
                onClick={handleRentNow}
                disabled={!product.availability || product.stock <= 0}
                className="w-full py-3 px-5 bg-slate-900 hover:bg-teal-600 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
              >
                Rent Now ({duration} Mo Plan)
              </button>
            </div>
          </div>
        </div>

        {/* Specifications & Features Tabs */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm mb-16">
          <h2 className="text-lg font-bold text-slate-900 font-heading mb-6 pb-3 border-b border-slate-100">
            Product Features & Technical Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Features List */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                Key Inclusions & Highlights
              </h3>
              <ul className="space-y-3">
                {product.features?.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Specs Table */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                Dimensions & Details
              </h3>
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                {Object.entries(product.specs || {}).map(([key, val]) => (
                  <div key={key} className="flex py-2.5 px-4 text-xs bg-slate-50/50 odd:bg-white">
                    <span className="w-40 font-semibold text-slate-600">{key}</span>
                    <span className="text-slate-900 flex-1 font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                Similar Items in {product.category}
              </h2>
              <Link
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="text-xs font-bold text-teal-700 hover:text-teal-800"
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
