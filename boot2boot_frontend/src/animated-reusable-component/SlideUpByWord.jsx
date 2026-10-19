import React, { useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * SlideUpByWord
 * High-end word-by-word slide-up text reveal component.
 *
 * Features:
 * - Splits sentences into individual words with masked overflow wrappers.
 * - Smooth cubic bezier slide-up with subtle motion blur.
 * - Automatic ScrollTrigger viewport detection (or trigger on mount).
 * - Full accessibility: screen readers read the full text seamlessly.
 * - Customizable semantic HTML element (h1, h2, h3, h4, p, span, div).
 */
const SlideUpByWord = ({
  children,
  text = "",
  as: Component = "p",
  className = "",
  duration = 0.75,
  stagger = 0.045,
  delay = 0,
  ease = "power3.out",
  blur = true,
  triggerOnScroll = true,
  scrollStart = "top 85%",
  once = true,
  style = {},
  ...props
}) => {
  const containerRef = useRef(null);

  // Extract raw text from props
  const rawText = useMemo(() => {
    if (typeof text === "string" && text.length > 0) return text;
    if (typeof children === "string") return children;
    if (Array.isArray(children)) return children.join(" ");
    return "";
  }, [text, children]);

  // Split string into words while preserving spaces
  const words = useMemo(() => {
    if (!rawText) return [];
    return rawText.trim().split(/\s+/);
  }, [rawText]);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || words.length === 0) return;

      const wordElements = container.querySelectorAll(".slide-up-word");
      if (!wordElements.length) return;

      // Set initial hidden position
      gsap.set(wordElements, {
        yPercent: 115,
        opacity: 0,
        filter: blur ? "blur(8px)" : "none",
      });

      const animConfig = {
        yPercent: 0,
        opacity: 1,
        filter: blur ? "blur(0px)" : "none",
        duration,
        stagger,
        delay,
        ease,
      };

      if (triggerOnScroll) {
        gsap.to(wordElements, {
          ...animConfig,
          scrollTrigger: {
            trigger: container,
            start: scrollStart,
            once,
            invalidateOnRefresh: true,
          },
        });
      } else {
        gsap.to(wordElements, animConfig);
      }
    },
    { scope: containerRef, dependencies: [words, duration, stagger, delay, ease, blur, triggerOnScroll, scrollStart, once] }
  );

  return (
    <Component
      ref={containerRef}
      aria-label={rawText}
      className={`inline-block select-none ${className}`}
      style={style}
      {...props}
    >
      <span aria-hidden="true" className="inline flex-wrap">
        {words.map((word, idx) => (
          <span
            key={`${word}-${idx}`}
            className="inline-block overflow-hidden align-top mr-[0.28em] last:mr-0"
          >
            <span className="slide-up-word inline-block will-change-transform">
              {word}
            </span>
          </span>
        ))}
      </span>
    </Component>
  );
};

export default SlideUpByWord;
export { SlideUpByWord };
