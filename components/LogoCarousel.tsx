"use client";

import Image from "next/image";

/* ---------- Logo configuration ----------
 * Replace `src` with your actual logo paths in /public/logos/
 * Keep PNG/SVG with transparent background for cleanest look.
 * Recommended: monochrome white or light-grey logos.
 */
type Logo = {
  name: string;
  src: string;
};

const LOGOS: Logo[] = [
  { name: "Brand 1",   src: "/logos/logo-1.png" },
  { name: "Brand 2",   src: "/logos/logo-2.png" },
  { name: "Brand 3", src: "/logos/logo-3.png" },
  { name: "Brand 4",  src: "/logos/logo-4.png" },
  { name: "Brand 5",  src: "/logos/logo-5.png" },
  { name: "Brand 6",   src: "/logos/logo-6.png" },
  { name: "Brand 7", src: "/logos/logo-7.png" },
  { name: "Brand 8", src: "/logos/logo-8.png" },
  { name: "Brand 9",  src: "/logos/logo-9.png" },
  { name: "Brand 10",   src: "/logos/logo-10.png" },
  { name: "Brand 11",   src: "/logos/logo-11.png" },
  { name: "Brand 12",   src: "/logos/logo-12.png" },
  { name: "Brand 13",   src: "/logos/logo-13.png" },
  { name: "Brand 14",   src: "/logos/logo-14.png" },
  { name: "Brand 15",   src: "/logos/logo-15.png" },
  { name: "Brand 16",   src: "/logos/logo-16.png" },
];

export default function LogoCarousel() {
  // Duplicate the array for a seamless infinite loop.
  // The animation translates exactly -50% so the second
  // copy slides into the first copy's position perfectly.
  const track = [...LOGOS, ...LOGOS];

  return (
    <section
      aria-label="Featured in"
      className="relative w-full overflow-hidden bg-[#091413]"
      style={{
        paddingTop:    "clamp(2.5rem, 4vw, 3rem)",
        paddingBottom: "clamp(2.5rem, 4vw, 3rem)",
      }}
    >
      {/* Optional subtle eyebrow label — remove if you don't want it */}
      {/* <div className="mb-6 flex justify-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/100 sm:text-[11px]">
          As Featured In
        </span>
      </div> */}

      {/* ===== Marquee viewport with side fade masks ===== */}
      <div
        className="relative w-full"
        style={{
          // Soft gradient fade on left & right edges — works on any background.
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        {/* The animated track — `w-max` lets it expand to its real width */}
        <div
          className="logo-marquee-track flex w-max items-center"
          style={{ gap: "clamp(2.5rem, 5vw, 5rem)" }}
        >
          {track.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="logo-marquee-item relative shrink-0 opacity-50 transition-opacity duration-300 hover:opacity-100"
              style={{
                width:  "clamp(110px, 10vw, 160px)",
                height: "clamp(32px, 2.6vw, 44px)",
              }}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                sizes="(max-width: 640px) 110px, (max-width: 1024px) 130px, 160px"
                className="object-contain"
                /* If your logos aren't already white/light, this filter
                   forces a monochrome look that matches the reference.
                   Remove the `filter` class below if your logos are
                   already styled correctly. */
              />
            </div>
          ))}
        </div>
      </div>

      {/* ===== Component-scoped CSS ===== */}
      <style jsx>{`
        @keyframes logo-marquee-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            /* -50% because the track has 2 copies of the array.
               Moving by half its width loops seamlessly. */
            transform: translate3d(-50%, 0, 0);
          }
        }

        .logo-marquee-track {
          animation: logo-marquee-scroll 40s linear infinite;
          will-change: transform;
        }

        /* Pause on hover for accessibility / interaction */
        .logo-marquee-track:hover {
          animation-play-state: paused;
        }

        /* Honor reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .logo-marquee-track {
            animation: none;
          }
        }

        /* Slow the marquee slightly on smaller screens so logos
           remain readable as they pass */
        @media (max-width: 768px) {
          .logo-marquee-track {
            animation-duration: 32s;
          }
        }

        @media (max-width: 480px) {
          .logo-marquee-track {
            animation-duration: 26s;
          }
        }
      `}</style>
    </section>
  );
}
