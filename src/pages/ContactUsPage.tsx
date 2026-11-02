import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Rental Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Rental Inquiry',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 6000);
    }
  };

  const faqs = [
    {
      q: 'What happens if an appliance breaks down during my rental tenure?',
      a: 'All maintenance and mechanical failures not caused by intentional negligence are 100% free of charge. Simply file a service request from your dashboard, and our certified technician will visit within 24 hours to repair or replace the item free.',
    },
    {
      q: 'How does the security deposit refund work?',
      a: 'Your refundable security deposit is held in an escrow account. Upon lease completion, our logistics team inspects the item for normal wear and tear (minor scuffs are completely acceptable). The full deposit is returned to your bank account or card within 3 business days.',
    },
    {
      q: 'Can I relocate my rented furniture to another apartment?',
      a: 'Yes! If you are moving houses within any of our served metropolitan areas, our team will dismantle, securely pack, transport, and reassemble all your rented RentEase furniture at your new home for zero relocation fees.',
    },
    {
      q: 'What documents are required to approve a rental booking?',
      a: 'We require a valid government photo ID (Driver License or Passport) and proof of delivery address (such as a utility bill, lease agreement, or employment letter). Verification is digital and completed in minutes.',
    },
    {
      q: 'Can I buyout the furniture or appliance if I want to keep it permanently?',
      a: 'Yes, our Rent-to-Own program allows you to purchase any active rental at fair salvage value. We deduct a substantial portion of your paid monthly rents toward the purchase price.',
    },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">
            Get in Touch
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight mb-4">
            We're Here to Help You Furnish Smarter
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Have questions about custom corporate packages, delivery timelines, or tenure extensions? Reach out to our dedicated concierge team.
          </p>
        </div>

        {/* Content Grid: Form (7 cols) + Contact Info (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 font-heading mb-6 pb-2 border-b border-slate-100 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-teal-600" /> Send us a Message
            </h2>

            {submitted && (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs mb-6 flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold">Message Dispatched Successfully!</p>
                  <p className="text-emerald-700 mt-0.5">
                    Our rental concierge team has received your inquiry and will follow up within 2 business hours.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="General Rental Inquiry">General Rental Inquiry</option>
                    <option value="Delivery Schedule Question">Delivery Schedule Question</option>
                    <option value="Corporate / Office Bulk Rental">Corporate / Office Bulk Rental</option>
                    <option value="Maintenance or Repair Request">Maintenance or Repair Request</option>
                    <option value="Relocation Request">Relocation Request</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  How can we help you? *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what items you're looking to rent, your preferred lease tenure, or delivery timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                Send Message <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-sm">
              <h3 className="text-base font-bold font-heading mb-6 pb-3 border-b border-slate-800">
                Direct Contact Channels
              </h3>

              <div className="space-y-6 text-xs text-slate-300">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                      Customer Hotline
                    </p>
                    <p className="text-slate-300 mt-0.5">+1 (800) 555-RENT (7368)</p>
                    <p className="text-slate-500 text-[10px] mt-0.5">Toll-free across North America</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                      Email Support
                    </p>
                    <p className="text-slate-300 mt-0.5">support@rentease.com</p>
                    <p className="text-slate-500 text-[10px] mt-0.5">Response within 2 business hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                      Operational Hours
                    </p>
                    <p className="text-slate-300 mt-0.5">Monday – Saturday: 9:00 AM – 8:00 PM PST</p>
                    <p className="text-slate-300">Sunday: 10:00 AM – 6:00 PM PST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                      Headquarters & Logistics Hub
                    </p>
                    <p className="text-slate-300 mt-0.5">
                      100 Silicon Way, Tech Tower, Suite 400<br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-teal-900/10 rounded-3xl border border-teal-500/20 text-xs text-slate-700">
              <p className="font-bold text-teal-900 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600" /> Need Enterprise or Bulk Rentals?
              </p>
              <p className="text-slate-600 leading-relaxed">
                Furnishing a corporate branch, co-working facility, or corporate housing development? Email our commercial team at <span className="font-semibold text-slate-900">business@rentease.com</span> for custom invoiced rates.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Everything you need to know about our rental process and policies
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-slate-900 text-sm hover:text-teal-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-teal-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
