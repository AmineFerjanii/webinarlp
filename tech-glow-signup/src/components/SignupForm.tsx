import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Translations } from "@/lib/translations";

const SignupForm = ({ t }: { t: Translations }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    jobTitle: "",
    phone: "",
    company: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim()) {
      toast.error(t.requiredFields);
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("webinar_signups").insert({
        full_name: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        job_title: form.jobTitle.trim() || null,
        phone: form.phone.trim() || null,
        company: form.company.trim() || null,
        language: t.lang,
      });

      if (error) {
        if (error.code === "23505") {
          toast.error(t.alreadyRegistered);
        } else {
          throw error;
        }
      } else {
        toast.success(t.successMsg);
        setForm({ fullName: "", email: "", jobTitle: "", phone: "", company: "" });
      }
    } catch {
      toast.error(t.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary font-outfit text-sm transition-shadow";

  return (
    <motion.div
      className="bg-card border border-border rounded-lg p-8 glow-primary relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      <div className="accent-line absolute top-0 left-0" />

      <h2 className="text-2xl font-bold font-outfit text-foreground mb-1">
        {t.formTitle}
      </h2>
      <p className="font-mono text-sm text-muted-foreground mb-6">
        {t.formSubtitle}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">
            {t.fullName}
          </label>
          <input name="fullName" value={form.fullName} onChange={handleChange} className={inputClass} placeholder={t.placeholderName} required />
        </div>

        <div>
          <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">
            {t.email}
          </label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} placeholder={t.placeholderEmail} required />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">
              {t.jobTitle}
            </label>
            <input name="jobTitle" value={form.jobTitle} onChange={handleChange} className={inputClass} placeholder={t.placeholderJob} />
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">
              {t.phone}
            </label>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} className={inputClass} placeholder={t.placeholderPhone} />
          </div>
        </div>

        <div>
          <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">
            {t.company}
          </label>
          <input name="company" value={form.company} onChange={handleChange} className={inputClass} placeholder={t.placeholderCompany} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-accent-foreground font-bold uppercase tracking-wider py-3.5 rounded-lg glow-accent transition-all hover:brightness-110 disabled:opacity-50 font-outfit"
        >
          {loading ? t.ctaLoading : t.ctaButton}
        </button>

        <p className="text-[11px] font-mono text-muted-foreground text-center">
          {t.finePrint}
        </p>
      </form>
    </motion.div>
  );
};

export default SignupForm;
