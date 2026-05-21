"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ==========================================================
 * TYPES
 * ========================================================== */

type TimelineItem = {
  title: string;
  description: string;
};

type AboutUsContent = {
  /* Left image card */
  image: string;
  imageAlt: string;
  imageOverlayHeading: string;
  ctaLabel: string;
  ctaHref: string;

  /* Right content */
  headingStart: string;        // e.g. "The Value Behind Our"
  headingItalic: string;       // e.g. "Partnership"
  paragraph: string;
  timeline: TimelineItem[];
};

/* ==========================================================
 * CONTENT — easy to edit
 * ========================================================== */

const CONTENT: AboutUsContent = {
  image: "/images/about-us.jpg",
  imageAlt: "About us — what to know what's possible",
  imageOverlayHeading: "What to Know What's\nPossible",
  ctaLabel: "Explore Journey",
  ctaHref: "#contact",

  headingStart: "The Story Behind",
  headingItalic: "The Journey",
  paragraph:
    "Through storytelling, travel, and cultural exploration, I aim to share experiences that bring people closer to faith, tradition, and community. Every journey is an opportunity to discover meaningful moments and connect with stories that inspire beyond the screen.",

  timeline: [
    {
      title: "Cultural Exploration",
      description:
        "Discovering traditions, communities, and experiences through immersive storytelling.",
    },
    {
      title: "Meaningful Storytelling",
      description:
        "Capturing moments that reflect culture, connection, and human experiences.",
    },
    {
      title: "Faith & Tradition",
      description:
        "Exploring the spiritual beauty and traditions that shape communities worldwide.",
    },
    {
      title: "Community Connection",
      description:
        "Building conversations and experiences that bring people together across cultures.",
    },
  ],
};

/* ==========================================================
 * COMPONENT
 * ========================================================== */

export default function AboutUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About us"
      className="relative w-full overflow-hidden bg-[#F5F5F3]"
      style={{
        paddingTop:    "clamp(3rem, 6vw, 6rem)",
        paddingBottom: "clamp(3rem, 6vw, 6rem)",
      }}
    >
      <div
        className="relative mx-auto w-full"
        style={{
          maxWidth: "1400px",
          paddingLeft:  "clamp(1.25rem, 4vw, 3rem)",
          paddingRight: "clamp(1.25rem, 4vw, 3rem)",
        }}
      >
        <div
          className="grid items-start grid-cols-1 lg:grid-cols-2"
          style={{ gap: "clamp(2rem, 4vw, 4.5rem)" }}
        >
          {/* ============ LEFT: IMAGE CARD ============ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] shadow-[0_25px_60px_-20px_rgba(0,0,0,0.25)]"
              style={{
                aspectRatio: "5 / 6",
              }}
            >
              <Image
                src={CONTENT.image}
                alt={CONTENT.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />

              {/* Bottom gradient overlay for text legibility */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              {/* Heading overlay (bottom-left) */}
              <div
                className="absolute left-0 right-0"
                style={{
                  bottom: "clamp(5rem, 7vw, 6.5rem)",
                  paddingLeft:  "clamp(1.5rem, 3vw, 2.5rem)",
                  paddingRight: "clamp(1.5rem, 3vw, 2.5rem)",
                }}
              >
                <h3
                  className="font-poppins font-bold leading-[1.1] tracking-tight text-white whitespace-pre-line"
                  style={{ fontSize: "clamp(1.5rem, 2.2vw, 2.25rem)" }}
                >
                  {CONTENT.imageOverlayHeading}
                </h3>
              </div>
            </motion.div>

            {/* CTA — overlaps the image bottom edge like reference */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute z-10"
              style={{
                left:   "clamp(1.5rem, 3vw, 2.5rem)",
                bottom: "clamp(1.5rem, 2.5vw, 2rem)",
              }}
            >
              <a
                href={CONTENT.ctaHref}
                className="group inline-flex items-center gap-2 rounded-full bg-white py-2 pl-5 pr-2 text-sm font-medium text-black shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] transition-all duration-300 hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.45)] hover:-translate-y-0.5"
              >
                <span>{CONTENT.ctaLabel}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#31B88B] text-white transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={15} strokeWidth={2.5} />
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* ============ RIGHT: CONTENT ============ */}
          <div className="relative flex flex-col pt-[50px]">
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-poppins font-bold leading-[1.1] tracking-[-2px] text-neutral-900"
              style={{ fontSize: "clamp(2rem, 3.6vw, 3.25rem)" }}
            >
              {CONTENT.headingStart}{" "}
              <span
                className="italic font-normal text-neutral-900"
                style={{ fontFamily: '"Playfair Display", "Times New Roman", serif' }}
              >
                {CONTENT.headingItalic}
              </span>
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl leading-relaxed text-neutral-600"
              style={{ fontSize: "clamp(14px, 1vw, 14px)" }}
            >
              {CONTENT.paragraph}
            </motion.p>

            {/* Timeline */}
            <div
              className="relative mt-10"
              style={{ paddingLeft: "clamp(1.75rem, 2.2vw, 2.25rem)" }}
            >
              {/* Vertical connector line — absolute, runs through dot centers */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-2 bottom-2 w-px origin-top bg-neutral-300"
                style={{ left: "calc(clamp(0.4rem, 0.55vw, 0.55rem))" }}
                aria-hidden="true"
              />

              <ul className="flex flex-col" style={{ gap: "clamp(1.25rem, 2vw, 1.75rem)" }}>
                {CONTENT.timeline.map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.5 + i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative"
                  >
                    {/* Dot — positioned over the connector line */}
                    <span
                      className="absolute top-1.5 flex items-center justify-center rounded-full bg-[#0d4a37] ring-4 ring-[#F5F5F3]"
                      style={{
                        left: "calc(-1 * clamp(1.75rem, 2.2vw, 2.25rem) + clamp(0px, 0.05vw, 0.05rem))",
                        width:  "clamp(14px, 1.1vw, 18px)",
                        height: "clamp(14px, 1.1vw, 18px)",
                      }}
                      aria-hidden="true"
                    >
                      <span
                        className="rounded-full bg-[#31B88B]"
                        style={{
                          width:  "clamp(6px, 0.45vw, 8px)",
                          height: "clamp(6px, 0.45vw, 8px)",
                        }}
                      />
                    </span>

                    <h4
                      className="font-poppins font-semibold leading-snug text-neutral-900"
                      style={{ fontSize: "clamp(15px, 1.1vw, 16px)" }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="mt-1.5 max-w-lg leading-relaxed text-neutral-500"
                      style={{ fontSize: "clamp(13px, 0.9vw, 14px)" }}
                    >
                      {item.description}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
