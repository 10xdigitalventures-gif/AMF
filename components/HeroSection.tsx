"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, Sparkles } from "lucide-react";

/* ---------- Video card configuration ---------- */
type VideoCard = {
  src: string;
  width: string;
  height: string;
  rotate: number;
  delay: number;
  offsetY?: string;
};

const LEFT_VIDEOS: VideoCard[] = [
  {
    src: "/compressed/video1.webm",
    width:  "clamp(140px, 11.5vw, 220px)",
    height: "clamp(95px, 7.3vw, 140px)",
    rotate: 0,
    delay: 0.1,
    offsetY: "translate-y-0",
  },
  {
    src: "/compressed/video2.webm",
    width:  "clamp(220px, 17.7vw, 340px)",
    height: "clamp(155px, 12vw, 230px)",
    rotate: 0,
    delay: 0.25,
    offsetY: "translate-y-[clamp(1rem,1.5vw,2.5rem)]",
  },
  {
    src: "/compressed/video3.webm",
    width:  "clamp(150px, 11.5vw, 220px)",
    height: "clamp(180px, 13.5vw, 260px)",
    rotate: 0,
    delay: 0.4,
    offsetY: "translate-y-[clamp(2rem,2.8vw,5rem)]",
  },
];

const RIGHT_VIDEOS: VideoCard[] = [
  {
    src: "/compressed/video4.webm",
    width:  "clamp(140px, 11.5vw, 220px)",
    height: "clamp(95px, 7.3vw, 140px)",
    rotate: 0,
    delay: 0.15,
    offsetY: "translate-y-0",
  },
  {
    src: "/compressed/video5.webm",
    width:  "clamp(220px, 17.7vw, 340px)",
    height: "clamp(155px, 12vw, 230px)",
    rotate: 0,
    delay: 0.3,
    offsetY: "translate-y-[clamp(1rem,1.5vw,2.5rem)]",
  },
  {
    src: "/compressed/video6.webm",
    width:  "clamp(150px, 11.5vw, 220px)",
    height: "clamp(180px, 13.5vw, 260px)",
    rotate: 0,
    delay: 0.45,
    offsetY: "translate-y-[clamp(2rem,2.8vw,5rem)]",
  },
];

const ALL_VIDEOS: VideoCard[] = [
  LEFT_VIDEOS[0],
  RIGHT_VIDEOS[0],
  LEFT_VIDEOS[1],
  RIGHT_VIDEOS[1],
  LEFT_VIDEOS[2],
  RIGHT_VIDEOS[2],
];

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
          preload="none"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/25" />
        <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/5" />
      </div>
    </motion.div>
  );
}

/* ==========================================================
 * MOBILE VIDEO SLIDER — transform-based, buttery smooth
 *
 * Key design:
 * - Track is a single flex container translated via CSS transform
 *   (NOT native scroll). This guarantees smooth GPU animation.
 * - Auto-advances 1 card every 3s using a 700ms cubic-bezier transition.
 * - Manual drag via pointer events: user grabs the track, drags freely,
 *   on release the slider eases to the nearest card.
 * - Infinite loop: duplicated cards at the end; when we cross over,
 *   we silently snap (transition disabled for one frame) back to the
 *   matching real position — invisible to the eye.
 * ========================================================== */

function MobileVideoSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  const [stepPx, setStepPx] = useState(0); // card width + gap, in pixels
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0); // px the user has dragged from index baseline
  const [withTransition, setWithTransition] = useState(true);

  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const pointerId = useRef<number | null>(null);
  const pauseUntil = useRef(0);

  // Duplicate first 3 cards at end for seamless infinite loop
  const cards = [...ALL_VIDEOS, ALL_VIDEOS[0], ALL_VIDEOS[1], ALL_VIDEOS[2]];

  /* Measure card+gap width on mount and on resize */
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const first = track.children[0] as HTMLElement | undefined;
      const second = track.children[1] as HTMLElement | undefined;
      if (!first) return;
      if (!second) {
        setStepPx(first.offsetWidth);
      } else {
        setStepPx(second.offsetLeft - first.offsetLeft);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* Auto-advance every 3s */
  useEffect(() => {
    const id = setInterval(() => {
      if (dragging) return;
      if (Date.now() < pauseUntil.current) return;
      setWithTransition(true);
      setIndex((p) => p + 1);
    }, 3000);
    return () => clearInterval(id);
  }, [dragging]);

  /* When index lands on a cloned card, snap silently back to real one */
  useEffect(() => {
    if (index < ALL_VIDEOS.length) return;
    // Wait for smooth transition to complete, then jump invisibly
    const t = setTimeout(() => {
      setWithTransition(false);
      setIndex(index - ALL_VIDEOS.length);
      // Re-enable transition on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setWithTransition(true));
      });
    }, 720);
    return () => clearTimeout(t);
  }, [index]);

  /* Pointer event handlers — works for touch + mouse */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!stepPx) return;
    pointerId.current = e.pointerId;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    setWithTransition(false);
    dragStartX.current = e.clientX;
    dragStartOffset.current = dragOffset;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || pointerId.current !== e.pointerId) return;
    const dx = e.clientX - dragStartX.current;
    setDragOffset(dragStartOffset.current + dx);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerId.current !== e.pointerId) return;
    pointerId.current = null;

    if (!stepPx) {
      setDragging(false);
      return;
    }

    // Calculate how many cards the user dragged through
    const dragged = dragOffset;
    const cardsMoved = Math.round(-dragged / stepPx);

    // Threshold: even small swipes (>15% of card width) should advance one
    let finalDelta = cardsMoved;
    if (cardsMoved === 0 && Math.abs(dragged) > stepPx * 0.15) {
      finalDelta = dragged < 0 ? 1 : -1;
    }

    let newIndex = index + finalDelta;

    // Allow wrapping backwards via clones — but easier: clamp into safe zone
    if (newIndex < 0) {
      // Jump invisibly to mirror position at end, then animate to target
      setWithTransition(false);
      setIndex(newIndex + ALL_VIDEOS.length);
      setDragOffset(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setWithTransition(true));
      });
    } else {
      setWithTransition(true);
      setIndex(newIndex);
      setDragOffset(0);
    }

    setDragging(false);
    // Pause auto-advance for 4s after manual interaction
    pauseUntil.current = Date.now() + 4000;
  };

  /* Compute current translate position */
  const translateX = -(index * stepPx) + dragOffset;

  return (
    <div
      ref={containerRef}
      className="md:hidden mt-4 mb-2 select-none overflow-hidden"
      style={{
        // Container padding so first/last cards have breathing room from edges
        paddingLeft:  "1rem",
        paddingRight: "1rem",
        // Prevent vertical page scroll being hijacked by horizontal swipes
        touchAction: "pan-y",
      }}
    >
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="flex gap-3 cursor-grab active:cursor-grabbing"
        style={{
          transform: `translate3d(${translateX}px, 0, 0)`,
          transition: withTransition
            ? "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)"
            : "none",
          willChange: "transform",
          touchAction: "pan-y",
        }}
      >
        {cards.map((v, i) => (
          <div
            key={`m-${i}`}
            className="relative aspect-[3/4] w-[42vw] flex-shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl pointer-events-none"
          >
            <video
              src={v.src}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </div>
        ))}
      </div>
    </div>
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
      className="relative min-h-screen w-full overflow-hidden bg-black pt-24 sm:pt-32"
    >
      {/* ============ BACKGROUND VIDEO ============ */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <video
          src="/compressed/hero.webm"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, #31b88b14 40%, rgba(0,0,0,0.7) 100%)",
          }}
        />
      </div>

      {/* ============ FLOATING VIDEOS — DESKTOP/TABLET ============ */}
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

      {/* ============ CENTER CONTENT ============ */}
      <div
        className="relative z-10 mx-auto flex flex-col items-center justify-center text-center md:min-h-[calc(100vh-8rem)]"
        style={{
          maxWidth: "clamp(640px, 48vw, 900px)",
          paddingLeft: "clamp(1.5rem, 2vw, 2rem)",
          paddingRight: "clamp(1.5rem, 2vw, 2rem)",
          paddingTop: "clamp(1.5rem, 3vw, 3rem)",
          paddingBottom: "clamp(1.5rem, 3vw, 3rem)",
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 sm:mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm"
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

          <motion.h1
            variants={itemVariants}
            className="font-poppins font-bold leading-[1.05] tracking-normal md:leading-[1] md:tracking-[-6px] text-white"
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

          <motion.p
            variants={itemVariants}
            className="mt-6 sm:mt-7 leading-relaxed text-white/80"
            style={{
              fontSize: "clamp(13px, 0.95vw, 15px)",
              maxWidth: "clamp(28rem, 36vw, 36rem)",
            }}
          >
            Exploring culture, food, faith, and meaningful experiences through cinematic storytelling and human connection.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-7 sm:mt-9 flex w-full max-w-[520px] flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
          >
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

          <motion.div
            variants={itemVariants}
            className="mt-8 sm:mt-10 flex items-center gap-2 text-[13px] text-white/100"
          >
            <Sparkles size={13} className="text-[white]" />
            <span>Culture • Community • Experiences</span>
          </motion.div>
        </motion.div>
      </div>

      {/* ============ MOBILE VIDEO SLIDER ============ */}
      <div className="relative z-10">
        <MobileVideoSlider />
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#091413] to-transparent z-[6]" />
    </section>
  );
}
