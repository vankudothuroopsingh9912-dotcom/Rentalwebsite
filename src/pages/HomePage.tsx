import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Sofa,
  Tv,
  Refrigerator,
  Briefcase,
  UtensilsCrossed,
  CheckCircle2,
  Star,
  Quote,
  Calculator,
  Calendar,
  DollarSign,
} from 'lucide-react';
import { ProductCard } from '../components/common/ProductCard';
import { productService } from '../services/api';
import { Product } from '../types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Rent vs Buy Calculator state
  const [calcCategory, setCalcCategory] = useState<'sofa' | 'tv' | 'desk' | 'fridge'>('sofa');
  const [calcMonths, setCalcMonths] = useState<number>(12);

  const calcOptions = {
    sofa: { name: 'Premium 4-Seater Sectional Sofa', buyPrice: 1650, rentPerMonth: 45 },
    tv: { name: '55" OLED Cinema Smart 4K TV', buyPrice: 1400, rentPerMonth: 49 },
    desk: { name: 'Motorized Dual-Motor Standing Desk', buyPrice: 750, rentPerMonth: 28 },
    fridge: { name: 'Samsung Double Door Inverter Refrigerator', buyPrice: 980, rentPerMonth: 32 },
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await productService.getProducts({ limit: 8, sortBy: 'rating' });
        if (res.success && res.products) {
          setFeaturedProducts(res.products.slice(0, 4));
          setPopularProducts(res.products.slice(4, 8));
        }
      } catch (err) {
        console.error('Error loading homepage products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const categoryCards = [
    {
      title: 'Furniture',
      desc: 'Living room sets, orthopedic beds, dining tables & accents',
      icon: Sofa,
      query: 'Furniture',
      count: '15+ Items',
      bgImg: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Home Appliances',
      desc: 'Smart refrigerators, washing machines, inverter ACs',
      icon: Refrigerator,
      query: 'Home Appliances',
      count: '12+ Items',
      bgImg: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Electronics',
      desc: 'OLED Smart TVs, MacBooks, gaming consoles, curved monitors',
      icon: Tv,
      query: 'Electronics',
      count: '18+ Items',
      bgImg: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Office Equipment',
      desc: 'Ergonomic chairs, sit-stand motorized desks, laser printers',
      icon: Briefcase,
      query: 'Office Equipment',
      count: '10+ Items',
      bgImg: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Kitchen Appliances',
      desc: 'Espresso machines, dual-zone air fryers, smart ovens',
      icon: UtensilsCrossed,
      query: 'Kitchen Appliances',
      count: '8+ Items',
      bgImg: 'https://images.unsplash.com/photo-1517668808822-9ebd02ae4a43?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const currentCalc = calcOptions[calcCategory];
  const totalRentCost = currentCalc.rentPerMonth * calcMonths;
  const upfrontSavings = currentCalc.buyPrice - totalRentCost;

  return (
    <div className="bg-[#f8fafc]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-20 pb-28 lg:pt-28 lg:pb-36 border-b border-slate-900">
        {/* Subtle geometric background glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 mb-4 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
              Modern Living Without Ownership Burdens
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[1.1] mb-6">
              Rent What You Need, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-200 to-emerald-300">
                When You Need It.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
              Elevate your home and workstation with premium furniture, high-end electronics, and smart appliances. Flexible monthly subscriptions with free delivery, maintenance, and upgrade options.
            </p>

            {/* Hero Search Bar */}
            <form
              onSubmit={handleHeroSearch}
              className="p-2 sm:p-2.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 shadow-2xl max-w-2xl mb-6"
            >
              <div className="flex-1 flex items-center gap-3 px-3 w-full">
                <Search className="w-5 h-5 text-teal-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search furniture, appliances, OLED TVs, desks..."
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
              >
                Search Catalog <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Keyword Links */}
            <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
              <span className="text-slate-500">Popular:</span>
              <button
                onClick={() => navigate('/products?search=sofa')}
                className="hover:text-teal-300 transition-colors underline decoration-slate-600 underline-offset-4"
              >
                Sectional Sofa
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => navigate('/products?search=macbook')}
                className="hover:text-teal-300 transition-colors underline decoration-slate-600 underline-offset-4"
              >
                MacBook Pro
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => navigate('/products?search=refrigerator')}
                className="hover:text-teal-300 transition-colors underline decoration-slate-600 underline-offset-4"
              >
                Double Door Fridge
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => navigate('/products?search=chair')}
                className="hover:text-teal-300 transition-colors underline decoration-slate-600 underline-offset-4"
              >
                Herman Miller Chair
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">
              Curated Collections
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Browse by Category
            </h2>
          </div>
          <Link
            to="/products"
            className="mt-3 md:mt-0 text-xs font-bold text-slate-700 hover:text-teal-600 flex items-center gap-1.5 transition-colors"
          >
            Explore all items <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {categoryCards.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.title}
                to={`/products?category=${encodeURIComponent(cat.query)}`}
                className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 hover:border-teal-500/50 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                  <img
                    src={cat.bgImg}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/90 text-slate-950 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold tracking-wide">{cat.count}</span>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-slate-900 text-sm group-hover:text-teal-600 transition-colors mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Rental Products Section */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">
                Hand-Picked for Quality
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                Featured Rentals
              </h2>
            </div>
            <Link
              to="/products"
              className="mt-3 md:mt-0 text-xs font-bold text-slate-700 hover:text-teal-600 flex items-center gap-1.5 transition-colors"
            >
              View Full Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-slate-50 rounded-2xl h-80 animate-pulse border border-slate-200"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">
            Seamless 4-Step Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight mb-4">
            How RentEase Works
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            From picking your ideal furniture piece to free doorstep setup and flexible returns, renting has never been this stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Step 1 */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200/90 relative flex flex-col">
            <span className="text-4xl font-black text-slate-200 font-heading mb-4 block">01</span>
            <h3 className="text-base font-bold text-slate-900 font-heading mb-2">
              Browse & Select
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1">
              Explore hundreds of sanitized, high-quality furniture, appliances, and electronics from trusted brands.
            </p>
            <div className="text-[11px] font-semibold text-teal-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> High-res photos & specs
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200/90 relative flex flex-col">
            <span className="text-4xl font-black text-slate-200 font-heading mb-4 block">02</span>
            <h3 className="text-base font-bold text-slate-900 font-heading mb-2">
              Choose Flexible Tenure
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1">
              Pick tenure from 1 to 24 months. Longer rental terms unlock discounts up to 20% off monthly rental rates.
            </p>
            <div className="text-[11px] font-semibold text-teal-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Extend or shorten anytime
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200/90 relative flex flex-col">
            <span className="text-4xl font-black text-slate-200 font-heading mb-4 block">03</span>
            <h3 className="text-base font-bold text-slate-900 font-heading mb-2">
              Free Delivery & Setup
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1">
              Our trained logistics team delivers within 72 hours, handles all assembly, and tests everything on-site.
            </p>
            <div className="text-[11px] font-semibold text-teal-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% complimentary setup
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-7 rounded-2xl border border-slate-200/90 relative flex flex-col">
            <span className="text-4xl font-black text-slate-200 font-heading mb-4 block">04</span>
            <h3 className="text-base font-bold text-slate-900 font-heading mb-2">
              Upgrade or Return
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1">
              When your lease concludes, swap to newer items, buyout at nominal salvage value, or request free pickup.
            </p>
            <div className="text-[11px] font-semibold text-teal-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Instant deposit refund
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Rent vs Buy Calculator */}
      <section className="py-16 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider mb-3">
                <Calculator className="w-4 h-4" /> Financial Clarity
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight mb-4">
                Calculate Your Rental Savings
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Why lock up thousands of dollars in depreciating assets? See how much liquidity you preserve by renting instead of buying upfront.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Select Product Category:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setCalcCategory('sofa')}
                      className={`py-2 px-3 text-xs font-medium rounded-lg text-left transition-colors border ${
                        calcCategory === 'sofa'
                          ? 'bg-teal-500/20 border-teal-400 text-white'
                          : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      Sectional Sofa
                    </button>
                    <button
                      onClick={() => setCalcCategory('tv')}
                      className={`py-2 px-3 text-xs font-medium rounded-lg text-left transition-colors border ${
                        calcCategory === 'tv'
                          ? 'bg-teal-500/20 border-teal-400 text-white'
                          : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      55" OLED Smart TV
                    </button>
                    <button
                      onClick={() => setCalcCategory('desk')}
                      className={`py-2 px-3 text-xs font-medium rounded-lg text-left transition-colors border ${
                        calcCategory === 'desk'
                          ? 'bg-teal-500/20 border-teal-400 text-white'
                          : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      Standing Desk
                    </button>
                    <button
                      onClick={() => setCalcCategory('fridge')}
                      className={`py-2 px-3 text-xs font-medium rounded-lg text-left transition-colors border ${
                        calcCategory === 'fridge'
                          ? 'bg-teal-500/20 border-teal-400 text-white'
                          : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      Inverter Refrigerator
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                    <span>Tenure Duration:</span>
                    <span className="text-teal-400 font-bold">{calcMonths} Months</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="24"
                    step="1"
                    value={calcMonths}
                    onChange={(e) => setCalcMonths(parseInt(e.target.value, 10))}
                    className="w-full accent-teal-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>1 Month</span>
                    <span>6 Months</span>
                    <span>12 Months</span>
                    <span>24 Months</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Box */}
            <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl">
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider text-slate-400">
                {currentCalc.name}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-xs text-slate-400 mb-1">Buy Upfront Retail Cost</p>
                  <p className="text-2xl font-black text-rose-400 font-heading">
                    ${currentCalc.buyPrice}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Immediate capital drain + moving & disposal hassle
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-500/30">
                  <p className="text-xs text-teal-300 mb-1">RentEase Total ({calcMonths} Mos)</p>
                  <p className="text-2xl font-black text-teal-300 font-heading">
                    ${totalRentCost}
                  </p>
                  <p className="text-[11px] text-teal-400/80 mt-1">
                    ${currentCalc.rentPerMonth}/mo with free relocation & zero maintenance
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Liquidity Preserved in Pocket</p>
                  <p className="text-xl font-extrabold text-emerald-400 font-heading">
                    ${Math.max(0, upfrontSavings)} cash saved today
                  </p>
                </div>
                <Link
                  to="/products"
                  className="w-full sm:w-auto px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shrink-0 text-center"
                >
                  Rent Now For ${currentCalc.rentPerMonth}/mo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products Carousel/Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">
              Top Customer Choices
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Popular Rental Units
            </h2>
          </div>
          <Link
            to="/products?sortBy=rating"
            className="mt-3 md:mt-0 text-xs font-bold text-slate-700 hover:text-teal-600 flex items-center gap-1.5 transition-colors"
          >
            See all top rated <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">
              Real Experiences
            </p>
            <h2 className="text-3xl font-extrabold text-slate-900 font-heading tracking-tight mb-4">
              Loved by Over 15,000+ Renters
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Hear from software engineers, medical professionals, remote workers, and families who furnished their entire home through RentEase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed flex-1 mb-6">
                "Relocating to Seattle for a 9-month tech contract was daunting until I found RentEase. I furnished my entire 1-bedroom apartment with a solid teak bed, couch, and smart washer in less than 30 minutes. Delivery team even set it up!"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Sarah Jenkins"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900">Sarah Jenkins</p>
                  <p className="text-[11px] text-slate-500">UX Lead, Seattle · Rented for 9 Mos</p>
                </div>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed flex-1 mb-6">
                "The Herman Miller Aeron chair and motorized standing desk saved my lower back during 12-hour coding sprints. Being able to rent high-end ergonomics for just $42 a month rather than blowing $1,500 cash is a no-brainer."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="David Chen"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900">David Chen</p>
                  <p className="text-[11px] text-slate-500">Software Engineer, Austin · Rented for 12 Mos</p>
                </div>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed flex-1 mb-6">
                "When my husband and I bought our first home, we moved across town and RentEase relocated our rented double-door refrigerator and washer for zero extra charges. Extraordinary customer care and punctuality."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                  alt="Priya Patel"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900">Priya Patel</p>
                  <p className="text-[11px] text-slate-500">Product Manager, Denver · Rented for 18 Mos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading mb-4 tracking-tight">
            Ready to Furnish Your Space on Your Terms?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Join thousands of happy renters enjoying designer homes with flexible terms, free delivery, and deposit protection.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/products"
              className="w-full sm:w-auto px-8 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg"
            >
              Browse Rental Catalog
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors border border-slate-700"
            >
              Contact Rental Concierge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
