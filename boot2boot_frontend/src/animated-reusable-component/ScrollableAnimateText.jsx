import React, { useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * ScrollableAnimateText - NR Text Reveal Component
 *
 * Inspired by Framer's NR — Text Reveal (by JUDE Neo-Retro library):
 * - Split by Characters, Words, or Lines (never breaks mid-word)
 * - 4 Entrance Effects: 'rise', 'fade', 'mask', 'blur'
 * - Trigger Modes: 'scroll' (scrubbed with scroll), 'inView' (on viewport entry), 'onLoad'
 * - Full accessibility: Screen readers announce complete text (aria-label), aria-hidden on split spans
 * - Full semantic tag control: h1, h2, h3, h4, p, span, div
 */
export default function ScrollableAnimateText({
  text = "",
  children,
  as: Tag = "h2",
  splitBy = "characters", // 'characters' | 'words' | 'lines'
  effect = "rise", // 'rise' | 'blur' | 'mask' | 'fade'
  mode = "inView", // 'inView' | 'scroll' | 'onLoad'
  duration = 0.85,
  stagger = 0.025,
  delay = 0,
  distance = "115%",
  ease = "power4.out",
  scrub = 1.0,
  start = "top 85%",
  end = "bottom 60%",
  replay = false,
  baseColor = "text-neutral-400/40",
  activeColor = "text-neutral-900",
  className = "",
  style = {},
  ...props
}) {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);

  // Extract raw text content
  const rawText = useMemo(() => {
    if (typeof text === "string" && text.length > 0) return text;
    if (typeof children === "string") return children;
    if (Array.isArray(children)) return children.join("");
    return "";
  }, [text, children]);

  // Split text into words and characters
  const splitStructure = useMemo(() => {
    if (!rawText) return [];

    if (splitBy === "lines") {
      return rawText.split("\n").map((line, lineIdx) => ({
        id: `line-${lineIdx}`,
        content: line,
        isLine: true,
      }));
    }

    // Split into words preserving whitespace
    const words = rawText.split(" ");
    return words.map((word, wordIdx) => {
      const chars = word.split("").map((char, charIdx) => ({
        id: `w${wordIdx}-c${charIdx}`,
        char,
      }));
      return {
        id: `w-${wordIdx}`,
        word,
        chars,
        isLast: wordIdx === words.length - 1,
      };
    });
  }, [rawText, splitBy]);

  useGSAP(
    () => {
      const items = elementsRef.current.filter(Boolean);
      if (!items.length || !containerRef.current) return;

      // Respect prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(items, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          clipPath: "inset(0% 0% 0% 0%)",
        });
        return;
      }

      // 1. Initial State Configurations based on Effect
      const initialVars = {};
      const animatedVars = {
        duration,
        ease,
        stagger: mode === "scroll" ? undefined : (stagger ?? (splitBy === "characters" ? 0.02 : 0.04)),
      };

      switch (effect) {
        case "rise":
          initialVars.y = distance;
          initialVars.opacity = 0;
          animatedVars.y = 0;
          animatedVars.opacity = 1;
          break;
        case "fade":
          initialVars.opacity = 0;
          animatedVars.opacity = 1;
          break;
        case "mask":
          initialVars.y = distance;
          initialVars.clipPath = "inset(100% 0% 0% 0%)";
          animatedVars.y = 0;
          animatedVars.clipPath = "inset(0% 0% 0% 0%)";
          break;
        case "blur":
        default:
          initialVars.opacity = 0;
          initialVars.y = typeof distance === "number" ? distance : 24;
          initialVars.filter = "blur(12px)";
          animatedVars.opacity = 1;
          animatedVars.y = 0;
          animatedVars.filter = "blur(0px)";
          break;
      }

      // Set initial values
      gsap.set(items, initialVars);

      // 2. Trigger Modes
      if (mode === "scroll") {
        // Continuous Scroll Scrub Animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            end,
            scrub: scrub === true ? 1.0 : scrub,
            invalidateOnRefresh: true,
          },
        });

        tl.to(items, {
          ...animatedVars,
          stagger: {
            each: stagger || (splitBy === "characters" ? 0.02 : 0.04),
            from: "start",
          },
        });
      } else if (mode === "inView") {
        // Play when entering viewport
        ScrollTrigger.create({
          trigger: containerRef.current,
          start,
          once: !replay,
          onEnter: () => {
            gsap.to(items, {
              ...animatedVars,
              delay,
            });
          },
          onEnterBack: () => {
            if (replay) {
              gsap.to(items, {
                ...animatedVars,
                delay,
              });
            }
          },
          onLeaveBack: () => {
            if (replay) {
              gsap.set(items, initialVars);
            }
          },
        });
      } else {
        // onLoad Mode
        gsap.to(items, {
          ...animatedVars,
          delay,
        });
      }
    },
    {
      scope: containerRef,
      dependencies: [
        rawText,
        splitBy,
        effect,
        mode,
        duration,
        stagger,
        delay,
        distance,
        ease,
        replay,
      ],
    }
  );

  // Clear refs array on re-render
  elementsRef.current = [];

  return (
    <Tag
      ref={containerRef}
      className={`inline-block leading-tight select-none font-inherit ${className}`}
      style={style}
      aria-label={rawText}
      {...props}
    >
      {/* Semantic line splitting */}
      {splitBy === "lines" &&
        splitStructure.map((lineObj) => (
          <span
            key={lineObj.id}
            className="block overflow-hidden"
            aria-hidden="true"
          >
            <span
              ref={(el) => el && elementsRef.current.push(el)}
              className={`inline-block will-change-transform ${activeColor}`}
            >
              {lineObj.content}
            </span>
          </span>
        ))}

      {/* Semantic Word / Character splitting with dedicated overflow masks */}
      {splitBy !== "lines" &&
        splitStructure.map((wordObj) => (
          <span
            key={wordObj.id}
            className="inline-block whitespace-nowrap align-top mr-[0.28em] last:mr-0"
            aria-hidden="true"
          >
            {splitBy === "words" ? (
              <span className="inline-block overflow-hidden align-top">
                <span
                  ref={(el) => el && elementsRef.current.push(el)}
                  className={`inline-block will-change-transform ${activeColor}`}
                >
                  {wordObj.word}
                </span>
              </span>
            ) : (
              wordObj.chars.map((charObj) => (
                <span
                  key={charObj.id}
                  className="inline-block overflow-hidden align-top"
                >
                  <span
                    ref={(el) => el && elementsRef.current.push(el)}
                    className={`inline-block will-change-transform ${activeColor}`}
                  >
                    {charObj.char}
                  </span>
                </span>
              ))
            )}
          </span>
        ))}
    </Tag>
  );
}
