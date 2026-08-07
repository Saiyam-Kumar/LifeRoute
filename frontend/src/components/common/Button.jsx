import { ArrowUpRight } from "lucide-react";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-body font-medium transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4";

const variants = {
  primary:
    "bg-route text-canvas px-7 py-3.5 text-[15px] hover:bg-[#ff6b4a] active:scale-[0.98]",
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
    <Component
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <ArrowUpRight size={18} />}
    </Component>
  );
}