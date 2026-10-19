import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageTransition } from "../PageTransition";

export default function ServiceDetailModal({ service, category, onClose }) {
  const [copied, setCopied] = useState(false);
  const { triggerTransition } = usePageTransition();
  const navigate = useNavigate();

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!service) return null;

  const shareableUrl = `${window.location.origin}/services#${service.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleInquiryClick = () => {
    onClose();
    triggerTransition(
      () => {
        navigate("/#contact");
        setTimeout(() => {
          const target = document.querySelector("#contact");
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }, 150);
      },
      { showBrandText: false }
    );
  };

  return (
    <div className="fixed inset-0 z-[1050] flex items-center justify-center p-4 sm:p-6 md:p-10 font-parkinsans animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-neutral-200 rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 md:p-10 text-neutral-900 shadow-2xl shadow-neutral-950/20 scrollbar-thin scrollbar-thumb-neutral-300"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close service details"
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-600 hover:text-neutral-950 flex items-center justify-center transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Category Pill + Number */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-neutral-100 pr-12">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E0FE9B]" />
            <span className="text-xs uppercase tracking-widest font-extrabold text-neutral-500 font-mono">
              {category?.giantTitle || "Service"}
            </span>
          </div>
          <span className="font-mono text-xs font-bold text-neutral-400">
            {service.num}
          </span>
        </div>

        {/* Service Header Title */}
        <div className="mt-6 space-y-2">
          <h2 id="service-modal-title" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-950 tracking-tight">
            {service.name}
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 font-semibold">
            {service.tagline}
          </p>
        </div>

        {/* Summary Description */}
        <p className="mt-4 text-sm sm:text-base text-neutral-700 leading-relaxed">
          {service.summary}
        </p>

        {/* Deliverables Checklist */}
        <div className="mt-8 pt-6 border-t border-neutral-100 space-y-3">
          <h3 className="text-xs uppercase tracking-wider font-extrabold text-neutral-400 font-mono">
            Key Capabilities & Deliverables
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {service.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800 font-medium">
                <span className="w-5 h-5 rounded-full bg-[#E0FE9B]/30 text-[#1a8008] font-extrabold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  ✓
                </span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools & Tech Stack */}
        <div className="mt-8 pt-6 border-t border-neutral-100 space-y-3">
          <h3 className="text-xs uppercase tracking-wider font-extrabold text-neutral-400 font-mono">
            Technologies & Frameworks
          </h3>
          <div className="flex flex-wrap gap-2 pt-1">
            {service.tools.map((tool, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono font-semibold text-neutral-800"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Meta Bar */}
        <div className="mt-8 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <div>
            <span className="text-neutral-400 block text-[11px] uppercase tracking-wider font-mono font-bold">
              Project Timeline
            </span>
            <span className="font-bold text-neutral-900">{service.timeline}</span>
          </div>
          <div>
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-200 text-xs font-bold text-neutral-700 hover:text-neutral-950 transition-all cursor-pointer shadow-sm"
            >
              <svg className="w-3.5 h-3.5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>{copied ? "Link Copied!" : "Copy Direct Link"}</span>
            </button>
          </div>
        </div>

        {/* Bottom CTA Actions */}
        <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-neutral-200 hover:border-neutral-400 text-sm font-bold text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleInquiryClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1c1d1f] hover:bg-black text-white hover:text-[#E0FE9B] text-sm font-extrabold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <span>Inquire about {service.name}</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
