import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Leaf,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">
            Our Story & Mission
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-heading tracking-tight mb-6 leading-tight">
            Redefining Home Living Through Flexible Subscriptions
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Founded with a belief that changing cities, upgrading homes, and starting new chapters shouldn't come with the crippling costs and logistical headaches of heavy furniture ownership.
          </p>
        </div>

        {/* Big Numbers Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="p-8 bg-white rounded-3xl border border-slate-200/90 text-center shadow-xs">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 font-heading">
              15,000+
            </span>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-2">
              Homes Furnished
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-200/90 text-center shadow-xs">
            <span className="text-3xl sm:text-4xl font-black text-teal-600 font-heading">
              99.4%
            </span>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-2">
              Customer Satisfaction
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-200/90 text-center shadow-xs">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 font-heading">
              48-72h
            </span>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-2">
              Doorstep Delivery SLA
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-200/90 text-center shadow-xs">
            <span className="text-3xl sm:text-4xl font-black text-emerald-800 font-heading">
              340+ Tons
            </span>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-2">
              Landfill Waste Diverted
            </p>
          </div>
        </div>

        {/* Our Purpose & Values Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-14 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-600 uppercase tracking-wider mb-3">
              <Leaf className="w-4 h-4" /> The Circular Economy
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight mb-5">
              Why We Believe in Renting Over Disposable Ownership
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Millions of low-cost particle-board furniture units end up in landfills every year when people move apartments. At RentEase, we curate durable, solid-wood furniture and Grade-A industrial appliances built to last decades.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              Between leases, each product undergoes deep multi-stage UV and acoustic sanitization, mechanical recalibration, and upholstery restoration in our dedicated refurbishment facilities.
            </p>

            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Zero plastic waste in packaging — reusable padded quilted transit covers</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Complimentary relocation when you move to a new flat within our service zone</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>100% deposit return guarantee with zero surprise depreciation deductions</span>
              </li>
            </ul>
          </div>

          <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80"
              alt="RentEase Modern Living Room"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Founding Pillars */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Our Core Promises to Every Renter
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              The foundational principles that guide our product curation, logistics, and customer support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading mb-2">
                Uncompromising Quality
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed flex-1">
                We never stock flimsy fast-furniture. Every item from our Herman Miller chairs to Samsung inverter appliances is sourced from premier manufacturers with proven reliability.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading mb-2">
                White-Glove Delivery
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed flex-1">
                You never lift a finger. Our trained technicians carry the equipment up your stairs, assemble the furniture, hook up water/power lines, and test each appliance before leaving.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-5">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading mb-2">
                Fluid Flexibility
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed flex-1">
                Life changes fast. Extend your rental for greater discounts, swap out a study desk for a dining set, or schedule a free pickup when your work contract finishes.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-slate-900 text-white rounded-3xl p-10 sm:p-14 border border-slate-800">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading mb-3">
            Experience the Ease of Smart Furnishing
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Browse our catalog today and have your home fully furnished by the weekend.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
          >
            Explore Catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
