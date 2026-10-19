import HeroSection from '../components/HeroSection';
import SocialMediaSection from '../components/SocialMediaSection';
import ClientsSection from '../components/ClientsSection';
import Testimonials from '../components/Testimonial';
import BlogSection from '../components/BlogSection';
import FAQSection from '../components/FAQSection';
import Boot2BootFooter from '../components/Boot2BootFooter';

export default function Home() {
  return (
    <div className="bg-[#f7f7f8] text-neutral-900 font-sans min-h-screen overflow-x-hidden w-full max-w-full">
      {/* 3D Interactive Hero Section (Cards Spiral -> Assemble -> Horizontal Service Scroll) */}
      <HeroSection />

      {/* Social Media Section with 3D Jumping Card (Insta -> Facebook alternating sketch layout) */}
      <SocialMediaSection />

      {/* Page 2: Brand Ecosystem & Company Logos (Curved Overlap onto Off-White) */}
      <ClientsSection />

      {/* Page 3: Verified Client Testimonials */}
      <Testimonials />

      {/* Page 4 & 5: Insights (Blog) and FAQ with Hero-matching Dark Espresso Background */}
      <BlogSection />
      <FAQSection />

      {/* Footer Section */}
      <div id="contact">
        <Boot2BootFooter text="BOOT2BOOT" />
      </div>
    </div>
  );
}
