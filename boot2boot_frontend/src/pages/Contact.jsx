import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Boot2BootFooter from "../components/Boot2BootFooter";
import { usePageTransition } from "../components/PageTransition";
import ButtonHoverAnimation from "../animated-reusable-component/ButtonHover";
import axios from "axios";
const serviceOptions = [
  "SEO",
  "Web Development",
  "Content Writing",
  "Web hosting",
  "PPC",
  "UI/UX",
  "E-commerce",
  "Software Development",
  "Advertisement",
  "Influencer Marketing",
  "Brand Identity",
  "Custom Website Design",
  "Performance Marketing",
  "Social Media Marketing",
  "Email Marketing",
];

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  message: "",
  services: [],
};

const API_URL = import.meta.env.API_URL || "http://localhost:5500/api/forms";

export default function Contact() {
  const dividerRef = useRef(null);
  const { isTransitioning } = usePageTransition();

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleService = (service) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      organization: "",
      message: "",
      services: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmittedStatus(null);
    setErrorMessage("");

    try {
      const response = await axios.post(API_URL, formData);

      const result = response.data;

      // axios throws an error for non‑2xx responses, so we don't need the manual check

      // Also cache in localStorage as client backup
      try {
        const existing = JSON.parse(
          localStorage.getItem("boot2boot_contact_submissions") || "[]"
        );
        existing.push({
          ...formData,
          _id: result?.data?._id,
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem(
          "boot2boot_contact_submissions",
          JSON.stringify(existing)
        );
      } catch (storageErr) {
        console.warn("Could not save to localStorage:", storageErr);
      }

      // Reset input fields and service tags
      resetForm();
      setSubmittedStatus("success");

      setTimeout(() => {
        setSubmittedStatus(null);
      }, 5000);
    } catch (err) {
      console.error("Contact form submission error:", err);
      setErrorMessage(err.message || "Something went wrong. Please try again.");
      setTimeout(() => {
        setErrorMessage("");
      }, 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to render text with character-by-character masked kinetic reveal
  const renderRevealedText = (text, charClass) => {
    return text.split(" ").map((word, wIdx) => (
      <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.28em]">
        {word.split("").map((char, cIdx) => (
          <span key={cIdx} className="inline-block overflow-hidden py-0.5">
            <span className={`${charClass} inline-block will-change-transform`}>
              {char}
            </span>
          </span>
        ))}
      </span>
    ));
  };

  // Synchronized Multi-Stage Kinetic Character Reveal Timeline
  // Sequence: CONTACT -> Divider -> GOT AN IDEA? -> DROP US A MESSAGE full paragraph
  useEffect(() => {
    const divider = dividerRef.current;

    const setInitialHidden = () => {
      gsap.set(".contact-title-char", {
        yPercent: 120,
        rotateX: 45,
        opacity: 0,
        transformOrigin: "50% 100%",
        force3D: true,
      });
      if (divider) {
        gsap.set(divider, {
          scaleX: 0,
          opacity: 1,
          transformOrigin: "center center",
        });
      }
      gsap.set(".contact-idea-char", {
        yPercent: 120,
        rotateX: 45,
        opacity: 0,
        transformOrigin: "50% 100%",
        force3D: true,
      });
      gsap.set(".contact-para-char", {
        yPercent: 120,
        rotateX: 40,
        opacity: 0,
        transformOrigin: "50% 100%",
        force3D: true,
      });
    };

    // While transition curtain covers the screen, keep elements in hidden state
    if (isTransitioning) {
      setInitialHidden();
      return;
    }

    const playSynchronizedReveal = () => {
      const ctx = gsap.context(() => {
        setInitialHidden();

        const tl = gsap.timeline({
          delay: 0.08,
        });

        // 1. "CONTACT" heading character reveal
        tl.to(
          ".contact-title-char",
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.065,
            ease: "power3.out",
            clearProps: "all",
          },
          0
        );

        // 1b. Divider line unrolls smoothly in sync with CONTACT heading
        if (divider) {
          tl.to(
            divider,
            {
              scaleX: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            0.25
          );
        }

        // 2. "GOT AN IDEA?" character reveal
        tl.to(
          ".contact-idea-char",
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.035,
            ease: "power3.out",
            clearProps: "all",
          },
          0.45
        );

        // 3. Full paragraph character reveal
        tl.to(
          ".contact-para-char",
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.009,
            ease: "power2.out",
            clearProps: "all",
          },
          0.85
        );
      });

      return ctx;
    };

    let ctx = null;
    let handleLoadStart = null;
    let safetyTimeout = null;

    if (typeof window !== "undefined" && window.__boot2boot_loaded) {
      ctx = playSynchronizedReveal();
    } else {
      setInitialHidden();

      handleLoadStart = () => {
        ctx = playSynchronizedReveal();
      };
      window.addEventListener("boot2boot:startHeroAnimation", handleLoadStart);

      safetyTimeout = setTimeout(() => {
        if (!ctx) ctx = playSynchronizedReveal();
      }, 2600);
    }

    return () => {
      if (ctx) ctx.revert();
      if (handleLoadStart) {
        window.removeEventListener("boot2boot:startHeroAnimation", handleLoadStart);
      }
      if (safetyTimeout) {
        clearTimeout(safetyTimeout);
      }
    };
  }, [isTransitioning]);

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-neutral-900 font-parkinsans">
      {/* Main Page Container */}
      <main className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 pt-20 sm:pt-24 md:pt-28 pb-20">
        {/* ========================================================================= */}
        {/* 1. Page Header with Synchronized Character Reveal                         */}
        {/* ========================================================================= */}
        <div className="mb-8 sm:mb-12 text-center" style={{ perspective: "1000px" }}>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light inline-flex items-center justify-center px-3 tracking-tight text-neutral-950 uppercase leading-none"
            style={{ perspective: "1000px" }}
          >
            {"CONTACT".split("").map((char, index) => (
              <span
                key={index}
                className="inline-block overflow-hidden py-2 px-[1px] sm:px-[2px]"
              >
                <span className="contact-title-char inline-block will-change-transform">
                  {char}
                </span>
              </span>
            ))}
          </h1>

          {/* Thin Horizontal Divider Line */}
          <div
            ref={dividerRef}
            className="w-full h-[1px] bg-neutral-300 mt-3 sm:mt-4 origin-center scale-x-0 will-change-transform"
          />
        </div>

        {/* ========================================================================= */}
        {/* 2. "GOT AN IDEA?" Text Section                                            */}
        {/* ========================================================================= */}
        <div
          className="flex flex-col md:flex-row md:items-start gap-6 sm:gap-8 md:gap-20 mt-10 sm:mt-14 md:mt-16 mb-16 sm:mb-20"
        >
          {/* Left — Bold Heading with Kinetic Character Reveal */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-light uppercase tracking-tight text-neutral-950 leading-tight whitespace-nowrap"
            style={{ perspective: "1000px" }}
          >
            {["GOT", "AN", "IDEA?"].map((word, wIdx) => (
              <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.28em]">
                {word.split("").map((char, cIdx) => (
                  <span key={cIdx} className="inline-block overflow-hidden py-1 px-[0.5px]">
                    <span className="contact-idea-char inline-block will-change-transform">
                      {char}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h2>

          {/* Right — Descriptive Paragraph with Synchronized Character Reveal */}
          <div className="md:pt-20">
            <p
              className="text-base sm:text-lg md:text-xl text-neutral-950 leading-relaxed max-w-3xl"
              style={{ perspective: "1000px" }}
            >
              {renderRevealedText(
                "DROP US A MESSAGE. We're excited to work with you soon! Please drop an email with your details & requirements to",
                "contact-para-char"
              )}
              <a
                href="mailto:inquiry@boot2boot.com"
                className="text-neutral-950 font-light underline underline-offset-4 hover:text-neutral-700 transition-colors inline-block whitespace-nowrap mr-[0.05em]"
              >
                {"inquiry@boot2boot.com".split("").map((char, cIdx) => (
                  <span key={cIdx} className="inline-block overflow-hidden py-0.5">
                    <span className="contact-para-char inline-block will-change-transform">
                      {char}
                    </span>
                  </span>
                ))}
              </a>
              <span className="inline-block overflow-hidden py-0.5">
                <span className="contact-para-char inline-block will-change-transform">
                  .
                </span>
              </span>
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. Contact Form                                                            */}
        {/* ========================================================================= */}
        <style>{`
          .contact-field {
            position: relative;
          }
          .contact-field::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background: #0a0a0a;
            transition: width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), left 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          }
          .contact-field:focus-within::after {
            width: 100%;
            left: 0;
          }
          .contact-field input,
          .contact-field textarea {
            border-bottom: 1.5px solid #a3a3a3;
            transition: border-color 0.3s ease;
          }
          .contact-field:focus-within input,
          .contact-field:focus-within textarea {
            border-bottom-color: transparent;
          }
          .contact-field input::placeholder,
          .contact-field textarea::placeholder {
            color: #404040;
            opacity: 1;
            transition: color 0.3s ease;
          }
          .contact-field:focus-within input::placeholder,
          .contact-field:focus-within textarea::placeholder {
            color: #a3a3a3;
          }
        `}</style>

        <form onSubmit={handleSubmit} onReset={resetForm} className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-10 sm:gap-12">
            {/* Name */}
            <div className="contact-field">
              <input
                type="text"
                name="name"
                id="contact-name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full bg-transparent border-0 py-3 text-lg sm:text-xl text-neutral-950 outline-none font-parkinsans"
              />
            </div>

            {/* Email */}
            <div className="contact-field">
              <input
                type="email"
                name="email"
                id="contact-email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full bg-transparent border-0 py-3 text-lg sm:text-xl text-neutral-950 outline-none font-parkinsans"
              />
            </div>

            {/* Phone Number (optional) */}
            <div className="contact-field">
              <input
                type="tel"
                name="phone"
                id="contact-phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number (optional)"
                className="w-full bg-transparent border-0 py-3 text-lg sm:text-xl text-neutral-950 outline-none font-parkinsans"
              />
            </div>

            {/* Your Organization name */}
            <div className="contact-field">
              <input
                type="text"
                name="organization"
                id="contact-organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Your Organization name"
                className="w-full bg-transparent border-0 py-3 text-lg sm:text-xl text-neutral-950 outline-none font-parkinsans"
              />
            </div>

            {/* Tell Us How we can help? */}
            <div className="contact-field">
              <textarea
                name="message"
                id="contact-message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell Us How we can help ?"
                rows={1}
                className="w-full bg-transparent border-0 py-3 text-lg sm:text-xl text-neutral-950 outline-none font-parkinsans resize-none"
              />
            </div>
          </div>

          {/* Services Selection Tags */}
          <div className="mt-14 sm:mt-16">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <h3 className="text-xl sm:text-2xl md:text-[1.75rem] font-light text-neutral-950 tracking-tight">
                In Which Service You are Interested ?
              </h3>
              {formData.services.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, services: [] }))
                  }
                  className="text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-950 underline underline-offset-4 cursor-pointer transition-colors"
                >
                  Clear tags ({formData.services.length})
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-3.5">
              {serviceOptions.map((service) => {
                const isSelected = formData.services.includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base transition-all duration-200 cursor-pointer select-none font-parkinsans ${isSelected
                        ? "bg-[#e0e0e0] text-[#18191b] border border-[#4c4d4c] font-medium shadow-sm scale-[1.02]"
                        : "bg-transparent text-neutral-800 border border-neutral-400/80 hover:border-neutral-950 hover:text-neutral-950 hover:scale-[1.02]"
                      }`}
                  >
                    {service}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button & Status Feedback */}
          <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <ButtonHoverAnimation
              type="submit"
              variant="light"
              text={isSubmitting ? "Sending..." : "Send Message"}
              disabled={isSubmitting}
              className={`px-9 py-3.5 text-base uppercase tracking-wider font-semibold border-neutral-950 hover:border-[#E0FE9B] ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                }`}
            />

            {submittedStatus === "success" && (
              <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#E0FE9B]/40 border border-[#E0FE9B] text-neutral-950 text-sm sm:text-base font-medium shadow-sm transition-all duration-300">
                Your message has been sent successfully.
              </div>
            )}

            {errorMessage && (
              <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 text-sm sm:text-base font-medium shadow-sm transition-all duration-300">
                {errorMessage}
              </div>
            )}
          </div>
        </form>

      </main>

      {/* Footer */}
      <div id="contact">
        <Boot2BootFooter text="BOOT2BOOT" />
      </div>
    </div>
  );
}
