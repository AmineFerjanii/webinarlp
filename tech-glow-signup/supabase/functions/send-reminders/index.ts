import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FROM = "Ealan Agency <webinar@ealanagency.com>";
const JOIN_LINK = "https://webinarlp.vercel.app"; // replace with real webinar URL when ready

// April 20 2026 4pm CEST = 14:00 UTC
const EVENT_TIME = new Date("2026-04-20T14:00:00Z");

const ACCENT = "#e11d48";
const BG = "#0a0a0a";
const CARD = "#161616";
const TEXT = "#f5f5f5";
const MUTED = "#a1a1aa";
const LOGO = "https://ealan-agency.com/src/assets/ealan-logo.png";
const GCAL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Webinaire+Live+%3A+Data+%26+Performance&dates=20260420T140000Z/20260420T150000Z&details=Webinaire+live+Ealan+Agency&location=En+ligne";

function layout(body: string) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:${BG};font-family:Helvetica,Arial,sans-serif;color:${TEXT};">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<tr><td style="padding-bottom:32px;" align="center">
  <img src="${LOGO}" alt="Ealan Agency" height="36" style="height:36px;display:block;"/>
</td></tr>
<tr><td style="background:${CARD};border-radius:12px;border-top:3px solid ${ACCENT};padding:40px 40px 32px;">
  ${body}
</td></tr>
<tr><td style="padding-top:24px;text-align:center;color:${MUTED};font-size:11px;font-family:monospace;">
  © 2026 EALAN GROUP
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

function reminder3dFr(name: string) {
  return layout(`
    <p style="margin:0 0 16px;font-family:monospace;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};">⏳ Rappel — Dans 3 jours</p>
    <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:${TEXT};">${name}, le webinaire approche !</h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:${MUTED};">Dans <strong>3 jours</strong>, rejoignez-nous pour un webinaire live sur l'exploitation de la data pour multiplier vos performances marketing et commerciales.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
      <tr><td style="padding:8px 0;font-size:14px;color:${TEXT};border-bottom:1px solid #2a2a2a;">📅 <strong>Date</strong> — Lundi 20 avril 2026</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:${TEXT};border-bottom:1px solid #2a2a2a;">🕓 <strong>Heure</strong> — 16h00 (heure de Paris)</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:${TEXT};">🎙 <strong>Intervenant</strong> — Mohamed Majed Bahri, Data & AI Transformation Lead</td></tr>
    </table>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:${MUTED};">Le lien de connexion vous sera envoyé <strong>24h avant</strong>. Bloquez ce créneau dans votre agenda.</p>
    <a href="${GCAL}" style="display:inline-block;background:transparent;color:${ACCENT};font-weight:600;font-size:13px;text-decoration:none;padding:10px 24px;border-radius:8px;border:1px solid ${ACCENT};">📆 Ajouter à Google Agenda</a>
  `);
}

function reminder3dEn(name: string) {
  return layout(`
    <p style="margin:0 0 16px;font-family:monospace;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};">⏳ Reminder — 3 days to go</p>
    <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:${TEXT};">${name}, the webinar is almost here!</h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:${MUTED};">In <strong>3 days</strong>, join us live to discover how to leverage data to multiply your marketing and sales performance.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
      <tr><td style="padding:8px 0;font-size:14px;color:${TEXT};border-bottom:1px solid #2a2a2a;">📅 <strong>Date</strong> — Monday, April 20, 2026</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:${TEXT};border-bottom:1px solid #2a2a2a;">🕓 <strong>Time</strong> — 4:00 PM (Paris / CEST)</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:${TEXT};">🎙 <strong>Speaker</strong> — Mohamed Majed Bahri, Data & AI Transformation Lead</td></tr>
    </table>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:${MUTED};">Your join link will be sent <strong>24h before</strong>. Block this slot in your calendar.</p>
    <a href="${GCAL}" style="display:inline-block;background:transparent;color:${ACCENT};font-weight:600;font-size:13px;text-decoration:none;padding:10px 24px;border-radius:8px;border:1px solid ${ACCENT};">📆 Add to Google Calendar</a>
  `);
}

function reminder1dFr(name: string) {
  return layout(`
    <p style="margin:0 0 16px;font-family:monospace;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};">🔔 Rappel — Demain à 16h00</p>
    <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:${TEXT};">${name}, c'est demain !</h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:${MUTED};">Votre webinaire live est <strong>demain à 16h00</strong> (heure de Paris). Voici votre lien de connexion :</p>
    <div style="background:#1a1a1a;border-radius:8px;padding:20px;margin:24px 0;text-align:center;">
      <a href="${JOIN_LINK}" style="color:${ACCENT};font-size:15px;font-weight:700;word-break:break-all;">${JOIN_LINK}</a>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
      <tr><td style="padding:8px 0;font-size:14px;color:${TEXT};border-bottom:1px solid #2a2a2a;">📅 <strong>Date</strong> — Lundi 20 avril 2026</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:${TEXT};">💡 <strong>Conseil</strong> — Connectez-vous 5 min avant pour tester votre audio</td></tr>
    </table>
    <div style="text-align:center;margin-top:8px;">
      <a href="${JOIN_LINK}" style="display:inline-block;background:${ACCENT};color:#fff;font-weight:700;font-size:14px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:8px;">REJOINDRE LE WEBINAIRE →</a>
    </div>
  `);
}

