import React from 'react';
import { Link } from 'react-router-dom';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Top Dark Banner for seamless navbar backdrop */}
      <div className="bg-[#141515] pt-28 sm:pt-36 pb-12 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase font-bold tracking-widest text-[#80B3AD]">
            Legal Documentation
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2">
            {title}
          </h1>
          <p className="text-xs text-neutral-400 mt-2">
            Effective Date: January 1, 2024 | Sayba Group Real Estate Developers
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#DCE1DF] shadow-sm space-y-6">
          <div className="border-b border-neutral-100 pb-4">
            <h2 className="font-serif text-2xl font-bold text-brand-dark">
              {title} Agreement
            </h2>
          </div>

          <div className="text-sm text-neutral-700 space-y-4 leading-relaxed">
            <p>
              Welcome to Sayba Group. We are committed to maintaining the utmost confidentiality,
              integrity, and security of any personal details provided by our prospective buyers,
              homeowners, and website visitors.
            </p>

            <h2 className="font-serif text-xl font-bold text-brand-dark pt-2">
              1. Information Collection & Usage
            </h2>
            <p>
              When you submit a site visit inquiry or contact request through our portal, we collect
              pertinent contact details including your full name, phone number, and email address
              strictly to schedule visits, provide project floor plans, and share price updates.
            </p>

            <h2 className="font-serif text-xl font-bold text-brand-dark pt-2">
              2. Real Estate Regulatory Authority (RERA) Compliance
            </h2>
            <p>
              All promotional information, architectural renderings, floor layouts, and approximate
              carpet areas depicted on this website are compliant with MahaRERA guidelines. Individual
              RERA registration numbers for each ongoing tower are available on the project detail
              sections.
            </p>

            <h2 className="font-serif text-xl font-bold text-brand-dark pt-2">
              3. Data Protection
            </h2>
            <p>
              We do not sell, rent, or lease customer data to third-party marketing vendors. Your data
              is solely accessible to certified Sayba Group relationship executives and our
              accredited financing partners upon your explicit request.
            </p>
          </div>

          <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
            <Link
              to="/"
              className="text-xs uppercase font-bold tracking-wider text-[#80B3AD] hover:underline"
            >
              ← Return to Home
            </Link>
            <Link
              to="/contact"
              className="text-xs uppercase font-bold tracking-wider text-[#80B3AD] hover:underline"
            >
              Contact Support →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
