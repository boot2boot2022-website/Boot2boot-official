import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { blogs } from "../data/Blog-data/blog";
import Boot2BootFooter from "../components/Boot2BootFooter";
import { usePageTransition } from "../components/PageTransition";
import WordReveal from "../animated-reusable-component/WordReveal";

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { triggerTransition, isTransitioning } = usePageTransition();
  const pageContainerRef = useRef(null);

  // Find the matching article by slug
  const article = blogs.find((b) => b.slug === slug);

  // Related articles (exclude current)
  const relatedArticles = blogs.filter((b) => b.slug !== slug).slice(0, 3);

  // Smooth back navigation
  const handleBackToBlog = (e) => {
    e.preventDefault();
    triggerTransition(
      () => {
        navigate("/blog");
      },
      { showBrandText: false }
    );
  };

  // Navigate to another article
  const handleArticleClick = (targetSlug) => {
    triggerTransition(
      () => {
        navigate(`/blog/${targetSlug}`);
        window.scrollTo({ top: 0, behavior: "instant" });
      },
      { showBrandText: false }
    );
  };

  // Entrance animation once transition is finished
  useEffect(() => {
    if (isTransitioning || !pageContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".article-animate-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.05,
        }
      );
    }, pageContainerRef);

    return () => ctx.revert();
  }, [slug, isTransitioning]);

  // Handle 404 / Article Not Found
  if (!article) {
    return (
      <div className="min-h-screen bg-[#f7f7f8] text-neutral-900 font-parkinsans flex flex-col justify-between pt-36">
        <div className="max-w-3xl mx-auto px-6 text-center py-20">
          <h1 className="text-5xl font-extrabold text-neutral-950 mb-4">
            Article Not Found
          </h1>
          <p className="text-neutral-600 mb-8">
            The article you are looking for does not exist or may have been moved.
          </p>
          <button
            onClick={handleBackToBlog}
            className="inline-flex items-center gap-2 bg-[#222426] text-white px-6 py-3 rounded-full font-medium hover:bg-[#E0FE9B] hover:text-black transition-colors cursor-pointer"
          >
            ← Back to All Articles
          </button>
        </div>
        <Boot2BootFooter text="BOOT2BOOT" />
      </div>
    );
  }

  const isWhitepaper = article.badge === "Whitepaper";
  const content = article.content || {};

  return (
    <div
      ref={pageContainerRef}
      className="min-h-screen bg-[#f7f7f8] text-neutral-900 font-parkinsans"
    >
      {/* Article Main Container */}
      <main className="max-w-[1200px] mx-auto px-6 sm:px-10 md:px-16 pt-28 sm:pt-36 pb-20">
        {/* Back Link Button */}
        <div className="article-animate-item mb-8 sm:mb-12">
          <button
            onClick={handleBackToBlog}
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-widest text-neutral-500 hover:text-neutral-950 transition-colors cursor-pointer"
          >
            <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">
              ←
            </span>
            <span>Back to All Articles</span>
          </button>
        </div>

        {/* Article Header Section */}
        <header className="article-animate-item max-w-4xl mb-10 sm:mb-14">
          {/* Badge & Category Row */}
          <div className="flex items-center flex-wrap gap-2.5 text-xs mb-4">
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
                Insight
              </span>
            )}

            <span className="text-neutral-500 font-medium text-xs">
              ( {article.category} )
            </span>
          </div>

          {/* Article Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-950 tracking-tight leading-[1.12] mb-8">
            {article.title}
          </h1>

          {/* Author Details & Date / Read Time Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-neutral-300">
            {article.author && (
              <div className="flex items-center gap-3.5">
                {article.author.avatar && (
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-11 h-11 rounded-full object-cover border border-neutral-300 shadow-sm"
                  />
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-neutral-950">
                    {article.author.name}
                  </span>
                  <span className="text-xs text-neutral-500 font-normal">
                    {article.author.role}
                  </span>
                </div>
              </div>
            )}

            {/* Date & Read Time placed in front / right of Author */}
            <div className="flex items-center gap-2.5 text-xs font-mono text-neutral-500 sm:ml-auto">
              <span>{article.date}</span>
              {article.readTime && (
                <>
                  <span className="text-neutral-400">·</span>
                  <span className="uppercase">{article.readTime}</span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="article-animate-item relative overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200/80 bg-neutral-100 w-full mb-12 sm:mb-16 shadow-sm">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-auto block"
          />
        </div>

        {/* Article Body Content */}
        <article className="article-animate-item max-w-3xl mx-auto space-y-8 text-neutral-800 text-base sm:text-lg leading-relaxed">
          {article.htmlContent ? (
            <div
              className="space-y-6"
              dangerouslySetInnerHTML={{ __html: article.htmlContent }}
            />
          ) : (
            <>
              {/* Lead Intro Paragraph */}
              {content.intro ? (
                <p className="text-lg sm:text-xl font-normal text-neutral-900 leading-relaxed pb-4 border-b border-neutral-200">
                  {content.intro}
                </p>
              ) : article.description ? (
                <p className="text-lg sm:text-xl font-normal text-neutral-900 leading-relaxed pb-4 border-b border-neutral-200">
                  {article.description}
                </p>
              ) : null}

              {/* Dynamic Content Sections */}
              {content.sections && content.sections.length > 0 ? (
                content.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4 pt-4">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                      {section.heading}
                    </h2>
                    <p className="text-neutral-700 leading-relaxed">
                      {section.body}
                    </p>

                    {section.bulletPoints && section.bulletPoints.length > 0 && (
                      <ul className="space-y-2.5 my-4 pl-1">
                        {section.bulletPoints.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E0FE9B] mt-2.5 flex-shrink-0" />
                            <span className="text-neutral-800">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              ) : (
                <div className="space-y-6">
                  <p>
                    In today's fast-paced digital ecosystem, creating resilient, scalable, and high-impact digital products requires an uncompromising focus on precision engineering, thoughtful architecture, and refined user experience.
                  </p>
                  <p>
                    As organizations scale, the need for modular design systems, robust cloud infrastructure, and autonomous agent workflows becomes the cornerstone of sustainable competitive advantage.
                  </p>
                </div>
              )}

              {/* Pull Quote Box */}
              {content.quote && (
                <blockquote className="my-10 p-6 sm:p-8 rounded-2xl bg-neutral-100/90 border-l-4 border-[#E0FE9B] space-y-3">
                  <p className="text-lg sm:text-xl font-medium italic text-neutral-950 leading-relaxed">
                    "{content.quote.text}"
                  </p>
                  {content.quote.author && (
                    <cite className="block text-xs uppercase tracking-widest text-neutral-500 not-italic font-semibold">
                      — {content.quote.author}, {content.quote.role}
                    </cite>
                  )}
                </blockquote>
              )}

              {/* Conclusion */}
              {content.conclusion && (
                <div className="pt-4 border-t border-neutral-200">
                  <h3 className="text-xl font-bold text-neutral-950 mb-3">
                    Key Summary
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    {content.conclusion}
                  </p>
                </div>
              )}
            </>
          )}
        </article>

        {/* ========================================================================= */}
        {/* Up Next / Related Articles Section                                        */}
        {/* ========================================================================= */}
        {relatedArticles.length > 0 && (
          <section className="pt-16 sm:pt-20 mt-16 sm:mt-20 border-t border-neutral-300">
            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <WordReveal
                text="Related Stories"
                as="h2"
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-neutral-950"
              />
              <button
                onClick={handleBackToBlog}
                className="text-xs uppercase font-semibold tracking-wider text-neutral-500 hover:text-neutral-950 transition-colors cursor-pointer"
              >
                View All →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {relatedArticles.map((rel) => {
                const isRelWhitepaper = rel.badge === "Whitepaper";
                return (
                  <article
                    key={rel.slug}
                    onClick={() => handleArticleClick(rel.slug)}
                    className="group flex flex-col space-y-3 cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-xl bg-neutral-100 aspect-[16/10] w-full">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex items-center flex-wrap gap-2 text-xs pt-1">
                      {isRelWhitepaper ? (
                        <span className="inline-flex items-center gap-1 bg-[#00dc23] text-white font-bold text-[10px] px-1.5 py-0.5 rounded-[2px] tracking-wide uppercase">
                          Whitepaper
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-[#ffe600] text-black font-extrabold text-[10px] px-1.5 py-0.5 rounded-[2px] tracking-wide uppercase">
                          Insight
                        </span>
                      )}
                      <span className="text-neutral-500 font-normal text-[11px]">
                        ( {rel.category} )
                      </span>
                    </div>

                    <h3 className="text-base font-normal text-neutral-950 tracking-tight leading-snug line-clamp-2">
                      {rel.title}
                    </h3>
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