function reminder1dEn(name: string) {
  return layout(`
    <p style="margin:0 0 16px;font-family:monospace;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};">🔔 Reminder — Tomorrow at 4:00 PM</p>
    <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:${TEXT};">${name}, it's tomorrow!</h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:${MUTED};">Your live webinar is <strong>tomorrow at 4:00 PM</strong> (Paris / CEST). Here is your join link:</p>
    <div style="background:#1a1a1a;border-radius:8px;padding:20px;margin:24px 0;text-align:center;">
      <a href="${JOIN_LINK}" style="color:${ACCENT};font-size:15px;font-weight:700;word-break:break-all;">${JOIN_LINK}</a>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
      <tr><td style="padding:8px 0;font-size:14px;color:${TEXT};border-bottom:1px solid #2a2a2a;">📅 <strong>Date</strong> — Monday, April 20, 2026</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:${TEXT};">💡 <strong>Tip</strong> — Join 5 minutes early to test your audio</td></tr>
    </table>
    <div style="text-align:center;margin-top:8px;">
      <a href="${JOIN_LINK}" style="display:inline-block;background:${ACCENT};color:#fff;font-weight:700;font-size:14px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:8px;">JOIN THE WEBINAR →</a>
    </div>
  `);
}

function reminder1hFr(name: string) {
  return layout(`
    <p style="margin:0 0 16px;font-family:monospace;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};">🚀 Dans 1 heure — C'est maintenant !</p>
    <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:${TEXT};">${name}, le webinaire commence dans 1 heure !</h1>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${MUTED};">Préparez-vous ! Connectez-vous quelques minutes avant pour s'assurer que tout fonctionne.</p>
    <div style="text-align:center;margin:32px 0;">
      <a href="${JOIN_LINK}" style="display:inline-block;background:${ACCENT};color:#fff;font-weight:700;font-size:14px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:8px;">REJOINDRE MAINTENANT →</a>
    </div>
  `);
}

function reminder1hEn(name: string) {
  return layout(`
    <p style="margin:0 0 16px;font-family:monospace;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};">🚀 In 1 hour — It's happening!</p>
    <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:${TEXT};">${name}, the webinar starts in 1 hour!</h1>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${MUTED};">Get ready! Join a few minutes early to make sure everything works.</p>
    <div style="text-align:center;margin:32px 0;">
      <a href="${JOIN_LINK}" style="display:inline-block;background:${ACCENT};color:#fff;font-weight:700;font-size:14px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:8px;">JOIN NOW →</a>
    </div>
  `);
}

// ── helpers ──────────────────────────────────────────────────────────────────

function msUntilEvent() {
  return EVENT_TIME.getTime() - Date.now();
}

function inWindow(targetMs: number) {
  const ms = msUntilEvent();
  const WINDOW = 30 * 60 * 1000; // ±30 min
  return ms > 0 && ms <= targetMs + WINDOW && ms >= targetMs - WINDOW;
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
  if (!res.ok) throw new Error(await res.text());
}

// ── main ─────────────────────────────────────────────────────────────────────

serve(async () => {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const sent: string[] = [];

  const H = 60 * 60 * 1000;
  const D = 24 * H;

  // 3-day reminder
  if (inWindow(3 * D)) {
    const { data } = await supabase
      .from("webinar_signups")
      .select("id, full_name, email, language")
      .is("reminder_3d_sent_at", null);
    for (const s of data ?? []) {
      const isEn = s.language === "en";
      await sendEmail(
        s.email,
        isEn ? "⏳ 3 days to go — Webinar: Leverage Data for Performance" : "⏳ Plus que 3 jours — Webinaire Data & Performances",
        isEn ? reminder3dEn(s.full_name) : reminder3dFr(s.full_name)
      );
      await supabase.from("webinar_signups").update({ reminder_3d_sent_at: new Date().toISOString() }).eq("id", s.id);
      sent.push(`3d → ${s.email}`);
    }
  }

  // 24h reminder
  if (inWindow(D)) {
    const { data } = await supabase
      .from("webinar_signups")
      .select("id, full_name, email, language")
      .is("reminder_1d_sent_at", null);
    for (const s of data ?? []) {
      const isEn = s.language === "en";
      await sendEmail(
        s.email,
        isEn ? "🔔 Tomorrow at 4:00 PM — Your webinar join link inside" : "🔔 Demain à 16h00 — Votre lien de connexion au webinaire",
        isEn ? reminder1dEn(s.full_name) : reminder1dFr(s.full_name)
      );
      await supabase.from("webinar_signups").update({ reminder_1d_sent_at: new Date().toISOString() }).eq("id", s.id);
      sent.push(`1d → ${s.email}`);
    }
  }

  // 1h reminder
  if (inWindow(H)) {
    const { data } = await supabase
      .from("webinar_signups")
      .select("id, full_name, email, language")
      .is("reminder_1h_sent_at", null);
    for (const s of data ?? []) {
      const isEn = s.language === "en";
      await sendEmail(
        s.email,
        isEn ? "🚀 Starting in 1 hour — Join the webinar now" : "🚀 Dans 1 heure — Rejoignez le webinaire maintenant",
        isEn ? reminder1hEn(s.full_name) : reminder1hFr(s.full_name)
      );
      await supabase.from("webinar_signups").update({ reminder_1h_sent_at: new Date().toISOString() }).eq("id", s.id);
      sent.push(`1h → ${s.email}`);
    }
  }

  return new Response(JSON.stringify({ sent }), {
    headers: { "Content-Type": "application/json" },
  });
});
