import { ArrowUpRight } from "lucide-react";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-body font-medium transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4";

const variants = {
  primary:
    "bg-route text-canvas px-7 py-3.5 text-[15px] hover:bg-[#ff6b4a] active:scale-[0.98] shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_8px_24px_-8px_rgba(255,90,54,0.55)] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset,0_10px_30px_-6px_rgba(255,90,54,0.65)]",
  secondary:
    "bg-transparent text-ink px-7 py-3.5 text-[15px] border border-ink/15 hover:border-ink/30 hover:bg-ink/[0.03] active:scale-[0.98]",
  "secondary-dark":
    "bg-white/[0.04] text-canvas px-7 py-3.5 text-[15px] border border-white/15 hover:border-white/30 hover:bg-white/[0.08] active:scale-[0.98]",
  ghost:
    "bg-transparent text-ink-soft px-4 py-2 text-[14px] hover:text-ink",
};

export default function Button({
  children,
  variant = "primary",
  icon = true,
  className = "",
  as: Component = "button",
  ...props
}) {
  return (
    <Component className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {icon && (
        <ArrowUpRight
          size={16}
          strokeWidth={2.25}
          className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </Component>
  );
}
