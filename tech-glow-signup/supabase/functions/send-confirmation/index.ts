import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { confirmationFr, confirmationEn } from "../_shared/emailTemplates.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FROM = "Ealan Agency <webinar@ealanagency.com>";

serve(async (req) => {
  try {
    const payload = await req.json();
    // Database webhook sends { type, table, record, old_record }
    const record = payload.record ?? payload;

    const { id, full_name, email, language } = record;
    if (!email) return new Response("no email", { status: 400 });

    const isEn = language === "en";
    const subject = isEn
      ? "✅ Registration confirmed — Webinar: Leverage Data to Multiply Your Performance"
      : "✅ Inscription confirmée — Webinaire : Exploiter la Data pour Multiplier vos Performances";
    const html = isEn
      ? confirmationEn(full_name)
      : confirmationFr(full_name);

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

    // Mark confirmation as sent
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
