import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageTransition } from "./PageTransition";
import { blogs } from "../data/Blog-data/blog";
import WordReveal from "../animated-reusable-component/WordReveal";

gsap.registerPlugin(ScrollTrigger);

export default function BlogSection() {
  const navigate = useNavigate();
  const { triggerTransition, isTransitioning } = usePageTransition();
  const cardsRef = useRef([]);

  const handleNavigate = (slug) => {
    triggerTransition(
      () => {
        navigate(`/blog/${slug}`);
      },
      { showBrandText: false }
    );
  };

  const displayBlogs = blogs.slice(0, 4);

  // Staggered scroll-triggered entrance for blog cards
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length || isTransitioning) return;

    const ctx = gsap.context(() => {
      gsap.set(cards, { y: 50, opacity: 0 });

      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cards[0],
          start: "top 92%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [isTransitioning]);

  return (
    <section id="blog" className="relative z-30 w-full bg-[#f7f7f8] text-neutral-900 pt-16 sm:pt-24 pb-20 px-6 sm:px-10 lg:px-16 font-parkinsans overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 pb-8 border-b border-neutral-200">
          <WordReveal
            text="Blog"
            as="h2"
            className="text-3xl sm:text-5xl font-medium text-neutral-950 tracking-tight leading-tight"
            scrollStart="top 90%"
            stagger={0.08}
            duration={0.85}
          />
        </div>

        {/* 4-Blog in a Line Format (1st & 3rd Vertical, 2nd & 4th Horizontal) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 items-start">
          {displayBlogs.map((blog, idx) => {
            const isVertical = idx % 2 === 0;
            const isWhitepaper = idx === 3 || blog.badge === "Whitepaper";

            return (
              <article
                key={blog.slug || idx}
                ref={(el) => (cardsRef.current[idx] = el)}
                onClick={() => handleNavigate(blog.slug)}
                className="group flex flex-col space-y-3 cursor-pointer"
              >
                {/* Media Container with alternating aspect ratio */}
                <div
                  className={`relative overflow-hidden rounded-xl bg-neutral-100 w-full ${isVertical ? "aspect-[3/4]" : "aspect-[16/10]"
                    }`}
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Badge & Category Tag Row */}
                <div className="flex items-center flex-wrap gap-2 text-xs pt-0.5">
                  {isWhitepaper ? (
                    <span className="inline-flex items-center gap-1 bg-[#00dc23] text-white font-bold text-[10px] px-1.5 py-0.5 rounded-[2px] tracking-wide uppercase">
                      <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
                      </svg>
                      Whitepaper
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-[#ffe600] text-black font-extrabold text-[10px] px-1.5 py-0.5 rounded-[2px] tracking-wide uppercase">
                      <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                      </svg>
                      Insight
                    </span>
                  )}

                  <span className="text-neutral-500 font-normal text-[11px]">
                    ( {blog.category} )
                  </span>
                </div>

                {/* Post Headline */}
                <h3 className="text-base sm:text-lg font-normal text-neutral-950 tracking-tight leading-snug line-clamp-3 group-hover:underline underline-offset-2">
                  {blog.title}
                </h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
