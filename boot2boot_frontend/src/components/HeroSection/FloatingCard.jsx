import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const FloatingCard = ({
  x = 0,
  y = 0,
  z = 0,
  delay = 0,
  children,
}) => {
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        delay,
      });

      // Starting position
      gsap.set(cardRef.current, {
        x,
        y,
        z,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
      });

      // Move to one side
      tl.to(cardRef.current, {
        x: x + 100,
        y: y - 60,
        z: z + 100,
        rotateX: 8,
        rotateY: 15,
        rotateZ: 5,
        duration: 4,
        ease: "sine.inOut",
      });

      // Move to the other side
      tl.to(cardRef.current, {
        x: x - 80,
        y: y + 50,
        z: z - 70,
        rotateX: -6,
        rotateY: -12,
        rotateZ: -4,
        duration: 5,
        ease: "sine.inOut",
      });

    }, cardRef);

    return () => ctx.revert();
  }, [x, y, z, delay]);

  return (
    <div
      ref={cardRef}
      className="absolute w-30 h-41.25 rounded-2xl overflow-hidden"
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

export default FloatingCard;