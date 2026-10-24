import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  variant?: 'pill' | 'seamless' | 'plinth' | 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'plinth',
  className = '',
  size = 'md',
}) => {
  // Precise sizing configuration for the luxury plinth badge and logo image
  const sizeConfig = {
    sm: {
      badge: 'px-2.5 py-1 rounded-full',
      img: 'h-6 sm:h-7',
    },
    md: {
      badge: 'px-3.5 py-1.5 rounded-full',
      img: 'h-7 sm:h-8',
    },
    lg: {
      badge: 'px-5 py-2.5 rounded-2xl',
      img: 'h-9 sm:h-11',
    },
  }[size];

  // In 'seamless' mode (e.g. inside the pill navbar whose left side is already white/gold),
  // it uses a translucent frosted capsule that merges cleanly into the pill texture.
  // In 'plinth' mode (e.g. on dark footers or cards), it uses the opaque white/cream badge.
  const isSeamless = variant === 'seamless';
  const badgeStyle = isSeamless
    ? 'bg-white/90 hover:bg-white backdrop-blur-sm border border-black/10 ring-1 ring-white/80 shadow-sm hover:shadow-md'
    : 'bg-gradient-to-b from-white via-[#FCFBF8] to-[#FAF8F2] border border-[#DFC995]/70 ring-1 ring-[#DFC995]/20 shadow-[0_2px_12px_rgba(0,0,0,0.22)] group-hover:border-[#C5A467] group-hover:shadow-[0_4px_22px_rgba(223,201,149,0.38)]';

  return (
    <Link
      to="/"
      aria-label="Sayba Group - Home"
      className={`inline-flex items-center group focus:outline-none select-none ${className}`}
    >
      <div
        className={`relative inline-flex items-center justify-center transition-all duration-300 ease-out group-hover:scale-[1.02] ${badgeStyle} ${sizeConfig.badge}`}
      >
        <img
          src="/assets/sayba-logo-clean.png"
          srcSet="/assets/sayba-logo-clean.png 1x, /assets/sayba-logo-2x.png 2x"
          alt="Sayba Group"
          className={`${sizeConfig.img} w-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]`}
          loading="eager"
          decoding="async"
        />
      </div>
    </Link>
  );
};
