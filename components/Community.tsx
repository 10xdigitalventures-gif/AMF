"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ==========================================================
 * CONTENT — easy to edit
 * ========================================================== */

const CONTENT = {
  image: "/images/community.webp",
  imageAlt: "Travel community",
  heading: "Be part of our Travel Community",
  paragraph:
    "Connect with us to unlock exclusive content, engage directly, and enjoy tailored perks. You'll get behind-the-scenes access while supporting the creation of impactful content. Your support makes a real difference, inspiring millions to embrace their unique, adventurous lives.",
  ctaLabel: "Join Community",
  ctaHref: "#join",
};

/* ==========================================================
 * COMPONENT
 * ========================================================== */

export default function Community() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="community"
      aria-label="Community"
      className="relative w-full overflow-hidden bg-white"
    >
      {/* ============ BACKGROUND IMAGE ============ */}
      <div className="absolute inset-0 z-0">
        <Image
          src={CONTENT.image}
          alt={CONTENT.imageAlt}
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />

        {/* Left-to-right white fade overlay — strong on left, fades toward right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.92) 25%, rgba(255,255,255,0.75) 45%, rgba(255,255,255,0.35) 65%, rgba(255,255,255,0) 85%)",
          }}
        />

        {/* Mobile: top-to-bottom fade so content stays readable on stacked layout */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0) 100%)",
          }}
        />
      </div>

      {/* ============ CONTENT ============ */}
      <div
        className="relative z-10 mx-auto w-full"
        style={{
          maxWidth: "1400px",
          paddingLeft:  "clamp(1.25rem, 4vw, 3rem)",
          paddingRight: "clamp(1.25rem, 4vw, 3rem)",
          paddingTop:   "clamp(4rem, 8vw, 7rem)",
          paddingBottom:"clamp(4rem, 8vw, 7rem)",
        }}
      >
        <div
          className="max-w-full md:max-w-[55%] lg:max-w-[48%] xl:max-w-[44%]"
        >
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-poppins font-bold leading-[1.1] tracking-[-0.02em] text-neutral-900"
            style={{ fontSize: "clamp(1.875rem, 3.4vw, 3rem)" }}
          >
            {CONTENT.heading}
          </motion.h2>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="leading-relaxed text-neutral-600"
            style={{
              fontSize: "clamp(14px, 1vw, 16px)",
              marginTop: "clamp(1rem, 1.5vw, 1.5rem)",
              maxWidth: "44ch",
            }}
          >
            {CONTENT.paragraph}
          </motion.p>

          {/* CTA — same animation as About section, themed reverse */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginTop: "clamp(1.75rem, 2.5vw, 2.25rem)" }}
          >
            <Link
              href={CONTENT.ctaHref}
              className="group inline-flex items-center gap-2 rounded-full bg-[#31B88B] py-2 pl-5 pr-2 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(49,184,139,0.5)] transition-all duration-300 hover:shadow-[0_12px_30px_-8px_rgba(49,184,139,0.7)] hover:-translate-y-0.5"
            >
              <span>{CONTENT.ctaLabel}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#31B88B] transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
