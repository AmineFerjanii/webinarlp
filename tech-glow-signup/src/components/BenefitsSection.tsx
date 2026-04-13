import { motion } from "framer-motion";
import { Cpu, Target, Users, Zap } from "lucide-react";
import type { Translations } from "@/lib/translations";

const icons = [Cpu, Target, Users, Zap];

const BenefitsSection = ({ t }: { t: Translations }) => {
  return (
    <section className="relative py-24 grid-overlay">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs uppercase text-accent tracking-[0.3em] mb-3 block">
            {t.whyAttendTag}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-outfit">
            {t.whyAttendTitle}{" "}
            <span className="text-gradient">{t.whyAttendHighlight}</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.benefits.map((b, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={b.title}
                className="bg-card border border-border rounded-lg p-6 relative overflow-hidden transition-all glow-primary-hover group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div
                  className="absolute top-0 left-6 h-[2px] w-8 bg-accent"
                />

                <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>

                <h3 className="font-bold font-outfit mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
