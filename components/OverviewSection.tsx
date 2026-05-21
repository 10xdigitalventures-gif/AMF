"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

/* ==========================================================
 * TYPES
 * ========================================================== */

type IconPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center"
  | "center-left"
  | "center-right";

type CardSize = "wide" | "narrow"; // 50% (col-span-2) | 25% (col-span-1)

type CardTheme = "dark" | "light";

type OverviewCard = {
  /* Content */
  platform: string;
  followers: string;
  followersNumeric: number;
  followersSuffix?: string;
  heading: string;
  username: string;

  /* Card layout */
  size: CardSize;
  theme: CardTheme;

  /* ===== Per-card icon controls — all optional with sensible defaults =====
   * Every card has independent control over its icon. Override any subset.
   *
   * iconWidth / iconHeight  → accept any CSS value: "220px", "60%", "clamp(...)"
   * iconPosition            → which corner/edge the icon anchors to
   * iconRotate              → e.g. "-8deg", "12deg"
   * iconOpacity             → 0 to 1, default 1
   * iconOffsetX/Y           → fine-tune the anchor: "-20px", "10%" (positive = inward/down/right)
   */
  icon: string;
  iconPosition?: IconPosition;
  iconWidth?: string;
  iconHeight?: string;
  iconRotate?: string;
  iconOpacity?: number;
  iconOffsetX?: string;
  iconOffsetY?: string;
};

/* ==========================================================
 * DATA — every card has its own icon settings
 * ========================================================== */

const TOP_TOTAL = { value: 11.7, suffix: "M", display: "11.7M" };

const CARDS: OverviewCard[] = [
  {
    platform: "YouTube",
    followers: "3.12M",
    followersNumeric: 3.12,
    followersSuffix: "M",
    heading: "Stories Through Culture & Travel",
    username: "@AbdulMalikFareed",
    size: "wide",
    theme: "dark",
    icon: "/icons/youtube1.webp",
    iconPosition: "bottom-right",
    iconWidth:    "clamp(180px, 30vw, 420px)",
    iconHeight:   "clamp(180px, 30vw, 420px)",
    iconRotate:   "-17deg",
    iconOffsetX:  "-90px",
    iconOffsetY:  "-144px",
  },
  {
    platform: "Instagram",
    followers: "1.1M",
    followersNumeric: 1.1,
    followersSuffix: "M",
    heading: "Daily Moments & Experiences",
    username: "@abmalikfareed",
    size: "narrow",
    theme: "light",
    icon: "/icons/instagram.webp",
    iconPosition: "top-right",
    iconWidth:    "clamp(110px, 11vw, 180px)",
    iconHeight:   "clamp(110px, 11vw, 180px)",
    iconRotate:   "8deg",
    iconOffsetX:  "-26px",
    iconOffsetY:  "-37px",
  },
  {
    platform: "Tiktok",
    followers: "423k",
    followersNumeric: 423,
    followersSuffix: "k",
    heading: "Short Stories That Connect",
    username: "@abmalikfareed",
    size: "narrow",
    theme: "light",
    icon: "/icons/tiktok.webp",
    iconPosition: "top-right",
    iconWidth:    "clamp(110px, 11vw, 180px)",
    iconHeight:   "clamp(110px, 11vw, 180px)",
    iconRotate:   "8deg",
    iconOffsetX:  "-26px",
    iconOffsetY:  "-37px",
  },
  {
    platform: "X / Twitter",
    followers: "2.5k",
    followersNumeric: 2.5,
    followersSuffix: "k",
    heading: "Thoughts, Culture & Community",
    username: "@abmalikfareed",
    size: "narrow",
    theme: "light",
    icon: "/icons/x.webp",
    iconPosition: "top-right",
    iconWidth:    "clamp(110px, 11vw, 180px)",
    iconHeight:   "clamp(110px, 11vw, 180px)",
    iconRotate:   "8deg",
    iconOffsetX:  "-26px",
    iconOffsetY:  "-37px",
  },
  {
    platform: "Threads",
    followers: "100k",
    followersNumeric: 100,
    followersSuffix: "k",
    heading: "Conversations Beyond Content",
    username: "@abmalikfareed",
    size: "narrow",
    theme: "light",
    icon: "/icons/threads.webp",                 // ← icon now present
    iconPosition: "top-right",
    iconWidth:    "clamp(110px, 11vw, 180px)",
    iconHeight:   "clamp(110px, 11vw, 180px)",
    iconRotate:   "8deg",
    iconOffsetX:  "-26px",
    iconOffsetY:  "-37px",
  },
  {
    platform: "Facebook",
    followers: "5.2M",
    followersNumeric: 5.2,
    followersSuffix: "M",
    heading: "A Growing Global Community",
    username: "@abmalikfareed",
    size: "wide",
    theme: "light",
    icon: "/icons/facebook.webp",
    iconPosition: "bottom-right",
    iconWidth:    "clamp(180px, 30vw, 420px)",
    iconHeight:   "clamp(180px, 30vw, 420px)",
    iconRotate:   "-17deg",
    iconOffsetX:  "-90px",
    iconOffsetY:  "-144px",
  },
];

