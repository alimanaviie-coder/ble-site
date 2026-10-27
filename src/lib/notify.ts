import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { WHATSAPP_NUMBER } from "@/lib/config";

const input = z.object({
  name: z.string().max(200),
  phone: z.string().max(60),
  type: z.string().max(100).optional(),
  date: z.string().max(40).optional(),
  guests: z.string().max(20).optional(),
  notes: z.string().max(1000).optional(),
});

// Sends a WhatsApp message to the owner through CallMeBot.
// The API key lives only in the server environment (CALLMEBOT_APIKEY), never in the repo or the browser.
export const notifyOwnerWhatsApp = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => input.parse(d))
  .handler(async ({ data }) => {
    const key = process.env["CALLMEBOT_APIKEY"];
    if (!key) return { ok: false as const };
    const text = [
      "New event request",
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      data.type ? `Event: ${data.type}` : "",
      data.date ? `Date: ${data.date}` : "",
      data.guests ? `Guests: ${data.guests}` : "",
      data.notes ? `Notes: ${data.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(key)}`;
      const res = await fetch(url);
      return { ok: res.ok as boolean };
    } catch {
      return { ok: false as const };
    }
  });
