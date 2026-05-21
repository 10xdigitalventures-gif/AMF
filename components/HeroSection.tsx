"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Play, Sparkles } from "lucide-react";

/* ---------- Video card configuration ----------
 * Left column (3 videos) + Right column (3 videos)
 * Each with distinctive size, tilt, vertical offset.
 * Static — no hover effects, only gentle floating motion.
 *
 * Sizing uses clamp() so cards scale FLUIDLY between
 * breakpoints — preserving the exact desktop composition
 * while shrinking proportionally on smaller screens.
 */
type VideoCard = {
  src: string;
  width: string;       // fluid width
  height: string;      // fluid height
  rotate: number;
  delay: number;
  offsetY?: string;
};

const LEFT_VIDEOS: VideoCard[] = [
  {
    src: "video1.mp4",
    // 1366px → ~150px, 1920px → ~220px
    width:  "clamp(140px, 11.5vw, 220px)",
    height: "clamp(95px, 7.3vw, 140px)",
    rotate: 0,
    delay: 0.1,
    offsetY: "translate-y-0",
  },
  {
    src: "video2.mp4",
    // 1366px → ~230px, 1920px → ~340px
    width:  "clamp(220px, 17.7vw, 340px)",
    height: "clamp(155px, 12vw, 230px)",
    rotate: 0,
    delay: 0.25,
    offsetY: "translate-y-[clamp(1rem,1.5vw,2.5rem)]",
  },
  {
    src: "video3.mp4",
    // 1366px → ~150px, 1920px → ~220px tall card
    width:  "clamp(150px, 11.5vw, 220px)",
    height: "clamp(180px, 13.5vw, 260px)",
    rotate: 0,
    delay: 0.4,
    offsetY: "translate-y-[clamp(2rem,2.8vw,5rem)]",
  },
];

const RIGHT_VIDEOS: VideoCard[] = [
  {
    src: "video4.mp4",
    width:  "clamp(140px, 11.5vw, 220px)",
    height: "clamp(95px, 7.3vw, 140px)",
    rotate: 0,
    delay: 0.15,
    offsetY: "translate-y-0",
  },
  {
    src: "video5.mp4",
    width:  "clamp(220px, 17.7vw, 340px)",
    height: "clamp(155px, 12vw, 230px)",
    rotate: 0,
    delay: 0.3,
    offsetY: "translate-y-[clamp(1rem,1.5vw,2.5rem)]",
  },
  {
    src: "video6.mp4",
    width:  "clamp(150px, 11.5vw, 220px)",
    height: "clamp(180px, 13.5vw, 260px)",
    rotate: 0,
    delay: 0.45,
    offsetY: "translate-y-[clamp(2rem,2.8vw,5rem)]",
  },
];

