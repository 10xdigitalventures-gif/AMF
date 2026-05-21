"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Colloborate", href: "#colloborate" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("HOME");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6"
      >
        <nav
          className={`relative flex w-full max-w-7xl items-center justify-between rounded-full border px-4 py-2.5 sm:px-6 transition-all duration-500 ${
            scrolled
              ? "border-white/10 bg-black/70 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]"
              : "border-white/[0.06] bg-black/30 backdrop-blur-md"
          }`}
        >
          {/* Logo — image only, clean and balanced */}
            <Link
              href="#home"
              className="flex items-center shrink-0"
              aria-label="Home"
            >
              <div className="relative h-10 w-[160px] sm:h-12 sm:w-[220px]">
                <Image
                  src="/logo.webp"
                  alt="Logo"
                  fill
                  sizes="(max-width: 640px) 160px, 220px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.label;
              return (
                <li key={item.label}>
                  <button
                    onClick={() => setActive(item.label)}
                    className="relative px-3.5 py-2 text-[13px] font-regular tracking-[-0.1px] text-white/80 transition-colors hover:text-white"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">
                      {item.label}
                      {isActive && (
                        <span className="ml-1.5 inline-block h-1 w-1 rounded-full bg-[#31B88B] align-middle shadow-[0_0_8px_#31B88B]" />
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* ====== CTA — identical to About section button ====== */}
            <Link
              href="#contact"
              className="hidden sm:inline-flex group items-center gap-2 rounded-full bg-white py-1 pl-4 pr-1 text-[13px] font-medium text-black shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] transition-all duration-300 hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.45)] hover:-translate-y-0.5"
            >
              <span>Get In Touch</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#31B88B] text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={13} strokeWidth={2.5} />
              </span>
            </Link>

            <button
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full flex-col items-center justify-center px-6"
            >
              <ul className="flex flex-col items-center gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                  >
                    <button
                      onClick={() => {
                        setActive(item.label);
                        setMobileOpen(false);
                      }}
                      className={`block py-3 text-3xl font-bold tracking-tight transition-colors ${
                        active === item.label
                          ? "text-[#31B88B]"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* ====== MOBILE MENU CTA — identical to About section button ====== */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-10"
              >
                <Link
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="group inline-flex items-center gap-2 rounded-full bg-white py-2 pl-5 pr-2 text-base font-medium text-black shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] transition-all duration-300 hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.45)] hover:-translate-y-0.5"
                >
                  <span>Get In Touch</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#31B88B] text-white transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={16} strokeWidth={2.5} />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
