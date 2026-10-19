import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { LinkedInIcon, XIcon } from "../icons";
import ButtonHoverAnimation from "../animated-reusable-component/ButtonHover";
import Boot2BootFooter from "../components/Boot2BootFooter";
import { usePageTransition } from "../components/PageTransition";
import CharacterReveal from "../animated-reusable-component/CharacterReveal";
import {
  nikhilKarkera,
  deeptiSeta,
  harshSeta,
  harshaShigwan,
  pritiLondhe,
  sakshiDhamane,
} from "../assets/team-image";

gsap.registerPlugin(useGSAP);

const teamMembers = [
  {
    name: "Nikhil Karkera",
    role: "CEO & Founder",
    image: nikhilKarkera,
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
    },
  },
  {
    name: "Priti Londhe",
    role: "Director",
    image: pritiLondhe,
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
    },
  },
  {
    name: "Deepti Seta",
    role: "Executive Assistant - CEO",
    image: deeptiSeta,
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
    },
  },
  {
    name: "Harsh Seta",
    role: "Deputy Vice President - Sales",
    image: harshSeta,
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
    },
  },
  {
    name: "Harsha Shigwan",
    role: "Senior Developer",
    image: harshaShigwan,
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
    },
  },
  {
    name: "Sakshi Dhamane",
    role: "Digital Marketing Executive",
    image: sakshiDhamane,
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
    },
  },
];

const TeamMemberCard = ({ member }) => {
  const cardRef = useRef(null);
  const imageBoxRef = useRef(null);
  const imageRef = useRef(null);
  const arrowRef = useRef(null);
  const tlRef = useRef(null);

  useGSAP(
    () => {
      if (!imageBoxRef.current) return;

      const getWidth = () => imageBoxRef.current?.offsetWidth || 280;

      // Set initial states proportionally to element width
      gsap.set(imageBoxRef.current, {
        borderRadius: "50%",
        height: () => getWidth(),
      });

      gsap.set(arrowRef.current, {
        opacity: 0,
        x: -6,
        y: 6,
      });

      // Hover Timeline: Morphs Proportional Circle -> Rounded Rectangle
      const tl = gsap.timeline({ paused: true });

      tl.to(
        imageBoxRef.current,
        {
          borderRadius: "28px",
          height: () => Math.round(getWidth() * 1.35),
          duration: 0.5,
          ease: "power3.out",
        },
        0
      )
        .to(
          imageRef.current,
          {
            scale: 1.02,
            duration: 0.5,
            ease: "power2.out",
          },
          0
        )
        .to(
          arrowRef.current,
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          },
          0.1
        );

      tlRef.current = tl;

      const handleResize = () => {
        if (!tl.isActive() && tl.progress() === 0 && imageBoxRef.current) {
          gsap.set(imageBoxRef.current, { height: getWidth() });
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    },
    { scope: cardRef }
  );

  const handleMouseEnter = () => {
    tlRef.current?.play();
  };

  const handleMouseLeave = () => {
    tlRef.current?.reverse();
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col items-center text-center p-4 sm:p-6 md:p-8 rounded-3xl sm:rounded-[36px] md:rounded-[40px] transition-all duration-300 hover:bg-[#E0FE9B] cursor-pointer w-full max-w-[320px] sm:max-w-[340px] md:max-w-[360px] mx-auto"
    >
      {/* Morphing Image Box: Proportional Circle -> Rounded Rectangle */}
      <div
        ref={imageBoxRef}
        className="relative w-full max-w-[260px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[320px] aspect-square rounded-full overflow-hidden bg-[#eaecef] border-2 border-neutral-200/80 group-hover:border-black/10 will-change-[border-radius,height] flex-shrink-0 mx-auto transition-colors duration-300"
        style={{
          borderRadius: "50%",
        }}
      >
        <img
          ref={imageRef}
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top will-change-transform"
        />

        {/* Floating Arrow Icon inside top right of expanded image */}
        <div
          ref={arrowRef}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-neutral-900 pointer-events-none"
        >
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
      </div>

      {/* Team Member Info (Name, Designation & Social Links underneath) */}
      <div className="mt-4 sm:mt-5 md:mt-6 w-full flex flex-col items-center">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight group-hover:text-black transition-colors font-parkinsans leading-tight">
          {member.name}
        </h3>
        <p className="text-xs sm:text-sm md:text-base font-medium text-neutral-600 group-hover:text-neutral-800 mt-1 sm:mt-1.5 font-parkinsans transition-colors">
          {member.role}
        </p>

        {/* Social Media Links after Designation */}
        <div className="flex items-center gap-2.5 mt-3 pt-0.5">
          {member.socials?.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} LinkedIn`}
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full bg-neutral-200/90 group-hover:bg-black/10 hover:!bg-neutral-900 text-neutral-800 hover:!text-[#E0FE9B] flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
          )}
          {member.socials?.twitter && (
            <a
              href={member.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} X`}
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full bg-neutral-200/90 group-hover:bg-black/10 hover:!bg-neutral-900 text-neutral-800 hover:!text-[#E0FE9B] flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs"
            >
              <XIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const MeetTheTeam = () => {
  const dividerRef = useRef(null);
  const { isTransitioning } = usePageTransition();

  // GSAP Entrance Animation for Divider Line
  useEffect(() => {
    const divider = dividerRef.current;
    if (!divider) return;

    // While transition curtain covers the screen, keep divider in hidden state
    if (isTransitioning) {
      gsap.set(divider, {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "center center",
      });
      return;
    }

    // Once page is revealed, play the entrance animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      gsap.set(divider, {
        scaleX: 0,
        opacity: 1,
        transformOrigin: "center center",
      });

      tl.to(divider, {
        scaleX: 1,
        duration: 1.0,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [isTransitioning]);

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-neutral-900 font-parkinsans">
      <main className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 pt-20 sm:pt-24 md:pt-28 pb-20">
        {/* ========================================================================= */}
        {/* 1. Page Header with CharacterReveal Component (Identical to Blog & Work)  */}
        {/* ========================================================================= */}
        <div className="mb-12 sm:mb-16 text-center" style={{ perspective: "1000px" }}>
          <CharacterReveal
            text="MEET THE TEAM"
            as="h1"
            className="text-2xl min-[360px]:text-3xl min-[410px]:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light inline-flex items-center justify-center px-1 sm:px-3 tracking-tight text-neutral-950 uppercase leading-none"
            delay={0.08}
            stagger={0.08}
            duration={0.95}
          />

          {/* Thin Horizontal Divider Line */}
          <div
            ref={dividerRef}
            className="w-full h-[1px] bg-neutral-300 mt-3 sm:mt-4 origin-center scale-x-0 will-change-transform"
          />
        </div>

        {/* Team Grid with GSAP Circle-to-Image Hover Morph */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-16 sm:mb-24 justify-items-center items-start">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <div id="contact">
        <Boot2BootFooter text="BOOT2BOOT" />
      </div>
    </div>
  );
};

export default MeetTheTeam;
