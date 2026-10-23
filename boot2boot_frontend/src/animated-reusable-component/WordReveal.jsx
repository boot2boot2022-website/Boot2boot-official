import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageTransition } from "../components/PageTransition";

gsap.registerPlugin(ScrollTrigger);

/**
 * WordReveal Component
 * 
 * Agency-grade word-by-word reveal component using GSAP and ScrollTrigger.
 * 
 * Features:
 *  - Splits any text or children into individual masked words.
 *  - Triggers kinetic 3D slide-up entrance when in viewport or when scrolled into view.
 *  - Synchronized with PageTransition lifecycle to avoid invisible text glitches on refresh or navigation.
 *  - Automatically reveals if element is already above the fold on initial load/refresh.
 *  - Accessibility-ready: full aria-label preserved for screen readers.
 */
export default function WordReveal({
  children,
  text = "",
  as: Component = "h2",
  className = "",
  duration = 0.85,
  stagger = 0.08,
  delay = 0,
  ease = "power3.out",
  rotateX = 40,
  blur = false,
  scrollStart = "top 95%",
  once = true,
  style = {},
  useScrollTrigger = true,
  splitBy = "auto", // "auto" | "words" | "letters" | "chars"
  ...props
}) {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);
  const { isTransitioning } = usePageTransition();

  // Reset ref collection before each render pass
  wordsRef.current = [];

  // Extract text
  const rawText =
    typeof text === "string" && text.length > 0
      ? text
      : typeof children === "string"
        ? children
        : Array.isArray(children)
          ? children.join(" ")
          : "";

  const words = useMemo(
    () => rawText.trim().split(/\s+/).filter(Boolean),
    [rawText]
  );

  // If splitBy is explicitly letters/chars or if auto and only 1 word with stagger, split by letters
  const isLetterSplit = useMemo(() => {
    if (splitBy === "letters" || splitBy === "chars") return true;
    if (splitBy === "words") return false;
    return words.length === 1 && stagger > 0;
  }, [splitBy, words.length, stagger]);

  useEffect(() => {
    const container = containerRef.current;
    const wordElements = wordsRef.current.filter(Boolean);

    if (!container || wordElements.length === 0) return;

    if (isTransitioning) {
      gsap.set(wordElements, {
        yPercent: 120,
        rotateX,
        opacity: 0,
        filter: blur ? "blur(6px)" : "none",
        transformOrigin: "50% 100%",
        force3D: true,
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Set initial hidden state
      gsap.set(wordElements, {
        yPercent: 120,
        rotateX,
        opacity: 0,
        filter: blur ? "blur(6px)" : "none",
        transformOrigin: "50% 100%",
        force3D: true,
      });

      // Check if container is already in viewport on load/refresh
      const rect = container.getBoundingClientRect();
      const inView =
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.95 &&
        rect.bottom >= 0;

      if (!useScrollTrigger || inView) {
        // Already in viewport: animate immediately without waiting for scroll events
        gsap.to(wordElements, {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration,
          stagger,
          delay,
          ease,
          clearProps: "transform,filter",
        });
      } else {
        // Below the fold: animate when scrolled into view
        gsap.to(wordElements, {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration,
          stagger,
          delay,
          ease,
          clearProps: "transform,filter",
          scrollTrigger: {
            trigger: container,
            start: scrollStart,
            once,
            invalidateOnRefresh: true,
          },
        });

        // Ensure ScrollTrigger accurately measures positions after layout
        ScrollTrigger.refresh();
      }
    }, container);

    return () => ctx.revert();
  }, [
    isTransitioning,
    rawText,
    duration,
    stagger,
    delay,
    ease,
    rotateX,
    blur,
    scrollStart,
    once,
    useScrollTrigger,
    isLetterSplit,
  ]);

  const isCentered = className.includes("justify-center") || className.includes("text-center");

  return (
    <Component
      ref={containerRef}
      aria-label={rawText}
      className={`inline-flex flex-wrap select-text ${className}`}
      style={{ perspective: "1000px", ...style }}
      {...props}
    >
      <span aria-hidden="true" className={`inline-flex flex-wrap select-text ${isCentered ? "justify-center w-full" : ""}`}>
        {isLetterSplit ? (
          words.map((word, wIdx) => (
            <span
              key={`word-${wIdx}`}
              className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0 align-top select-text"
            >
              {word.split("").map((char, cIdx) => (
                <span
                  key={`char-${cIdx}`}
                  className="inline-block overflow-hidden py-1 align-top select-text"
                >
                  <span
                    ref={(el) => {
                      if (el) wordsRef.current.push(el);
                    }}
                    className="inline-block will-change-transform select-text"
                  >
                    {char}
                  </span>
                </span>
              ))}
            </span>
          ))
        ) : (
          words.map((word, idx) => (
            <span
              key={`${word}-${idx}`}
              className="inline-block overflow-hidden py-1 mr-[0.25em] last:mr-0 align-top select-text"
            >
              <span
                ref={(el) => {
                  if (el) wordsRef.current[idx] = el;
                }}
                className="inline-block will-change-transform select-text"
              >
                {word}
              </span>
            </span>
          ))
        )}
      </span>
    </Component>
  );
}
