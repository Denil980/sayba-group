import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Trophy,
  ShieldCheck,
  TrendingUp,
  Users,
  Send,
  Loader2,
  FileText,
  Upload,
  X,
  ChevronDown,
  Check,
} from 'lucide-react';
import { jobOpenings, careerPerks } from '../data/careers';

export const CareersPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isJobDropdownOpen, setIsJobDropdownOpen] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const jobDropdownRef = useRef<HTMLDivElement>(null);

  const currentJob = jobOpenings.find((j) => j.id === selectedJob);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        jobDropdownRef.current &&
        !jobDropdownRef.current.contains(event.target as Node)
      ) {
        setIsJobDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) {
      setFormError('Please select a position to apply for.');
      return;
    }
    if (!cvFile) {
      setFormError('Please upload your CV before submitting.');
      return;
    }
    setFormError(null);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setCvFile(null);
      setSelectedJob(null);
    }, 800);
  };

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* ========================================================
          HERO BANNER
          ======================================================== */}
      <section className="relative bg-[#141515] text-white pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85"
            alt="Careers at Sayba Group"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141515] via-[#141515]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest">
              <Link to="/" className="hover:text-[#80B3AD] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to="/contact" className="hover:text-[#80B3AD] transition-colors">
                Contact Us
              </Link>
              <span>/</span>
              <span className="text-[#80B3AD]">Careers</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
              Careers at Sayba Group
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 font-light max-w-2xl leading-relaxed">
              Shape the skyline of Mumbai with a team that values innovation, integrity, and career
              growth. Discover our current openings below.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          WHY JOIN SAYBA GROUP (PERKS)
          ======================================================== */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#80B3AD] block mb-2">
            WHY JOIN US
          </span>
          <h2 className="font-serif text-3xl font-bold text-brand-dark">
            Build Your Career with an Industry Benchmark
          </h2>
          <div className="w-16 h-0.5 bg-[#80B3AD] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {careerPerks.map((perk, idx) => {
            const icons = [Trophy, ShieldCheck, TrendingUp, Users];
            const Icon = icons[idx];
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-[#DCE1DF] hover:border-[#80B3AD] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center overflow-hidden cursor-pointer"
              >
                {/* Subtle top teal accent bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#80B3AD] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-14 h-14 rounded-full bg-brand-cream border border-[#80B3AD]/30 flex items-center justify-center text-[#80B3AD] mb-4 group-hover:bg-[#141515] group-hover:text-[#80B3AD] group-hover:border-[#80B3AD] group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-md transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-dark group-hover:text-[#80B3AD] transition-colors duration-300 mb-2">
                  {perk.title}
                </h3>
                <p className="text-xs text-neutral-600 group-hover:text-neutral-700 leading-relaxed transition-colors">
                  {perk.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          OPEN POSITIONS
          ======================================================== */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#DCE1DF]">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#80B3AD] block mb-1">
              CURRENT OPPORTUNITIES
            </span>
            <h2 className="font-serif text-3xl font-bold text-brand-dark">
              Explore Open Positions
            </h2>
          </div>
          <span className="text-xs text-neutral-500 mt-2 sm:mt-0 font-medium">
            Showing {jobOpenings.length} Active Positions
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Job List (Span 7) */}
          <div className="lg:col-span-7 space-y-4">
            {jobOpenings.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer bg-white ${
                  selectedJob === job.id
                    ? 'border-[#80B3AD] shadow-md ring-1 ring-[#80B3AD]'
                    : 'border-[#DCE1DF] shadow-sm hover:border-neutral-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="font-serif text-xl font-bold text-brand-dark">{job.title}</h3>
                  <span className="px-3 py-1 text-[11px] font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 w-fit">
                    {job.type}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 mb-3">
                  <span className="font-medium text-[#80B3AD]">{job.department}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {job.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {job.experience}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed mb-4">{job.description}</p>

                <div className="flex items-center justify-between text-xs pt-3 border-t border-neutral-100">
                  <span className="text-neutral-500 font-medium">Click to apply & view details</span>
                  <span className="font-bold text-[#80B3AD] flex items-center gap-1">
                    Apply Now <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Application Form (Span 5) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-[#F7FAFA] rounded-3xl p-6 sm:p-8 border border-[#DCE1DF] shadow-xl space-y-5 text-brand-dark">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#80B3AD] block mb-1">
                  Careers Portal
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-dark">
                  Submit Your Resume
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Send us your credentials. We review applications within 48 hours.
                </p>
              </div>

              {submitted ? (
                <div className="bg-white border border-emerald-200 rounded-2xl p-6 text-center space-y-3 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 mx-auto flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-brand-dark">
                    Application Sent!
                  </h4>
                  <p className="text-xs text-neutral-600">
                    Thank you for your interest. Our HR team will reach out if your profile matches the role requirements.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#80B3AD] underline uppercase font-semibold cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-[#80B3AD]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Rao"
                      className="w-full bg-white border border-neutral-200 text-brand-dark text-xs rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#80B3AD] placeholder:text-neutral-400 shadow-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-[#80B3AD]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ananya@example.com"
                      className="w-full bg-white border border-neutral-200 text-brand-dark text-xs rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#80B3AD] placeholder:text-neutral-400 shadow-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Phone Number <span className="text-[#80B3AD]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full bg-white border border-neutral-200 text-brand-dark text-xs rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#80B3AD] placeholder:text-neutral-400 shadow-sm transition-colors"
                    />
                  </div>

                  {/* Position Applied For - Custom Luxury Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Position Applied For <span className="text-[#80B3AD]">*</span>
                    </label>
                    <div ref={jobDropdownRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setIsJobDropdownOpen((prev) => !prev)}
                        className={`w-full bg-white border ${
                          isJobDropdownOpen
                            ? 'border-[#80B3AD] ring-1 ring-[#80B3AD]/30'
                            : 'border-neutral-200 hover:border-[#80B3AD]/60'
                        } text-brand-dark text-xs rounded-lg px-3.5 py-2.5 flex items-center justify-between transition-colors shadow-sm cursor-pointer select-none text-left`}
                      >
                        {currentJob ? (
                          <div className="flex items-center gap-1.5 overflow-hidden">
                            <span className="font-semibold text-brand-dark truncate">
                              {currentJob.title}
                            </span>
                            <span className="text-neutral-500 text-[11px] hidden sm:inline truncate">
                              ({currentJob.department})
                            </span>
                          </div>
                        ) : (
                          <span className="text-neutral-400 text-xs font-normal">Select</span>
                        )}
                        <ChevronDown
                          className={`w-4 h-4 text-[#80B3AD] shrink-0 transition-transform duration-200 ${
                            isJobDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isJobDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -4, scale: 0.99 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -4, scale: 0.99 }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white border border-[#DCE1DF] rounded-xl shadow-2xl overflow-hidden py-1.5 max-h-56 overflow-y-auto"
                          >
                            {jobOpenings.map((j) => {
                              const isSelected = j.id === selectedJob;
                              return (
                                <button
                                  key={j.id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedJob(j.id);
                                    setIsJobDropdownOpen(false);
                                    setFormError(null);
                                  }}
                                  className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between hover:bg-[#EFF3F2] transition-colors cursor-pointer group ${
                                    isSelected
                                      ? 'bg-[#EFF3F2] border-l-2 border-[#80B3AD] text-brand-dark'
                                      : 'border-l-2 border-transparent text-neutral-700'
                                  }`}
                                >
                                  <div className="flex flex-col pr-2">
                                    <span className="text-xs font-semibold text-brand-dark group-hover:text-[#80B3AD] transition-colors">
                                      {j.title}
                                    </span>
                                    <span className="text-[10px] text-neutral-500">
                                      {j.department} • {j.location}
                                    </span>
                                  </div>
                                  {isSelected && (
                                    <Check className="w-3.5 h-3.5 text-[#80B3AD] shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Upload your CV * */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Upload your CV <span className="text-[#80B3AD]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="cv-upload-input"
                        required
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setCvFile(e.target.files[0]);
                            setFormError(null);
                          }
                        }}
                        className="sr-only"
                      />
                      {cvFile ? (
                        <div className="w-full bg-white border border-[#80B3AD]/60 rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-3 text-xs shadow-sm">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <FileText className="w-4 h-4 text-[#80B3AD] shrink-0" />
                            <span className="text-brand-dark font-medium truncate max-w-[200px]">
                              {cvFile.name}
                            </span>
                            <span className="text-neutral-500 text-[10px] shrink-0">
                              ({(cvFile.size / (1024 * 1024)).toFixed(1)} MB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setCvFile(null)}
                            className="p-1 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                            aria-label="Remove CV"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="cv-upload-input"
                          className="w-full bg-white border border-dashed border-neutral-300 hover:border-[#80B3AD]/70 rounded-xl px-3.5 py-3 flex items-center justify-between gap-3 cursor-pointer transition-colors group shadow-sm"
                        >
                          <div className="flex items-center gap-2.5">
                            <Upload className="w-4 h-4 text-[#80B3AD] group-hover:scale-110 transition-transform" />
                            <span className="text-xs text-neutral-600 font-medium">
                              Choose file <span className="text-neutral-400 font-normal">(PDF, DOC, DOCX up to 10MB)</span>
                            </span>
                          </div>
                          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#80B3AD]/15 text-[#80B3AD] border border-[#80B3AD]/30 shrink-0">
                            Browse
                          </span>
                        </label>
                      )}
                    </div>
                  </div>

                  {formError && (
                    <p className="text-xs text-red-500 font-medium">{formError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-lg bg-[#80B3AD] hover:bg-[#609A93] active:scale-95 text-[#141515] font-bold text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#141515]" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send className="w-3.5 h-3.5 text-[#141515]" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
