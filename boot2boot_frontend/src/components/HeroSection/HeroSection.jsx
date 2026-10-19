import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QuestSpiral from "./QuestSpiral";
import { usePageTransition } from "../PageTransition";

gsap.registerPlugin(ScrollTrigger);

const TAGLINE = "We Create Brands, Digital Experiences & Campaigns That Connect and Drive Growth.";
const TAGLINE_WORDS = TAGLINE.split(" ");
const HEADLINE_PART_1 = "Digital Marketing";
const HEADLINE_PART_2 = "Agency";

export default function HeroSection() {
  const heroRef = useRef(null);
  const centerTextRef = useRef(null);
  const serviceHeaderRef = useRef(null);
  const scrollCueRef = useRef(null);
  const totalProgRef = useRef(0);
  const { isTransitioning } = usePageTransition();

  // 1. Master Multi-Phase Scroll Timeline
  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!heroRef.current) return;

      // Initial state for Center Headline & Tagline Container
      if (centerTextRef.current) {
        gsap.set(centerTextRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          transformOrigin: "center top",
        });
      }

      // Initial states for Service Header & Scrolling Indicator
      if (serviceHeaderRef.current && scrollCueRef.current) {
        gsap.set(serviceHeaderRef.current, {
          opacity: 0,
          y: 40,
          scale: 0.88,
          transformOrigin: "center top",
        });
        gsap.set(scrollCueRef.current, {
          opacity: 0,
          y: 30,
          scale: 0.9,
        });
      }

      // Master Multi-Phase Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=380%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            totalProgRef.current = self.progress;
          },
        },
      });

      // Base anchor tween across duration 1.0
      tl.to({}, { duration: 1 }, 0);

      // --- Phase 1: Center Text (Zoom Out & Slide Up) on Scroll [0.00 -> 0.20] ---
      if (centerTextRef.current) {
        tl.to(
          centerTextRef.current,
          {
            y: -150,
            scale: 0.88,
            opacity: 0,
            duration: 0.18,
            ease: "power1.inOut",
          },
          0.00
        );
      }

      // --- Phase 2: "SERVICE" Header Scales In / Zooms In & Stays Visible [0.34 -> 0.46] ---
      if (serviceHeaderRef.current && scrollCueRef.current) {
        tl.to(
          serviceHeaderRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.12,
            ease: "power2.out",
          },
          0.34
        );

        tl.to(
          scrollCueRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.12,
            ease: "power2.out",
          },
          0.36
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // 2. Character & Tagline Reveal Animation - Plays on Initial Load AND on Page Transitions (e.g. from Work, Services, etc.)
  useEffect(() => {
    let handleHeroStart = null;
    let safetyTimeout = null;

    // While page is transitioning/covered, hold letters and words in hidden state
    if (isTransitioning) {
      gsap.set(".hero-char", {
        yPercent: 120,
        rotateX: 45,
        opacity: 0,
        transformOrigin: "50% 100%",
        force3D: true,
      });
      gsap.set(".hero-tagline-word", {
        yPercent: 130,
        opacity: 0,
        force3D: true,
      });
      return;
    }

    // Play Character Reveal and Tagline Entrance
    const playReveal = () => {
      const revealTl = gsap.timeline({
        delay: 0.1,
      });

      // 3D Masked Kinetic Character Reveal for "Digital Marketing Agency"
      revealTl.to(
        ".hero-char",
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.022,
          ease: "power3.out",
          clearProps: "all",
        },
        0
      );

      // Tagline words cascade in smoothly right after
      revealTl.to(
        ".hero-tagline-word",
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.018,
          ease: "power2.out",
          clearProps: "all",
        },
        0.22
      );
    };

    // If website has already done its initial load (e.g., user navigating back from Work, Services, etc.):
    if (typeof window !== "undefined" && window.__boot2boot_loaded) {
      playReveal();
    } else {
      // First-time site visit: hold hidden until loading screen curtain sweeps
      gsap.set(".hero-char", {
        yPercent: 120,
        rotateX: 45,
        opacity: 0,
        transformOrigin: "50% 100%",
        force3D: true,
      });
      gsap.set(".hero-tagline-word", {
        yPercent: 130,
        opacity: 0,
        force3D: true,
      });

      handleHeroStart = () => {
        playReveal();
      };
      window.addEventListener("boot2boot:startHeroAnimation", handleHeroStart);

      safetyTimeout = setTimeout(() => {
        playReveal();
      }, 2800);
    }

    return () => {
      if (handleHeroStart) {
        window.removeEventListener("boot2boot:startHeroAnimation", handleHeroStart);
      }
      if (safetyTimeout) {
        clearTimeout(safetyTimeout);
      }
    };
  }, [isTransitioning]);

  return (
    <div
      id="hero"
      ref={heroRef}
      className="relative w-full h-screen min-h-[100dvh] bg-black overflow-hidden"
    >
      {/* Deep Full Black Studio Background */}
      <div className="absolute inset-0 bg-[#000000] pointer-events-none" />

      {/* Subtle Studio White/Silver Soft Ambient Glow for Depth */}
      <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] sm:w-[980px] h-[480px] sm:h-[600px] bg-gradient-to-tr from-white/10 via-white/3 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* 3D WebGL Canvas Viewport */}
      <div className="absolute bottom-0 left-0 w-full h-[78vh] pointer-events-auto z-10">
        <QuestSpiral totalProgRef={totalProgRef} />
      </div>

      {/* Top Shadow Gradient Overlay */}
      <div className="absolute top-0 inset-x-0 h-36 sm:h-52 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none z-20" />

      {/* --- Initial Stage: Tagline at Navbar Level + Headline Below --- */}
      <div
        ref={centerTextRef}
        className="absolute top-18 sm:top-16 md:top-0 inset-x-0 md:pt-3 pointer-events-none z-30 flex flex-col items-center justify-center text-center px-4 sm:px-6"
      >
        {/* Small Tagline Text - Word Reveal inside overflow-hidden masks */}
        <div className="min-h-10 sm:min-h-12 md:min-h-14 flex items-center justify-center max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl px-2 sm:px-4">
          <p className="text-xs sm:text-xs md:text-sm font-normal text-neutral-300/90 tracking-tight leading-normal md:leading-relaxed drop-shadow-md">
            {TAGLINE_WORDS.map((word, idx) => (
              <React.Fragment key={idx}>
                <span className="inline-flex overflow-hidden pt-1 pb-2 -mt-1 -mb-2 px-[1px] -mx-[1px]">
                  <span className="hero-tagline-word inline-block will-change-transform">
                    {word}
                  </span>
                </span>
                {idx < TAGLINE_WORDS.length - 1 && " "}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Main Headline - 3D Character Reveal with responsive grouping */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-white tracking-tight leading-[1.12] font-parkinsans drop-shadow-2xl lg:whitespace-nowrap mt-1 sm:mt-2 md:mt-3 px-2 select-text"
          style={{ perspective: "1000px" }}
        >
          <span className="inline-block sm:inline whitespace-nowrap">
            {HEADLINE_PART_1.split("").map((char, i) => (
              <span
                key={`p1-${i}`}
                className="inline-block overflow-hidden pt-2 pb-5 -mt-2 -mb-5 px-[0.5px] sm:px-[1px]"
                style={{ perspective: "1000px" }}
              >
                <span className="hero-char inline-block will-change-transform">
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            ))}
          </span>
          {" "}
          <span className="inline-block sm:inline whitespace-nowrap">
            {HEADLINE_PART_2.split("").map((char, i) => (
              <span
                key={`p2-${i}`}
                className="inline-block overflow-hidden pt-2 pb-5 -mt-2 -mb-5 px-[0.5px] sm:px-[1px]"
                style={{ perspective: "1000px" }}
              >
                <span className="hero-char inline-block will-change-transform">
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            ))}
          </span>
        </h1>
      </div>

      {/* --- Phase 2 & 3: Service Showcase UI Overlay (Matching User's Sketch) --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-20 flex flex-col justify-between p-6 sm:p-10 lg:p-14">
        {/* Top-Center: "SERVICE" Header */}
        <div ref={serviceHeaderRef} style={{ opacity: 0 }} className="self-center text-center pt-16 md:pt-4">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-parkinsans uppercase drop-shadow-lg">
            SERVICE
          </h2>
        </div>

        {/* Bottom: "Scrolling" Indicator */}
        <div ref={scrollCueRef} style={{ opacity: 0 }} className="self-center pb-3 sm:pb-6 flex flex-col items-center gap-1.5">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-white font-mono text-xs sm:text-sm tracking-wider shadow-lg">
            <span className="text-neutral-200">Scroll</span>
          </div>
        </div>
      </div>
    </div>
  );
}
