import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: 1, name: "E-Commerce" },
  { id: 2, name: "Conversion Rate Optimization" },
  { id: 3, name: "Email Marketing" },
  { id: 4, name: "Web Development" },
  { id: 5, name: "Influencer Marketing" },
  { id: 6, name: "Performance Marketing" },
  { id: 7, name: "Search Engine Optimization" },
  { id: 8, name: "Social Media Marketing" },
];

const ChangingChangeOnScroll = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".service-btn-roll-item");
      const totalItems = items.length;

      // Set initial state for all items (first is centered, others below)
      items.forEach((item, i) => {
        gsap.set(item, {
          yPercent: i === 0 ? 0 : 100,
          opacity: i === 0 ? 1 : 0,
        });
      });

      // ScrollTrigger timeline that scrubs through services inside the button
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${totalItems * 90}%`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Chain the roll animations: item i rolls up (-100%) as item i+1 rolls in from bottom (100% -> 0%)
      for (let i = 0; i < totalItems - 1; i++) {
        const currentItem = items[i];
        const nextItem = items[i + 1];

        tl.to(
          currentItem,
          {
            yPercent: -100,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          i
        ).fromTo(
          nextItem,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          i
        );
      }

      ScrollTrigger.refresh();
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#f7f7f8] text-neutral-900 flex items-center justify-center overflow-hidden px-4"
    >
      {/* Smaller, compact button-like pill */}
      <div className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white border border-neutral-300/90 shadow-md shadow-neutral-900/5 hover:border-neutral-400 transition-all duration-300">
        {/* Masked Window for Scrolling Text */}
        <div className="relative h-5 sm:h-6 w-[160px] sm:w-[220px] md:w-[260px] overflow-hidden flex items-center justify-center">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-btn-roll-item absolute inset-0 flex items-center justify-center text-center will-change-transform"
            >
              <span className="text-xs sm:text-sm md:text-base font-semibold font-parkinsans text-neutral-900 whitespace-nowrap tracking-tight">
                {service.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChangingChangeOnScroll;