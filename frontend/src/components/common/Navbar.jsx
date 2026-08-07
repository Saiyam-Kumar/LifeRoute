import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "./Button";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Hospital Portal", href: "#hospital-portal" },
];

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5 shrink-0">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="4" cy="21" r="2.5" fill="currentColor" />
        <circle cx="22" cy="5" r="2.5" fill="#FF5A36" />
        <path
          d="M5.5 19.5C11 12 13 12 20 6.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="1 4.2"
        />
      </svg>
      <span className="font-display font-semibold text-[17px] tracking-tightest text-ink">
        LifeRoute
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-canvas/80 backdrop-blur-md border-b border-ink/[0.06]" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 h-[72px]">
        <Logo />

        <div className="hidden md:flex items-center gap-9">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[14px] font-medium text-ink-soft hover:text-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button variant="primary" icon={false} className="!px-5 !py-2.5 !text-[13.5px]">
            Emergency Assessment
          </Button>
        </div>

        <button
          className="md:hidden text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="md:hidden bg-canvas border-t border-ink/[0.06] px-6 py-5 flex flex-col gap-4"
        >
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-[15px] font-medium text-ink-soft hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <Button variant="primary" icon={false} className="!py-3 justify-center mt-1">
            Emergency Assessment
          </Button>
        </motion.div>
      )}
    </motion.header>
  );
}
