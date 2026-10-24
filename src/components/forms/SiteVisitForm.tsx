import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Calendar,
  User,
  Phone,
  Mail,
  MessageSquare,
  Loader2,
  ChevronDown,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { projectsData } from '../../data/projects';

const siteVisitSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  phone: z.string().regex(/^[0-9+ -]{10,14}$/, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  preferredDate: z.string().min(1, 'Please select your preferred visit date'),
  project: z.string().optional(),
  message: z.string().optional(),
});

type SiteVisitFormData = z.infer<typeof siteVisitSchema>;

interface SiteVisitFormProps {
  initialProject?: string;
  onSuccess?: () => void;
  className?: string;
  compact?: boolean;
}

export const SiteVisitForm: React.FC<SiteVisitFormProps> = ({
  initialProject,
  onSuccess,
  className = '',
  compact = false,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const projectDropdownRef = useRef<HTMLDivElement>(null);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SiteVisitFormData>({
    resolver: zodResolver(siteVisitSchema),
    defaultValues: {
      project: initialProject || '',
      preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    },
  });

  const currentProject = watch('project') || initialProject || '';
  const selectedDate =
    watch('preferredDate') || new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [calendarViewDate, setCalendarViewDate] = useState(() => {
    const tomorrow = new Date(Date.now() + 86400000);
    return new Date(tomorrow.getFullYear(), tomorrow.getMonth(), 1);
  });

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return 'Select Date';
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handlePrevMonth = () => {
    setCalendarViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const calendarYear = calendarViewDate.getFullYear();
  const calendarMonth = calendarViewDate.getMonth();
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calendarYear, calendarMonth, 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        projectDropdownRef.current &&
        !projectDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProjectDropdownOpen(false);
      }
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsDatePickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSubmit = async (data: SiteVisitFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.log('Site Visit Request Submitted:', data);
    setIsSubmitted(true);
    if (onSuccess) {
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white border border-emerald-200 rounded-2xl p-6 text-center text-brand-dark space-y-3 shadow-sm">
        <div className="w-14 h-14 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h4 className="font-serif text-2xl text-brand-dark font-bold">Site Visit Scheduled!</h4>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-sm mx-auto">
          Thank you! Our relationship manager will contact you within 2 business hours with confirmation details.
        </p>
        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            reset();
          }}
          className="inline-block mt-1 text-xs font-semibold tracking-wider uppercase text-[#80B3AD] hover:underline cursor-pointer"
        >
          Book Another Visit
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-3 ${className}`}>
      {/* Full Name */}
      <div>
        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
          Full Name <span className="text-[#80B3AD]">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="John Doe"
            {...register('fullName')}
            className={`w-full bg-white border ${
              errors.fullName ? 'border-red-400' : 'border-neutral-200'
            } text-brand-dark text-xs sm:text-sm rounded-lg px-3.5 py-2 sm:py-2.5 focus:outline-none focus:border-[#80B3AD] transition-colors placeholder:text-neutral-400 shadow-sm`}
          />
          <User className="w-4 h-4 text-neutral-400 absolute right-3.5 top-2.5 sm:top-3" />
        </div>
        {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
          Phone Number <span className="text-[#80B3AD]">*</span>
        </label>
        <div className="relative">
          <input
            type="tel"
            placeholder="+91 98765 43210"
            {...register('phone')}
            className={`w-full bg-white border ${
              errors.phone ? 'border-red-400' : 'border-neutral-200'
            } text-brand-dark text-xs sm:text-sm rounded-lg px-3.5 py-2 sm:py-2.5 focus:outline-none focus:border-[#80B3AD] transition-colors placeholder:text-neutral-400 shadow-sm`}
          />
          <Phone className="w-4 h-4 text-neutral-400 absolute right-3.5 top-2.5 sm:top-3" />
        </div>
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
      </div>

      {/* Email Address */}
      <div>
        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
          Email Address <span className="text-[#80B3AD]">*</span>
        </label>
        <div className="relative">
          <input
            type="email"
            placeholder="john@example.com"
            {...register('email')}
            className={`w-full bg-white border ${
              errors.email ? 'border-red-400' : 'border-neutral-200'
            } text-brand-dark text-xs sm:text-sm rounded-lg px-3.5 py-2 sm:py-2.5 focus:outline-none focus:border-[#80B3AD] transition-colors placeholder:text-neutral-400 shadow-sm`}
          />
          <Mail className="w-4 h-4 text-neutral-400 absolute right-3.5 top-2.5 sm:top-3" />
        </div>
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      {/* Project Selector (if not compact or preset) */}
      {!initialProject && (
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
            Interested Project
          </label>
          <div ref={projectDropdownRef} className="relative">
            <input type="hidden" {...register('project')} />
            <button
              type="button"
              onClick={() => setIsProjectDropdownOpen((prev) => !prev)}
              className={`w-full bg-white border ${
                isProjectDropdownOpen
                  ? 'border-[#80B3AD] ring-1 ring-[#80B3AD]/25'
                  : 'border-neutral-200 hover:border-[#80B3AD]/60'
              } text-brand-dark text-xs sm:text-sm rounded-lg px-3.5 py-2 sm:py-2.5 flex items-center justify-between transition-colors shadow-sm cursor-pointer select-none text-left`}
            >
              {currentProject ? (
                <span className="truncate font-semibold text-brand-dark">{currentProject}</span>
              ) : (
                <span className="text-neutral-400 text-xs sm:text-sm font-normal">Select</span>
              )}
              <ChevronDown
                className={`w-4 h-4 text-[#80B3AD] shrink-0 transition-transform duration-200 ${
                  isProjectDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {isProjectDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.99 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white border border-[#DCE1DF] rounded-xl shadow-2xl overflow-hidden py-1.5 max-h-48 overflow-y-auto"
                >
                  {projectsData.map((p) => {
                    const isSelected = p.name === currentProject;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setValue('project', p.name);
                          setIsProjectDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-[#EFF3F2] transition-colors cursor-pointer group ${
                          isSelected
                            ? 'bg-[#EFF3F2] border-l-2 border-[#80B3AD] text-brand-dark'
                            : 'text-neutral-700 border-l-2 border-transparent'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs sm:text-sm font-semibold text-brand-dark group-hover:text-[#80B3AD] transition-colors">
                            {p.name}
                          </span>
                          <span className="text-[10px] text-neutral-500">
                            {p.configuration} • {p.city}
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
      )}

      {/* Preferred Date - Custom Luxury DatePicker */}
      <div>
        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
          Preferred Date <span className="text-[#80B3AD]">*</span>
        </label>
        <div ref={datePickerRef} className="relative">
          <input type="hidden" {...register('preferredDate')} />
          <button
            type="button"
            onClick={() => setIsDatePickerOpen((prev) => !prev)}
            className={`w-full bg-white border ${
              errors.preferredDate
                ? 'border-red-400'
                : isDatePickerOpen
                ? 'border-[#80B3AD] ring-1 ring-[#80B3AD]/25'
                : 'border-neutral-200 hover:border-[#80B3AD]/60'
            } text-brand-dark text-xs sm:text-sm rounded-lg px-3.5 py-2 sm:py-2.5 flex items-center justify-between transition-colors shadow-sm cursor-pointer select-none text-left`}
          >
            <span className="font-semibold text-brand-dark">
              {formatDisplayDate(selectedDate)}
            </span>
            <Calendar className="w-4 h-4 text-[#80B3AD] shrink-0" />
          </button>

          <AnimatePresence>
            {isDatePickerOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.99 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute left-0 right-0 sm:left-auto sm:right-0 sm:w-72 top-full mt-1.5 z-50 bg-white border border-[#DCE1DF] rounded-2xl shadow-2xl p-3.5 text-brand-dark"
              >
                {/* Month & Year Navigation */}
                <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-neutral-100">
                  <span className="font-serif font-bold text-sm text-brand-dark">
                    {monthNames[calendarMonth]} {calendarYear}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      className="p-1 rounded-full hover:bg-[#EFF3F2] text-neutral-600 hover:text-brand-dark transition-colors cursor-pointer"
                      aria-label="Previous Month"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="p-1 rounded-full hover:bg-[#EFF3F2] text-neutral-600 hover:text-brand-dark transition-colors cursor-pointer"
                      aria-label="Next Month"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Day of Week Labels */}
                <div className="grid grid-cols-7 gap-1 text-center mb-1">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                    <span key={d} className="text-[10px] font-bold text-neutral-400 uppercase py-0.5">
                      {d}
                    </span>
                  ))}
                </div>

                {/* Calendar Days Grid */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {/* Empty leading padding slots */}
                  {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} className="w-7 h-7 sm:w-8 sm:h-8" />
                  ))}

                  {/* Days */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateObj = new Date(calendarYear, calendarMonth, day);
                    const isPast = dateObj < today;
                    const dateIso = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const isSelected = dateIso === selectedDate;
                    const isCurrentDay = dateIso === todayStr;

                    return (
                      <button
                        key={day}
                        type="button"
                        disabled={isPast}
                        onClick={() => {
                          setValue('preferredDate', dateIso, { shouldValidate: true });
                          setIsDatePickerOpen(false);
                        }}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-medium flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-[#80B3AD] text-[#141515] font-bold shadow-sm'
                            : isPast
                            ? 'text-neutral-300 cursor-not-allowed opacity-40'
                            : isCurrentDay
                            ? 'border border-[#80B3AD] text-[#80B3AD] font-semibold hover:bg-[#EFF3F2]'
                            : 'text-brand-dark hover:bg-[#EFF3F2] hover:text-[#80B3AD] cursor-pointer'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {/* Quick Selection Shortcuts */}
                <div className="pt-2.5 mt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setValue('preferredDate', todayStr, { shouldValidate: true });
                      setCalendarViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
                      setIsDatePickerOpen(false);
                    }}
                    className="font-semibold text-neutral-600 hover:text-brand-dark hover:underline cursor-pointer"
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setValue('preferredDate', tomorrowStr, { shouldValidate: true });
                      setCalendarViewDate(new Date(tomorrow.getFullYear(), tomorrow.getMonth(), 1));
                      setIsDatePickerOpen(false);
                    }}
                    className="font-bold text-[#80B3AD] hover:underline cursor-pointer"
                  >
                    Tomorrow
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {errors.preferredDate && (
          <p className="text-xs text-red-500 mt-1">{errors.preferredDate.message}</p>
        )}
      </div>

      {/* Message (Optional) */}
      {!compact && (
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
            Message (Optional)
          </label>
          <div className="relative">
            <textarea
              rows={2}
              placeholder="Any specific questions or preferred time slot..."
              {...register('message')}
              className="w-full bg-white border border-neutral-200 text-brand-dark text-xs sm:text-sm rounded-lg px-3.5 py-2 focus:outline-none focus:border-[#80B3AD] transition-colors placeholder:text-neutral-400 shadow-sm resize-none"
            />
            <MessageSquare className="w-4 h-4 text-neutral-400 absolute right-3.5 top-2.5" />
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 rounded-lg bg-[#80B3AD] hover:bg-[#609A93] active:scale-95 text-[#141515] font-bold text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-1 cursor-pointer disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-[#141515]" />
            <span>Scheduling...</span>
          </>
        ) : (
          <span>Submit Request</span>
        )}
      </button>

      <p className="text-[11px] text-center text-neutral-500 pt-0.5">
        By submitting, you agree to receive updates via Call / WhatsApp.
      </p>
    </form>
  );
};
