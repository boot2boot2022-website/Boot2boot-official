import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import boot2bootLogo from "../assets/boot2boot-logo/boot2boot-logo.png";
import TextRollEffect from "../animated-reusable-component/TextRollEffect";
import { usePageTransition } from "./PageTransition";

const col1Items = [
  { label: "Home", href: "/", hash: "#hero" },
  { label: "Services", href: "/services" },
  { label: "Works", href: "/work" },
  { label: "Careers", href: "/careers" },
];

const col2Items = [
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Meet the Team", href: "/meet-the-team" },
];

const allNavItems = [...col1Items, ...col2Items];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/boot_2_boot/" },
  { label: "Facebook", href: "https://www.facebook.com/people/Boot-2-Boot/100089690485497/" },
  { label: "Linkedin", href: "https://www.linkedin.com/company/boot-2-boot" },
  { label: "X.com", href: "https://x.com/boot2boot2022?t=0F6HmjxmCUZ6F0A9n6HZmw&s=09" },
  { label: "Threads", href: "https://www.threads.net/@boot_2_boot" },
  { label: "YouTube", href: "https://www.youtube.com/@Boot2Boot" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { triggerTransition } = usePageTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState(null);
  const [activeItem, setActiveItem] = useState("Home");
  const [isHero, setIsHero] = useState(location.pathname === "/");

  // Track if current view is in the dark Hero Section on Home
  useEffect(() => {
    if (location.pathname !== "/") {
      setIsHero(false);
      return;
    }

    const checkHero = () => {
      const socialEl = document.getElementById("social-media");
      if (socialEl) {
        const rect = socialEl.getBoundingClientRect();
        setIsHero(rect.top > 80);
      } else {
        setIsHero(window.scrollY < window.innerHeight);
      }
    };

    checkHero();
    const rafId = requestAnimationFrame(checkHero);

    window.addEventListener("scroll", checkHero, { passive: true });
    window.addEventListener("resize", checkHero, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", checkHero);
      window.removeEventListener("resize", checkHero);
    };
  }, [location.pathname]);

  // DOM Refs
  const overlayRef = useRef(null);
  const horizontalSlicesRef = useRef([]);
  const menuItemsRef = useRef([]);
  const socialItemsRef = useRef([]);
  const footerRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const timelineRef = useRef(null);
  const isFirstRender = useRef(true);

  // Active state based on route & scroll
  useEffect(() => {
    if (location.pathname === "/blog" || location.pathname.startsWith("/blog/")) {
      setActiveItem("Blog");
      return;
    }
    if (location.pathname === "/services" || location.pathname.startsWith("/services/") || location.pathname.startsWith("/service/")) {
      setActiveItem("Services");
      return;
    }
    if (location.pathname === "/work" || location.pathname === "/works") {
      setActiveItem("Works");
      return;
    }
    if (location.pathname === "/meet-the-team" || location.pathname === "/team") {
      setActiveItem("Meet the Team");
      return;
    }
    if (location.pathname === "/contact") {
      setActiveItem("Contact");
      return;
    }
    if (location.pathname === "/careers") {
      setActiveItem("Careers");
      return;
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY + 280;
      const contactEl = document.getElementById("contact");
      const blogEl = document.getElementById("blog");
      const workEl = document.getElementById("social-media");

      if (contactEl && contactEl.offsetTop <= scrollPos) {
        setActiveItem("Contact");
      } else if (blogEl && blogEl.offsetTop <= scrollPos) {
        setActiveItem("Blog");
      } else if (workEl && workEl.offsetTop <= scrollPos) {
        setActiveItem("Works");
      } else {
        setActiveItem("Home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Initial GSAP setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, {
        autoAlpha: 0,
        pointerEvents: "none",
      });
      // 5 Horizontal cutting slices initialized offscreen with hardware acceleration
      gsap.set(horizontalSlicesRef.current.filter(Boolean), {
        xPercent: 100,
        force3D: true,
        backfaceVisibility: "hidden",
      });
      gsap.set(menuItemsRef.current.filter(Boolean), {
        opacity: 0,
        x: "8rem",
        force3D: true,
      });
      gsap.set(socialItemsRef.current.filter(Boolean), {
        opacity: 0,
        x: "6rem",
        force3D: true,
      });
      if (footerRef.current) {
        gsap.set(footerRef.current, {
          opacity: 0,
          y: "3rem",
          force3D: true,
        });
      }
      gsap.set(topLineRef.current, { y: -4, rotate: 0 });
      gsap.set(bottomLineRef.current, { y: 4, rotate: 0 });
    });

    return () => ctx.revert();
  }, []);

  // Bulletproof GSAP Horizontal Cutting/Slicing Open & Close Timeline
  useEffect(() => {
    // Skip initial mount to prevent closing animation flash on page refresh
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const menuEase = "expo.out";

    // Clean up any ongoing animations
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const slices = horizontalSlicesRef.current.filter(Boolean);
    const navLinks = menuItemsRef.current.filter(Boolean);
    const socials = socialItemsRef.current.filter(Boolean);
    const footer = footerRef.current;

    gsap.killTweensOf([
      topLineRef.current,
      bottomLineRef.current,
      ...slices,
      ...navLinks,
      ...socials,
      footer,
      overlayRef.current,
    ].filter(Boolean));

    if (isOpen) {
      // Make overlay interactive immediately
      gsap.set(overlayRef.current, {
        autoAlpha: 1,
        pointerEvents: "auto",
      });

      // Animate hamburger lines into 'X'
      gsap.to(topLineRef.current, {
        y: 0,
        rotate: 45,
        duration: 0.35,
        ease: menuEase,
        overwrite: "auto",
      });
      gsap.to(bottomLineRef.current, {
        y: 0,
        rotate: -45,
        duration: 0.35,
        ease: menuEase,
        overwrite: "auto",
      });

      const tl = gsap.timeline();

      // 1. Horizontal cutting strips sliding in from top to bottom
      tl.to(
        slices,
        {
          xPercent: 0,
          duration: 0.95,
          ease: menuEase,
          stagger: 0.07,
          overwrite: "auto",
        },
        0
      );

      // 2. Navigation items sliding in from right
      tl.to(
        navLinks,
        {
          opacity: 1,
          x: "0rem",
          duration: 0.9,
          ease: menuEase,
          stagger: 0.06,
          overwrite: "auto",
        },
        0.35
      );

      // 3. Social items sliding in
      tl.to(
        socials,
        {
          opacity: 1,
          x: "0rem",
          duration: 0.8,
          ease: menuEase,
          stagger: 0.07,
          overwrite: "auto",
        },
        0.5
      );

      // 4. Footer container sliding up with divider line
      if (footer) {
        tl.to(
          footer,
          {
            opacity: 1,
            y: "0rem",
            duration: 0.75,
            ease: menuEase,
            overwrite: "auto",
          },
          0.55
        );
      }

      timelineRef.current = tl;
    } else {
      // Animate 'X' back to hamburger
      gsap.to(topLineRef.current, {
        y: -4,
        rotate: 0,
        duration: 0.3,
        ease: menuEase,
        overwrite: "auto",
      });
      gsap.to(bottomLineRef.current, {
        y: 4,
        rotate: 0,
        duration: 0.3,
        ease: menuEase,
        overwrite: "auto",
      });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlayRef.current, {
            autoAlpha: 0,
            pointerEvents: "none",
          });
          gsap.set(slices, { xPercent: 100 });
          gsap.set(navLinks, { opacity: 0, x: "8rem" });
          gsap.set(socials, { opacity: 0, x: "6rem" });
          if (footer) gsap.set(footer, { opacity: 0, y: "3rem" });
        },
      });

      // Quick fade out of content elements
      tl.to(
        [...navLinks, ...socials, footer].filter(Boolean),
        {
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        },
        0
      );

      // Staggered curtain slide off to right
      tl.to(
        slices,
        {
          xPercent: 100,
          duration: 0.65,
          ease: "expo.inOut",
          stagger: 0.04,
          overwrite: "auto",
        },
        0.06
      );

      timelineRef.current = tl;
    }
  }, [isOpen]);

  // Keyboard accessibility (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Navigation and smooth scroll handler
  const handleNavClick = (e, item) => {
    e.preventDefault();
    const { label, href, hash } = item;
    if (label) setActiveItem(label);

    // 1. Handling Blog, Services, Works, Meet the Team, or Contact Links (Curtain only, no brand text)
    if (
      href === "/blog" ||
      href === "/services" ||
      href === "/work" ||
      href === "/works" ||
      href === "/meet-the-team" ||
      href === "/team" ||
      href === "/contact" ||
      href === "/careers"
    ) {
      setIsOpen(false);
      if (location.pathname === href) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        triggerTransition(
          () => {
            navigate(href);
          },
          { showBrandText: false }
        );
      }
      return;
    }

    // 2. Navigating to Home sections from /blog, /services, /work, or /meet-the-team page
    if (location.pathname !== "/") {
      const isHomeDirect = label === "Home" || !hash || hash === "#hero";
      setIsOpen(false);
      triggerTransition(
        () => {
          navigate(hash ? `/${hash}` : "/");
          if (hash) {
            setTimeout(() => {
              const target = document.querySelector(hash);
              if (target) {
                const topOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition =
                  elementPosition + window.pageYOffset - topOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
              }
            }, 100);
          }
        },
        { showBrandText: isHomeDirect }
      );
      return;
    }

    // 3. Already on Home page - clicking Home: smooth scroll to top without page transition
    if (label === "Home" || !hash || hash === "#hero") {
      setIsOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsOpen(false);
    const target = document.querySelector(hash);
    if (target) {
      const topOffset = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const renderNavItem = (item, globalIndex) => {
    const isHovered = hoveredLabel === item.label;
    const isCurrentActive =
      hoveredLabel === null ? activeItem === item.label : isHovered;

    return (
      <div
        key={item.label}
        ref={(el) => (menuItemsRef.current[globalIndex] = el)}
        className="will-change-transform"
      >
        <a
          href={item.href}
          onClick={(e) => handleNavClick(e, item)}
          onMouseEnter={() => setHoveredLabel(item.label)}
          onMouseLeave={() => setHoveredLabel(null)}
          className="group inline-flex items-center cursor-pointer select-none py-1"
        >
          {/* Dynamic #E0FE9B Dot (Clean, solid without glow/shine) */}
          <span
            className={`inline-block rounded-full bg-[#E0FE9B] transition-all duration-300 ease-out mr-2.5 sm:mr-3.5 md:mr-4 flex-shrink-0 ${isCurrentActive
              ? "w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 opacity-100 scale-100"
              : "w-0 h-0 opacity-0 scale-0 mr-0"
              }`}
          />

          {/* Navigation Title */}
          <span
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight capitalize leading-[1.1] transition-all duration-300 group-hover:text-[#E0FE9B] ${isCurrentActive
              ? "text-white opacity-100 translate-x-1 sm:translate-x-2"
              : hoveredLabel !== null
                ? "text-neutral-500 opacity-30"
                : "text-white opacity-95"
              }`}
          >
            {item.label}
          </span>
        </a>
      </div>
    );
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. Fixed Top Header Bar                                                   */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-[1005] w-full px-4 sm:px-8 md:px-16 py-4 sm:py-6 md:py-8 pointer-events-none select-none font-parkinsans">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between pointer-events-auto">
          {/* Brand Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname === "/") {
                setIsOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                triggerTransition(
                  () => {
                    setIsOpen(false);
                    navigate("/");
                  },
                  { showBrandText: true }
                );
              }
            }}
            aria-label="Boot2Boot Home"
            className="group flex items-center cursor-pointer"
          >
            <div className="relative flex items-center justify-center">
              {/* White Ambient Glow in Hero Section */}
              <div
                className={`absolute -inset-1 sm:-inset-1.5 rounded-xl sm:rounded-2xl bg-white/20 blur-md transition-opacity duration-500 pointer-events-none ${
                  isHero ? "opacity-100" : "opacity-0"
                }`}
              />

              <img
                src={boot2bootLogo}
                alt="Boot2Boot Logo"
                className={`w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 object-contain relative z-10 transition-all duration-500 ${
                  isHero ? "logo-white-glow" : "logo-standard"
                }`}
              />
            </div>
          </a>

          {/* Hamburger Bar Container Div */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className={`relative flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-full transition-colors duration-300 cursor-pointer ${
                isOpen
                  ? "bg-white border border-white"
                  : "bg-[#1c1d1f]/85 border border-white/20 backdrop-blur-xl hover:border-white/50"
              }`}
            >
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                <span
                  ref={topLineRef}
                  className={`absolute w-4 sm:w-5 h-[2px] rounded-full will-change-transform transition-colors duration-300 ${
                    isOpen ? "bg-[#222426]" : "bg-white"
                  }`}
                />
                <span
                  ref={bottomLineRef}
                  className={`absolute w-4 sm:w-5 h-[2px] rounded-full will-change-transform transition-colors duration-300 ${
                    isOpen ? "bg-[#222426]" : "bg-white"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. Fullscreen Horizontal Cutting Slice Overlay                            */}
      {/* ========================================================================= */}
      <div
        ref={overlayRef}
        style={{ visibility: "hidden", opacity: 0 }}
        className="fixed inset-0 z-[1002] h-full w-full overflow-hidden font-parkinsans select-none pointer-events-none"
      >
        {/* Horizontal Staggered Cutting/Slicing Background Panels with Sub-pixel gap prevention */}
        <div className="absolute inset-0 z-0 flex flex-col w-full h-full pointer-events-none overflow-hidden">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              ref={(el) => (horizontalSlicesRef.current[i] = el)}
              className="w-full h-[calc(20%+2px)] -mb-[2px] bg-[#222426] will-change-transform"
            />
          ))}
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 pt-28 sm:pt-36 pb-10 sm:pb-14 flex flex-col justify-between">
          {/* Main Grid: Two-Column Nav Alignment & Social Column */}
          <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            {/* Left Side: Two Side-by-Side Columns */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-14 md:gap-20 items-start">
                {/* Column 1: Home, Services, Works, Careers */}
                <div className="flex flex-col space-y-1 sm:space-y-2 md:space-y-3">
                  {col1Items.map((item, idx) => renderNavItem(item, idx))}
                </div>

                {/* Column 2: Blog, Contact, Meet the Team */}
                <div className="flex flex-col space-y-1 sm:space-y-2 md:space-y-3">
                  {col2Items.map((item, idx) =>
                    renderNavItem(item, col1Items.length + idx)
                  )}
                </div>
              </div>
            </div>

            {/* Right Side: Social Links */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center pt-4 lg:pt-0">
              <ul className="flex flex-col space-y-1 sm:space-y-1.5 text-left lg:text-right">
                {socialLinks.map((social, index) => (
                  <li
                    key={social.label}
                    ref={(el) => (socialItemsRef.current[index] = el)}
                    className="will-change-transform"
                  >
                    <TextRollEffect
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base md:text-lg font-medium inline-block py-0.5"
                      textColor="text-neutral-300"
                      hoverColor="text-[#E0FE9B]"
                      duration={0.28}
                    >
                      {social.label}
                    </TextRollEffect>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Footer Details with Divider Line */}
          <div
            ref={footerRef}
            className="w-full flex items-end justify-between text-xs sm:text-sm text-neutral-400 font-sans pt-6 border-t border-white/10 will-change-transform"
          >
            {/* Left Footer: COPYRIGHT */}
            <div className="flex flex-col space-y-1">
              <h4 className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 font-semibold">
                COPYRIGHT
              </h4>
              <div className="text-white font-medium">
                © {new Date().getFullYear()} Boot2Boot Agency
              </div>
            </div>

            {/* Right Footer: DESIGN */}
            <div className="flex flex-col space-y-1 text-right">
              <h4 className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 font-semibold">
                DESIGN
              </h4>
              <a
                href="#"
                className="group inline-flex items-center gap-1.5 text-white font-medium hover:text-[#E0FE9B] transition-colors"
              >
                <span>Boot2Boot Agency</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
