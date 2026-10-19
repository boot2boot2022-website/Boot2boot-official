import React from 'react';

export default function CTAButton({
  text = 'Get Started',
  href = '#',
  onClick,
  variant = 'primary',
  className = '',
  icon = true,
}) {
  const baseClasses =
    'relative group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm tracking-tight transition-all duration-300 ease-out cursor-pointer select-none overflow-hidden';

  const variants = {
    primary:
      'bg-[#FFF0E6] hover:bg-[#FFE5D6] text-[#FF6A1C] hover:text-[#E85B0F] shadow-sm hover:shadow-md hover:shadow-[#FF6A1C]/20 hover:-translate-y-0.5 active:translate-y-0 border border-[#FF6A1C]/30 hover:border-[#FF6A1C]/60 font-semibold',
    light:
      'bg-[#FFF0E6] hover:bg-[#FFE5D6] text-[#FF6A1C] hover:text-[#E85B0F] shadow-sm hover:shadow-md hover:shadow-[#FF6A1C]/20 hover:-translate-y-0.5 active:translate-y-0 border border-[#FF6A1C]/30 hover:border-[#FF6A1C]/60 font-semibold',
    solid:
      'bg-[#FF6A1C] hover:bg-[#E85B0F] text-white shadow-md hover:shadow-lg hover:shadow-[#FF6A1C]/25 hover:-translate-y-0.5 active:translate-y-0 border border-[#FF6A1C]',
    dark:
      'bg-neutral-900 hover:bg-black text-white shadow-md hover:shadow-xl hover:shadow-black/15 hover:-translate-y-0.5 active:translate-y-0 border border-neutral-800',
    white:
      'bg-white hover:bg-neutral-50 text-[#FF6A1C] shadow-sm hover:shadow-md active:scale-95 border border-neutral-200',
    outline:
      'bg-transparent hover:bg-[#FFF0E6] text-[#FF6A1C] border border-[#FF6A1C] active:scale-95',
  };

  const Content = () => (
    <>
      {/* Subtle shine hover effect */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

      {/* Button Label */}
      <span className="relative z-10 font-semibold">{text}</span>

      {/* Animated Arrow Icon */}
      {icon && (
        <svg
          className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      )}
    </>
  );

  if (href && !onClick) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`}
      >
        <Content />
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`}
    >
      <Content />
    </button>
  );
}
