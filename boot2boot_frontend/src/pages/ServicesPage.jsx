import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Boot2BootFooter from "../components/Boot2BootFooter";
import { usePageTransition } from "../components/PageTransition";
import CharacterReveal from "../animated-reusable-component/CharacterReveal";
import ShapeServicesSection from "../components/ServicesLayout/ShapeServicesSection";

export default function ServicesPage() {
  const dividerRef = useRef(null);
  const { isTransitioning } = usePageTransition();

  // GSAP Entrance Animation for Divider Line
  useEffect(() => {
    const divider = dividerRef.current;
    if (!divider) return;

    // While transition curtain covers the screen, keep divider in hidden state
    if (isTransitioning) {
      gsap.set(divider, {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "center center",
      });
      return;
    }

    const playDivider = () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.15 });

        gsap.set(divider, {
          scaleX: 0,
          opacity: 1,
          transformOrigin: "center center",
        });

        tl.to(divider, {
          scaleX: 1,
          duration: 1.0,
          ease: "power2.out",
        });
      });
      return ctx;
    };

    let ctx = null;
    let handleLoadStart = null;
    let safetyTimeout = null;

    if (typeof window !== "undefined" && window.__boot2boot_loaded) {
      ctx = playDivider();
    } else {
      gsap.set(divider, {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "center center",
      });

      handleLoadStart = () => {
        ctx = playDivider();
      };
      window.addEventListener("boot2boot:startHeroAnimation", handleLoadStart);

      safetyTimeout = setTimeout(() => {
        if (!ctx) ctx = playDivider();
      }, 2600);
    }

    return () => {
      if (ctx) ctx.revert();
      if (handleLoadStart) {
        window.removeEventListener("boot2boot:startHeroAnimation", handleLoadStart);
      }
      if (safetyTimeout) {
        clearTimeout(safetyTimeout);
      }
    };
  }, [isTransitioning]);

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-neutral-900 font-parkinsans">
      {/* Main Page Container */}
      <main className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 pt-20 sm:pt-24 md:pt-28 pb-20">
        {/* ========================================================================= */}
        {/* 1. Page Header with CharacterReveal Component (Identical to Blog)         */}
        {/* ========================================================================= */}
        <div className="mb-8 sm:mb-10 text-center" style={{ perspective: "1000px" }}>
          <CharacterReveal
            text="SERVICES"
            as="h1"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light inline-flex items-center justify-center px-3 tracking-tight text-neutral-950 uppercase leading-none"
            delay={0.08}
            stagger={0.08}
            duration={0.95}
          />

          {/* Thin Horizontal Divider Line */}
          <div
            ref={dividerRef}
            className="w-full h-[1px] bg-neutral-300 mt-3 sm:mt-4 origin-center scale-x-0 will-change-transform"
          />
        </div>

        {/* Full Shape-inspired Services Layout */}
        <ShapeServicesSection />
      </main>

      {/* Footer */}
      <div id="contact">
        <Boot2BootFooter text="BOOT2BOOT" />
      </div>
    </div>
  );
}



