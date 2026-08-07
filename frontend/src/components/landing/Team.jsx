import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";

const TEAM = [
  { initials: "AK", name: "Aria Kim", role: "Product & Frontend" },
  { initials: "RS", name: "Rohan Shah", role: "ML / Triage Model" },
  { initials: "ML", name: "Maya Lopez", role: "Backend & Infra" },
  { initials: "JT", name: "Jonah Tran", role: "Clinical Advisor" },
];

export default function Team() {
  return (
    <section id="team" className="relative bg-canvas py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading eyebrow="Team" title="Built by a small team in one weekend." align="left" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              className="flex flex-col items-start gap-4 rounded-2xl border border-ink/[0.08] bg-white p-6"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-ink text-canvas font-display font-semibold text-[13.5px] tracking-tightest">
                {member.initials}
              </div>
              <div>
                <div className="font-display font-semibold text-[15px] text-ink tracking-tightest">
                  {member.name}
                </div>
                <div className="text-[13px] text-ink-faint mt-0.5">{member.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
