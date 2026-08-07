import { TriangleAlert } from "lucide-react";

const COLUMNS = [
  {
    title: "Product",
    links: ["Features", "How It Works", "Hospital Portal", "Emergency Assessment"],
  },
  {
    title: "Company",
    links: ["About", "Team", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Data Use"],
  },
];

export default function Footer() {
  return (
    <footer id="hospital-portal" className="relative bg-ink pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* disclaimer strip — an honest limitation stated plainly */}
        <div className="flex items-start gap-3 rounded-2xl border border-route/20 bg-route/[0.06] px-5 py-4 mb-16">
          <TriangleAlert size={17} className="text-route shrink-0 mt-0.5" strokeWidth={1.75} />
          <p className="text-[13.5px] leading-relaxed text-white/65">
            LifeRoute helps you decide where to go. It does not diagnose, treat, or replace
            emergency services. If this is a life-threatening emergency, call your local
            emergency number immediately.
          </p>
        </div>

        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 pb-16">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <svg width="22" height="22" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                <circle cx="4" cy="21" r="2.5" fill="currentColor" className="text-white" />
                <circle cx="22" cy="5" r="2.5" fill="#FF5A36" />
                <path
                  d="M5.5 19.5C11 12 13 12 20 6.5"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeDasharray="1 4.2"
                />
              </svg>
              <span className="font-display font-semibold text-[16px] text-canvas tracking-tightest">
                LifeRoute
              </span>
            </div>
            <p className="text-[13.5px] text-white/40 leading-relaxed max-w-xs">
              Routing people to the right hospital, not just the nearest one.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3.5">
              <span className="font-mono text-[11.5px] uppercase tracking-wide text-white/35">
                {col.title}
              </span>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#top"
                  className="text-[13.5px] text-white/55 hover:text-white transition-colors w-fit"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/[0.08]">
          <span className="text-[12.5px] text-white/35">© 2026 LifeRoute. Built for the hackathon.</span>
          <span className="font-mono text-[11.5px] text-white/25">Made with care, under a deadline.</span>
        </div>
      </div>
    </footer>
  );
}
