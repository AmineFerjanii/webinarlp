import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Translations } from "@/lib/translations";

const TARGET_DATE = new Date("2026-04-20T16:00:00");

const CountdownTimer = ({ t }: { t: Translations }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const diff = Math.max(0, TARGET_DATE.getTime() - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      min: Math.floor((diff / (1000 * 60)) % 60),
      sec: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const boxes = [
    { label: t.days, value: timeLeft.days },
    { label: t.hours, value: timeLeft.hours },
    { label: t.min, value: timeLeft.min },
    { label: t.sec, value: timeLeft.sec },
  ];

  return (
    <motion.div
      className="flex gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      {boxes.map((box) => (
        <div
          key={box.label}
          className="flex flex-col items-center bg-card border border-border rounded-lg px-4 py-3 min-w-[70px] glow-primary"
        >
          <span className="font-mono font-bold text-2xl text-primary">
            {String(box.value).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {box.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

export default CountdownTimer;
