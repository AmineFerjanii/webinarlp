import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
import SignupForm from "./SignupForm";
import type { Translations } from "@/lib/translations";

const HeroSection = ({ t }: { t: Translations }) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      {/* Language switch */}
      <div className="absolute top-6 right-6 z-20">
        <Link
          to={t.langSwitchPath}
          className="font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
        >
          {t.langSwitch}
        </Link>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            {/* Ealan presents */}
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="https://ealan-agency.com/src/assets/ealan-logo.png"
                alt="Ealan Agency"
                className="h-8 w-auto object-contain"
              />
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                presents
              </span>
            </motion.div>

            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border mb-8"
              style={{
                backgroundColor: "hsla(0, 85%, 48%, 0.08)",
                borderColor: "hsla(0, 85%, 48%, 0.25)",
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                {t.tagLine}
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-outfit tracking-tight leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {t.headline}{" "}
              <span className="text-gradient">{t.headlineHighlight}</span>
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground max-w-lg mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              {t.subtitle}
            </motion.p>

            <CountdownTimer t={t} />
          </div>

          {/* Right */}
          <div className="lg:pl-8">
            <SignupForm t={t} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
