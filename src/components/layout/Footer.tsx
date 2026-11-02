import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  Truck,
  ArrowRight,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      {/* Trust Badges Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-slate-900">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400 shrink-0 border border-slate-800">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Free Delivery</p>
              <p className="text-xs text-slate-400 mt-0.5">Doorstep setup & hassle-free pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400 shrink-0 border border-slate-800">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Free Relocation</p>
              <p className="text-xs text-slate-400 mt-0.5">Moving city or house? We relocate free</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400 shrink-0 border border-slate-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Zero Maintenance</p>
              <p className="text-xs text-slate-400 mt-0.5">Annual servicing & repairs on us</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400 shrink-0 border border-slate-800">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Flexible Tenures</p>
              <p className="text-xs text-slate-400 mt-0.5">Rent 1 to 24 months, cancel anytime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 font-bold border border-teal-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-heading">
                Rent<span className="text-teal-400">Ease</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm mb-6">
              RentEase is a modern full-stack rental marketplace empowering individuals and businesses to live lightly and furnish smartly with flexible monthly rental subscriptions.
            </p>

            <div className="flex flex-col gap-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>100 Silicon Way, Tech Tower, San Francisco, CA 94105</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>+1 (800) 555-RENT (7368) · Mon-Sat 9AM-8PM PST</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>support@rentease.com</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Categories
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li>
                <Link to="/products?category=Furniture" className="hover:text-teal-400 transition-colors">
                  Furniture & Sofas
                </Link>
              </li>
              <li>
                <Link to="/products?category=Home%20Appliances" className="hover:text-teal-400 transition-colors">
                  Home Appliances
                </Link>
              </li>
              <li>
                <Link to="/products?category=Electronics" className="hover:text-teal-400 transition-colors">
                  Electronics & Displays
                </Link>
              </li>
              <li>
                <Link to="/products?category=Office%20Equipment" className="hover:text-teal-400 transition-colors">
                  Ergonomic Workstations
                </Link>
              </li>
              <li>
                <Link to="/products?category=Kitchen%20Appliances" className="hover:text-teal-400 transition-colors">
                  Kitchen Appliances
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-teal-400 transition-colors font-medium text-teal-500">
                  Browse All Collections →
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company & Help
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-teal-400 transition-colors">
                  About Us & Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-teal-400 transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link to="/my-rentals" className="hover:text-teal-400 transition-colors">
                  Track Delivery
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-400 transition-colors">
                  Circular Economy Impact
                </Link>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">Terms of Service</span>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">Privacy Policy</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Stay in the Loop
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe for exclusive tenant discounts, new arrival drops, and seasonal rental promotions.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  required
                  className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                Subscribe <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {subscribed && (
              <p className="text-[11px] text-emerald-400 mt-2 font-medium">
                Thank you for subscribing! Check your inbox for your welcome coupon code.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <p>© 2026 RentEase Inc. All rights reserved. MERN Stack Rental Platform.</p>
        <div className="flex items-center gap-4 text-[11px]">
          <span>MERN Architecture</span>
          <span aria-hidden="true">·</span>
          <span>MongoDB & Mongoose</span>
          <span aria-hidden="true">·</span>
          <span>Express REST APIs</span>
          <span aria-hidden="true">·</span>
          <span>React 19 & Tailwind</span>
        </div>
      </div>
    </footer>
  );
};