/* Floating video card — static, no hover */
function FloatingVideo({
  video,
  index,
}: {
  video: VideoCard;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.85, rotate: video.rotate }}
      animate={{
        opacity: 1,
        y: [0, -12, 0],
        scale: 1,
        rotate: video.rotate,
      }}
      transition={{
        opacity: { duration: 0.9, delay: 0.6 + video.delay },
        scale: {
          duration: 0.9,
          delay: 0.6 + video.delay,
          ease: [0.22, 1, 0.36, 1],
        },
        rotate: {
          duration: 0.9,
          delay: 0.6 + video.delay,
        },
        y: {
          duration: 6 + index * 0.7,
          delay: 1 + video.delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className={`relative ${video.offsetY ?? ""}`}
      style={{
        willChange: "transform",
        width: video.width,
        height: video.height,
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[22px] ring-1 ring-white/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]">
        <video
          src={video.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />

        {/* Cinematic overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/25" />

        {/* Inner subtle border */}
        <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/5" />
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.4 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-black pt-28 sm:pt-32"
    >
      {/* ============ BACKGROUND VIDEO ============ */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <video
          src="hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/75" />
        {/* Soft vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, #31b88b14 40%, rgba(0,0,0,0.7) 100%)",
          }}
        />
      </div>

      {/* ============ FLOATING VIDEOS — DESKTOP/TABLET ============
       * Columns use fluid % width + fluid padding via clamp()
       * so they scale proportionally without overlapping center
       * content. `top` offset keeps them clear of the navbar.
       */}
      {/* Left column */}
      <div
        className="pointer-events-none absolute left-0 z-[5] hidden md:flex items-center"
        style={{
          top: "clamp(6rem, 8vw, 9rem)",
          bottom: "clamp(2rem, 4vw, 5rem)",
          width: "clamp(280px, 26vw, 440px)",
        }}
      >
        <div
          className="flex w-full flex-col"
          style={{
            gap: "clamp(0.75rem, 1.2vw, 1.25rem)",
            paddingLeft: "clamp(1rem, 3.5vw, 7rem)",
          }}
        >
          {LEFT_VIDEOS.map((v, i) => (
            <div
              key={i}
              className={i === 0 ? "self-end" : i === 1 ? "self-start" : "self-end"}
            >
              <FloatingVideo video={v} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Right column */}
      <div
        className="pointer-events-none absolute right-0 z-[5] hidden md:flex items-center"
        style={{
          top: "clamp(6rem, 8vw, 9rem)",
          bottom: "clamp(2rem, 4vw, 5rem)",
          width: "clamp(280px, 26vw, 440px)",
        }}
      >
        <div
          className="flex w-full flex-col"
          style={{
            gap: "clamp(0.75rem, 1.2vw, 1.25rem)",
            paddingRight: "clamp(1rem, 3.5vw, 7rem)",
          }}
        >
          {RIGHT_VIDEOS.map((v, i) => (
            <div
              key={i}
              className={i === 0 ? "self-start" : i === 1 ? "self-end" : "self-start"}
            >
              <FloatingVideo video={v} index={i + 3} />
            </div>
          ))}
        </div>
      </div>

      {/* ============ CENTER CONTENT ============
       * Width clamps between video columns so text never collides
       * with floating cards. Typography uses clamp() to scale fluidly.
       */}
      <div
        className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center text-center"
        style={{
          maxWidth: "clamp(640px, 48vw, 900px)",
          paddingLeft: "clamp(1.5rem, 2vw, 2rem)",
          paddingRight: "clamp(1.5rem, 2vw, 2rem)",
          paddingTop: "clamp(2rem, 3vw, 3rem)",
          paddingBottom: "clamp(2rem, 3vw, 3rem)",
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Eyebrow label */}
          <motion.div
            variants={itemVariants}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#31B88B] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#31B88B]" />
            </span>
            <span
              className="font-semibold text-white/80"
              style={{ fontSize: "clamp(10px, 0.85vw, 14px)" }}
            >
              Faith <span className="text-white/30">•</span> Flavour{" "}
              <span className="text-white/30">•</span> Tradition
            </span>
          </motion.div>

          {/* Main heading — fluid clamp() scaling */}
          <motion.h1
            variants={itemVariants}
            className="font-poppins font-bold leading-[1] tracking-[-6px] text-white"
            style={{
              fontSize: "clamp(2.75rem, 6.5vw, 6.5rem)",
            }}
          >
            <span className="block">STORIES THAT</span>
            <span className="relative block">
              <span className="relative inline-block bg-gradient-to-br from-[#31B88B] via-[#3ed09c] to-[#31B88B] bg-clip-text text-transparent">
                BRING PEOPLE
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-1 left-0 right-0 h-[3px] origin-left rounded-full bg-gradient-to-r from-transparent via-[#31B88B]/80 to-transparent"
                />
              </span>
            </span>
            <span className="block">TOGETHER</span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            variants={itemVariants}
            className="mt-7 leading-relaxed text-white/80"
            style={{
              fontSize: "clamp(13px, 0.95vw, 15px)",
              maxWidth: "clamp(28rem, 36vw, 36rem)",
            }}
          >
            Exploring culture, food, faith, and meaningful experiences through cinematic storytelling and human connection.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-9 flex w-full max-w-[520px] flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
          >
            {/* Primary */}
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-[#31B88B] px-7 py-3.5 text-xs font-semibold text-black"
            >
              <span className="relative z-10">Watch Journey</span>
              <ArrowUpRight
                size={15}
                strokeWidth={2.5}
                className="relative z-10 transition-transform duration-300 group-hover:rotate-45"
              />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
            </motion.a>

            {/* Secondary */}
            <motion.a
              href="#vlogs"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-xs font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.07]"
            >
              <Play
                size={13}
                strokeWidth={2.5}
                className="fill-white transition-transform duration-300 group-hover:scale-110"
              />
              <span>Book a Session</span>
            </motion.a>
          </motion.div>

          {/* Tiny credibility line */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex items-center gap-2 text-[13px] text-white/100"
          >
            <Sparkles size={13} className="text-[white]" />
            <span>Culture • Community • Experiences</span>
          </motion.div>
        </motion.div>
      </div>

      {/* ============ MOBILE VIDEO STRIP ============ */}
      <div className="relative z-10 md:hidden">
        <div className="mx-auto -mt-2 mb-10 flex max-w-md justify-center gap-3 px-6 overflow-hidden">
          {[LEFT_VIDEOS[1], RIGHT_VIDEOS[1], LEFT_VIDEOS[0]].map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotate: v.rotate }}
              animate={{
                opacity: 1,
                y: [0, -8, 0],
                rotate: v.rotate,
              }}
              transition={{
                opacity: { duration: 0.7, delay: 1.2 + i * 0.15 },
                y: {
                  duration: 5 + i,
                  delay: 1.5 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="relative h-[150px] w-[100px] flex-shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl"
            >
              <video
                src={v.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#091413] to-transparent z-[6]" />
    </section>
  );
}
