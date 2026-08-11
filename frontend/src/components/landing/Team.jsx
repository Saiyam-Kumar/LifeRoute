import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../common/SectionHeading";

const TEAM = [
  {
    name: "Saiyam Kumar",
    avatar: "https://github.com/Saiyam-Kumar.png",
    github: "https://github.com/Saiyam-Kumar",
    linkedin: "https://www.linkedin.com/in/saiyam-kumar/",
  },
  {
    name: "Stuti Sharma",
    avatar: "https://github.com/Stuti-Sharma21.png",
    github: "https://github.com/Stuti-Sharma21",
    linkedin: "https://www.linkedin.com/in/stuti-sharma-14a3403b3/",
  },
];

function GithubIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.15c-3.2.7-3.88-1.36-3.88-1.36-.53-1.32-1.28-1.67-1.28-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.08.78 2.18v3.23c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.38 4.27 5.48v6.27ZM5.32 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.54 20.45H7.1V8.99H3.54v11.46ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

export default function Team() {
  return (
    <section
      id="team"
      className="relative overflow-hidden bg-[#0B0D12] py-20 lg:py-24"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[18%] top-[18%] h-80 w-80 rounded-full bg-[#4A58B4]/10 blur-[130px]" />

        <div className="absolute bottom-[12%] right-[18%] h-80 w-80 rounded-full bg-[#FF5A36]/10 blur-[130px]" />
      </div>

      {/* Grid texture */}
      <div className="absolute inset-0 grid-texture opacity-[0.16]" />

      {/* Main content */}
      <div className="relative mx-auto flex min-h-[620px] max-w-7xl flex-col justify-center px-6 lg:min-h-[650px] lg:px-8">

        {/* Heading */}
        <div className="mx-auto w-full max-w-7xl">
          <SectionHeading
            eyebrow="The Team"
            title="Built by people who care about the route."
            description="Meet the people behind LifeRoute and connect with us on GitHub or LinkedIn."
            dark
          />
        </div>

        {/* Team cards */}
        <div className="mx-auto mt-16 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">

          {TEAM.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -5 }}
              className="
                group relative overflow-hidden
                rounded-2xl
                border border-white/10
                bg-[#141821]
                p-7 lg:p-8
                transition-all duration-300
                hover:border-white/20
                hover:bg-[#171C25]
                hover:shadow-[0_24px_70px_rgba(0,0,0,0.3)]
              "
            >
              {/* Top orange accent */}
              <div
                className="
                  absolute inset-x-0 top-0 h-px
                  bg-gradient-to-r
                  from-transparent
                  via-[#FF5A36]
                  to-transparent
                  opacity-0
                  transition-opacity duration-300
                  group-hover:opacity-100
                "
              />

              {/* Profile header */}
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-5">

                  {/* Profile image */}
                  <div className="relative shrink-0">
                    <div
                      className="
                        absolute inset-0 rounded-full
                        bg-[#FF5A36]/20
                        blur-xl opacity-0
                        transition-opacity duration-300
                        group-hover:opacity-100
                      "
                    />

                    <img
                      src={member.avatar}
                      alt={`${member.name} profile`}
                      className="
                        relative
                        h-16 w-16
                        rounded-full
                        border border-white/15
                        object-cover
                      "
                    />
                  </div>

                  {/* Name + role */}
                  <div>
                    <h3
                      className="
                        font-display
                        text-[21px]
                        font-semibold
                        tracking-tight
                        text-white
                      "
                    >
                      {member.name}
                    </h3>

                    <p className="mt-1 text-sm text-white/45">
                      {member.role}
                    </p>
                  </div>

                </div>

                {/* External link indicator */}
                <div
                  className="
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-full
                    border border-white/10
                    bg-white/[0.03]
                    text-white/45
                    transition-all duration-300
                    group-hover:border-white/20
                    group-hover:bg-white/[0.07]
                    group-hover:text-white
                  "
                >
                  <ArrowUpRight size={16} />
                </div>

              </div>

              {/* Divider */}
              <div className="my-6 h-px bg-white/[0.07]" />

              {/* Social links */}
              <div className="grid grid-cols-2 gap-3">

                {/* GitHub */}
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} GitHub profile`}
                  className="
                    flex items-center justify-center gap-2
                    rounded-xl
                    border border-white/10
                    bg-white/[0.025]
                    px-4 py-3
                    text-[13px]
                    font-medium
                    text-white/60
                    transition-all duration-300
                    hover:border-white/20
                    hover:bg-white/[0.07]
                    hover:text-white
                  "
                >
                  <GithubIcon size={16} />

                  <span>GitHub</span>

                  <ArrowUpRight size={13} />
                </a>

                {/* LinkedIn */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn profile`}
                  className="
                    flex items-center justify-center gap-2
                    rounded-xl
                    border border-white/10
                    bg-white/[0.025]
                    px-4 py-3
                    text-[13px]
                    font-medium
                    text-white/60
                    transition-all duration-300
                    hover:border-white/20
                    hover:bg-white/[0.07]
                    hover:text-white
                  "
                >
                  <LinkedinIcon size={16} />

                  <span>LinkedIn</span>

                  <ArrowUpRight size={13} />
                </a>

              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}