import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../common/SectionHeading";

const TEAM = [
  {
    name: "Saiyam Kumar",
    username: "Saiyam-Kumar",
    github: "https://github.com/Saiyam-Kumar",
    avatar: "https://github.com/Saiyam-Kumar.png",
  },
  {
    name: "Stuti Sharma",
    username: "Stuti-Sharma21",
    github: "https://github.com/Stuti-Sharma21",
    avatar: "https://github.com/Stuti-Sharma21.png",
  },
];

export default function Team() {
  return (
    <section
      id="team"
      className="relative overflow-hidden bg-[#0B0D12] py-24 lg:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-[#4A58B4]/10 blur-[120px]" />

        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-[#FF5A36]/10 blur-[120px]" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 grid-texture opacity-[0.18]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Team"
          title="Built by people who care about the route."
          description="Meet the team behind LifeRoute and explore our work on GitHub."
          dark
        />

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {TEAM.map((member, index) => (
            <motion.a
              key={member.username}
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#141821] p-7 transition-all duration-300 hover:border-white/20 hover:bg-[#181D27] hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
            >
              {/* Orange hover accent */}
              <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5A36] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex items-start justify-between">
                {/* Smaller professional avatar */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#FF5A36]/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <img
                    src={member.avatar}
                    alt={`${member.name} GitHub profile`}
                    className="relative h-16 w-16 rounded-full border-2 border-white/10 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Open GitHub */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.08] group-hover:text-white">
                  <ArrowUpRight size={17} />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                  {member.name}
                </h3>

                <p className="mt-2 font-mono text-sm text-white/40">
                  @{member.username}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white/45 transition-colors group-hover:text-[#FF5A36]">
                <span>View GitHub Profile</span>

                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}