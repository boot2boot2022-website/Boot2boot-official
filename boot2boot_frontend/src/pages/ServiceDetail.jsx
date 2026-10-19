import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { getServiceBySlug, getAllServices } from "../data/shapeServicesData";
import Boot2BootFooter from "../components/Boot2BootFooter";
import { usePageTransition } from "../components/PageTransition";
import WordReveal from "../animated-reusable-component/WordReveal";

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { triggerTransition, isTransitioning } = usePageTransition();
  const pageContainerRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);

  // Lookup service from comprehensive dataset
  const service = getServiceBySlug(slug);
  const allServices = getAllServices();

  // Related services (exclude current, prefer same category or diverse capabilities)
  const relatedServices = allServices
    .filter((s) => s.slug !== service?.slug && s.id !== service?.id)
    .slice(0, 3);

  // Smooth back navigation to /services
  const handleBackToServices = (e) => {
    e?.preventDefault();
    triggerTransition(
      () => {
        navigate("/services");
      },
      { showBrandText: false }
    );
  };

  // Navigate to another service detail page
  const handleServiceClick = (targetSlug) => {
    triggerTransition(
      () => {
        navigate(`/services/${targetSlug}`);
        window.scrollTo({ top: 0, behavior: "instant" });
      },
      { showBrandText: false }
    );
  };

  // Smooth scroll to bottom contact section
  const handleContactClick = (e) => {
    e?.preventDefault();
    const contactEl = document.querySelector("#contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#contact");
    }
  };

  // Entrance animation once transition is finished
  useEffect(() => {
    if (isTransitioning || !pageContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-animate-item",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.05,
        }
      );
    }, pageContainerRef);

    return () => ctx.revert();
  }, [slug, isTransitioning]);

  // Handle 404 / Service Not Found
  if (!service) {
    return (
      <div className="min-h-screen bg-[#f7f7f8] text-neutral-900 font-parkinsans flex flex-col justify-between pt-36">
        <div className="max-w-3xl mx-auto px-6 text-center py-20">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
            Error 404
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-950 mb-4">
            Service Not Found
          </h1>
          <p className="text-neutral-600 mb-8 max-w-md mx-auto text-sm sm:text-base">
            We couldn’t find the service capability you’re looking for. It may have been renamed or relocated.
          </p>
          <button
            onClick={handleBackToServices}
            className="inline-flex items-center gap-2 bg-[#1c1d1f] text-white px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-[#E0FE9B] hover:text-neutral-950 transition-all cursor-pointer shadow-lg"
          >
            ← Back to All Services
          </button>
        </div>
        <Boot2BootFooter text="BOOT2BOOT" />
      </div>
    );
  }

  return (
    <div
      ref={pageContainerRef}
      className="min-h-screen bg-[#f7f7f8] text-neutral-900 font-parkinsans selection:bg-[#E0FE9B] selection:text-neutral-950"
    >
      {/* Main Service Detail Container */}
      <main className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16 pt-28 sm:pt-36 pb-20">
        {/* ========================================================================= */}
        {/* 1. TOP BREADCRUMB & BACK LINK                                             */}
        {/* ========================================================================= */}
        <div className="service-animate-item flex items-center justify-between gap-4 mb-8 sm:mb-12 border-b border-neutral-200 pb-5">
          <button
            onClick={handleBackToServices}
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-950 transition-colors cursor-pointer"
          >
            <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1 font-mono">
              ←
            </span>
            <span>All Services</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <span className="uppercase tracking-widest text-neutral-400">
              {service.category}
            </span>
            <span>/</span>
            <span className="text-neutral-950 font-semibold">{service.name}</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. HERO HEADER SECTION                                                    */}
        {/* ========================================================================= */}
        <header className="service-animate-item mb-14 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left: Category Badge & Giant Service Title */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-neutral-200/80 text-neutral-800 text-xs font-semibold uppercase tracking-wider mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E0FE9B]" />
                <span>{service.category} Capability</span>
                <span className="text-neutral-400">·</span>
                <span className="font-mono text-neutral-500">#{service.num}</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-neutral-950 tracking-tight leading-[1.02] uppercase mb-4">
                {service.name}
              </h1>

              {service.tagline && (
                <p className="text-lg sm:text-xl md:text-2xl text-neutral-700 font-light tracking-tight mt-3">
                  {service.tagline}
                </p>
              )}
            </div>

            {/* Right: Lead Description & Quick Action */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 pt-2 lg:pt-6">
              <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-light">
                {service.heroDescription || service.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleContactClick}
                  className="px-6 py-3.5 rounded-full bg-[#1c1d1f] hover:bg-[#E0FE9B] text-white hover:text-neutral-950 font-bold text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 hover:scale-105 shadow-md inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Inquire About This Service</span>
                  <span>→</span>
                </button>

                {service.timeline && (
                  <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-600">
                    <span className="text-neutral-400">Timeline:</span>
                    <span className="text-neutral-950 font-semibold">{service.timeline}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 3. KEY METRICS & IMPACT STATS                                             */}
        {/* ========================================================================= */}
        {service.metrics && service.metrics.length > 0 && (
          <section className="service-animate-item w-full mb-16 sm:mb-24">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {service.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:border-neutral-900 transition-colors duration-200 flex flex-col justify-between"
                >
                  <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 tracking-tight mb-2">
                    {metric.value}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-500 font-mono">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 4. WHAT'S INCLUDED & DELIVERABLES                                         */}
        {/* ========================================================================= */}
        {service.deliverables && service.deliverables.length > 0 && (
          <section className="service-animate-item w-full mb-16 sm:mb-24 border-t border-neutral-300 pt-12 sm:pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
              <div className="lg:col-span-5">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                  Scope of Work
                </span>
                <h2 className="text-2xl sm:text-4xl font-light text-neutral-950 tracking-tight leading-tight uppercase">
                  Key Deliverables & What's Included
                </h2>
                <p className="text-neutral-600 font-light text-sm sm:text-base mt-4 leading-relaxed">
                  Every engagement is tailored with uncompromising attention to detail, transparent timelines, and comprehensive production-ready outputs.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="space-y-3.5">
                  {service.deliverables.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-4 sm:p-5 rounded-xl bg-white border border-neutral-200/90 flex items-center justify-between gap-4 shadow-sm hover:translate-x-1.5 transition-transform duration-200"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="w-2 h-2 rounded-full bg-[#E0FE9B] shrink-0" />
                        <span className="text-sm sm:text-base font-medium text-neutral-900">
                          {item}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-neutral-400 shrink-0">
                        ✓ Included
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 5. STEP-BY-STEP PROCESS ARCHITECTURE                                      */}
        {/* ========================================================================= */}
        {service.process && service.process.length > 0 && (
          <section className="service-animate-item w-full mb-16 sm:mb-24 border-t border-neutral-300 pt-12 sm:pt-16">
            <div className="mb-10 sm:mb-14">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                Methodology
              </span>
              <h2 className="text-2xl sm:text-4xl font-light text-neutral-950 tracking-tight leading-tight uppercase">
                How We Execute: 4-Step Process
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((stepItem, pIdx) => (
                <div
                  key={pIdx}
                  className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200 shadow-sm flex flex-col justify-between space-y-6 hover:border-neutral-900 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-neutral-950">
                      {stepItem.step}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                      Phase {stepItem.step}
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    <h3 className="text-base sm:text-lg font-bold text-neutral-950 tracking-tight">
                      {stepItem.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                      {stepItem.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 6. TOOL STACK & TECHNOLOGIES                                              */}
        {/* ========================================================================= */}
        {service.tools && service.tools.length > 0 && (
          <section className="service-animate-item w-full mb-16 sm:mb-24 border-t border-neutral-300 pt-10 sm:pt-14">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Industry-Standard Stack & Tools
              </span>
              <span className="text-xs font-mono text-neutral-500">
                Optimized for performance, longevity & security
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {service.tools.map((tool, tIdx) => (
                <div
                  key={tIdx}
                  className="px-4 py-2.5 rounded-full bg-white border border-neutral-200 text-xs sm:text-sm font-semibold text-neutral-800 shadow-sm hover:border-neutral-950 hover:bg-neutral-950 hover:text-white transition-colors duration-200 cursor-default"
                >
                  {tool}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 7. FREQUENTLY ASKED QUESTIONS                                             */}
        {/* ========================================================================= */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="service-animate-item w-full mb-16 sm:mb-24 border-t border-neutral-300 pt-12 sm:pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
              <div className="lg:col-span-5">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
                  Clarifications
                </span>
                <h2 className="text-2xl sm:text-4xl font-light text-neutral-950 tracking-tight leading-tight uppercase">
                  Frequently Asked Questions
                </h2>
                <p className="text-neutral-600 font-light text-sm sm:text-base mt-4 leading-relaxed">
                  Have a specific question about deliverables, integrations, or timelines? Here are answers to common questions.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-3">
                {service.faqs.map((faq, fIdx) => {
                  const isOpen = openFaq === fIdx;
                  return (
                    <div
                      key={fIdx}
                      className="rounded-xl bg-white border border-neutral-200 overflow-hidden shadow-sm transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                        className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-neutral-950 hover:text-neutral-700 transition-colors cursor-pointer"
                      >
                        <span className="pr-4">{faq.q}</span>
                        <span className="text-lg font-mono text-neutral-400 shrink-0">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed border-t border-neutral-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 8. RELATED & NEXT CAPABILITIES                                            */}
        {/* ========================================================================= */}
        {relatedServices.length > 0 && (
          <section className="service-animate-item w-full mb-16 sm:mb-24 border-t border-neutral-300 pt-12 sm:pt-16">
            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <WordReveal
                text="Explore Related Services"
                as="h2"
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-neutral-950"
              />
              <button
                onClick={handleBackToServices}
                className="text-xs uppercase font-semibold tracking-wider text-neutral-500 hover:text-neutral-950 transition-colors cursor-pointer"
              >
                All Capabilities →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => handleServiceClick(rel.slug)}
                  className="group p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:border-neutral-900 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 hover:-translate-y-1"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                      <span>{rel.category}</span>
                      <span>#{rel.num}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-950 group-hover:text-neutral-900 transition-colors">
                      {rel.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 font-light line-clamp-2">
                      {rel.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-950 pt-2 border-t border-neutral-100">
                    <span>Learn More</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <div id="contact">
        <Boot2BootFooter text="BOOT2BOOT" />
      </div>
    </div>
  );
}
