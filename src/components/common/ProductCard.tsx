import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleRentNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 3);
    navigate('/cart');
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 3);
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
      {/* Product Image Area */}
      <Link
        to={`/products/${product._id}`}
        className="relative block aspect-[4/3] bg-slate-100 overflow-hidden"
      >
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quiet availability flag in corner */}
        <div className="absolute top-3 left-3">
          {product.availability && product.stock > 0 ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm text-[11px] font-semibold text-emerald-800 shadow-xs border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              In Stock ({product.stock})
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm text-[11px] font-semibold text-rose-700 shadow-xs border border-rose-100">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              Out of Stock
            </span>
          )}
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Unboxed Metadata Line with typographic separators */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <div className="flex items-center gap-1.5 font-medium truncate">
            <span className="text-teal-700 font-semibold">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-600 truncate">{product.brand}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 font-semibold text-slate-800 shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-[11px] text-slate-600">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="font-heading font-bold text-slate-900 text-base leading-snug line-clamp-1 mb-1.5 group-hover:text-teal-700 transition-colors">
          <Link to={`/products/${product._id}`}>{product.name}</Link>
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        {/* Pricing Breakdown */}
        <div className="pt-3 border-t border-slate-100 mb-4 flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-slate-500 font-medium">From</span>
              <span className="text-2xl font-black text-slate-900 font-heading">
                ${product.pricePerMonth}
              </span>
              <span className="text-xs text-slate-500 font-medium">/month</span>
            </div>
            {product.securityDeposit > 0 ? (
              <p className="text-[11px] text-slate-600 mt-0.5">
                Deposit: ${product.securityDeposit} (fully refundable)
              </p>
            ) : (
              <p className="text-[11px] text-emerald-800 font-medium mt-0.5">
                Zero security deposit
              </p>
            )}
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <Link
            to={`/products/${product._id}`}
            className="w-full py-2 px-3 text-center text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={handleRentNow}
            disabled={!product.availability || product.stock <= 0}
            className={`w-full py-2 px-3 text-center text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 ${
              product.availability && product.stock > 0
                ? 'bg-slate-900 text-white hover:bg-teal-600 shadow-xs'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};
