import { motion } from "framer-motion";
import { Twitter, Linkedin, Globe } from "lucide-react";
import type { Translations } from "@/lib/translations";

const SpeakerSection = ({ t }: { t: Translations }) => {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs uppercase text-accent tracking-[0.3em] mb-3 block">
            {t.speakerTag}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-outfit">
            {t.speakerTitle}{" "}
            <span className="text-gradient">{t.speakerHighlight}</span>
          </h2>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto bg-card border border-border rounded-lg p-8 glow-primary"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div
              className="w-32 h-32 rounded-sm flex-shrink-0 flex items-center justify-center border-2 border-border"
              style={{
                background: "linear-gradient(135deg, hsl(222 80% 45%), hsla(0, 85%, 48%, 0.3))",
              }}
            >
              <span className="text-3xl font-bold font-outfit text-primary-foreground">JD</span>
            </div>

            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold font-outfit mb-1">{t.speakerName}</h3>
              <p className="font-mono text-sm text-accent mb-3">{t.speakerRole}</p>
              <p className="text-sm text-muted-foreground mb-4">{t.speakerBio}</p>
              <div className="flex gap-2 justify-center sm:justify-start">
                {[Twitter, Linkedin, Globe].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-9 h-9 rounded-sm bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpeakerSection;
