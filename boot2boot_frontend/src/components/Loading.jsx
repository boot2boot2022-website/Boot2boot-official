import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

/**
 * Loading Page Component - Minimalist Counter Only
 * Counts cleanly from 1 to 100, then smoothly reveals the page.
 */
export default function Loading({ onComplete, duration = 2.0 }) {
  const [count, setCount] = useState(1);
  const overlayRef = useRef(null);
  const counterRef = useRef(null);
  const isFinishedRef = useRef(false);

  useEffect(() => {
    // Reset global loaded flag while loading screen is active
    if (typeof window !== "undefined") {
      window.__boot2boot_loaded = false;
    }

    // 1. Lock scroll while loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 2. Animate counter from 1 to 100
    const counterObj = { value: 1 };

    const tl = gsap.timeline();

    tl.to(counterObj, {
      value: 100,
      duration: duration,
      ease: "power2.inOut",
      onUpdate: () => {
        setCount(Math.floor(counterObj.value));
      },
      onComplete: () => {
        if (isFinishedRef.current) return;
        isFinishedRef.current = true;
        setCount(100);

        // 3. Cinematic Exit Sequence
        const exitTl = gsap.timeline({
          delay: 0.15,
          onComplete: () => {
            document.body.style.overflow = originalOverflow;
            if (overlayRef.current) {
              overlayRef.current.style.display = "none";
            }
            if (onComplete) onComplete();
          },
        });

        // Counter slides slightly to the right and fades out
        exitTl.to(counterRef.current, {
          x: 40,
          opacity: 0,
          duration: 0.4,
          ease: "power3.in",
        });

        // Lime curtain sweeps smoothly from left to right off the screen
        exitTl.to(
          overlayRef.current,
          {
            xPercent: 100,
            duration: 0.85,
            ease: "expo.inOut",
            force3D: true,
          },
          "-=0.15"
        );

        // Fire hero 3D card animation right as the curtain begins opening
        exitTl.call(() => {
          window.__boot2boot_loaded = true;
          window.dispatchEvent(new CustomEvent("boot2boot:startHeroAnimation"));
        }, null, "-=0.8");
      },
    });

    return () => {
      tl.kill();
      document.body.style.overflow = originalOverflow;
      window.__boot2boot_loaded = true;
    };
  }, [duration, onComplete]);

  // Format with leading zero if single digit (01 - 09, 10 - 100)
  const formattedCount = count < 10 ? `0${count}` : `${count}`;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] w-full h-full bg-[#E0FE9B] flex flex-col justify-end items-start p-6 sm:p-10 md:p-14 lg:p-16 select-none overflow-hidden font-parkinsans"
      style={{ willChange: "transform" }}
    >
      {/* Subtle White Ambient Radial Glow anchored to bottom-left */}
      <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 w-[700px] h-[700px] bg-white/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Pure Counter at Bottom-Left Corner */}
      <div
        ref={counterRef}
        className="relative z-10 flex items-baseline justify-start font-medium tracking-tight text-black select-none"
      >
        <span className="text-5xl sm:text-5xl md:text-[6rem] lg:text-[8rem] leading-none text-black tabular-nums font-parkinsans">
          {formattedCount}
        </span>
        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-black ml-2 sm:ml-3 font-mono select-none">
          %
        </span>
      </div>
    </div>
  );
}
