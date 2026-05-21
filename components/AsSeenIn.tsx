"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

/* ==========================================================
 * TYPES
 * ========================================================== */

type LogoItem = {
  name: string;
  src: string;
  padding?: string; // optional override for shrinking/enlarging logo inside card
};

/* ==========================================================
 * LOGOS — easy to edit
 * ========================================================== */

const LOGOS: LogoItem[] = [
  { name: "TEDx",       src: "/press/logo1.png" },
  { name: "Forbes",     src: "/press/logo2.png" },
  { name: "Vogue",      src: "/press/logo3.png" },
  { name: "GQ",         src: "/press/logo4.png", padding: "clamp(1rem, 2vw, 7rem)" },
  { name: "Wired",      src: "/press/logo5.png" },
  { name: "Bloomberg",  src: "/press/logo6.png" },
  { name: "Esquire",    src: "/press/logo7.png" },
  { name: "Monocle",    src: "/press/logo8.png" },
];

/* Extra 2 logos for the centered 3rd row */
const EXTRA_LOGOS: LogoItem[] = [
  { name: "Logo 9",  src: "/press/logo9.png", padding: "clamp(1rem, 2vw, 7rem)" },
  { name: "Logo 10", src: "/press/logo10.png" },
];

/* ==========================================================
 * LOGO CARD
 * ========================================================== */

function LogoCard({ logo }: { logo: LogoItem }) {
  return (
    <div
      className="relative flex items-center justify-center rounded-2xl bg-[#F3F3F3] transition-all duration-300 hover:bg-[#EDEDED]"
      style={{
        aspectRatio: "16 / 9",
        padding: logo.padding ?? "clamp(2rem, 4vw, 3.80rem)",
      }}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <Image
          src={logo.src}
          alt={logo.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 22vw, 14vw"
          className="object-contain object-center"
          style={{
            // Force logos to appear black/dark monochrome regardless of source color
            filter: "brightness(0) saturate(100%)",
          }}
        />
      </div>
    </div>
  );
}

/* ==========================================================
 * MAIN SECTION
 * ========================================================== */

export default function AsSeenIn() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      aria-label="As seen in"
      className="relative w-full overflow-hidden bg-white"
      style={{
        paddingTop:    "clamp(3rem, 5vw, 5rem)",
        paddingBottom: "clamp(3rem, 5vw, 5rem)",
      }}
    >
      <div
        className="relative mx-auto w-full"
        style={{
          maxWidth: "1280px",
          paddingLeft:  "clamp(1.25rem, 4vw, 3rem)",
          paddingRight: "clamp(1.25rem, 4vw, 3rem)",
        }}
      >
        {/* ============ HEADING ============ */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-poppins font-semibold tracking-tight text-black"
          style={{
            fontSize: "clamp(1.125rem, 1.5vw, 2.375rem)",
            marginBottom: "clamp(2rem, 3.0vw, 1rem)",
          }}
        >
          As seen in
        </motion.h2>

        {/* ============ DESKTOP / TABLET GRID ============ */}
        <div
          className="hidden sm:grid grid-cols-2 md:grid-cols-4"
          style={{ gap: "clamp(0.75rem, 1.2vw, 1rem)" }}
        >
          {LOGOS.map((logo, i) => (
            <motion.div
              key={`grid-${logo.name}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <LogoCard logo={logo} />
            </motion.div>
          ))}

          {/* ===== 3rd row: 4 columns with col 1 & 4 empty, col 2 & 3 logos ===== */}
          {/* Empty col 1 (only on md+) */}
          <div className="hidden md:block" aria-hidden="true" />

          {/* Col 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: 0.15 + 8 * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <LogoCard logo={EXTRA_LOGOS[0]} />
          </motion.div>

          {/* Col 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: 0.15 + 9 * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <LogoCard logo={EXTRA_LOGOS[1]} />
          </motion.div>

          {/* Empty col 4 (only on md+) */}
          <div className="hidden md:block" aria-hidden="true" />
        </div>

        {/* ============ MOBILE CAROUSEL ============ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="sm:hidden -mx-5"
        >
          <div
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
            style={{
              gap: "0.75rem",
              paddingLeft:  "1.25rem",
              paddingRight: "1.25rem",
              scrollPadding: "1.25rem",
            }}
          >
            {[...LOGOS, ...EXTRA_LOGOS].map((logo, i) => (
              <div
                key={`carousel-${logo.name}-${i}`}
                className="snap-start shrink-0"
                style={{ width: "65%" }}
              >
                <LogoCard logo={logo} />
              </div>
            ))}
          </div>

          {/* Subtle scroll hint */}
          <div className="mt-4 flex justify-center gap-1.5">
            <span className="h-1 w-6 rounded-full bg-black/30" />
            <span className="h-1 w-1.5 rounded-full bg-black/15" />
            <span className="h-1 w-1.5 rounded-full bg-black/15" />
          </div>
        </motion.div>
      </div>

      {/* Hide scrollbar on mobile carousel */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
