import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}) {
  const alignClass = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-4 max-w-2xl ${alignClass}`}
    >
      {eyebrow && (
        <div className="flex items-center gap-2.5">
          <span className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-route" : "bg-route"}`} />
          <span
            className={`font-mono text-[12px] uppercase tracking-[0.14em] ${
              "text-white/50"
            }`}
          >
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={`font-display font-semibold tracking-tightest text-balance leading-[1.08] text-[clamp(1.75rem,3.2vw,2.75rem)] ${
          "text-white"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-[16px] leading-relaxed ${"text-white/65"}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
