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

  const displayBlogs = blogs.slice(0, 3);

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
        <div className="flex flex-col items-center justify-center text-center space-y-4 pb-8 border-b border-neutral-200 w-full">
          <WordReveal
            text="Blog"
            as="h2"
            splitBy="letters"
            className="w-full justify-center text-center text-3xl sm:text-5xl font-medium text-neutral-950 tracking-tight leading-tight"
            scrollStart="top 90%"
            stagger={0.07}
            duration={0.8}
          />
        </div>

        {/* 3-Blog Responsive Grid - uniform aspect ratio to prevent image cropping & maintain clean alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 items-start">
          {displayBlogs.map((blog, idx) => {
            const isWhitepaper = blog.badge === "Whitepaper";

            return (
              <article
                key={blog.slug || idx}
                ref={(el) => (cardsRef.current[idx] = el)}
                onClick={() => handleNavigate(blog.slug)}
                className="group flex flex-col space-y-3.5 cursor-pointer"
              >
                {/* Media Container with uniform 3:2 aspect ratio matching the blog cover graphics */}
                <div className="relative overflow-hidden rounded-2xl bg-neutral-100 w-full aspect-[3/2] shadow-sm">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Badge & Category Tag Row */}
                <div className="flex items-center flex-wrap gap-2 text-xs pt-1">
                  {isWhitepaper ? (
                    <span className="inline-flex items-center gap-1 bg-[#00dc23] text-white font-bold text-[10px] px-2 py-0.5 rounded-[2px] tracking-wide uppercase">
                      <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
                      </svg>
                      Whitepaper
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-[#ffe600] text-black font-extrabold text-[10px] px-2 py-0.5 rounded-[2px] tracking-wide uppercase">
                      <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                      </svg>
                      {blog.badge || "Insight"}
                    </span>
                  )}

                  <span className="text-neutral-500 font-normal text-xs">
                    ( {blog.category} )
                  </span>

                  {blog.date && (
                    <>
                      <span className="text-neutral-400">·</span>
                      <span className="text-neutral-500 font-mono text-xs">
                        {blog.date}
                      </span>
                    </>
                  )}

                  {blog.readTime && (
                    <>
                      <span className="text-neutral-400">·</span>
                      <span className="text-neutral-500 font-mono text-xs uppercase">
                        {blog.readTime}
                      </span>
                    </>
                  )}
                </div>

                {/* Post Headline */}
                <h3 className="text-lg sm:text-xl font-normal text-neutral-950 tracking-tight leading-snug line-clamp-3 group-hover:underline underline-offset-2">
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
