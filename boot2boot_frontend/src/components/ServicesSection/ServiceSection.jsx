import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PlaceFor3dPhotoFrame from "./PlaceFor3dPhotoFrame";
import SlideUpByWord from "../../animated-reusable-component/SlideUpByWord";

import {
  Ads,
  ecommerce,
  emailMarketing,
  performanceMarketing,
  seo,
  socialMediaMarketing,
  webDevelopment,
} from "../../assets/3dCardImages";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: 1,
    name: "E-Commerce",
    tag: "Scale & Revenue",
    image: ecommerce,
    headline: "Scalable Digital Storefronts Built for High-Volume Conversion.",
    statement: "We engineer frictionless purchasing journeys that turn casual visitors into loyal brand advocates.",
    metric: "3.4x Average ROAS",
  },
  {
    id: 2,
    name: "Email Marketing",
    tag: "Retention & LTV",
    image: emailMarketing,
    headline: "Automated Lifecycle Flows Driving Recurring Customer Value.",
    statement: "Personalized multi-stage segmentation and omnichannel campaigns designed for lasting brand loyalty.",
    metric: "38% Repeat Order Rate",
  },
  {
    id: 3,
    name: "Web Development",
    tag: "Creative Tech",
    image: webDevelopment,
    headline: "Cutting-Edge Web Engineering with Fluid 3D Interactions.",
    statement: "Bespoke digital flagships combining cinematic WebGL animations with blazingly fast load speeds.",
    metric: "99/100 Lighthouse Performance",
  },
  {
    id: 4,
    name: "Influencer Marketing",
    tag: "Brand Authority",
    image: Ads,
    headline: "Curated Creator Partnerships That Capture Cultural Momentum.",
    statement: "Authentic creator advocacy and strategic matchmaking that cements category leadership.",
    metric: "12M+ Organic Impressions",
  },
  {
    id: 5,
    name: "Performance Marketing",
    tag: "Growth Engine",
    image: performanceMarketing,
    headline: "Precision Multi-Channel Funnels Optimized for Maximum Scale.",
    statement: "Hyper-targeted campaigns across search, social, and programmatic channels executed with strict unit economics.",
    metric: "$25M+ Managed Ad Spend",
  },
  {
    id: 6,
    name: "Search Engine Optimization",
    tag: "Organic Reach",
    image: seo,
    headline: "Dominant Organic Search Visibility Through Technical Precision.",
    statement: "Comprehensive architectural SEO and entity optimization that consistently wins top ranking positions.",
    metric: "#1 Top Search Placements",
  },
  {
    id: 7,
    name: "Social Media Marketing",
    tag: "Community & Impact",
    image: socialMediaMarketing,
    headline: "Compelling Narrative Campaigns & Viral Content Engines.",
    statement: "Unforgettable social touchpoints that spark organic word-of-mouth and engaged digital communities.",
    metric: "500K+ Engaged Followers",
  },
];

