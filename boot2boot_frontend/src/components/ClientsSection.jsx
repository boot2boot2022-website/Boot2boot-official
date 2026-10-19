import React from "react";
import { COMPANY_LOGOS } from "../assets/company-logo";
import WordReveal from "../animated-reusable-component/WordReveal";

export default function ClientsSection() {
  const duplicatedLogos = [...COMPANY_LOGOS, ...COMPANY_LOGOS];

  return (
    <section id="brands" className="relative z-30 w-full bg-[#f7f7f8] pt-4 sm:pt-6 pb-16 sm:pb-25 px-4 sm:px-8 overflow-hidden font-parkinsans">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-14 space-y-2 w-full">
          <WordReveal
            text="Top Brands"
            as="h2"
            className="w-full justify-center text-center text-2xl sm:text-4xl md:text-5xl font-medium text-neutral-900 tracking-tight leading-tight"
            scrollStart="top 90%"
            stagger={0.08}
            duration={0.85}
          />
          <WordReveal
            text="Empowering visionary brands to scale, innovate, and lead the market."
            as="p"
            className="w-full justify-center text-center text-sm sm:text-base text-neutral-500 max-w-lg mx-auto leading-relaxed"
            scrollStart="top 90%"
            stagger={0.04}
            delay={0.12}
            duration={0.75}
          />
        </div>

        {/* Infinite Logo Marquee with Larger Logos */}
        <div className="relative w-full overflow-hidden mask-gradient">
          {/* Edge Vignette Fades */}
          <div className="absolute left-0 inset-y-0 w-20 sm:w-36 bg-gradient-to-r from-[#f7f7f8] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-20 sm:w-36 bg-gradient-to-l from-[#f7f7f8] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track */}
          <div className="flex gap-16 sm:gap-24 w-max animate-marquee hover:[animation-play-state:paused] items-center py-6">
            {duplicatedLogos.map((logo, idx) => (
              <img
                key={`${logo.id}-${idx}`}
                src={logo.src}
                alt={logo.name}
                className="max-h-20 sm:max-h-24 md:max-h-28 max-w-[240px] sm:max-w-[300px] w-auto h-auto object-contain opacity-85 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer shrink-0"
                loading="lazy"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
