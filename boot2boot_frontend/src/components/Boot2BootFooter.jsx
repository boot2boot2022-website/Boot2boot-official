import { useNavigate } from 'react-router-dom';
import WarpText from './WarpText';
import TextRollEffect from '../animated-reusable-component/TextRollEffect';
import { usePageTransition } from './PageTransition';
import {
  chatgptIcon,
  claudeIcon,
  geminiIcon,
  perplexityIcon,
} from '../assets/ai-png';

export default function Boot2BootFooter({
  text = 'BOOT2BOOT',
  address = {
    title: 'Address',
    lines: [
      'Office No. 316, North Imperia',
      'JP North, Vinay Nagar, Mira-Road East,',
      'Thane-401107, Maharashtra-India',
    ],
    email: 'inquiry@boot2boot.com',
    phone: '+91 7400407803',
  },
  className = '',
}) {
  const navigate = useNavigate();
  const { triggerTransition } = usePageTransition();

  const handlePrivacyClick = (e) => {
    e.preventDefault();
    triggerTransition(
      () => {
        navigate('/privacy-policy');
        window.scrollTo({ top: 0, behavior: 'instant' });
      },
      { showBrandText: false }
    );
  };

  const footerLinks = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Meet The Team', href: '/meet-the-team' },
    { label: 'Contact', href: '/contact' },
  ];

  const followUsLinks = [
    { label: 'Instagram', href: 'https://www.instagram.com/boot_2_boot/' },
    { label: 'Facebook', href: 'https://www.facebook.com/people/Boot-2-Boot/100089690485497/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/boot-2-boot' },
    { label: 'X.com', href: 'https://x.com/boot2boot2022?t=0F6HmjxmCUZ6F0A9n6HZmw&s=09' },
    { label: 'Threads', href: 'https://www.threads.net/@boot_2_boot' },
    { label: 'YouTube', href: 'https://www.youtube.com/@Boot2Boot' },
  ];

  const aiQuery = encodeURIComponent(
    'Tell me about Boot2Boot Agency (boot2boot.com) - their digital engineering services, creative web development, and performance marketing.'
  );

  const aiLinks = [
    {
      label: 'ChatGPT',
      href: `https://chatgpt.com/?q=${aiQuery}`,
      icon: chatgptIcon,
    },
    {
      label: 'Claude',
      href: `https://claude.ai/new?q=${aiQuery}`,
      icon: claudeIcon,
    },
    {
      label: 'Gemini',
      href: `https://gemini.google.com/app?prompt=${aiQuery}`,
      icon: geminiIcon,
    },
    {
      label: 'Perplexity',
      href: `https://www.perplexity.ai/search?q=${aiQuery}`,
      icon: perplexityIcon,
    },
  ];

  return (
    <footer className={`w-full bg-black border-t border-white/10 text-white pt-16 pb-12 px-6 sm:px-12 relative overflow-hidden flex flex-col justify-between ${className}`}>
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center justify-between relative z-10 space-y-12">
        {/* Main Content Grid: Address + Navigation Links + Follow Us Links + AI Links */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pt-2 text-left">
          {/* Column 1: Studio Address & Info */}
          <div className="flex flex-col space-y-3 lg:col-span-4">
            <span className="text-xs uppercase font-bold tracking-widest text-white font-parkinsans">
              {address.title}
            </span>
            <div className="text-sm sm:text-base text-neutral-300 leading-relaxed font-parkinsans space-y-0.5">
              {address.lines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
            <div className="pt-2 text-xs sm:text-sm text-neutral-400 space-y-1.5 font-parkinsans">
              <div className="flex items-center gap-1.5">
                <span className="text-neutral-500 font-medium whitespace-nowrap">Email: </span>
                <TextRollEffect
                  href={`mailto:${address.email}`}
                  className="text-xs sm:text-sm font-medium py-0.5"
                  textColor="text-neutral-300"
                  hoverColor="text-white"
                >
                  {address.email}
                </TextRollEffect>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-neutral-500 font-medium whitespace-nowrap">Phone: </span>
                <TextRollEffect
                  href={`tel:${address.phone}`}
                  className="text-xs sm:text-sm font-medium py-0.5"
                  textColor="text-neutral-300"
                  hoverColor="text-white"
                >
                  {address.phone}
                </TextRollEffect>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col space-y-3 lg:col-span-3">
            <span className="text-xs uppercase font-bold tracking-widest text-white font-parkinsans">
              Navigation
            </span>
            <nav className="flex flex-col space-y-2.5 items-start" aria-label="Footer Navigation">
              {footerLinks.map((item) => (
                <TextRollEffect
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium font-parkinsans py-0.5 w-fit self-start"
                  textColor="text-neutral-400"
                  hoverColor="text-white"
                >
                  {item.label}
                </TextRollEffect>
              ))}
            </nav>
          </div>

          {/* Column 3: Follow Us Links */}
          <div className="flex flex-col space-y-3 lg:col-span-2">
            <span className="text-xs uppercase font-bold tracking-widest text-white font-parkinsans">
              Follow Us
            </span>
            <nav className="flex flex-col space-y-2.5 items-start" aria-label="Footer Follow Us">
              {followUsLinks.map((item) => (
                <TextRollEffect
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium font-parkinsans py-0.5 w-fit self-start"
                  textColor="text-neutral-400"
                  hoverColor="text-white"
                >
                  {item.label}
                </TextRollEffect>
              ))}
            </nav>
          </div>

          {/* Column 4: AI Platforms (with icons and names) */}
          <div className="flex flex-col space-y-3 lg:col-span-3">
            <span className="text-xs uppercase font-bold tracking-widest text-white font-parkinsans">
              Ask AI
            </span>
            <nav className="flex flex-col space-y-2.5 items-start" aria-label="Footer AI Platforms">
              {aiLinks.map((item) => (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-2.5 py-0.5"
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0"
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-5 h-5 sm:w-[22px] sm:h-[22px] object-contain rounded-sm"
                    />
                  </a>
                  <TextRollEffect
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium font-parkinsans"
                    textColor="text-neutral-400"
                    hoverColor="text-white"
                  >
                    {item.label}
                  </TextRollEffect>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Interactive WebGL WarpText Headline (Big Animated Text Logo Below Links) */}
        <div className="w-full flex flex-col items-center justify-center my-2 py-2 border-t border-b border-neutral-500/10">
          <WarpText
            text={text}
            color="#f8f5ff"
            fontSize="clamp(3.5rem, 13vw, 10.5rem)"
            fontWeight={800}
            fontFamily="Parkinsans"
            letterSpacing="-0.04em"
            warpStrength={0.09}
            warpScale={1.7}
            speed={0.55}
            pointerInfluence={0.42}
            pointerStrength={0.38}
            refraction={0.018}
            ripple={true}
            style={{ height: '260px', width: '100%' }}
          />
        </div>

        {/* Bottom Copyright & Legal Links Row (Covering full space) */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs sm:text-sm text-neutral-400 font-parkinsans">
          <p className="text-neutral-400">© 2026 Boot 2 Boot. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <a
              href="/privacy-policy"
              onClick={handlePrivacyClick}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Boot2BootFooter };

