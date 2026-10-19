import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Boot2BootFooter from "../components/Boot2BootFooter";
import { usePageTransition } from "../components/PageTransition";
import WordReveal from "../animated-reusable-component/WordReveal";

export default function CareersPage() {
  const { isTransitioning } = usePageTransition();
  const subtextRef = useRef(null);
  const dotRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (isTransitioning) return;

    const ctx = gsap.context(() => {
      // Subtext fade in
      if (subtextRef.current) {
        gsap.fromTo(
          subtextRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: "power3.out" }
        );
      }

      // Pulsing accent dot
      if (dotRef.current) {
        gsap.fromTo(
          dotRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, delay: 0.9, ease: "back.out(2)" }
        );
        gsap.to(dotRef.current, {
          scale: 1.3,
          opacity: 0.6,
          duration: 1.5,
          delay: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Subtle background grid fade in
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current,
          { opacity: 0 },
          { opacity: 0.4, duration: 1.5, delay: 0.3, ease: "power2.out" }
        );
      }
    });

    return () => ctx.revert();
  }, [isTransitioning]);

  return (
    <div className="h-[230vh] bg-[#f7f7f8] text-neutral-900 font-parkinsans flex flex-col">
      {/* Main Content — Vertically Centered */}
      <main className="flex-1 flex items-center justify-center relative overflow-hidden px-6">
        {/* Decorative Dot Grid Background */}
        <div
          ref={gridRef}
          className="absolute inset-0 opacity-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #d4d4d4 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Center Content */}
        <div className="relative z-10 text-center max-w-2xl mx-auto space-y-6">
          {/* Accent Dot */}
          <div className="flex justify-center mb-4">
            <span
              ref={dotRef}
              className="inline-block w-3 h-3 rounded-full bg-[#E0FE9B] opacity-0"
            />
          </div>

          {/* Main Heading */}
          <WordReveal
            text="Coming Soon"
            as="h1"
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium text-neutral-950 tracking-tight leading-none justify-center"
            useScrollTrigger={false}
            stagger={0.1}
            duration={1}
            delay={0.15}
          />

          {/* Subtext */}
          <p
            ref={subtextRef}
            className="text-base sm:text-lg text-neutral-500 max-w-md mx-auto leading-relaxed opacity-0"
          >
            We're building something exciting. Our careers page is on its way —
            stay tuned for opportunities to join the Boot2Boot team.
          </p>

          {/* Decorative Divider */}
          <div className="flex justify-center pt-4">
            <div className="w-16 h-[2px] bg-[#E0FE9B] rounded-full" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Boot2BootFooter text="BOOT2BOOT" />
    </div>
  );
}
