import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SHAPE_SERVICES_DATA } from "../../data/shapeServicesData";
import { usePageTransition } from "../PageTransition";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_LINES = [
  "We’re a digital",
  "marketing agency",
  "with expertise",
];

const SUBTITLE = "We bring our passion for good design to brave brands and deliver something you can shout about.";
const SUBTITLE_WORDS = SUBTITLE.split(" ");

export default function ShapeServicesSection() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { triggerTransition, isTransitioning } = usePageTransition();

  useEffect(() => {
    let safetyTimeout = null;
    let handleLoadStart = null;
    const scrollTriggers = [];

    // While transition curtain covers the screen, hold characters hidden
    if (isTransitioning) {
      gsap.set(".service-intro-char", {
        yPercent: 120,
        rotateX: 45,
        opacity: 0,
        transformOrigin: "50% 100%",
        force3D: true,
      });
      return;
    }

    const playReveal = () => {
      const tl = gsap.timeline({
        delay: 0.35,
      });

      // 1. Headline characters reveal
      tl.to(
        ".service-headline-char",
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.015,
          ease: "power3.out",
          clearProps: "all",
        },
        0
      );

      // 2. Subtitle characters ripple in
      tl.to(
        ".service-subtitle-char",
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.007,
          ease: "power3.out",
          clearProps: "all",
        },
        0.35
      );
    };

    // Scroll-triggered character reveal for category headings (Design, Develop, Marketing, Support)
    const initScrollReveals = () => {
      SHAPE_SERVICES_DATA.forEach((category) => {
        const sectionEl = document.getElementById(category.id);
        if (!sectionEl) return;

        const chars = sectionEl.querySelectorAll(`.category-char-${category.id}`);
        if (!chars.length) return;

        gsap.set(chars, {
          yPercent: 120,
          rotateX: 45,
          opacity: 0,
          transformOrigin: "50% 100%",
          force3D: true,
        });

        const heading = sectionEl.querySelector(`.category-heading-${category.id}`);
        if (heading) {
          gsap.set(heading, { y: 30, opacity: 0 });
        }

        const categoryTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: "top 82%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        categoryTl.to(
          chars,
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.035,
            ease: "power3.out",
            clearProps: "all",
          },
          0
        );

        if (heading) {
          categoryTl.to(
            heading,
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: "power2.out",
              clearProps: "all",
            },
            0.18
          );
        }

        if (categoryTl.scrollTrigger) {
          scrollTriggers.push(categoryTl.scrollTrigger);
        }
      });

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    // If website is already loaded (navigating from another page or direct visit):
    if (typeof window !== "undefined" && window.__boot2boot_loaded) {
      playReveal();
      initScrollReveals();
    } else {
      // Direct hard refresh with loading screen: hold hidden until loading curtain sweeps
      gsap.set(".service-intro-char", {
        yPercent: 120,
        rotateX: 45,
        opacity: 0,
        transformOrigin: "50% 100%",
        force3D: true,
      });

      handleLoadStart = () => {
        playReveal();
        initScrollReveals();
      };
      window.addEventListener("boot2boot:startHeroAnimation", handleLoadStart);

      safetyTimeout = setTimeout(() => {
        playReveal();
        initScrollReveals();
      }, 2800);
    }

    return () => {
      scrollTriggers.forEach((st) => st.kill());
      if (handleLoadStart) {
        window.removeEventListener("boot2boot:startHeroAnimation", handleLoadStart);
      }
      if (safetyTimeout) {
        clearTimeout(safetyTimeout);
      }
    };
  }, [isTransitioning]);

  const handleServiceClick = (e, slug) => {
    e.preventDefault();
    triggerTransition(
      () => {
        navigate(`/services/${slug}`);
        window.scrollTo({ top: 0, behavior: "instant" });
      },
      { showBrandText: false }
    );
  };

  return (
    <div ref={containerRef} className="w-full text-neutral-900 font-parkinsans">
      {/* ========================================================================= */}
      {/* 1. INTRO STATEMENTS (Under Big SERVICES Header)                           */}
      {/* ========================================================================= */}
      <div className="w-full pt-2 pb-14 sm:pb-20">
        {/* Main Headline with Character Reveal */}
        <div className="w-full max-w-5xl" style={{ perspective: "1000px" }}>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.6vw] font-light tracking-tight text-neutral-950 leading-[0.96] select-text">
            {HEADLINE_LINES.map((line, lineIdx) => (
              <span key={lineIdx} className="block overflow-visible">
                {line.split("").map((char, charIdx) => (
                  <span
                    key={charIdx}
                    className="inline-block overflow-hidden pt-1 pb-3 -mt-1 -mb-3 px-[0.5px] sm:px-[1px]"
                    style={{ perspective: "1000px" }}
                  >
                    <span className="service-intro-char service-headline-char inline-block will-change-transform">
                      {char === " " ? "\u00A0" : char}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>

        {/* Right-aligned Subtitle Statement with Character Reveal */}
        <div className="w-full flex justify-end mt-8 sm:mt-12 lg:mt-14">
          <div className="max-w-xl lg:max-w-2xl" style={{ perspective: "1000px" }}>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] font-light tracking-tight text-neutral-800 leading-[1.18] select-text">
              {SUBTITLE_WORDS.map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap">
                  {word.split("").map((char, cIdx) => (
                    <span
                      key={cIdx}
                      className="inline-block overflow-hidden pt-0.5 pb-2 -mt-0.5 -mb-2 px-[0.25px]"
                      style={{ perspective: "1000px" }}
                    >
                      <span className="service-intro-char service-subtitle-char inline-block will-change-transform">
                        {char}
                      </span>
                    </span>
                  ))}
                  {wIdx < SUBTITLE_WORDS.length - 1 && (
                    <span className="inline-block">&nbsp;</span>
                  )}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CATEGORY SECTIONS (Design, Develop, Marketing, Support)                */}
      {/* ========================================================================= */}
      <div className="space-y-20 sm:space-y-28 pb-20">
        {SHAPE_SERVICES_DATA.map((category) => (
          <section
            key={category.id}
            id={category.id}
            className="w-full border-t border-neutral-300 pt-10 sm:pt-16"
          >
            {/* Giant Watermark Typography Title (Design, Develop, Marketing, Support) with Scroll Character Reveal */}
            <h2
              className="text-[16vw] sm:text-[13vw] font-medium tracking-tighter text-neutral-950 leading-[0.85] uppercase -ml-1 sm:-ml-2 mb-8 sm:mb-12 select-text"
              style={{ perspective: "1000px" }}
            >
              {category.giantTitle.split("").map((char, index) => (
                <span
                  key={index}
                  className="inline-block overflow-hidden pt-2 pb-6 -mt-2 -mb-6 px-[0.5px] sm:px-[1px]"
                  style={{ perspective: "1000px" }}
                >
                  <span className={`category-char-${category.id} inline-block will-change-transform`}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                </span>
              ))}
            </h2>

            {/* 2-Column Responsive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* Left Column: Headline */}
              <div className="lg:col-span-5 pr-4 lg:pr-8">
                <h3 className={`category-heading-${category.id} text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-neutral-950 leading-tight tracking-tight`}>
                  {category.heading}
                </h3>
              </div>

              {/* Right Column: Numbered Interactive Service List */}
              <div className="lg:col-span-7">
                <div className="border-t border-neutral-200">
                  {category.services.map((service) => (
                    <a
                      key={service.id}
                      id={service.id}
                      href={`/services/${service.slug}`}
                      onClick={(e) => handleServiceClick(e, service.slug)}
                      className="group w-full flex items-center justify-between border-b border-neutral-200 py-4 sm:py-5 px-2 hover:border-neutral-900 transition-colors duration-200 cursor-pointer select-none"
                    >
                      {/* Left: Number + Service Title */}
                      <div className="flex items-center space-x-4 sm:space-x-6 flex-1 pr-3">
                        <span className="font-mono text-sm sm:text-base font-light text-neutral-400 group-hover:text-neutral-950 transition-colors w-6 shrink-0">
                          {service.num}
                        </span>
                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-900 group-hover:text-neutral-950 group-hover:translate-x-2.5 transition-transform duration-300">
                          {service.name}
                        </span>
                      </div>

                      {/* Right: MadeByShape style Circular Arrow Button */}
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-neutral-200/90 group-hover:bg-[#E0FE9B] text-neutral-800 group-hover:text-neutral-950 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-45 shrink-0 shadow-sm ml-4">
                        <svg
                          className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                        >
                          <path d="M328 96h24v288h-48V177.9L81 401l-17 17-33.9-34 17-17 223-223H64V96h264z" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
