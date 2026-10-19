import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import WordReveal from "../animated-reusable-component/WordReveal";

const faqs = [
  {
    id: 1,
    question: "What services does Boot 2 Boot specialize in?",
    answer:
      "We provide end-to-end digital agency solutions including Custom 3D Web & Full-Stack Development, E-Commerce Infrastructure, Performance & Social Media Marketing, Conversion Rate Optimization (CRO), Lifecycle Email Marketing, and Search Engine Optimization (SEO).",
  },
  {
    id: 2,
    question: "How long does a typical web or e-commerce development project take?",
    answer:
      "Timelines typically range between 3 to 6 weeks for custom digital flagships and 6 to 10 weeks for extensive enterprise architectures, including full 3D interactive design, responsive development, testing, and production deployment.",
  },
  {
    id: 3,
    question: "How do your performance marketing and SMM campaigns operate?",
    answer:
      "We build data-backed, multi-stage acquisition funnels across Meta, Google Search, TikTok, and LinkedIn. Every campaign is monitored with strict unit economics, continuous creative testing, and weekly transparent reporting.",
  },
  {
    id: 4,
    question: "Do you offer post-launch support and ongoing optimization?",
    answer:
      "Yes. We offer dedicated continuous growth retainer partnerships covering ongoing technical maintenance, conversion rate experimentation, speed optimization, and regular content and marketing updates.",
  },
  {
    id: 5,
    question: "How can we get started with Boot 2 Boot?",
    answer:
      "You can reach out through our contact channel or book a 30-minute discovery session. We will evaluate your current brand posture, analyze growth bottlenecks, and deliver a tailored strategic blueprint.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState(1);

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative w-full bg-[#f7f7f8] text-neutral-900 pt-16 pb-28 px-6 sm:px-10 lg:px-16 font-parkinsans overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        {/* Header Block */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 pb-8 border-b border-neutral-200 w-full">
          <WordReveal
            text="FAQs"
            as="h2"
            className="w-full justify-center text-center text-3xl sm:text-5xl font-medium text-neutral-950 tracking-tight leading-tight"
            scrollStart="top 90%"
            stagger={0.08}
            duration={0.85}
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                    ? "bg-white border-neutral-300"
                    : "bg-white/80 border-neutral-200 hover:border-neutral-300 hover:bg-white"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between gap-4 p-6 sm:p-7 text-left cursor-pointer transition-colors"
                >
                  <span className="text-base sm:text-lg font-medium text-neutral-950 tracking-tight">
                    {faq.question}
                  </span>

                  <div
                    className={`w-9 h-9 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen
                        ? "bg-[#E0FE9B] border-[#18191b] text-black rotate-180"
                        : "bg-neutral-100 border-neutral-200 text-neutral-600 hover:bg-neutral-200"
                      }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 border-t border-neutral-100 text-neutral-600 text-sm sm:text-base font-sans leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
