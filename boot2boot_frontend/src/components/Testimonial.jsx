import React from "react";
import { CheckCircle2 } from "lucide-react";
import WordReveal from "../animated-reusable-component/WordReveal";

const testimonials = [
  {
    id: 1,
    name: "Nidhi Gharat",
    text: `Boot 2 Boot exceeded my expectations! They built a beautiful, user-friendly e-commerce website for my clothing store and implemented a killer social media marketing strategy. Sales have doubled since I started working with them. Additionally, their graphic design team is top-notch. They create stunning visuals that truly showcase my products. I highly recommend Boot 2 Boot for any business looking to boost its online presence!`,
  },
  {
    id: 2,
    name: "Jayesh Sawant",
    text: `I’m extremely impressed with Boot 2 Boot’s approach to digital marketing. Their creative design techniques coupled with the most up-to-date SEO practices have given our website a fresh, modern look and improved performance. Their responsiveness and genuine commitment to our success set them apart from the rest. I highly recommend Boot 2 Boot for any business looking to stand out online!`,
  },
  {
    id: 3,
    name: "LOGISTICS MM",
    text: `We are thoroughly impressed by Boot 2 Boot’s innovative SMM services. Their team crafted engaging campaigns that resonated with our target market, transforming our social media platforms into vibrant communities. With outstanding creativity and deep analytical expertise, they have established our brand as a leader in our industry. For businesses looking to amplify their voice on social media, Boot 2 Boot is the ultimate partner in success.`,
  },
  {
    id: 4,
    name: "Govind Sawant",
    text: `Boot 2 Boot has elevated our digital marketing through both outstanding social media strategies and expert Google My Business optimization. Their holistic approach blends trending SMM techniques with spot-on GMB updates to ensure we stand out both online and locally. The results speak for themselves—heightened engagement on social platforms and increased local customer interactions. If you’re after comprehensive digital growth, look no further than Boot 2 Boot!`,
  },
  {
    id: 5,
    name: "Survi Pangam",
    text: `Boot 2 Boot provided exceptional service in helping me get my business registered on Google My Business. Their team was not only quick but also thorough, ensuring everything was set up perfectly. I’m extremely satisfied with their work and would highly recommend them to anyone looking for reliable, efficient and best digital marketing services!`,
  },
  {
    id: 6,
    name: "Prachi wayangankar",
    text: `I was struggling to manage my social media presence effectively. Boot 2 Boot took the reins and created engaging content for all my platforms. They even designed eye-catching graphics that perfectly matched my brand identity. My follower count has grown tremendously, and customer interaction is through the roof!`
  },
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <article
      className="
        break-inside-avoid
        mb-6
        rounded-2xl
        border border-neutral-200/90
        bg-white
        p-6 sm:p-7
        shadow-[0_4px_20px_rgba(0,0,0,0.04)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]
        hover:border-neutral-300
        flex flex-col justify-between
        h-auto
      "
    >
      {/* Profile Header */}
      <div className="flex items-center gap-3.5 mb-4">
        {/* First Letter of Name Avatar */}
        <div className="h-11 w-11 shrink-0 rounded-full flex items-center justify-center bg-neutral-900 text-white font-bold text-base font-parkinsans shadow-sm">
          {testimonial.name.trim().charAt(0).toUpperCase()}
        </div>

        {/* Name + Verification */}
        <div className="min-w-0">
          <h3 className="truncate text-sm sm:text-base font-medium text-neutral-900 font-parkinsans">
            {testimonial.name}
          </h3>

          {/* Google Verified Badge */}
          <div className="mt-0.5 flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 fill-[#1a73e8] stroke-white" />
            <span className="text-xs font-semibold text-neutral-500 font-sans">
              Google Verified
            </span>
          </div>
        </div>
      </div>

      {/* Testimonial Text */}
      <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-700 font-sans">
        "{testimonial.text}"
      </p>
    </article>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="w-full bg-[#f7f7f8] px-6 py-24 sm:px-10 lg:px-16 font-parkinsans overflow-hidden">
      {/* Heading */}
      <div className="mx-auto mb-16 max-w-4xl flex flex-col items-center text-center space-y-4">

        <WordReveal
          text="Trusted by our clients"
          as="h2"
          className="justify-center text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl leading-[1.12]"
          scrollStart="top 90%"
          stagger={0.08}
          duration={0.85}
        />

        <WordReveal
          text="Here's what our clients have to say about working with Boot 2 Boot."
          as="p"
          className="justify-center text-base text-neutral-600 sm:text-lg max-w-2xl mx-auto font-sans leading-relaxed"
          scrollStart="top 90%"
          stagger={0.04}
          delay={0.15}
          duration={0.75}
        />
      </div>

      {/* Dynamic Masonry Columns Layout to prevent any overflow */}
      <div className="mx-auto max-w-7xl columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;