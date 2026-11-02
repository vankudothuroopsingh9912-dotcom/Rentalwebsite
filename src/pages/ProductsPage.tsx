import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Filter,
  Check,
} from 'lucide-react';
import { ProductCard } from '../components/common/ProductCard';
import { productService } from '../services/api';
import { Product, ProductCategory } from '../types';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';
  const initialSort = searchParams.get('sortBy') || 'rating';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter States
  const [category, setCategory] = useState<string>(initialCategory);
  const [search, setSearch] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<number>(120); // max price slider

  const categories = [
    'All',
    'Furniture',
    'Home Appliances',
    'Electronics',
    'Office Equipment',
    'Kitchen Appliances',
  ];

  // Sync state if URL query params change
  useEffect(() => {
    const urlCat = searchParams.get('category') || 'All';
    const urlSearch = searchParams.get('search') || '';
    const urlSort = searchParams.get('sortBy') || 'rating';
    setCategory(urlCat);
    setSearch(urlSearch);
    setSortBy(urlSort);
  }, [searchParams]);

  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const res = await productService.getProducts({
          category: category !== 'All' ? category : undefined,
          search: search || undefined,
          sortBy,
          maxPrice: priceRange < 120 ? priceRange : undefined,
          availability: inStockOnly ? true : undefined,
          page: currentPage,
          limit: 8,
        });

        if (res.success) {
          setProducts(res.products);
          setTotal(res.total);
          setTotalPages(res.totalPages);
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, [category, search, sortBy, inStockOnly, priceRange, currentPage]);

  const handleCategorySelect = (selected: string) => {
    setCategory(selected);
    setCurrentPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (selected === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', selected);
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (search.trim()) {
      newParams.set('search', search.trim());
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setCategory('All');
    setSearch('');
    setSortBy('rating');
    setInStockOnly(false);
    setPriceRange(120);
    setCurrentPage(1);
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-1">
            Browse Inventory
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                Rental Catalog
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Showing {total} premium rental products available for immediate dispatch
              </p>
            </div>

            {/* Quick search input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search catalog by name or brand..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete('search');
                    setSearchParams(newParams);
                  }}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Category Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                category === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter & Sort Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 w-full md:w-auto flex-wrap">
            {/* Price Filter */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-600">Max Price:</span>
              <input
                type="range"
                min="20"
                max="120"
                step="5"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value, 10))}
                className="w-28 accent-teal-600 cursor-pointer"
              />
              <span className="text-xs font-bold text-slate-900">
                {priceRange >= 120 ? 'All' : `$${priceRange}/mo`}
              </span>
            </div>

            {/* In Stock Toggle */}
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 accent-teal-600"
              />
              In Stock Only
            </label>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  const newParams = new URLSearchParams(searchParams);
                  newParams.set('sortBy', e.target.value);
                  setSearchParams(newParams);
                }}
                className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Featured</option>
              </select>
            </div>

            {/* Clear filters button */}
            {(category !== 'All' || search || inStockOnly || priceRange < 120) && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 pl-2 border-l border-slate-200"
              >
                Reset <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl h-80 animate-pulse border border-slate-200"
              ></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-12">
            <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 font-heading mb-1">
              No matching rental products found
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Try adjusting your category filter, widening the price range, or searching with broader keywords.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-colors ${
                    currentPage === pageNum
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
