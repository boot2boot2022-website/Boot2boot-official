import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InstagramCard from "./SocialMediaCards/InstagramCard";
import { InstagramIcon } from "../icons";
import { AudioMuteIcon, AudioUnmuteIcon } from "./social-svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WordReveal from "../animated-reusable-component/WordReveal";
import { usePageTransition } from "./PageTransition";
import saiPalaceLogo from "../assets/company-logo/sai-palace.png";
import lpkSalonLogo from "../assets/company-logo/LPK-salon.jpg";
import cfrSolutionLogo from "../assets/company-logo/cfr-solution.png";
import { insightsDepot, JainilArtJewellary, mitriv } from "../assets/company-logo";
import {
  cfr as cfrVideo,
  jainilArtJewellary as jainilVideo,
  lpkSalon as lpkVideo,
  saiPalace as saiPalaceVideo,
  mitrivVentures as mitrivVideo,
} from "../assets/workVideoAssest";

gsap.registerPlugin(ScrollTrigger);

export const Highlight = ({ children }) => (
  <span className="font-semibold text-neutral-900 bg-[#FF6A1C]/10 rounded-xs">
    {children}
  </span>
);

export const HOME_WORK_ITEMS = [
  {
    id: "sai-palace",
    name: "Instagram",
    fullName: "Instagram",
    icon: InstagramIcon,
    accentColor: "#E1306C",
    headline: "HOTEL SAI PALACE",
    avatar: saiPalaceLogo,
    video: saiPalaceVideo,
    paragraphs: [
      <>
        Looking to enhance their digital footprint and connect with a broader customer base, <Highlight>Sai Palace Hotel</Highlight> teamed up with Boot2Boot. Our team delivered comprehensive <Highlight>Google My Business optimization</Highlight> and strategic social media management across Instagram and Facebook.
      </>,
      <>
        These efforts significantly increased the hotel's <Highlight>local search visibility</Highlight>, attracted new guests, and dramatically expanded <Highlight>direct booking reservations</Highlight> across all locations.
      </>,
    ],
    metrics: "+120% Organic Transactions • +85% Conversion Rate • Expanded Guest Community",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
    username: "hotelsai_palace",
    position: "left", // Photo on Left, Paragraph on Right
  },
  {
    id: "lpk-salon",
    name: "Instagram",
    fullName: "Instagram",
    icon: InstagramIcon,
    accentColor: "#FF6A1C",
    headline: "LPK Salon",
    avatar: lpkSalonLogo,
    video: lpkVideo,
    paragraphs: [
      <>
        Looking to elevate its online presence and attract more clients, LPK Salon partnered with Boot2Boot. Our team focused on creating a compelling digital presence and implementing a strategic approach to improve online visibility and customer engagement.
      </>,
      <>
        With a focus on local SEO, website optimization, and digital marketing, we aim to help LPK Salon reach more potential customers, strengthen its brand identity, and turn online visitors into salon appointments.
      </>,
    ],
    metrics: "+70% Organic Transactions • +110% New Organic Users • +25% Conversion Rate",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
    username: "lpk.salon",
    position: "right", // Paragraph on Left, Photo on Right
  },
];

