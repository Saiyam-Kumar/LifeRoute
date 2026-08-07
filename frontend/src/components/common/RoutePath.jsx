import { motion } from "framer-motion";

/**
 * RoutePath — the signature LifeRoute visual language.
 *
 * A path being drawn once, plus a small pulse that continuously travels
 * along it. Used in the hero (patient → AI → hospital), in "How It Works"
 * (rotated vertical), and echoed faintly in the product preview.
 *
 * Deliberately restrained: one stroke weight, one accent color, no glow,
 * no bounce. It should read like a route on an instrument display, not a
 * decorative squiggle.
 */
export default function RoutePath({
  d,
  viewBox = "0 0 600 200",
  className = "",
  strokeColor = "#FF5A36",
  trackColor = "rgba(255,255,255,0.08)",
  dotColor = "#FF5A36",
  duration = 3.6,
  dotDelay = 0,
  drawOnView = true,
  strokeWidth = 2,
}) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* static track — the route that already exists */}
      <path d={d} stroke={trackColor} strokeWidth={strokeWidth} strokeLinecap="round" />

      {/* the route being resolved, drawn once */}
      <motion.path
        d={d}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={drawOnView ? { pathLength: 1, opacity: 1 } : undefined}
        animate={!drawOnView ? { pathLength: 1, opacity: 1 } : undefined}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* traveling pulse — the live, resolving signal */}
      <circle
        r="4"
        fill={dotColor}
        className="route-dot"
        style={{
          offsetPath: `path('${d}')`,
          animationDuration: `${duration}s`,
          animationDelay: `${dotDelay}s`,
        }}
      />
    </svg>
  );
}