/* ==========================================================
 * COUNTER — scroll-triggered, animates once
 * ========================================================== */

function AnimatedCounter({
  value,
  suffix = "",
  decimals = 1,
  duration = 2,
  className = "",
  trigger,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  trigger: boolean;
}) {
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString()
  );

  const [text, setText] = useState(decimals > 0 ? "0.0" : "0");

  useEffect(() => {
    const unsub = display.on("change", (v) => setText(v));
    return () => unsub();
  }, [display]);

  useEffect(() => {
    if (!trigger) return;
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [trigger, value, duration, motionValue]);

  return (
    <span className={className}>
      {text}
      {suffix}
    </span>
  );
}

/* ==========================================================
 * ICON POSITION → anchor styles + transform origin
 * Each position returns the CSS anchor needed. The transform
 * (rotate + offset) is composed separately so it works for
 * every anchor without breaking centering.
 * ========================================================== */

function getIconAnchorStyle(
  position: IconPosition,
  offsetX: string,
  offsetY: string,
  rotate: string,
): React.CSSProperties {
  // Base translations for centered anchors so rotation stays balanced.
  // Offsets are added on top: positive offsetX = right, positive offsetY = down.
  const positions: Record<IconPosition, React.CSSProperties> = {
    "top-left":      { top: 0,     left: 0,    transform: `translate(${offsetX}, ${offsetY}) rotate(${rotate})` },
    "top-right":     { top: 0,     right: 0,   transform: `translate(calc(-1 * (${offsetX})), ${offsetY}) rotate(${rotate})` },
    "top-center":    { top: 0,     left: "50%",transform: `translate(calc(-50% + ${offsetX}), ${offsetY}) rotate(${rotate})` },
    "bottom-left":   { bottom: 0,  left: 0,    transform: `translate(${offsetX}, calc(-1 * (${offsetY}))) rotate(${rotate})` },
    "bottom-right":  { bottom: 0,  right: 0,   transform: `translate(calc(-1 * (${offsetX})), calc(-1 * (${offsetY}))) rotate(${rotate})` },
    "bottom-center": { bottom: 0,  left: "50%",transform: `translate(calc(-50% + ${offsetX}), calc(-1 * (${offsetY}))) rotate(${rotate})` },
    "center-left":   { top: "50%", left: 0,    transform: `translate(${offsetX}, calc(-50% + ${offsetY})) rotate(${rotate})` },
    "center-right":  { top: "50%", right: 0,   transform: `translate(calc(-1 * (${offsetX})), calc(-50% + ${offsetY})) rotate(${rotate})` },
  };
  return positions[position];
}

/* ==========================================================
 * CARD THEME STYLES
 * ========================================================== */

const CARD_THEMES = {
  dark: {
    container:
      "bg-[#111111]",
    number: "text-white",
    heading: "text-white/70",
    divider: "bg-gradient-to-r from-white/[0.14] via-white/[0.06] to-transparent",
    link: "text-white/45",
    linkValue: "text-white/85",
  },
  light: {
    container:
      "bg-[#F3F3F3]",
    number: "text-black",
    heading: "text-neutral-600",
    divider: "bg-gradient-to-r from-black/[0.12] via-black/[0.05] to-transparent",
    link: "text-neutral-500",
    linkValue: "text-neutral-800",
  },
} as const;

/* ==========================================================
 * CARD COMPONENT
 * ========================================================== */