export const WORK_PAGE_ITEMS = [
  ...HOME_WORK_ITEMS,
  {
    id: "cfr",
    name: "Instagram",
    fullName: "Instagram",
    icon: InstagramIcon,
    accentColor: "#2563EB",
    headline: "CFR",
    avatar: cfrSolutionLogo,
    video: cfrVideo,
    paragraphs: [
      <>
        Partnering with <Highlight>CFR</Highlight>, Boot2Boot designed and executed a strategic brand positioning and digital performance roadmap to amplify their market reach.
      </>,
      <>
        Through high-impact creative campaigns and optimized digital funnels, CFR achieved record engagement, elevated brand presence, and steady client growth.
      </>,
    ],
    metrics: "+145% Digital Reach • +90% Lead Generation • 3.2x Engagement Growth",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
    username: "cfr.solutions",
    position: "left",
  },
  {
    id: "jainil-art-jewellery",
    name: "Instagram",
    fullName: "Instagram",
    icon: InstagramIcon,
    accentColor: "#D97706",
    headline: "JAINIL ART JEWELLERY",
    avatar: JainilArtJewellary,
    video: jainilVideo,
    paragraphs: [
      <>
        To spotlight the timeless craftsmanship of <Highlight>Jainil Art Jewellery</Highlight>, Boot2Boot engineered an immersive, luxury-first visual content strategy and targeted social outreach.
      </>,
      <>
        Our bespoke creative direction and campaign optimization sparked widespread admiration, significantly boosting high-value customer inquiries and brand affinity.
      </>,
    ],
    metrics: "+180% High-Intent Inquiries • +115% Social Traffic • +65% Conversion Growth",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80",
    username: "jainilartjewellery",
    position: "right",
  },
  {
    id: "mitriv",
    name: "Instagram",
    fullName: "Instagram",
    icon: InstagramIcon,
    accentColor: "#10B981",
    headline: "MITRIV",
    avatar: mitriv,
    video: mitrivVideo,
    paragraphs: [
      <>
        Boot2Boot partnered with <Highlight>Mitriv</Highlight> to accelerate their product storytelling, digital identity, and multi-channel user acquisition funnels.
      </>,
      <>
        With agile branding frameworks and engaging visual assets, Mitriv achieved exponential user adoption, reinforced industry credibility, and deepened user retention.
      </>,
    ],
    metrics: "+210% User Sign-ups • +88% Organic Visibility • 4.5x Brand Mentions",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    username: "mitrivventures",
    position: "left",
  },
  {
    id: "insight-depot",
    name: "Instagram",
    fullName: "Instagram",
    icon: InstagramIcon,
    accentColor: "#8B5CF6",
    avatar: insightsDepot,
    headline: "INSIGHT DEPOT",
    paragraphs: [
      <>
        <Highlight>Insight Depot</Highlight> enlisted Boot2Boot to revamp their analytics and intelligence platform presence with compelling messaging, modern design, and enterprise reach.
      </>,
      <>
        Our comprehensive organic strategy and thought-leadership campaigns established Insight Depo as a prominent authority, driving substantial demo requests and subscription growth.
      </>,
    ],
    metrics: "+130% Platform Engagement • +95% Inbound Inquiries • +75% Demo Bookings",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    username: "insightsdepot",
    position: "right",
  },
];

