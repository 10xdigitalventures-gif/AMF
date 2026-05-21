    "use client";

    import { useRef } from "react";
    import Link from "next/link";
    import { motion, useInView } from "framer-motion";
    import { ArrowUpRight } from "lucide-react";

    /* ==========================================================
    * TYPES
    * ========================================================== */

    type ServiceCard = {
    eyebrow: string;       // small label above title, e.g. "MENTORSHIP"
    title: string;         // e.g. "1:1 Consultation"
    description: string;
    video: string;         // video src
    href: string;          // link destination
    overlayOpacity?: number; // 0–1, default 0.55
    };

    type ServicesContent = {
    heading: string;       // left bold heading
    paragraph: string;     // right supporting text
    cards: ServiceCard[];
    };

    /* ==========================================================
    * CONTENT — easy to edit
    * ========================================================== */

    const CONTENT: ServicesContent = {
    heading: "Crafting moments\nthat linger.",
    paragraph:
        "Selected engagements — built for brands and partners who value authenticity over algorithms, story over volume.",
    cards: [
        {
        eyebrow: "MENTORSHIP",
        title: "1:1 Consultation",
        description:
            "Private mentorship for creators building soulful, faith-rooted content. Strategy, storytelling, and audience growth.",
        video: "/video1.mp4",
        href: "/services/consultation",
        overlayOpacity: 0.6,
        },
        {
        eyebrow: "PARTNERSHIP",
        title: "Brand Collaboration",
        description:
            "Cinematic, value-aligned campaigns for brands looking to reach intentional, engaged audiences across platforms.",
        video: "/video2.mp4",
        href: "/services/collaboration",
        overlayOpacity: 0.6,
        },
        {
        eyebrow: "PRODUCTION",
        title: "Story Direction",
        description:
            "End-to-end creative direction for short films, documentaries, and brand stories rooted in culture and craft.",
        video: "/video5.mp4",
        href: "/services/production",
        overlayOpacity: 0.6,
        },
        {
        eyebrow: "SPEAKING",
        title: "Talks & Workshops",
        description:
            "Keynotes and workshops on faith, storytelling, and building meaningful presence in the modern creator economy.",
        video: "/video4.mp4",
        href: "/services/speaking",
        overlayOpacity: 0.6,
        },
    ],
    };

    /* ==========================================================
    * SERVICE CARD
    * ========================================================== */

    function ServiceCardItem({
    card,
    index,
    trigger,
    }: {
    card: ServiceCard;
    index: number;
    trigger: boolean;
    }) {
    const opacity = card.overlayOpacity ?? 0.55;

    return (
        <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{
            duration: 0.8,
            delay: 0.2 + index * 0.1,
            ease: [0.22, 1, 0.36, 1],
        }}
        className="group relative overflow-hidden rounded-2xl sm:rounded-[28px] border border-white/[0.08] shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)] transition-all duration-500 hover:border-white/[0.18] hover:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)]"
        style={{
            aspectRatio: "16 / 10",
        }}
        >
        {/* ===== Background video ===== */}
        <video
            src={card.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />

        {/* ===== Cinematic overlay ===== */}
        <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"
            style={{ opacity }}
        />
        {/* Extra bottom darken so text always reads */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* ===== Eyebrow label (top-left) ===== */}
        <div
            className="absolute z-10"
            style={{
            top:  "clamp(1rem, 1.6vw, 1.5rem)",
            left: "clamp(1rem, 1.6vw, 1.5rem)",
            }}
        >
            <span
            className="inline-flex items-center rounded-md border border-white/15 bg-white/[0.06] px-2 py-1 font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm"
            style={{ fontSize: "clamp(9px, 0.7vw, 11px)" }}
            >
            [ {card.eyebrow} ]
            </span>
        </div>

        {/* ===== Bottom content row ===== */}
        <div
            className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4"
            style={{
            padding: "clamp(1.25rem, 2vw, 2rem)",
            }}
        >
            {/* Left: title + description */}
            <div className="min-w-0 flex-1">
            <h3
                className="font-poppins font-semibold leading-tight tracking-tight text-white"
                style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.05rem)" }}
            >
                {card.title}
            </h3>
            <p
                className="mt-2 leading-relaxed text-white/70"
                style={{
                fontSize: "clamp(12px, 0.9vw, 14px)",
                maxWidth: "48ch",
                }}
            >
                {card.description}
            </p>
            </div>

            {/* Right: circular arrow CTA — matches About section animation */}
            <Link
            href={card.href}
            aria-label={`Learn more about ${card.title}`}
            className="group/btn flex shrink-0 items-center justify-center rounded-full bg-[#31B88B] text-white shadow-[0_8px_24px_-6px_rgba(49,184,139,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-6px_rgba(49,184,139,0.8)]"
            style={{
                width:  "clamp(40px, 3.5vw, 52px)",
                height: "clamp(40px, 3.5vw, 52px)",
            }}
            >
            <ArrowUpRight
                size={18}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover/btn:rotate-45"
            />
            </Link>
        </div>
        </motion.div>
    );
    }

    /* ==========================================================
    * MAIN SECTION
    * ========================================================== */

    export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section
        ref={sectionRef}
        id="services"
        aria-label="Services"
        className="relative w-full overflow-hidden bg-[#091413]"
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
            {/* ============ TOP CONTENT ROW ============ */}
            <div
            className="grid grid-cols-1 md:grid-cols-2 items-end"
            style={{ gap: "clamp(1.5rem, 3vw, 3rem)" }}
            >
            {/* Left: heading */}
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-poppins font-semibold leading-[1.05] tracking-[-2px] text-white whitespace-pre-line"
                style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)" }}
            >
                {CONTENT.heading}
            </motion.h2>

            {/* Right: paragraph */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="md:pt-4 flex md:justify-end"
            >
                <p
                className="leading-relaxed text-white/60"
                style={{
                    fontSize: "clamp(14px, 1vw, 14px)",
                    maxWidth: "38ch",
                }}
                >
                {CONTENT.paragraph}
                </p>
            </motion.div>
            </div>

            {/* ============ 2x2 GRID ============ */}
            <div
            className="mt-12 grid grid-cols-1 md:grid-cols-2"
            style={{
                gap: "clamp(1rem, 1.6vw, 1.5rem)",
                marginTop: "clamp(2.5rem, 4vw, 2rem)",
            }}
            >
            {CONTENT.cards.map((card, i) => (
                <ServiceCardItem
                key={card.title + i}
                card={card}
                index={i}
                trigger={inView}
                />
            ))}
            </div>
        </div>
        </section>
    );
    }
