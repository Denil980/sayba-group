import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Send, Loader2, ChevronDown, Check } from 'lucide-react';
import { projectsData } from '../../data/projects';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[0-9+ -]{10,14}$/, 'Please enter a valid phone number'),
  project: z.string().min(1, 'Please select a project'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const projectOptions = [
    ...projectsData.map((project) => ({
      value: project.name,
      label: project.name,
      configuration: project.configuration,
      city: project.city,
    })),
    {
      value: 'General Inquiry',
      label: 'General Property Inquiry',
      configuration: 'All Developments & Advisory',
      city: 'Mumbai',
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      project: '',
    },
  });

  const selectedProject = watch('project');
  const currentSelected = projectOptions.find((p) => p.value === selectedProject);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log('Contact form submitted:', data);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-brand-cream-card border border-emerald-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="font-serif text-2xl text-brand-dark font-semibold">Message Received</h3>
        <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to Sayba Group. One of our dedicated property advisors will get in touch with you shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setIsSuccess(false);
            reset();
          }}
          className="text-xs uppercase font-semibold tracking-wider text-brand-gold-dark hover:underline"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
          Full Name <span className="text-brand-gold">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Rajesh Kumar"
          {...register('fullName')}
          className={`w-full bg-white border ${
            errors.fullName ? 'border-red-400' : 'border-neutral-200'
          } text-brand-dark text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors placeholder:text-neutral-400 shadow-sm`}
        />
        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
            Email Address <span className="text-brand-gold">*</span>
          </label>
          <input
            type="email"
            placeholder="rajesh@example.com"
            {...register('email')}
            className={`w-full bg-white border ${
              errors.email ? 'border-red-400' : 'border-neutral-200'
            } text-brand-dark text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors placeholder:text-neutral-400 shadow-sm`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
            Phone Number <span className="text-brand-gold">*</span>
          </label>
          <input
            type="tel"
            placeholder="+91 98765 43210"
            {...register('phone')}
            className={`w-full bg-white border ${
              errors.phone ? 'border-red-400' : 'border-neutral-200'
            } text-brand-dark text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors placeholder:text-neutral-400 shadow-sm`}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Project Interested In - Premium Custom Dropdown */}
      <div>
        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
          Project Interested In <span className="text-brand-gold">*</span>
        </label>
        <div ref={dropdownRef} className="relative">
          <input type="hidden" {...register('project')} />
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className={`w-full bg-white border ${
              errors.project
                ? 'border-red-400'
                : isDropdownOpen
                ? 'border-brand-gold ring-2 ring-brand-gold/15'
                : 'border-neutral-200 hover:border-brand-gold/60'
            } text-brand-dark text-sm rounded-lg px-4 py-3 flex items-center justify-between transition-all duration-200 shadow-sm cursor-pointer select-none text-left`}
          >
            {currentSelected ? (
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="font-semibold text-brand-dark truncate">
                  {currentSelected.label}
                </span>
                <span className="text-neutral-400 text-xs hidden sm:inline truncate">
                  — {currentSelected.configuration} ({currentSelected.city})
                </span>
              </div>
            ) : (
              <span className="text-neutral-400 text-sm font-normal">
                Select
              </span>
            )}
            <ChevronDown
              className={`w-4 h-4 text-brand-gold shrink-0 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.99 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white border border-[#E5DFD1] rounded-xl shadow-2xl overflow-hidden py-1.5 max-h-64 overflow-y-auto"
              >
                {projectOptions.map((opt) => {
                  const isSelected = opt.value === selectedProject;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setValue('project', opt.value, { shouldValidate: true });
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-[#FAF7F2] transition-colors cursor-pointer group ${
                        isSelected
                          ? 'bg-brand-cream/80 border-l-4 border-brand-gold'
                          : 'border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex flex-col pr-2">
                        <span
                          className={`text-sm ${
                            isSelected
                              ? 'font-bold text-brand-gold-dark'
                              : 'font-medium text-brand-dark group-hover:text-brand-gold-dark'
                          } transition-colors`}
                        >
                          {opt.label}
                        </span>
                        <span className="text-[11px] text-neutral-500">
                          {opt.configuration} • {opt.city}
                        </span>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-brand-gold shrink-0" />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {errors.project && (
          <p className="text-xs text-red-500 mt-1">{errors.project.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
          Your Message <span className="text-brand-gold">*</span>
        </label>
        <textarea
          rows={4}
          placeholder="I would like to inquire regarding pricing, payment plans, and floor availability..."
          {...register('message')}
          className={`w-full bg-white border ${
            errors.message ? 'border-red-400' : 'border-neutral-200'
          } text-brand-dark text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-brand-gold transition-colors placeholder:text-neutral-400 shadow-sm resize-none`}
        />
        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-lg bg-brand-dark hover:bg-brand-dark-surface text-brand-gold-light border border-brand-gold/40 font-medium text-sm tracking-wide shadow hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <Send className="w-4 h-4 text-brand-gold" />
          </>
        )}
      </button>
    </form>
  );
};
