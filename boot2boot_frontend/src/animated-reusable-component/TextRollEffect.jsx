import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * TextRollEffect - Tight hitbox text roll:
 * Triggers strictly when hovering directly over the text characters.
 */
const TextRollEffect = ({
  children,
  href = "#",
  className = "",
  textColor = "text-neutral-400",
  hoverColor = "text-white",
  duration = 0.32,
  ease = "power3.out",
  ...props
}) => {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const tlRef = useRef(null);

  useGSAP(
    () => {
      if (!text1Ref.current || !text2Ref.current) return;

      // Set initial positions
      gsap.set(text1Ref.current, { yPercent: 0 });
      gsap.set(text2Ref.current, { yPercent: 100 });

      // Create synchronized dual-layer roll timeline
      const tl = gsap.timeline({ paused: true });

      tl.to(
        text1Ref.current,
        {
          yPercent: -100,
          duration: duration,
          ease: ease,
        },
        0
      ).to(
        text2Ref.current,
        {
          yPercent: 0,
          duration: duration,
          ease: ease,
        },
        0
      );

      tlRef.current = tl;
    },
    { scope: containerRef, dependencies: [children, duration, ease] }
  );

  const handleEnter = () => {
    if (tlRef.current) {
      tlRef.current.play();
    }
  };

  const handleLeave = () => {
    if (tlRef.current) {
      tlRef.current.reverse();
    }
  };

  return (
    <a
      ref={containerRef}
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      className={`relative inline-flex flex-col w-fit max-w-max self-start overflow-hidden cursor-pointer select-none whitespace-nowrap leading-tight ${className}`}
      {...props}
    >
      {/* Visible default text layer */}
      <span
        ref={text1Ref}
        className={`inline-block transition-colors duration-200 ${textColor} will-change-transform whitespace-nowrap`}
      >
        {children}
      </span>

      {/* Incoming roll-up text layer positioned directly below */}
      <span
        ref={text2Ref}
        className={`absolute inset-0 inline-flex items-center ${hoverColor} will-change-transform pointer-events-none whitespace-nowrap`}
        aria-hidden="true"
      >
        {children}
      </span>
    </a>
  );
};

export default TextRollEffect;