export default function SocialMediaSection({
  items = HOME_WORK_ITEMS,
  showHeading = true,
  hideTopCurve = false,
  showViewMore = true,
  className = "",
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { triggerTransition } = usePageTransition();

  const isWorkPage = location.pathname === "/work";
  const shouldShowViewMore = showViewMore && !isWorkPage;

  const handleViewMore = (e) => {
    if (e) e.preventDefault();
    triggerTransition(
      () => {
        navigate("/work");
        window.scrollTo({ top: 0, behavior: "instant" });
      },
      { showBrandText: false }
    );
  };

  const sectionRef = useRef(null);
  const flyingCardRef = useRef(null);
  const imgRefs = useRef([]);
  const slotRefs = useRef([]);
  const muteBtnRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Mobile check (< 768px): on mobile screens, no jumping card; videos play directly inside their Instagram frames
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMute = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setIsMuted((prev) => {
      const nextMuted = !prev;
      imgRefs.current.forEach((el) => {
        if (el && el.tagName === "VIDEO") {
          el.muted = nextMuted;
          if (!nextMuted) {
            el.play().catch(() => {});
          }
        }
      });
      return nextMuted;
    });
  };

  useEffect(() => {
    // Disable flying card / jumping animation on mobile screen size (< 768px)
    if (isMobile) return;

    const section = sectionRef.current;
    const flying = flyingCardRef.current;
    if (!section || !flying) return;

    let tl;

    const ctx = gsap.context(() => {
      const getPos = (el) => {
        if (!el || !section) return { x: 0, y: 0, width: 340, height: 340 };
        const sRect = section.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        return {
          x: r.left - sRect.left,
          y: r.top - sRect.top,
          width: r.width,
          height: r.height,
        };
      };

      const setupAnimation = () => {
        const slots = slotRefs.current.filter(Boolean);
        if (slots.length < 2) return;

        if (tl) tl.kill();

        const getCenterScroll = (el) => {
          const r = el.getBoundingClientRect();
          const scroll = window.scrollY || window.pageYOffset;
          return scroll + r.top - (window.innerHeight - r.height) / 2;
        };

        const p0 = getPos(slots[0]);

        // Position initial flying photo directly over Card 0
        gsap.set(flying, {
          x: p0.x,
          y: p0.y,
          width: p0.width,
          height: p0.height,
          opacity: 1,
          scale: 1,
          rotateZ: 0,
          rotateY: 0,
          borderRadius: "0px",
          boxShadow: "0 0 0 rgba(0,0,0,0)",
        });

        if (muteBtnRef.current) {
          muteBtnRef.current.style.display = items[0]?.video ? "block" : "none";
        }

        // Initialize image opacities
        imgRefs.current.forEach((img, idx) => {
          if (img) gsap.set(img, { opacity: idx === 0 ? 1 : 0 });
        });

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: () => getCenterScroll(slots[0]),
            end: () => getCenterScroll(slots[slots.length - 1]),
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        // Build dynamic sequential flight animation for any number of cards
        for (let i = 0; i < slots.length - 1; i++) {
          const fromIdx = i;
          const toIdx = i + 1;
          const isFromEven = fromIdx % 2 === 0;

          // 1. Dwell on current card while centered
          tl.to(flying, {
            x: () => getPos(slots[fromIdx]).x,
            y: () => getPos(slots[fromIdx]).y,
            width: () => getPos(slots[fromIdx]).width,
            height: () => getPos(slots[fromIdx]).height,
            scale: 1,
            rotateZ: 0,
            rotateY: 0,
            borderRadius: "0px",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 0.16,
            ease: "none",
          });
          if (muteBtnRef.current) {
            tl.call(() => {
              if (muteBtnRef.current) {
                muteBtnRef.current.style.display = items[fromIdx]?.video ? "block" : "none";
              }
            }, null, "<");
          }

          // 2. LIFT OFF with dynamic 3D angle
          tl.to(flying, {
            scale: 1.08,
            rotateZ: isFromEven ? 4 : -4,
            rotateY: isFromEven ? 8 : -8,
            borderRadius: "18px",
            boxShadow: "0 30px 60px -15px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.25)",
            duration: 0.25,
            ease: "power1.out",
          });
          if (muteBtnRef.current) {
            tl.call(() => {
              if (muteBtnRef.current) {
                muteBtnRef.current.style.display = "none";
              }
            }, null, "<");
          }

          // 3. GLIDE across the screen to target card
          tl.to(flying, {
            x: () => getPos(slots[toIdx]).x,
            y: () => getPos(slots[toIdx]).y,
            width: () => getPos(slots[toIdx]).width,
            height: () => getPos(slots[toIdx]).height,
            duration: 0.65,
            ease: "power2.inOut",
          }, "<+=0.05");

          // Crossfade images mid-flight
          if (imgRefs.current[fromIdx]) {
            tl.to(imgRefs.current[fromIdx], {
              opacity: 0,
              duration: 0.35,
              ease: "power1.inOut",
            }, "<+=0.15");
          }
          if (imgRefs.current[toIdx]) {
            tl.to(imgRefs.current[toIdx], {
              opacity: 1,
              duration: 0.35,
              ease: "power1.inOut",
            }, "<");
          }

          // 4. DOCK into target card
          tl.to(flying, {
            scale: 1,
            rotateZ: 0,
            rotateY: 0,
            borderRadius: "0px",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 0.25,
            ease: "power1.inOut",
          }, "-=0.2");
          if (muteBtnRef.current) {
            tl.call(() => {
              if (muteBtnRef.current) {
                muteBtnRef.current.style.display = items[toIdx]?.video ? "block" : "none";
              }
            }, null, "-=0.15");
          }
        }

        // Final gentle dwell on last card
        tl.to(flying, {
          duration: 0.15,
          ease: "none",
        });
        if (muteBtnRef.current) {
          tl.call(() => {
            if (muteBtnRef.current) {
              muteBtnRef.current.style.display = items[slots.length - 1]?.video ? "block" : "none";
            }
          }, null, "<");
        }
      };

      const timer1 = setTimeout(() => {
        setupAnimation();
        ScrollTrigger.refresh();
      }, 150);

      const timer2 = setTimeout(() => {
        setupAnimation();
        ScrollTrigger.refresh();
      }, 600);

      window.addEventListener("resize", setupAnimation);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        window.removeEventListener("resize", setupAnimation);
        if (tl) tl.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [items, isMobile]);

  // Helper to render platform card
  const renderPlatformCard = (platform, idx) => {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="relative w-full max-w-[340px] sm:max-w-[360px] rounded-2xl">
          <InstagramCard
            username={platform.username || "boot2boot"}
            avatar={platform.avatar || platform.avatarUrl || platform.logo || platform.companyLogo}
            mediaUrl={platform.image}
            video={platform.video}
            emptySlot={!isMobile}
            mediaSlotRef={!isMobile ? (el) => (slotRefs.current[idx] = el) : undefined}
          />
        </div>
      </div>
    );
  };

  // Helper to render paragraph side
  const renderParagraphSide = (platform, idx) => {
    return (
      <div className="flex flex-col justify-between p-6 sm:p-10 rounded-3xl bg-white border border-neutral-200 w-full h-full min-h-[520px]">
        {/* Top: Headline + Paragraphs */}
        <div className="space-y-4 sm:space-y-5">
          {/* Headline */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-neutral-900 font-parkinsans tracking-tight leading-tight">
            {platform.headline}
          </h3>

          {/* Descriptive Paragraphs */}
          <div className="space-y-3 sm:space-y-3.5">
            {platform.paragraphs ? (
              platform.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className="text-sm sm:text-base text-neutral-600 font-parkinsans leading-relaxed"
                >
                  {p}
                </p>
              ))
            ) : (
              <p className="text-sm sm:text-base lg:text-lg text-neutral-600 font-parkinsans leading-relaxed">
                {platform.paragraph}
              </p>
            )}
          </div>
        </div>

        {/* Bottom: Metric Highlight */}
        <div className="pt-4 flex items-center justify-between border-t border-neutral-100 mt-6">
          <span className="text-xs sm:text-sm font-mono font-medium text-neutral-500">
            {platform.metrics.split(/(\+?\d+(?:\.\d+)?[%xXkKmM]?)/g).map((part, pIdx) => {
              if (/^(\+?\d+(?:\.\d+)?[%xXkKmM]?)$/.test(part) && part.length > 0) {
                return (
                  <span key={pIdx} className="text-neutral-900 font-bold">
                    {part}
                  </span>
                );
              }
              return <span key={pIdx}>{part}</span>;
            })}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="social-media"
      ref={sectionRef}
      className={`relative z-30 ${hideTopCurve
          ? "w-full bg-transparent text-neutral-900 pt-6 sm:pt-10 pb-8 sm:pb-12 px-2 sm:px-6 lg:px-8 overflow-hidden font-parkinsans"
          : "w-full rounded-t-[2.5rem] sm:rounded-t-[3.5rem] lg:rounded-t-[4.5rem] bg-[#f7f7f8] text-neutral-900 pt-16 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-14 border-t border-neutral-300/80 shadow-[0_-25px_60px_rgba(0,0,0,0.15)] overflow-hidden font-parkinsans"
        } ${className}`}
    >
      {/* Dynamic 3D Flying Media Transition Layer (Desktop & Tablet Only) */}
      {!isMobile && (
        <div
          ref={flyingCardRef}
          className="hidden md:block absolute top-0 left-0 overflow-hidden pointer-events-auto z-40 bg-neutral-900 group"
          style={{
            opacity: 0,
            transformOrigin: "center center",
            transformPerspective: 1200,
            willChange: "transform, opacity, width, height",
          }}
        >
          {items.map((item, idx) => (
            item.video ? (
              <video
                key={item.id || idx}
                ref={(el) => (imgRefs.current[idx] = el)}
                src={item.video}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: idx === 0 ? 1 : 0 }}
              />
            ) : (
              <img
                key={item.id || idx}
                ref={(el) => (imgRefs.current[idx] = el)}
                src={item.image}
                alt={item.headline}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: idx === 0 ? 1 : 0 }}
              />
            )
          ))}
          {/* Sleek glass glare / specular reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/25 pointer-events-none" />

          {/* Instagram Mute / Unmute Audio Button (Appears on Hover) */}
          <div
            ref={muteBtnRef}
            className="absolute bottom-3.5 right-3.5 z-30 transition-all duration-200 opacity-0 group-hover:opacity-100"
            style={{ display: items[0]?.video ? "block" : "none" }}
          >
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="w-8 h-8 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-md flex items-center justify-center text-white shadow-lg transition-transform active:scale-90 hover:scale-110 cursor-pointer border border-white/15 pointer-events-auto"
            >
              {isMuted ? (
                <AudioMuteIcon className="w-4 h-4" />
              ) : (
                <AudioUnmuteIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#FF6A1C]/5 via-purple-500/5 to-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Top Centered Section Heading (Optional) */}
        {showHeading && (
          <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16 space-y-3 w-full">
            <WordReveal
              text="Selected Work"
              as="h2"
              className="w-full justify-center text-center text-3xl sm:text-5xl lg:text-6xl font-medium text-neutral-900 tracking-tight font-parkinsans"
              scrollStart="top 90%"
              stagger={0.08}
              duration={0.85}
            />
            <WordReveal
              text="Explore our curated showcase of high-impact digital experiences, creative campaigns, and brand storytelling."
              as="p"
              className="w-full justify-center text-center text-sm sm:text-base lg:text-lg text-neutral-500 max-w-xl mx-auto leading-relaxed"
              scrollStart="top 90%"
              stagger={0.04}
              delay={0.12}
              duration={0.75}
            />
          </div>
        )}

        {/* Alternating Cards & Descriptions Container */}
        <div className="w-full space-y-16 sm:space-y-24">
          {items.map((platform, idx) => {
            const isLeftPhoto = platform.position === "left" || idx % 2 === 0;
            return (
              <div
                key={platform.id || idx}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch"
              >
                {isLeftPhoto ? (
                  <>
                    <div className="lg:col-span-5 flex justify-center lg:justify-start">
                      {renderPlatformCard(platform, idx)}
                    </div>
                    <div className="lg:col-span-7 flex flex-col">
                      {renderParagraphSide(platform, idx)}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col">
                      {renderParagraphSide(platform, idx)}
                    </div>
                    <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
                      {renderPlatformCard(platform, idx)}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* View More Text Link (Home page only) */}
        {shouldShowViewMore && (
          <div className="w-full flex justify-center lg:justify-end mt-8 sm:mt-10">
            <div className="w-full max-w-[340px] sm:max-w-[360px] flex justify-center lg:justify-end pr-1 sm:pr-2">
              <a
                href="/work"
                onClick={handleViewMore}
                className="inline-block text-base sm:text-lg font-medium text-neutral-950 underline underline-offset-4 decoration-neutral-950 hover:decoration-neutral-600 transition-transform duration-200 ease-out hover:scale-90 active:scale-80 origin-center lg:origin-right hover:text-neutral-700 cursor-pointer select-none"
              >
                View More
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

