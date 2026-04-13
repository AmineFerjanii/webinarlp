import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FROM = "Ealan Agency <webinar@ealanagency.com>";
const LANDING_URL = "https://webinarlp.vercel.app";
const LOGO = "https://ealan-agency.com/src/assets/ealan-logo.png";
const GCAL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Webinaire+Live+%3A+Data+%26+Performance&dates=20260420T140000Z/20260420T150000Z&details=Webinaire+live+Ealan+Agency&location=En+ligne";

const ACCENT = "#e11d48";
const BG = "#0a0a0a";
const CARD = "#161616";
const TEXT = "#f5f5f5";
const MUTED = "#a1a1aa";

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

function confirmationFr(name: string) {
  return layout(`
    <p style="margin:0 0 16px;font-family:monospace;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};">✅ Inscription confirmée</p>
    <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:${TEXT};">Bienvenue, ${name} !</h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:${MUTED};">Votre place est réservée. Nous avons hâte de vous retrouver pour ce webinaire live.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
      <tr><td style="padding:8px 0;font-size:14px;color:${TEXT};border-bottom:1px solid #2a2a2a;">📅 <strong>Date</strong> — Lundi 20 avril 2026</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:${TEXT};border-bottom:1px solid #2a2a2a;">🕓 <strong>Heure</strong> — 16h00 (heure de Paris)</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:${TEXT};border-bottom:1px solid #2a2a2a;">🎙 <strong>Format</strong> — Webinaire live + Q&R</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:${TEXT};">🔗 <strong>Lien de connexion</strong> — Envoyé 24h avant</td></tr>
    </table>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:${MUTED};">Ajoutez l'événement à votre agenda :</p>
    <div style="margin-bottom:24px;">
      <a href="${GCAL}" style="display:inline-block;background:transparent;color:${ACCENT};font-weight:600;font-size:13px;text-decoration:none;padding:10px 24px;border-radius:8px;border:1px solid ${ACCENT};">📆 Ajouter à Google Agenda</a>
    </div>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${MUTED};">Vous recevrez un rappel <strong>3 jours avant</strong>, <strong>24h avant</strong> et <strong>1h avant</strong> le début.</p>
    <div style="text-align:center;">
      <a href="${LANDING_URL}" style="display:inline-block;background:${ACCENT};color:#fff;font-weight:700;font-size:14px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:8px;">VOIR LA PAGE DE L'ÉVÉNEMENT →</a>
    </div>
  `);
}

function confirmationEn(name: string) {
  return layout(`
    <p style="margin:0 0 16px;font-family:monospace;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};">✅ Registration confirmed</p>
    <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:${TEXT};">Welcome, ${name}!</h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:${MUTED};">Your spot is saved. We can't wait to see you at the live webinar.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
      <tr><td style="padding:8px 0;font-size:14px;color:${TEXT};border-bottom:1px solid #2a2a2a;">📅 <strong>Date</strong> — Monday, April 20, 2026</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:${TEXT};border-bottom:1px solid #2a2a2a;">🕓 <strong>Time</strong> — 4:00 PM (Paris / CEST)</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:${TEXT};border-bottom:1px solid #2a2a2a;">🎙 <strong>Format</strong> — Live webinar + Q&A</td></tr>
      <tr><td style="padding:8px 0;font-size:14px;color:${TEXT};">🔗 <strong>Join link</strong> — Sent 24h before the event</td></tr>
    </table>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:${MUTED};">Add it to your calendar:</p>
    <div style="margin-bottom:24px;">
      <a href="${GCAL}" style="display:inline-block;background:transparent;color:${ACCENT};font-weight:600;font-size:13px;text-decoration:none;padding:10px 24px;border-radius:8px;border:1px solid ${ACCENT};">📆 Add to Google Calendar</a>
    </div>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${MUTED};">You'll receive reminders <strong>3 days before</strong>, <strong>24h before</strong>, and <strong>1h before</strong> the webinar.</p>
    <div style="text-align:center;">
      <a href="${LANDING_URL}" style="display:inline-block;background:${ACCENT};color:#fff;font-weight:700;font-size:14px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:8px;">VIEW EVENT PAGE →</a>
    </div>
  `);
}

serve(async (req) => {
  try {
    const payload = await req.json();
    const record = payload.record ?? payload;
    const { id, full_name, email, language } = record;
    if (!email) return new Response("no email", { status: 400 });

    const isEn = language === "en";
    const subject = isEn
      ? "✅ Registration confirmed — Webinar: Leverage Data to Multiply Your Performance"
      : "✅ Inscription confirmée — Webinaire : Exploiter la Data pour Multiplier vos Performances";
    const html = isEn ? confirmationEn(full_name) : confirmationFr(full_name);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, to: [email], subject, html }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return new Response(err, { status: 500 });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    await supabase
      .from("webinar_signups")
      .update({ confirmation_sent_at: new Date().toISOString() })
      .eq("id", id);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(String(err), { status: 500 });
  }
});
