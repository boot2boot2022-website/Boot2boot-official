import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const ButtonHoverAnimation = ({
  text = "Home",
  children,
  href,
  as,
  type = "button",
  variant = "dark", // "dark" (for dark bg) or "light" (for light bg)
  textColor,
  hoverTextColor,
  fillBg,
  className = "",
  buttonScale = 1.04,
  fillDuration = 0.45,
  ...props
}) => {
  const linkRef = useRef(null);
  const fillRef = useRef(null);
  const textRef = useRef(null);
  const label = text || children;

  const isLightVariant = variant === "light";
  const defaultTextColor = textColor || (isLightVariant ? "#000000" : "#ffffff");
  const defaultHoverColor = hoverTextColor || "#18191b";
  const defaultFillBg = fillBg || "bg-[#E0FE9B]";

  // Determine element type: <button> or <a>
  const Component = as || (href ? "a" : "button");

  // Initialize fill layer anchored at lower/bottom center, collapsed to small (scale: 0)
  useGSAP(
    () => {
      if (fillRef.current) {
        gsap.set(fillRef.current, {
          scale: 0,
          transformOrigin: "center bottom",
        });
      }
      if (textRef.current) {
        gsap.set(textRef.current, { color: defaultTextColor });
      }
    },
    { scope: linkRef, dependencies: [defaultTextColor] }
  );

  const handleMouseEnter = () => {
    const link = linkRef.current;
    const fill = fillRef.current;
    const textEl = textRef.current;
    if (!link || !fill) return;

    gsap.killTweensOf([link, fill, textEl]);

    // Button pulse: scales slightly while filling, settles to normal (1.0) when filled
    gsap.timeline()
      .to(link, {
        scale: buttonScale,
        duration: fillDuration * 0.4,
        ease: "sine.out",
      })
      .to(link, {
        scale: 1,
        duration: fillDuration * 0.6,
        ease: "sine.inOut",
      });

    // Fill expands from small at the lower edge to full button size
    gsap.to(fill, {
      scale: 1,
      duration: fillDuration,
      ease: "power2.out",
      transformOrigin: "center bottom",
    });

    // Text color transition on hover
    if (textEl) {
      gsap.to(textEl, {
        color: defaultHoverColor,
        duration: fillDuration * 0.5,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    const link = linkRef.current;
    const fill = fillRef.current;
    const textEl = textRef.current;
    if (!link || !fill) return;

    gsap.killTweensOf([link, fill, textEl]);

    // Return button scale to normal
    gsap.to(link, {
      scale: 1,
      duration: 0.3,
      ease: "sine.out",
    });

    // Fill shrinks smoothly back down to small at the lower edge
    gsap.to(fill, {
      scale: 0,
      duration: fillDuration * 0.75,
      ease: "power2.inOut",
      transformOrigin: "center bottom",
    });

    // Text returns to initial color
    if (textEl) {
      gsap.to(textEl, {
        color: defaultTextColor,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const defaultBorderClasses = isLightVariant
    ? "border-neutral-950/40 hover:border-[#E0FE9B]"
    : "border-white/30 hover:border-[#E0FE9B]";

  return (
    <Component
      ref={linkRef}
      {...(Component === "a" ? { href: href || "#" } : { type })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative
        inline-flex
        items-center
        justify-center
        overflow-hidden
        rounded-full
        border
        ${defaultBorderClasses}
        bg-transparent
        px-7
        py-2.5
        text-sm
        font-medium
        tracking-wide
        cursor-pointer
        transition-colors
        duration-300
        will-change-transform
        ${className}
      `}
      {...props}
    >
      {/* Expanding fill anchored at the bottom center */}
      <span
        ref={fillRef}
        className={`
          pointer-events-none
          absolute
          inset-0
          h-full
          w-full
          rounded-full
          ${defaultFillBg}
          will-change-transform
        `}
      />

      {/* Button text */}
      <span
        ref={textRef}
        className="
          relative
          z-10
          font-medium
          select-none
          pointer-events-none
        "
      >
        {label}
      </span>
    </Component>
  );
};

export default ButtonHoverAnimation;