import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { usePageTransition } from "../components/PageTransition";
import WordReveal from "../animated-reusable-component/WordReveal";

const sections = [
  { id: "information", title: "01. Information We Collect" },
  { id: "usage", title: "02. How We Use Your Information" },
  { id: "cookies", title: "03. Cookies & Tracking" },
  { id: "sharing", title: "04. Sharing Information" },
  { id: "third-party", title: "05. Third-Party Services" },
  { id: "retention", title: "06. Data Retention" },
  { id: "security", title: "07. Data Security" },
  { id: "rights", title: "08. Your Privacy Rights" },
  { id: "marketing", title: "09. Marketing Communications" },
  { id: "transfers", title: "10. International Transfers" },
  { id: "changes", title: "11. Policy Updates" },
  { id: "contact", title: "12. Contact Us" },
];

const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-28 border-b border-black/10 py-10 last:border-0">
    <h2 className="mb-5 text-2xl font-semibold tracking-tight md:text-3xl">
      {title}
    </h2>
    <div className="space-y-4 text-base leading-8 text-neutral-600">
      {children}
    </div>
  </section>
);

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("information");
  const dividerRef = useRef(null);
  const infoRowRef = useRef(null);
  const { isTransitioning } = usePageTransition();

  // GSAP Entrance Animation for Divider Line and Info Row
  useEffect(() => {
    const divider = dividerRef.current;
    const infoRow = infoRowRef.current;
    if (!divider) return;

    // While transition curtain covers the screen, keep divider in hidden state
    if (isTransitioning) {
      gsap.set(divider, {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "center center",
      });
      if (infoRow) gsap.set(infoRow, { opacity: 0, y: 15 });
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

      if (infoRow) {
        gsap.set(infoRow, { opacity: 0, y: 15 });
        tl.to(
          infoRow,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }
    });

    return () => ctx.revert();
  }, [isTransitioning]);

  const handleNavigation = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen bg-[#f8f8f5] text-neutral-950">

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 md:px-10 md:pb-24 md:pt-28">

        <h1 className="mt-7 max-w-4xl text-5xl font-light leading-[1.05] tracking-tighter md:text-7xl lg:text-8xl">
          <WordReveal
            text="Your privacy."
            as="span"
            className="inline-block"
            useScrollTrigger={false}
            delay={0.08}
            stagger={0.08}
          />
          <br />
          <WordReveal
            text="Our responsibility."
            as="span"
            className="inline-block"
            useScrollTrigger={false}
            delay={0.24}
            stagger={0.08}
          />
        </h1>

        {/* Thin Horizontal Divider Line growing from center */}
        <div
          ref={dividerRef}
          className="mt-10 w-full h-[1px] bg-black/10 origin-center scale-x-0 will-change-transform"
        />

        <div
          ref={infoRowRef}
          className="flex flex-col gap-5 pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-xl text-neutral-600">
            Transparency matters. Here's how we collect, use, and protect your
            information when you interact with Boot2Boot.
          </p>

          <p className="shrink-0 text-sm text-neutral-500">
            Last updated: October 11, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 md:grid-cols-[280px_minmax(0,1fr)] md:gap-20 md:px-10">
        {/* Table of Contents */}
        <aside className="h-fit md:sticky md:top-8">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
            On this page
          </p>

          <nav aria-label="Privacy policy sections" className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavigation(section.id)}
                className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${activeSection === section.id
                    ? "bg-black font-medium text-white"
                    : "text-neutral-600 hover:bg-black/5 hover:text-black"
                  }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Privacy Policy */}
        <article className="min-w-0">
          <div className="border-b border-black/10 pb-8">
            <p className="text-lg leading-8 text-neutral-600">
              At Boot2Boot ("we," "our," or "us"), we respect your privacy and
              are committed to protecting your personal information. This
              policy explains our data practices when you visit our website,
              contact us, or use our digital marketing and web development
              services.
            </p>
          </div>

          <Section id="information" title="01. Information We Collect">
            <p>We may collect the following categories of information:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-black">Personal information:</strong>{" "}
                Your name, email address, phone number, company name, website
                URL, and information you submit through contact forms.
              </li>
              <li>
                <strong className="text-black">Technical information:</strong>{" "}
                IP address, browser type, device information, pages visited,
                and website usage data.
              </li>
              <li>
                <strong className="text-black">Marketing information:</strong>{" "}
                Campaign engagement, website analytics, and advertising
                performance data where relevant to our services.
              </li>
            </ul>
          </Section>

          <Section id="usage" title="02. How We Use Your Information">
            <p>We may use your information to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Respond to inquiries and service requests.</li>
              <li>Prepare quotations, proposals, and project plans.</li>
              <li>Deliver and manage our services.</li>
              <li>Improve our website and user experience.</li>
              <li>Measure marketing and advertising performance.</li>
              <li>Maintain security and prevent fraudulent activity.</li>
              <li>Comply with applicable legal requirements.</li>
            </ul>
          </Section>

          <Section id="cookies" title="03. Cookies & Tracking">
            <p>
              Our website may use cookies, pixels, and similar technologies to
              improve functionality, understand visitor behavior, and measure
              marketing performance.
            </p>
            <p>
              If implemented, these technologies may include Google Analytics,
              Google Ads, or Meta advertising tools. You can manage cookies
              through your browser settings. Where required by law, we will
              obtain consent before using non-essential tracking technologies.
            </p>
          </Section>

          <Section id="sharing" title="04. Sharing Information">
            <p>
              We do not sell your personal information for money. We may share
              information with service providers that help us operate our
              website and business, including hosting providers, analytics
              platforms, advertising services, CRM tools, and email providers.
            </p>
            <p>
              We may also disclose information where necessary to comply with
              legal obligations, prevent fraud, or protect our legal rights.
            </p>
          </Section>

          <Section id="third-party" title="05. Third-Party Services">
            <p>
              Our website may link to third-party websites or services. We do
              not control their privacy practices and encourage you to review
              their privacy policies before sharing information with them.
            </p>
          </Section>

          <Section id="retention" title="06. Data Retention">
            <p>
              We retain personal information only for as long as reasonably
              necessary to provide our services, maintain business records,
              resolve disputes, and meet applicable legal requirements. When
              information is no longer needed, we take reasonable steps to
              delete or anonymize it.
            </p>
          </Section>

          <Section id="security" title="07. Data Security">
            <p>
              We use reasonable technical and organizational measures to
              protect personal information against unauthorized access, loss,
              misuse, or disclosure. However, no electronic transmission or
              storage method can be guaranteed to be completely secure.
            </p>
          </Section>

          <Section id="rights" title="08. Your Privacy Rights">
            <p>
              Depending on applicable law, you may have the right to request
              access to, correction of, or deletion of your personal
              information, withdraw consent, object to certain processing,
              or opt out of promotional communications.
            </p>
            <p>
              To exercise an applicable right, contact us using the details
              below. We may need to verify your identity before responding.
            </p>
          </Section>

          <Section id="marketing" title="09. Marketing Communications">
            <p>
              We may send promotional communications where permitted by law.
              You can opt out at any time using the unsubscribe link in an
              email or by contacting us directly. Essential service-related
              communications may still be sent when necessary.
            </p>
          </Section>

          <Section id="transfers" title="10. International Data Transfers">
            <p>
              Our service providers may process or store information outside
              your country of residence. Where applicable, we take reasonable
              steps to ensure that international transfers meet relevant
              legal requirements.
            </p>
          </Section>

          <Section id="changes" title="11. Policy Updates">
            <p>
              We may update this Privacy Policy to reflect changes in our
              business, services, technology, or legal obligations. Updated
              versions will be published on this page with a revised
              effective date.
            </p>
          </Section>

          <Section id="contact" title="12. Contact Us">
            <p>
              If you have questions about this policy or how we handle your
              information, contact us using the details below.
            </p>

            <div className="mt-6 rounded-2xl bg-white p-6 md:p-8">
              <p className="text-xl font-semibold text-black">Boot2Boot</p>
              <p>Digital Marketing & Web Development</p>
              <p>
                Website:{" "}
                <a
                  href="https://boot2boot.com"
                  className="underline decoration-lime-500 underline-offset-4 hover:text-black"
                >
                  boot2boot.com
                </a>
              </p>
              <p>
                Email:{" "}
                <span className="text-neutral-400">
                  Replace with your official business email
                </span>
              </p>
              <p>
                Address:{" "}
                <span className="text-neutral-400">
                  Add your business address if applicable
                </span>
              </p>
            </div>
          </Section>

          <div className="mt-10 rounded-2xl bg-lime-300 p-7 md:p-10">
            <p className="text-sm font-medium uppercase tracking-widest">
              Have questions?
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Let's keep things transparent.
            </h3>
            <a
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 font-medium text-white transition hover:bg-neutral-800"
            >
              Contact our team <ArrowUpRight size={18} />
            </a>
          </div>
        </article>
      </div>
    </main>
  );
}