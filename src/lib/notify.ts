import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CONTACT_EMAIL } from "@/lib/config";
import { supabase } from "@/integrations/supabase/client";

const clean = (s: string) => s.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();

const input = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(5).max(30),
  event_type: z.string().max(60).optional().default(""),
  event_type_label: z.string().max(100).optional().default(""),
  event_date: z.string().max(20).optional().default(""),
  guests: z.string().max(6).optional().default(""),
  notes: z.string().max(1000).optional().default(""),
  language: z.enum(["en", "ar", "fa"]),
  // Bot traps: "website" must stay empty and the form must have been open for a few seconds.
  website: z.string().max(200).optional().default(""),
  openedAt: z.number().optional().default(0),
});

function whatsappDigits(phone: string) {
  const d = phone.replace(/[^\d]/g, "").replace(/^00/, "");
  if (d.length === 8) return `968${d}`; // local Omani number
  return d;
}

/**
 * Receives a consultation request, then: saves it, emails the owner and pushes a phone alert.
 * Secrets live only in the Worker environment: RESEND_API_KEY, NTFY_TOPIC.
 */
export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => input.parse(d))
  .handler(async ({ data }) => {
    const tooFast = !data.openedAt || Date.now() - data.openedAt < 2500;
    if (data.website || tooFast) return { ok: true as const }; // quietly ignore bots

    const name = clean(data.name);
    const phone = clean(data.phone);
    const notes = clean(data.notes);
    const lines = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Event: ${clean(data.event_type_label) || "-"}`,
      `Date: ${data.event_date || "-"}`,
      `Guests: ${data.guests || "-"}`,
      `Notes: ${notes || "-"}`,
      `Language: ${data.language}`,
    ];
    const text = lines.join("\n");
    const waLink = `https://wa.me/${whatsappDigits(phone)}`;

    const saveDb = async () => {
      const g = data.guests ? parseInt(data.guests, 10) : null;
      const { error } = await supabase.from("consultation_requests").insert({
        name,
        phone,
        event_date: data.event_date || null,
        guests: g && g > 0 ? Math.min(g, 5000) : null,
        event_type: data.event_type || null,
        notes: notes || null,
        language: data.language,
      });
      return !error;
    };

    const sendEmail = async () => {
      const key = process.env["RESEND_API_KEY"];
      if (!key) return false;
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        signal: AbortSignal.timeout(6000),
        body: JSON.stringify({
          from: "Blé Website <onboarding@resend.dev>",
          to: [CONTACT_EMAIL],
          subject: `New event request: ${name}`,
          text: `${text}\n\nReply on WhatsApp: ${waLink}`,
        }),
      });
      return res.ok;
    };

    let pushInfo = "not-run";
    const sendPush = async () => {
      const topic = process.env["NTFY_TOPIC"]?.trim();
      if (!topic) {
        pushInfo = "no-topic";
        return false;
      }
      try {
        const res = await fetch(`https://ntfy.sh/${encodeURIComponent(topic)}`, {
          method: "POST",
          headers: { Title: "New Ble event request", Click: waLink, Priority: "high", Tags: "tada" },
          signal: AbortSignal.timeout(5000),
          body: `${text}\n\nTap to open WhatsApp with the customer.`,
        });
        pushInfo = res.ok ? "ok" : `http-${res.status}`;
        return res.ok;
      } catch (e) {
        pushInfo = `error-${e instanceof Error ? e.name : "unknown"}`;
        return false;
      }
    };

    // Telegram alert (token and chat id live only in the Worker environment).
    let tgInfo = "not-run";
    const sendTelegram = async () => {
      const token = process.env["TELEGRAM_BOT_TOKEN"]?.trim();
      const chat = process.env["TELEGRAM_CHAT_ID"]?.trim();
      if (!token || !chat) {
        tgInfo = "no-config";
        return false;
      }
      try {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(6000),
          body: JSON.stringify({
            chat_id: chat,
            text: `New Blé event request\n\n${text}`,
            disable_web_page_preview: true,
            reply_markup: { inline_keyboard: [[{ text: "Open WhatsApp with customer", url: waLink }]] },
          }),
        });
        tgInfo = res.ok ? "ok" : `http-${res.status}`;
        return res.ok;
      } catch (e) {
        tgInfo = `error-${e instanceof Error ? e.name : "unknown"}`;
        return false;
      }
    };

    const settle = async (fn: () => Promise<boolean>) => {
      try {
        return await fn();
      } catch {
        return false;
      }
    };
    const [db, email, push, tg] = await Promise.all([settle(saveDb), settle(sendEmail), settle(sendPush), settle(sendTelegram)]);
    return { ok: db || email || push || tg, push: `${pushInfo}/tg:${tgInfo}` };
  });
