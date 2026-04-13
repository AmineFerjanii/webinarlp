const LOGO_URL = "https://ealan-agency.com/src/assets/ealan-logo.png";
const LANDING_URL = "https://webinarlp.vercel.app";
const ACCENT = "#e11d48";
const BG = "#0a0a0a";
const CARD = "#161616";
const TEXT = "#f5f5f5";
const MUTED = "#a1a1aa";

// April 20 2026 4pm CEST = 14:00 UTC
const GCAL_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=Webinaire+Live+%3A+Leverager+la+Data+pour+Multiplier+vos+Performances" +
  "&dates=20260420T140000Z/20260420T150000Z" +
  "&details=Rejoignez+le+webinaire+live+Ealan+Agency" +
  "&location=En+ligne";

function layout(body: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ealan Agency — Webinaire</title>
</head>
<body style="margin:0;padding:0;background:${BG};font-family:'Helvetica Neue',Arial,sans-serif;color:${TEXT};">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="padding-bottom:32px;" align="center">
            <img src="${LOGO_URL}" alt="Ealan Agency" height="36" style="height:36px;display:block;" />
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background:${CARD};border-radius:12px;border-top:3px solid ${ACCENT};padding:40px 40px 32px;">
            ${body}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding-top:24px;text-align:center;color:${MUTED};font-size:11px;font-family:monospace;line-height:1.6;">
            © 2026 EALAN GROUP &nbsp;·&nbsp;
            <a href="${LANDING_URL}" style="color:${MUTED};text-decoration:underline;">Se désinscrire</a>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function btn(label: string, url: string): string {
  return `<a href="${url}" style="display:inline-block;background:${ACCENT};color:#ffffff;font-weight:700;font-size:14px;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;padding:14px 32px;border-radius:8px;">${label}</a>`;
}

function calBtn(label: string): string {
  return `<a href="${GCAL_URL}" style="display:inline-block;background:transparent;color:${ACCENT};font-weight:600;font-size:13px;text-decoration:none;padding:10px 24px;border-radius:8px;border:1px solid ${ACCENT};">${label}</a>`;
}

function tag(text: string): string {
  return `<p style="margin:0 0 16px;font-family:monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:${ACCENT};">${text}</p>`;
}

function h1(text: string): string {
  return `<h1 style="margin:0 0 12px;font-size:26px;font-weight:800;line-height:1.2;color:${TEXT};">${text}</h1>`;
}

function p(text: string): string {
  return `<p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:${MUTED};">${text}</p>`;
}

function infoBox(lines: string[]): string {
  const rows = lines
    .map(
      (l) =>
        `<tr><td style="padding:8px 0;font-size:14px;color:${TEXT};border-bottom:1px solid #2a2a2a;">${l}</td></tr>`
    )
    .join("");
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">${rows}</table>`;
}

// ─── CONFIRMATION ─────────────────────────────────────────────────────────────

export function confirmationFr(name: string): string {
  return layout(`
    ${tag("✅ Inscription confirmée")}
    ${h1(`Bienvenue, ${name} !`)}
    ${p("Votre place est réservée. Nous avons hâte de vous retrouver pour ce webinaire live.")}

    ${infoBox([
      "📅 <strong>Date</strong> — Lundi 20 avril 2026",
      "🕓 <strong>Heure</strong> — 16h00 (heure de Paris)",
      "🎙 <strong>Format</strong> — Webinaire live + Q&R",
      "🔗 <strong>Lien de connexion</strong> — Envoyé 24h avant",
    ])}

    ${p("En attendant, ajoutez l'événement à votre agenda :")}

    <div style="margin-bottom:24px;">
      ${calBtn("📆 Ajouter à Google Agenda")}
    </div>

    ${p("Vous recevrez un rappel <strong>3 jours avant</strong>, <strong>24 heures avant</strong> et <strong>1 heure avant</strong> le début du webinaire.")}

    <div style="text-align:center;margin-top:8px;">
      ${btn("VOIR LA PAGE DE L'ÉVÉNEMENT →", LANDING_URL)}
    </div>
  `);
}

export function confirmationEn(name: string): string {
  return layout(`
    ${tag("✅ Registration confirmed")}
    ${h1(`Welcome, ${name}!`)}
    ${p("Your spot is saved. We can't wait to see you at the live webinar.")}

    ${infoBox([
      "📅 <strong>Date</strong> — Monday, April 20, 2026",
      "🕓 <strong>Time</strong> — 4:00 PM (Paris time / CEST)",
      "🎙 <strong>Format</strong> — Live webinar + Q&A",
      "🔗 <strong>Join link</strong> — Sent 24h before the event",
    ])}

    ${p("Add it to your calendar so you don't miss it:")}

    <div style="margin-bottom:24px;">
      ${calBtn("📆 Add to Google Calendar")}
    </div>

    ${p("You'll receive reminders <strong>3 days before</strong>, <strong>24 hours before</strong>, and <strong>1 hour before</strong> the webinar starts.")}

    <div style="text-align:center;margin-top:8px;">
      ${btn("VIEW EVENT PAGE →", LANDING_URL)}
    </div>
  `);
}

// ─── 3-DAY REMINDER ───────────────────────────────────────────────────────────

export function reminder3dFr(name: string): string {
  return layout(`
    ${tag("⏳ Rappel — Dans 3 jours")}
    ${h1(`${name}, le webinaire approche !`)}
    ${p("Dans <strong>3 jours</strong>, rejoignez-nous pour un webinaire live sur l'exploitation de la data pour multiplier vos performances marketing et commerciales.")}

    ${infoBox([
      "📅 <strong>Date</strong> — Lundi 20 avril 2026",
      "🕓 <strong>Heure</strong> — 16h00 (heure de Paris)",
      "🎙 <strong>Intervenant</strong> — Mohamed Majed Bahri, Data & AI Transformation Lead",
    ])}

    ${p("Le lien de connexion vous sera envoyé <strong>24h avant</strong> le début. Assurez-vous que votre agenda est bloqué.")}

    <div style="text-align:center;margin-top:8px;">
      ${calBtn("📆 Ajouter à Google Agenda")}
    </div>
  `);
}

export function reminder3dEn(name: string): string {
  return layout(`
    ${tag("⏳ Reminder — 3 days to go")}
    ${h1(`${name}, the webinar is almost here!`)}
    ${p("In <strong>3 days</strong>, join us live to discover how to leverage data to multiply your marketing and sales performance.")}

    ${infoBox([
      "📅 <strong>Date</strong> — Monday, April 20, 2026",
      "🕓 <strong>Time</strong> — 4:00 PM (Paris / CEST)",
      "🎙 <strong>Speaker</strong> — Mohamed Majed Bahri, Data & AI Transformation Lead",
    ])}

    ${p("Your join link will be sent <strong>24h before</strong> the event. Make sure your calendar is blocked.")}

    <div style="text-align:center;margin-top:8px;">
      ${calBtn("📆 Add to Google Calendar")}
    </div>
  `);
}

// ─── 24H REMINDER ─────────────────────────────────────────────────────────────

export function reminder1dFr(name: string, joinLink: string): string {
  return layout(`
    ${tag("🔔 Rappel — Demain à 16h00")}
    ${h1(`${name}, c'est demain !`)}
    ${p("Votre webinaire live est <strong>demain à 16h00</strong> (heure de Paris). Voici votre lien de connexion :")}

    <div style="background:#1a1a1a;border-radius:8px;padding:20px;margin:24px 0;text-align:center;">
      <a href="${joinLink}" style="color:${ACCENT};font-size:15px;font-weight:700;word-break:break-all;">${joinLink}</a>
    </div>

    ${infoBox([
      "📅 <strong>Date</strong> — Lundi 20 avril 2026",
      "🕓 <strong>Heure</strong> — 16h00 (heure de Paris)",
      "💡 <strong>Conseil</strong> — Connectez-vous 5 min avant pour tester votre audio",
    ])}

    <div style="text-align:center;margin-top:8px;">
      ${btn("REJOINDRE LE WEBINAIRE →", joinLink)}
    </div>
  `);
}

export function reminder1dEn(name: string, joinLink: string): string {
  return layout(`
    ${tag("🔔 Reminder — Tomorrow at 4:00 PM")}
    ${h1(`${name}, it's tomorrow!`)}
    ${p("Your live webinar is <strong>tomorrow at 4:00 PM</strong> (Paris time / CEST). Here is your join link:")}

    <div style="background:#1a1a1a;border-radius:8px;padding:20px;margin:24px 0;text-align:center;">
      <a href="${joinLink}" style="color:${ACCENT};font-size:15px;font-weight:700;word-break:break-all;">${joinLink}</a>
    </div>

    ${infoBox([
      "📅 <strong>Date</strong> — Monday, April 20, 2026",
      "🕓 <strong>Time</strong> — 4:00 PM Paris / CEST",
      "💡 <strong>Tip</strong> — Join 5 minutes early to test your audio",
    ])}

    <div style="text-align:center;margin-top:8px;">
      ${btn("JOIN THE WEBINAR →", joinLink)}
    </div>
  `);
}

// ─── 1H REMINDER ──────────────────────────────────────────────────────────────

export function reminder1hFr(name: string, joinLink: string): string {
  return layout(`
    ${tag("🚀 Dans 1 heure — C'est maintenant !")}
    ${h1(`${name}, le webinaire commence dans 1 heure !`)}
    ${p("Préparez-vous ! Le webinaire live démarre dans <strong>1 heure</strong>. Voici votre lien d'accès direct :")}

    <div style="text-align:center;margin:32px 0;">
      ${btn("REJOINDRE MAINTENANT →", joinLink)}
    </div>

    ${p("Connectez-vous quelques minutes avant pour vous assurer que tout fonctionne. À tout de suite !")}
  `);
}

export function reminder1hEn(name: string, joinLink: string): string {
  return layout(`
    ${tag("🚀 In 1 hour — It's happening!")}
    ${h1(`${name}, the webinar starts in 1 hour!`)}
    ${p("Get ready! The live webinar starts in <strong>1 hour</strong>. Here is your direct access link:")}

    <div style="text-align:center;margin:32px 0;">
      ${btn("JOIN NOW →", joinLink)}
    </div>

    ${p("Join a few minutes early to make sure everything works. See you soon!")}
  `);
}