const ServiceSection = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".service-pill-roll-item");
      const totalItems = items.length;

      // Initialize all pill items
      items.forEach((item, i) => {
        gsap.set(item, {
          yPercent: i === 0 ? 0 : 100,
          opacity: i === 0 ? 1 : 0,
        });
      });

      let lastIdx = 0;

      // Pinned ScrollTrigger scrubbing through all services
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalItems * 80}%`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const rawIndex = Math.floor(self.progress * totalItems);
            const clampedIndex = Math.min(rawIndex, totalItems - 1);
            if (clampedIndex !== lastIdx) {
              lastIdx = clampedIndex;
              setActiveIndex(clampedIndex);
            }
          },
        },
      });

      // Chain roll animations for the button switcher
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
    }, section);

    return () => ctx.revert();
  }, []);

  const activeService = servicesData[activeIndex] || servicesData[0];

  return (
    <section
      id="service"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#f7f7f8] text-neutral-900 flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-hidden"
    >
      {/* 2-Column Full Screen Grid matching Wireframe */}
      <div className="w-full max-w-7xl h-[88vh] grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-stretch">
        {/* Left Column: Top Box (Photo Frame) + Bottom Box (Button Switcher) */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3 sm:gap-4 h-full min-h-0 items-center lg:items-stretch">
          {/* Label directly above the photo frame */}
          <div className="w-full max-w-[280px] sm:max-w-[310px] mx-auto flex items-center gap-2 px-1">
            <span className="w-2.5 h-2 border-4" />
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-neutral-500 font-parkinsans">
              Services
            </span>
          </div>

          {/* Top Left: Photo Frame Component */}
          <div className="flex-1 w-full max-w-[280px] sm:max-w-[310px] h-full min-h-0 relative mx-auto">
            <PlaceFor3dPhotoFrame
              services={servicesData}
              activeIndex={activeIndex}
              className="w-full h-full p-0"
            />
          </div>

          {/* Bottom Left: Button-like Capsule Changing on Scroll */}
          <div className="w-full max-w-[280px] sm:max-w-[310px] shrink-0 flex items-center justify-center mx-auto">
            <div className="w-full inline-flex items-center justify-center px-4 sm:px-6 py-3 sm:py-3.5 rounded-full sm:rounded-2xl bg-white border border-neutral-300/90 shadow-md shadow-neutral-900/5 hover:border-neutral-400 transition-all duration-300">
              <div className="relative h-6 w-full overflow-hidden flex items-center justify-center">
                {servicesData.map((service) => (
                  <div
                    key={service.id}
                    className="service-pill-roll-item absolute inset-0 flex items-center justify-center text-center will-change-transform"
                  >
                    <span className="text-xs sm:text-sm md:text-base font-bold font-parkinsans text-neutral-900 whitespace-nowrap tracking-tight">
                      {service.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Large Rounded Box with SlideUpByWord Animated Content */}
        <div className="lg:col-span-8 h-full rounded-[24px] sm:rounded-[28px] bg-white border border-neutral-300/80 p-6 sm:p-10 lg:p-12 flex flex-col justify-between shadow-xl shadow-neutral-900/5 relative overflow-hidden">
          {/* Top Row: Category Tag + Step Counter */}
          <div className="w-full flex items-center justify-between pb-4 border-b border-neutral-200/80">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6A1C] animate-pulse" />
              <span className="text-xs uppercase font-bold tracking-widest text-neutral-500 font-parkinsans">
                {activeService.tag}
              </span>
            </div>

            <div className="font-mono text-xs sm:text-sm font-semibold text-neutral-500">
              <span className="text-neutral-900 font-bold">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-neutral-300 mx-1">/</span>
              <span>{String(servicesData.length).padStart(2, "0")}</span>
            </div>
          </div>

          {/* Center: SlideUpByWord Animated Headline & Statement */}
          <div className="my-auto py-6 sm:py-8 flex flex-col justify-center space-y-4 sm:space-y-6">
            <SlideUpByWord
              key={`headline-${activeService.id}`}
              as="h2"
              text={activeService.headline}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-parkinsans text-neutral-900 tracking-tight leading-[1.12]"
              duration={0.65}
              stagger={0.035}
              triggerOnScroll={false}
            />

            <SlideUpByWord
              key={`statement-${activeService.id}`}
              as="p"
              text={activeService.statement}
              className="text-sm sm:text-base lg:text-lg text-neutral-600 font-parkinsans leading-relaxed max-w-xl"
              duration={0.6}
              stagger={0.02}
              delay={0.15}
              triggerOnScroll={false}
            />
          </div>

          {/* Bottom Row: Metrics Badge + Navigation Cue */}
          <div className="w-full pt-4 border-t border-neutral-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-xs font-semibold text-neutral-800 font-mono">
              <span className="text-[#FF6A1C] font-bold">★</span>
              <span>{activeService.metric}</span>
            </div>

            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-mono">
              Scroll to explore capabilities
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;