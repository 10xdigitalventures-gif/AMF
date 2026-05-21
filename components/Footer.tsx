"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

/* ==========================================================
 * INLINE SVG BRAND ICONS — no lucide-react dependency
 * Guaranteed to work in any environment.
 * ========================================================== */

type IconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

const Instagram = ({ size = 18, strokeWidth = 2, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 18, strokeWidth = 2, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Twitter = ({ size = 18, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Youtube = ({ size = 18, strokeWidth = 2, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

/* ==========================================================
 * TYPES
 * ========================================================== */

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

type SocialLink = {
  label: string;
  href: string;
  icon: React.ElementType;
};

type PromoCard = {
  avatar: string;       // path to avatar image (e.g. logo)
  name: string;
  handle: string;
  message: string;
  icon: React.ElementType;
  href: string;         // where the card links to
};

type FooterContent = {
  columns: FooterColumn[];
  card: PromoCard;
  brandName: string;
  brandLogo: string;
  copyrightYear: number;
  socials: SocialLink[];
};

/* ==========================================================
 * CONTENT — easy to edit
 * ========================================================== */

const CONTENT: FooterContent = {
  columns: [
    {
      heading: "Explore",
      links: [
        { label: "Home",       href: "#home" },
        { label: "About",      href: "#about" },
        { label: "Services",   href: "#services" },
        { label: "Collaborate",href: "#colloborate" },
      ],
    },
    {
      heading: "Studio",
      links: [
        { label: "Travel Stories", href: "#travel" },
        { label: "Food Vlogs",     href: "#food" },
        { label: "Press",          href: "#press" },
        { label: "Journal",        href: "#blog" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Newsletter",   href: "#newsletter" },
        { label: "Behind Scenes",href: "#behind" },
        { label: "Speaking",     href: "#speaking" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy",   href: "/privacy" },
        { label: "Cookies Policy",   href: "/cookies" },
      ],
    },
  ],
  card: {
    avatar: "/logo.webp",
    name: "Abdul Malik Fareed",
    handle: "@usernamehere",
    message: "Open for select brand collaborations and creative partnerships through 2026.",
    icon: Instagram,
    href: "https://instagram.com",
  },
  brandName: "Abdul Malik Fareed",
  brandLogo: "/logo-mark.webp", // small icon-only logo for bottom row
  copyrightYear: 2026,
  socials: [
    { label: "Instagram", href: "https://instagram.com", icon: Instagram },
    { label: "YouTube",   href: "https://youtube.com",   icon: Youtube },
    { label: "Facebook",  href: "https://facebook.com",  icon: Facebook },
    { label: "Twitter",   href: "https://twitter.com",   icon: Twitter },
  ],
};

/* ==========================================================
 * FOOTER
 * ========================================================== */

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.05 });

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.1 + i * 0.08,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <footer
      ref={sectionRef}
      aria-label="Site footer"
      className="relative w-full overflow-hidden bg-black"
      style={{
        paddingTop:    "clamp(3rem, 5vw, 5rem)",
        paddingBottom: "clamp(1.5rem, 2.5vw, 2.5rem)",
      }}
    >
      {/* Subtle ambient glow — matches site aesthetic */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#31B88B]/[0.06] blur-[120px]"
          style={{ width: "50%", height: "40%" }}
        />
      </div>

      <div
        className="relative mx-auto w-full"
        style={{
          maxWidth: "1400px",
          paddingLeft:  "clamp(1.25rem, 4vw, 3rem)",
          paddingRight: "clamp(1.25rem, 4vw, 3rem)",
        }}
      >
        {/* ============ TOP AREA: columns + promo card ============ */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-start"
          style={{ gap: "clamp(2rem, 4vw, 4rem)" }}
        >
          {/* Nav columns */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4"
            style={{ gap: "clamp(1.5rem, 3vw, 3rem)" }}
          >
            {CONTENT.columns.map((column, i) => (
              <motion.div
                key={column.heading}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
              >
                <h3
                  className="font-poppins font-semibold text-white"
                  style={{ fontSize: "clamp(14px, 1vw, 16px)" }}
                >
                  {column.heading}
                </h3>
                <ul
                  className="flex flex-col"
                  style={{
                    marginTop: "clamp(1rem, 1.5vw, 1.5rem)",
                    gap:       "clamp(0.625rem, 0.9vw, 0.875rem)",
                  }}
                >
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-block text-white/55 transition-colors duration-200 hover:text-white"
                        style={{ fontSize: "clamp(13px, 0.9vw, 14px)" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* ============ PROMO CARD (right side) ============ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[300px] xl:w-[340px]"
          >
            <Link
              href={CONTENT.card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-sm shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-white/[0.18] hover:shadow-[0_25px_60px_-15px_rgba(49,184,139,0.2)] hover:-translate-y-0.5"
              style={{ padding: "clamp(1rem, 1.5vw, 1.25rem)" }}
            >
              {/* Top row: avatar + name + handle + icon */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Avatar */}
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#31B88B] ring-2 ring-white/10">
                    <Image
                      src={CONTENT.card.avatar}
                      alt={CONTENT.card.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="font-poppins font-semibold leading-tight text-white truncate"
                      style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}
                    >
                      {CONTENT.card.name}
                    </p>
                    <p
                      className="text-white/50 truncate"
                      style={{ fontSize: "clamp(11px, 0.8vw, 13px)" }}
                    >
                      {CONTENT.card.handle}
                    </p>
                  </div>
                </div>

                <CONTENT.card.icon
                  size={18}
                  className="shrink-0 text-white/70 transition-colors duration-300 group-hover:text-[#31B88B]"
                />
              </div>

              {/* Message */}
              <p
                className="leading-relaxed text-white/65"
                style={{
                  fontSize: "clamp(12px, 0.9vw, 14px)",
                  marginTop: "clamp(0.875rem, 1.2vw, 1.125rem)",
                }}
              >
                {CONTENT.card.message}
              </p>

              {/* Soft inner accent on hover */}
              <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{
                background: "radial-gradient(ellipse at top right, rgba(49,184,139,0.08), transparent 60%)",
              }} />
            </Link>
          </motion.div>
        </div>

        {/* ============ DIVIDER ============ */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="origin-left h-px w-full bg-gradient-to-r from-white/15 via-white/8 to-transparent"
          style={{
            marginTop:    "clamp(2.5rem, 4vw, 4rem)",
            marginBottom: "clamp(1.25rem, 2vw, 2rem)",
          }}
        />

        {/* ============ BOTTOM ROW ============ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-between gap-5 sm:flex-row"
        >
          {/* Copyright with mini logo */}
          <div className="flex items-center gap-2.5">
            <div className="relative h-6 w-6 overflow-hidden rounded-full bg-[#31B88B] ring-1 ring-white/10">
              <Image
                src={CONTENT.card.avatar}
                alt=""
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
            <p
              className="font-poppins font-medium text-white/70"
              style={{ fontSize: "clamp(12px, 0.85vw, 14px)" }}
            >
              {CONTENT.brandName}, {CONTENT.copyrightYear}.
            </p>
          </div>

          {/* Social icons */}
          <ul className="flex items-center gap-2.5">
            {CONTENT.socials.map((social) => {
              const Icon = social.icon;
              return (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-all duration-300 hover:border-[#31B88B]/40 hover:bg-[#31B88B]/15 hover:text-[#31B88B] hover:-translate-y-0.5"
                  >
                    <Icon
                      size={14}
                      strokeWidth={2}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </footer>
  );
}
