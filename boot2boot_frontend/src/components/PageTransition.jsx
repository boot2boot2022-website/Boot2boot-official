import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import gsap from "gsap";

const PageTransitionContext = createContext({
  triggerTransition: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(PageTransitionContext);

export function PageTransitionProvider({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const contentRef = useRef(null);
  const letterRefs = useRef([]);
  const activeTimeline = useRef(null);

  const brandText = "BOOT2BOOT";

  const triggerTransition = useCallback((onMidpoint, options) => {
    if (activeTimeline.current) {
      activeTimeline.current.kill();
    }

    setIsTransitioning(true);

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const content = contentRef.current;
    const letters = letterRefs.current.filter(Boolean);

    // Determine options: isInitial (first time load / refresh) or navigating to Home
    const isInitial = Boolean(typeof options === "object" && options?.isInitial);
    let showBrandText = false;
    if (isInitial) {
      showBrandText = true;
    } else if (typeof options === "boolean") {
      showBrandText = options;
    } else if (typeof options === "object" && options !== null) {
      if (options.showBrandText !== undefined) {
        showBrandText = Boolean(options.showBrandText);
      } else if (options.to === "/" || options.to === "#hero") {
        showBrandText = true;
      }
    } else if (typeof options === "string" && (options === "/" || options === "#hero")) {
      showBrandText = true;
    }

    if (!overlay || !panel) {
      if (onMidpoint) onMidpoint();
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setIsTransitioning(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
        gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
        gsap.set(panel, { xPercent: -150 });
        if (content) {
          gsap.set(content, { autoAlpha: 0 });
        }
      },
    });

    activeTimeline.current = tl;

    if (isInitial) {
      // =======================================================================
      // Mode 1: First Time Load / Page Refresh -> Curtain pre-covers screen,
      // BOOT2BOOT pops out, then sweeps off to reveal the page
      // =======================================================================
      gsap.set(overlay, {
        autoAlpha: 1,
        pointerEvents: "auto",
      });
      gsap.set(panel, {
        xPercent: 0,
        force3D: true,
      });
      if (content) {
        gsap.set(content, { autoAlpha: 1, visibility: "visible", opacity: 1 });
      }
      if (letters.length > 0) {
        gsap.set(letters, {
          yPercent: 120,
          rotateX: 45,
          scale: 0.8,
          opacity: 0,
          transformOrigin: "50% 100%",
          force3D: true,
        });
      }

      // 1. BOOT2BOOT letters pop out with 3D spring
      if (letters.length > 0) {
        tl.to(
          letters,
          {
            yPercent: 0,
            rotateX: 0,
            scale: 1,
            opacity: 1,
            duration: 0.75,
            ease: "back.out(2)",
            stagger: 0.05,
          },
          0.15
        );
      }

      // 2. Midpoint action: Reset scroll to top
      tl.call(() => {
        if (onMidpoint) onMidpoint();
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });

      // 3. Balanced pause for readability
      tl.to({}, { duration: 0.55 });

      // 4. Letters slide upwards and fade out
      if (letters.length > 0) {
        tl.to(
          letters,
          {
            yPercent: -120,
            rotateX: -45,
            scale: 0.8,
            opacity: 0,
            duration: 0.35,
            ease: "power3.in",
            stagger: 0.02,
          },
          "+=0.04"
        );
      }

      // 5. Curtain sweeps off to Right revealing the page
      tl.to(
        panel,
        {
          xPercent: 150,
          duration: 0.8,
          ease: "expo.inOut",
        },
        "-=0.1"
      );
    } else if (showBrandText) {
      // =======================================================================
      // Mode 2: Redirecting to HOME -> Full curtain sweep with BOOT2BOOT text
      // =======================================================================
      gsap.set(overlay, {
        autoAlpha: 1,
        pointerEvents: "auto",
      });
      gsap.set(panel, {
        xPercent: -150,
        force3D: true,
      });
      if (content) {
        gsap.set(content, { autoAlpha: 1, visibility: "visible", opacity: 1 });
      }
      if (letters.length > 0) {
        gsap.set(letters, {
          yPercent: 120,
          rotateX: 45,
          scale: 0.8,
          opacity: 0,
          transformOrigin: "50% 100%",
          force3D: true,
        });
      }

      // 1. Curtain sweeps in from Left to cover screen
      tl.to(panel, {
        xPercent: 0,
        duration: 0.75,
        ease: "expo.inOut",
      });

      // 2. BOOT2BOOT letters pop out with 3D spring once curtain covers screen
      if (letters.length > 0) {
        tl.to(
          letters,
          {
            yPercent: 0,
            rotateX: 0,
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: "back.out(2)",
            stagger: 0.05,
          },
          "-=0.3"
        );
      }

      // 3. Midpoint action: Execute route change and reset scroll
      tl.call(() => {
        if (onMidpoint) onMidpoint();
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });

      // 4. Balanced pause for readability
      tl.to({}, { duration: 0.45 });

      // 5. Letters slide upwards and fade out
      if (letters.length > 0) {
        tl.to(
          letters,
          {
            yPercent: -120,
            rotateX: -45,
            scale: 0.8,
            opacity: 0,
            duration: 0.35,
            ease: "power3.in",
            stagger: 0.02,
          },
          "+=0.04"
        );
      }

      // 6. Curtain sweeps off to Right
      tl.to(
        panel,
        {
          xPercent: 150,
          duration: 0.8,
          ease: "expo.inOut",
        },
        "-=0.1"
      );
    } else {
      // =======================================================================
      // Mode 3: Other Pages -> Clean, fast #E0FE9B curtain sweep (No text)
      // =======================================================================
      gsap.set(overlay, {
        autoAlpha: 1,
        pointerEvents: "auto",
      });
      gsap.set(panel, {
        xPercent: -150,
        force3D: true,
      });
      if (content) {
        gsap.set(content, { autoAlpha: 0 });
      }

      // 1. Curtain sweeps in swiftly from Left
      tl.to(panel, {
        xPercent: 0,
        duration: 0.65,
        ease: "power4.inOut",
      });

      // 2. Midpoint action: Execute route change and reset scroll
      tl.call(() => {
        if (onMidpoint) onMidpoint();
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });

      // 3. Subtle settle hold for layout
      tl.to({}, { duration: 0.08 });

      // 4. Curtain sweeps off to Right revealing the page
      tl.to(panel, {
        xPercent: 150,
        duration: 0.65,
        ease: "power4.inOut",
      });
    }
  }, []);

  return (
    <PageTransitionContext.Provider
      value={{ triggerTransition, isTransitioning }}
    >
      {children}

      {/* ========================================================================= */}
      {/* Fullscreen Transition Overlay Container                                   */}
      {/* Only active during explicit page-to-page navigation                       */}
      {/* ========================================================================= */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] h-full w-full pointer-events-none select-none overflow-hidden"
        style={{ opacity: 0 }}
      >
        {/* Fullscreen Curtain Panel in brand lime #E0FE9B */}
        <div
          ref={panelRef}
          className="absolute top-[-25vh] md:top-[-15vh] left-[-75vw] md:left-[-30vw] w-[250vw] md:w-[160vw] h-[150vh] md:h-[130vh] bg-[#E0FE9B] flex items-center justify-center shadow-[0_0_60px_rgba(0,0,0,0.35)] will-change-transform"
        >
          {/* Typography Container */}
          <div
            ref={contentRef}
            className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 will-change-transform"
            style={{ visibility: "hidden", perspective: "1000px" }}
          >
            {/* Main Brand Heading with 3D Staggered Letter Mask */}
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium text-[#18191b] tracking-tight uppercase font-parkinsans flex items-center justify-center overflow-hidden py-4 select-none">
              {brandText.split("").map((char, index) => (
                <span
                  key={index}
                  className="inline-block overflow-hidden py-1 px-[1px]"
                >
                  <span
                    ref={(el) => (letterRefs.current[index] = el)}
                    className="inline-block will-change-transform"
                  >
                    {char}
                  </span>
                </span>
              ))}
            </h2>
          </div>
        </div>
      </div>
    </PageTransitionContext.Provider>
  );
}

export default PageTransitionProvider;
