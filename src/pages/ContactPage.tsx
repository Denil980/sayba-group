import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ExternalLink, Briefcase, ArrowRight } from 'lucide-react';
import { ContactForm } from '../components/forms/ContactForm';
import { companyInfo } from '../data/company';

export const ContactPage: React.FC = () => {
  return (
    <div className="bg-brand-cream min-h-screen">
      {/* ========================================================
          HERO BANNER
          ======================================================== */}
      <section className="relative bg-[#0A1715] text-white pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=2000&q=85"
            alt="Sayba Contact"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1715] via-[#0A1715]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest">
              <Link to="/" className="hover:text-brand-gold transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-brand-gold">Contact Us</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
              Get in Touch
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 font-light max-w-2xl leading-relaxed">
              We're here to help you find your perfect home. Reach out to our property advisors for
              inquiries, brochures, or site visit scheduling.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          CAREERS LINK BANNER (SECTION 2 - GOLDEN CREAM THEME)
          ======================================================== */}
      <section className="pt-10 pb-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#FAF5EB] via-[#F4ECE0] to-[#FAF5EB] rounded-2xl p-6 sm:p-7 border border-[#DFCA95]/70 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 text-brand-dark">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white border border-[#DFCA95] flex items-center justify-center text-brand-gold-dark shrink-0 shadow-sm">
              <Briefcase className="w-7 h-7 text-brand-gold-dark" />
            </div>
            <div>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold-dark border border-brand-gold/30 text-[10px] font-bold uppercase tracking-wider mb-1">
                We're Hiring
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark">
                Looking to Build Your Career with Sayba Group?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
                Explore active openings across Sales, Civil Engineering, Architecture, and Customer Experience.
              </p>
            </div>
          </div>

          <Link
            to="/careers"
            className="shrink-0 px-6 py-3 rounded-full bg-[#0A1715] hover:bg-black text-brand-gold hover:text-white font-bold text-xs tracking-wider uppercase shadow-md hover:brightness-105 active:scale-95 transition-all inline-flex items-center gap-2 group cursor-pointer border border-brand-gold/40"
          >
            <span>View Open Positions & Apply</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ========================================================
          3-COLUMN CONTACT SECTION (INFO, FORM, MAP)
          ======================================================== */}
      <section className="pt-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Column 1: Contact Information (Span 4) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DFD1] shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold-dark block mb-1">
                Sayba Headquarters
              </span>
              <h2 className="font-serif text-2xl font-bold text-brand-dark">
                Contact Information
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Reach out to our executive desk or sales consultation team.
              </p>
            </div>

            <div className="space-y-5 pt-2">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-brand-cream border border-brand-gold/30 flex items-center justify-center text-brand-gold-dark shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                    Address
                  </h4>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    {companyInfo.fullOfficeAddress}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-brand-cream border border-brand-gold/30 flex items-center justify-center text-brand-gold-dark shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                    Phone
                  </h4>
                  <a
                    href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-xs font-semibold text-brand-dark hover:text-brand-gold-dark transition-colors block mt-0.5"
                  >
                    {companyInfo.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-brand-cream border border-brand-gold/30 flex items-center justify-center text-brand-gold-dark shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                    Email
                  </h4>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="text-xs font-semibold text-brand-dark hover:text-brand-gold-dark transition-colors block mt-0.5"
                  >
                    {companyInfo.email}
                  </a>
                  <a
                    href={`mailto:${companyInfo.salesEmail}`}
                    className="text-xs text-neutral-500 hover:text-brand-gold-dark transition-colors block"
                  >
                    Sales: {companyInfo.salesEmail}
                  </a>
                </div>
              </div>

              {/* Careers Email / Point */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-brand-cream border border-brand-gold/30 flex items-center justify-center text-brand-gold-dark shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                    Careers & Recruitment
                  </h4>
                  <Link
                    to="/careers"
                    className="text-xs font-semibold text-brand-gold-dark hover:underline block mt-0.5"
                  >
                    Visit Careers Portal →
                  </Link>
                  <a
                    href="mailto:careers@saybagroup.com"
                    className="text-xs text-neutral-500 hover:text-brand-dark transition-colors block"
                  >
                    careers@saybagroup.com
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-brand-cream border border-brand-gold/30 flex items-center justify-center text-brand-gold-dark shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                    Working Hours
                  </h4>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    {companyInfo.workingHours.weekdays}
                  </p>
                  <p className="text-xs text-neutral-500">{companyInfo.workingHours.sunday}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Send Us a Message Form (Span 5) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DFD1] shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-gold-dark block mb-1">
                Direct Inquiry
              </span>
              <h2 className="font-serif text-2xl font-bold text-brand-dark">
                Send Us a Message
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Please complete the form below and we will get back to you promptly.
              </p>
            </div>

            <ContactForm />
          </div>

          {/* Column 3: Office Location Map (Span 3) */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <div className="bg-white rounded-2xl overflow-hidden border border-[#E5DFD1] shadow-sm flex-1 flex flex-col relative min-h-[350px]">
              <iframe
                title="Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8358485293414!2d72.87635957597148!3d19.07095695213601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c89736c5615d%3A0xb35a51cf32490ec!2sKurla%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full flex-1 border-0 filter contrast-90"
                loading="lazy"
              />

              {/* Visit Our Office Badge (Matching design) */}
              <div className="p-4 bg-[#0A1715] text-white flex items-center justify-between border-t border-brand-gold/30">
                <div>
                  <h4 className="font-serif text-sm font-semibold text-brand-gold">
                    Visit Our Office
                  </h4>
                  <p className="text-[11px] text-neutral-300">Mumbai, Maharashtra</p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    companyInfo.fullOfficeAddress
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-brand-gold transition-colors"
                  aria-label="Open in Google Maps"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
