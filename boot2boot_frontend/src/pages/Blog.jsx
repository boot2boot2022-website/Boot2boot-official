import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { blogs } from "../data/Blog-data/blog";
import Boot2BootFooter from "../components/Boot2BootFooter";
import { usePageTransition } from "../components/PageTransition";
import WordReveal from "../animated-reusable-component/WordReveal";

export default function Blog() {
  const navigate = useNavigate();
  const dividerRef = useRef(null);
  const heroRef = useRef(null);
  const { triggerTransition, isTransitioning } = usePageTransition();

  const handleNavigate = (slug) => {
    triggerTransition(
      () => {
        navigate(`/blog/${slug}`);
        window.scrollTo({ top: 0, behavior: "instant" });
      },
      { showBrandText: false }
    );
  };

  // Top featured advertisement banner
  const featuredAd = blogs[0];

  // Remaining articles for the All Blogs section
  const remainingBlogs = blogs.slice(1);


  // GSAP Entrance Animation for Divider and Hero Card
  useEffect(() => {
    const divider = dividerRef.current;
    const hero = heroRef.current;

    // While transition curtain covers the screen, keep elements primed in hidden state
    if (isTransitioning) {
      if (divider) {
        gsap.set(divider, {
          scaleX: 0,
          opacity: 0,
          transformOrigin: "center center",
        });
      }
      if (hero) {
        gsap.set(hero, { y: 35, opacity: 0 });
      }
      return;
    }

    // Once page is revealed (on initial refresh or navigation), play the entrance animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      // 1. Horizontal Divider growing from center
      if (divider) {
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
      }

      // 2. Featured Hero Card fading and sliding up
      if (hero) {
        gsap.set(hero, { y: 35, opacity: 0 });
        tl.to(
          hero,
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }
    });

    return () => ctx.revert();
  }, [isTransitioning]);

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-neutral-900 font-parkinsans">
      {/* Main Page Container */}
      <main className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 pt-20 sm:pt-24 md:pt-28 pb-20">
        {/* ========================================================================= */}
        {/* 1. Page Header with Reusable WordReveal Component                         */}
        {/* ========================================================================= */}
        <div className="mb-8 sm:mb-10 text-center" style={{ perspective: "1000px" }}>
          <WordReveal
            text="BLOG"
            as="h1"
            className="w-full justify-center text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-neutral-950 uppercase leading-none"
            scrollStart="top 95%"
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

        {/* ========================================================================= */}
        {/* 2. Top Featured / Advertisement Hero Banner                                */}
        {/* ========================================================================= */}
        {featuredAd && (
          <section ref={heroRef} className="mb-16 will-change-transform">
            <article
              onClick={() => handleNavigate(featuredAd.slug)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Full-width High-Impact Banner Image */}
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-neutral-200/80 bg-neutral-100 w-full mb-6 aspect-[16/10] sm:aspect-[3/2]">
                <img
                  src={featuredAd.image}
                  alt={featuredAd.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>

              {/* Details below image */}
              <div className="max-w-4xl flex flex-col space-y-3">
                {/* Badge & Meta row */}
                <div className="flex items-center flex-wrap gap-2.5 text-xs">
                  <span className="inline-flex items-center gap-1 bg-[#ffe600] text-black font-extrabold text-[10px] px-2 py-0.5 rounded-[2px] tracking-wide uppercase">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                    </svg>
                    Insight
                  </span>

                  <span className="text-neutral-500 font-medium text-xs">
                    ( {featuredAd.category} )
                  </span>

                  <span className="text-neutral-400">·</span>

                  <span className="text-neutral-500 font-mono text-xs">
                    {featuredAd.date}
                  </span>
                </div>

                {/* Headline */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-neutral-950 tracking-tight leading-[1.15] group-hover:underline underline-offset-4 decoration-1">
                  {featuredAd.title}
                </h2>
              </div>
            </article>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 3. "All Blogs" Section (Alternating 3-Blog & 4-Blog Layouts)               */}
        {/* ========================================================================= */}
        {remainingBlogs.length > 0 && (
          <section className="pt-12 border-t border-neutral-300">
            <div className="flex items-center justify-between mb-10 sm:mb-12">
              <WordReveal
                text="All Articles"
                as="h2"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-neutral-950"
                scrollStart="top 95%"
                stagger={0.08}
                duration={0.85}
              />
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest font-semibold">
                {blogs.length} Stories
              </span>
            </div>

            {/* All Articles Grid - Uniform Responsive Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 items-start">
              {remainingBlogs.map((blog, idx) => {
                const isWhitepaper = blog.badge === "Whitepaper";

                return (
                  <article
                    key={blog.slug || idx}
                    onClick={() => handleNavigate(blog.slug)}
                    className="group flex flex-col space-y-3.5 cursor-pointer"
                  >
                    {/* Media Container with uniform 3:2 aspect ratio matching cover graphics */}
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
                    </div>

                    {/* Post Headline */}
                    <h3 className="text-lg sm:text-xl font-normal text-neutral-950 tracking-tight leading-snug line-clamp-3 group-hover:underline underline-offset-2">
                      {blog.title}
                    </h3>

                    {/* Excerpt Description */}
                    {blog.description && (
                      <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed font-sans">
                        {blog.description}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Boot2BootFooter text="BOOT2BOOT" />
    </div>
  );
}