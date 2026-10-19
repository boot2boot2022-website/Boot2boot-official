import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePageTransition } from "../components/PageTransition";

/**
 * CharacterReveal Component
 * 
 * Animation Type: 3D Masked Character Reveal / Kinetic Typography Entrance
 * Technique:
 *  - Wraps each character in an overflow-hidden mask span.
 *  - Applies 3D perspective rotation (rotateX), upward spring translation (yPercent), and scale.
 *  - Coordinates with page transition lifecycle to ensure animation fires once page is fully revealed.
 */
export default function CharacterReveal({
  text = "",
  as: Component = "h1",
  className = "",
  delay = 0.08,
  duration = 0.85,
  stagger = 0.07,
  ease = "power3.out",
  rotateX = 45,
  onComplete,
}) {
  const lettersRef = useRef([]);
  const containerRef = useRef(null);
  const { isTransitioning } = usePageTransition();

  useEffect(() => {
    const letters = lettersRef.current.filter(Boolean);
    if (!letters.length) return;

    // While page is transitioning/covered, hold letters in hidden state
    if (isTransitioning) {
      gsap.set(letters, {
        yPercent: 120,
        rotateX,
        opacity: 0,
        transformOrigin: "50% 100%",
        force3D: true,
      });
      return;
    }

    const playEntrance = () => {
      const ctx = gsap.context(() => {
        gsap.set(letters, {
          yPercent: 120,
          rotateX,
          opacity: 0,
          transformOrigin: "50% 100%",
          force3D: true,
        });

        gsap.to(letters, {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration,
          ease,
          stagger,
          delay,
          clearProps: "transform",
          onComplete,
        });
      }, containerRef);
      return ctx;
    };

    let ctx = null;
    let handleLoadStart = null;
    let safetyTimeout = null;

    // If website has already done its initial load: play entrance directly
    if (typeof window !== "undefined" && window.__boot2boot_loaded) {
      ctx = playEntrance();
    } else {
      // Direct hard refresh / initial load: hold hidden until loading screen curtain sweeps
      gsap.set(letters, {
        yPercent: 120,
        rotateX,
        opacity: 0,
        transformOrigin: "50% 100%",
        force3D: true,
      });

      handleLoadStart = () => {
        ctx = playEntrance();
      };
      window.addEventListener("boot2boot:startHeroAnimation", handleLoadStart);

      // Fallback timer in case loading screen is bypassed
      safetyTimeout = setTimeout(() => {
        if (!ctx) ctx = playEntrance();
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
  }, [isTransitioning, delay, duration, stagger, ease, rotateX, onComplete]);

  const words = text.split(" ");
  let charCounter = 0;

  return (
    <Component
      ref={containerRef}
      className={`inline-flex flex-wrap items-center justify-center select-text ${className}`}
      style={{ perspective: "1000px" }}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-flex whitespace-nowrap">
          {word.split("").map((char, cIdx) => {
            const letterIdx = charCounter++;
            return (
              <span
                key={cIdx}
                className="inline-block overflow-hidden py-1 sm:py-2 px-[0.5px] sm:px-[1.5px]"
              >
                <span
                  ref={(el) => (lettersRef.current[letterIdx] = el)}
                  className="inline-block will-change-transform"
                >
                  {char}
                </span>
              </span>
            );
          })}
          {wIdx < words.length - 1 && (
            <span
              key={`space-${wIdx}`}
              className="inline-block overflow-hidden py-1 sm:py-2 px-[0.5px] sm:px-[1.5px]"
            >
              <span
                ref={(el) => {
                  const letterIdx = charCounter++;
                  lettersRef.current[letterIdx] = el;
                }}
                className="inline-block will-change-transform"
              >
                {"\u00A0"}
              </span>
            </span>
          )}
        </span>
      ))}
    </Component>
  );
}