function BentoCard({
  card,
  index,
  trigger,
}: {
  card: OverviewCard;
  index: number;
  trigger: boolean;
}) {
  const isWide = card.size === "wide";
  const theme = CARD_THEMES[card.theme];

  // Resolve per-card icon settings with defaults
  const iconPosition = card.iconPosition ?? "bottom-right";
  const iconWidth    = card.iconWidth    ?? "clamp(110px, 11vw, 180px)";
  const iconHeight   = card.iconHeight   ?? "clamp(110px, 11vw, 180px)";
  const iconRotate   = card.iconRotate   ?? "0deg";
  const iconOpacity  = card.iconOpacity  ?? 1;
  const iconOffsetX  = card.iconOffsetX  ?? "0px";
  const iconOffsetY  = card.iconOffsetY  ?? "0px";

  const iconAnchor = getIconAnchorStyle(
    iconPosition,
    iconOffsetX,
    iconOffsetY,
    iconRotate,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-500 ${theme.container} ${
        isWide ? "md:col-span-2" : "md:col-span-1"
      }`}
      style={{
        minHeight: "clamp(220px, 22vw, 300px)",
      }}
    >
      {/* ===== Floating icon — per-card customizable ===== */}
      <div
        className="pointer-events-none absolute z-0"
        style={{
          ...iconAnchor,
          width:  iconWidth,
          height: iconHeight,
          opacity: iconOpacity,
        }}
      >
        <div className="relative h-full w-full">
          <Image
            src={card.icon}
            alt={card.platform}
            fill
            sizes="(max-width: 768px) 140px, 320px"
            className="object-cover"
          />
        </div>
      </div>

      {/* ===== Content ===== */}
      <div
        className="relative z-10 flex h-full flex-col justify-end"
        style={{
          padding: "clamp(1.25rem, 2vw, 1rem)",
        }}
      >
        {/* Top: counter + heading */}
        <div>
          <div
            className={`font-poppins font-semibold leading-none tracking-tight ${theme.number}`}
            style={{ fontSize: "clamp(2rem, 3.6vw, 2.8rem)" }}
          >
            <AnimatedCounter
              value={card.followersNumeric}
              suffix={card.followersSuffix ?? ""}
              decimals={1}
              duration={2.2}
              trigger={trigger}
            />
          </div>

          <p
            className={`mt-2 font-medium ${theme.heading}`}
            style={{
              fontSize: "clamp(12px, 0.95vw, 14px)",
              maxWidth: "20ch",
            }}
          >
            {card.heading}
          </p>
        </div>

        {/* Bottom: divider + username */}
        <div className="mt-6">
          <div className={`h-px w-full ${theme.divider}`} />
          <p
            className={`mt-3 ${theme.link}`}
            style={{ fontSize: "clamp(11px, 0.8vw, 13px)" }}
          >
            Link : <span className={theme.linkValue}>{card.username}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ==========================================================
 * MAIN SECTION
 * ========================================================== */

export default function OverviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      aria-label="Community overview"
      className="relative w-full overflow-hidden bg-white"
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
        {/* ============ TOP AREA ============ */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <h2
              className="font-poppins font-bold leading-[1.05] tracking-[-2px] text-black"
              style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)" }}
            >
              Stories Shared Across 
              <br />
              Screens.
            </h2>
          </motion.div>

          {/* Right: huge counter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start md:items-end"
          >
            <div
              className="font-poppins font-semibold leading-none tracking-[-0.04em] text-black"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
            >
              <AnimatedCounter
                value={TOP_TOTAL.value}
                suffix={TOP_TOTAL.suffix}
                decimals={1}
                duration={2.5}
                trigger={inView}
              />
            </div>
            <p
              className="mt-2 font-medium text-neutral-600"
              style={{ fontSize: "clamp(12px, 1vw, 15px)" }}
            >
              Growing Across Every Platform
            </p>
          </motion.div>
        </div>

        {/* ============ DIVIDER ============ */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="my-10 h-px w-full origin-left bg-gradient-to-r from-black/15 via-black/8 to-transparent md:my-12"
        />

        {/* ============ BENTO GRID ============ */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
          style={{ gap: "clamp(0.875rem, 1.2vw, 1.25rem)" }}
        >
          {CARDS.map((card, i) => (
            <BentoCard key={i} card={card} index={i} trigger={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
