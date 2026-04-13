import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  reminder3dFr,
  reminder3dEn,
  reminder1dFr,
  reminder1dEn,
  reminder1hFr,
  reminder1hEn,
} from "../_shared/emailTemplates.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FROM = "Ealan Agency <webinar@ealanagency.com>";

// April 20 2026 4pm CEST = 14:00 UTC
const EVENT_TIME = new Date("2026-04-20T14:00:00Z");

// Join link — update once you have the real webinar platform URL
const JOIN_LINK = "https://webinarlp.vercel.app";

type ReminderType = "3d" | "1d" | "1h";

interface Signup {
  id: string;
  full_name: string;
  email: string;
  language: string;
  reminder_3d_sent_at: string | null;
  reminder_1d_sent_at: string | null;
  reminder_1h_sent_at: string | null;
}

function msUntilEvent(): number {
  return EVENT_TIME.getTime() - Date.now();
}

function shouldSend(type: ReminderType): boolean {
  const ms = msUntilEvent();
  const WINDOW = 30 * 60 * 1000; // ±30 min window
  const targets: Record<ReminderType, number> = {
    "3d": 3 * 24 * 60 * 60 * 1000,
    "1d": 24 * 60 * 60 * 1000,
    "1h": 60 * 60 * 1000,
  };
  const target = targets[type];
  return ms > 0 && ms <= target + WINDOW && ms >= target - WINDOW;
}

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to: [to], subject, html }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${err}`);
  }
}

serve(async () => {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const results: string[] = [];

  // ── 3-day reminder ──────────────────────────────────────────────────────────
  if (shouldSend("3d")) {
    const { data: signups } = await supabase
      .from("webinar_signups")
      .select("id, full_name, email, language, reminder_3d_sent_at")
      .is("reminder_3d_sent_at", null) as { data: Signup[] | null };

    for (const s of signups ?? []) {
      const isEn = s.language === "en";
      const subject = isEn
        ? "⏳ 3 days to go — Webinar: Leverage Data for Performance"
        : "⏳ Plus que 3 jours — Webinaire : Data & Performances";
      const html = isEn ? reminder3dEn(s.full_name) : reminder3dFr(s.full_name);
      await sendEmail(s.email, subject, html);
      await supabase
        .from("webinar_signups")
        .update({ reminder_3d_sent_at: new Date().toISOString() })
        .eq("id", s.id);
      results.push(`3d → ${s.email}`);
    }
  }

  // ── 24h reminder ────────────────────────────────────────────────────────────
  if (shouldSend("1d")) {
    const { data: signups } = await supabase
      .from("webinar_signups")
      .select("id, full_name, email, language, reminder_1d_sent_at")
      .is("reminder_1d_sent_at", null) as { data: Signup[] | null };

    for (const s of signups ?? []) {
      const isEn = s.language === "en";
      const subject = isEn
        ? "🔔 Tomorrow at 4:00 PM — Your webinar join link inside"
        : "🔔 Demain à 16h00 — Votre lien de connexion au webinaire";
      const html = isEn
        ? reminder1dEn(s.full_name, JOIN_LINK)
        : reminder1dFr(s.full_name, JOIN_LINK);
      await sendEmail(s.email, subject, html);
      await supabase
        .from("webinar_signups")
        .update({ reminder_1d_sent_at: new Date().toISOString() })
        .eq("id", s.id);
      results.push(`1d → ${s.email}`);
    }
  }

  // ── 1h reminder ─────────────────────────────────────────────────────────────
  if (shouldSend("1h")) {
    const { data: signups } = await supabase
      .from("webinar_signups")
      .select("id, full_name, email, language, reminder_1h_sent_at")
      .is("reminder_1h_sent_at", null) as { data: Signup[] | null };

    for (const s of signups ?? []) {
      const isEn = s.language === "en";
      const subject = isEn
        ? "🚀 Starting in 1 hour — Join the webinar now"
        : "🚀 Dans 1 heure — Rejoignez le webinaire maintenant";
      const html = isEn
        ? reminder1hEn(s.full_name, JOIN_LINK)
        : reminder1hFr(s.full_name, JOIN_LINK);
      await sendEmail(s.email, subject, html);
      await supabase
        .from("webinar_signups")
        .update({ reminder_1h_sent_at: new Date().toISOString() })
        .eq("id", s.id);
      results.push(`1h → ${s.email}`);
    }
  }

  return new Response(JSON.stringify({ sent: results }), {
    headers: { "Content-Type": "application/json" },
  });
});
