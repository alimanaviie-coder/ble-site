import { useEffect, useState } from "react";
import { dict, isRtl, type Lang } from "@/lib/i18n";
import { WheatEar } from "@/components/Logo";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/config";
import bottleRed from "@/assets/bottle-red.jpg";
import bottleLemon from "@/assets/bottle-lemon.jpg";
import bottleMojito from "@/assets/bottle-mojito.jpg";

const SCENES = [
  { src: bottleRed, bg: "#A31F37", glow: "#FF5A6E" },
  { src: bottleLemon, bg: "#6F5D18", glow: "#F2E3A1" },
  { src: bottleMojito, bg: "#2F6B3F", glow: "#9BCB55" },
];

const goConsult = () => document.getElementById("consult")?.scrollIntoView({ behavior: "smooth" });

const selectCls = "min-w-32 flex-1 rounded-xl border border-cream/25 bg-ink/40 px-3 py-2.5 text-sm text-cream";

/** Hero: page color morphs per drink, wheat ears sway and sweep across the bottle. */
export function Hero({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const [i, setI] = useState(0);
  const [tick, setTick] = useState(0);
  const [run, setRun] = useState(true);
  const [type, setType] = useState("");
  const [guests, setGuests] = useState("");

  useEffect(() => {
    if (!run || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setI((n) => (n + 1) % SCENES.length);
      setTick((n) => n + 1);
    }, 6000);
    return () => clearInterval(id);
  }, [run]);

  const pick = (n: number) => {
    setI(n);
    setTick((x) => x + 1);
  };
  const s = SCENES[i]!;
  const name = t.extra.drinks.names[i] ?? "";
  const submit = () => {
    window.dispatchEvent(new CustomEvent("ble-plan", { detail: { type, guests } }));
    goConsult();
  };

  return (
    <section
      className="relative overflow-hidden text-cream transition-colors duration-[1400ms]"
      style={{
        backgroundColor: s.bg,
        backgroundImage: "radial-gradient(ellipse at 65% 45%, #ffffff2e, transparent 62%), linear-gradient(#0000, #0008)",
        "--glow": s.glow,
      } as React.CSSProperties}
    >
      <img src={s.src} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover opacity-30 blur-xl" />
      <div className="relative z-[2] mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gold-soft">{t.hero.eyebrow}</p>
          <h1 className="font-display mt-4 text-5xl leading-[1.05] md:text-6xl">{t.hero.title}</h1>
          <div className="gold-rule my-6 w-24" />
          <p className="max-w-md text-lg text-cream/90">{t.hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#consult" className="btn-cream">{t.hero.cta1}</a>
            <a href="#suggest" className="btn-outline-gold">{t.hero.cta2}</a>
          </div>
          <div className="mt-8 flex max-w-xl flex-wrap gap-2 rounded-2xl border border-cream/20 bg-cream/10 p-2.5 backdrop-blur">
            <select aria-label={t.extra.plan.type} value={type} onChange={(e) => setType(e.target.value)} className={selectCls}>
              <option value="">{t.extra.plan.type}</option>
              {Object.entries(t.form.types).map(([k, v]) => (
                <option key={k} value={k} className="text-black">{v}</option>
              ))}
            </select>
            <input type="number" min={1} max={5000} value={guests} onChange={(e) => setGuests(e.target.value)} placeholder={t.extra.plan.guests} aria-label={t.extra.plan.guests} className={`${selectCls} placeholder:text-cream/60`} />
            <button type="button" onClick={submit} className="btn-cream">{t.extra.plan.go}</button>
          </div>
        </div>

        <div className="relative mx-auto flex min-h-[520px] w-full max-w-md flex-col items-center md:min-h-[560px] md:justify-center">
          <WheatEar className="sway pointer-events-none absolute bottom-[-2%] start-[2%] z-[1] h-[72%] opacity-85" style={{ filter: "blur(1.5px) drop-shadow(0 0 22px var(--glow))" }} />
          <div
            key={i}
            className="pin relative z-[3] aspect-[4/5] w-[min(320px,68vw)] overflow-hidden rounded-t-full rounded-b-[26px] border border-[#d9a441cc]"
            style={{ boxShadow: `0 40px 80px #000a, 0 0 110px ${s.glow}88` }}
          >
            <img src={s.src} alt={name} width={1024} height={1280} className="h-full w-full object-cover" />
          </div>
          <WheatEar className="sway pointer-events-none absolute bottom-[-2%] end-[8%] z-[4] h-[56%]" style={{ filter: "drop-shadow(0 0 18px var(--glow))" }} />
          <div className="relative z-[6] mt-5 w-52 rounded-2xl border border-cream/25 bg-cream/15 p-4 backdrop-blur-md md:absolute md:bottom-[16%] md:end-[-2%] md:mt-0" aria-live="polite">
            <p className="text-xs tracking-[0.2em] text-cream/80">0{i + 1} / 0{SCENES.length}</p>
            <h2 className="font-display text-2xl">{name}</h2>
            <p className="mb-3 mt-1 text-xs text-cream/90">{t.extra.drinks.line}</p>
            <a href="#consult" className="btn-outline-gold !px-4 !py-2 text-sm">{t.extra.plan.req}</a>
          </div>
          <div className="relative z-[6] mt-5 flex items-center gap-3 md:absolute md:bottom-0 md:mt-0">
            {SCENES.map((_, n) => (
              <button key={n} type="button" onClick={() => pick(n)} aria-label={t.extra.drinks.names[n]} aria-pressed={n === i}
                className={`h-3.5 w-3.5 rounded-full border border-cream transition ${n === i ? "scale-125 bg-cream" : "bg-transparent opacity-70"}`} />
            ))}
            <button type="button" onClick={() => setRun((r) => !r)} className="text-xs text-cream/90 underline underline-offset-4">
              {run ? t.extra.drinks.pause : t.extra.drinks.play}
            </button>
          </div>
        </div>
      </div>
      <WheatEar key={tick} className="sweep pointer-events-none absolute bottom-[-14%] left-[-6%] z-[5] h-[125%] opacity-0 blur-[3px]" />
    </section>
  );
}

const MENU_ITEMS: string[][] = [
  ["Mini Burger", "Signature Mix", "Sambosa", "Spring Roll", "Club Sandwich", "Chicken Cone", "Falafel", "Dolma"],
  ["Omani Shuwa Bowl", "Chicken Biryani", "Rice with Okra Stew", "Pasta Alfredo", "Caesar Salad"],
  ["Modern Chicken Tahchin", "Baghali Polo with Meat", "Modern Kuku Sabzi"],
  ["Mini Éclair", "Tiramisu Jar", "Baklava & Queen Almond", "Mini Cheesecake", "Mini Tarte with Fresh Fruit", "Dates Mamool"],
  ["15 flavors", "Burrata & Pesto", "Smoked Salmon", "Goat Cheese & Figs"],
  ["Wedding cakes", "Occasion cakes", "Bespoke creations"],
];

/** Menu without prices. Item names stay as written on the menu. */
export function MenuSection({ lang }: { lang: Lang }) {
  const t = dict[lang].extra.menu;
  return (
    <section id="menu" className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">{dict[lang].nav.menu}</p>
        <h2 className="font-display mt-2 text-4xl md:text-5xl">{t.title}</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">{t.sub}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MENU_ITEMS.map((items, i) => (
            <article key={i} className="rounded border border-border bg-card p-7 transition hover:-translate-y-1.5 hover:shadow-lg">
              <h3 className="font-display text-3xl text-gold">{t.cats[i]}</h3>
              <div className="gold-rule my-4" />
              <ul className="space-y-1.5 text-sm" dir="auto">
                {items.map((x) => (
                  <li key={x} className="flex gap-2"><span className="text-gold" aria-hidden="true">◆</span>{x}</li>
                ))}
              </ul>
              <a href="#consult" className="mt-5 inline-block text-sm underline decoration-gold underline-offset-4">{t.req}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Calm customer-satisfaction row. The wording is placeholder text and is labeled as such until real reviews arrive. */
export function Reviews({ lang }: { lang: Lang }) {
  const t = dict[lang];
  return (
    <section id="reviews" className="bg-navy py-20 text-cream" dir={isRtl(lang) ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-4xl md:text-5xl">{t.extra.rev.title}</h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {t.extra.rev.q.map((q) => (
            <li key={q}>
              <figure className="h-full rounded border border-gold/40 bg-cream/5 p-6">
                <div className="tracking-[0.25em] text-gold-soft" aria-hidden="true">★★★★★</div>
                <blockquote className="mt-3 font-display text-2xl leading-snug">“{q}”</blockquote>
              </figure>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-cream/60">{t.extra.rev.sample}</p>
      </div>
    </section>
  );
}

export type Lead = { name: string; phone: string; type: string; date: string; guests: string; notes: string };

export function leadMessage(l: Lead, hello: string, lang: Lang) {
  return `${hello}\nName: ${l.name}\nPhone: ${l.phone}\nEvent: ${l.type || "-"}\nDate: ${l.date || "-"}\nGuests: ${l.guests || "-"}\nNotes: ${l.notes || "-"}\nLanguage: ${lang}`;
}

/** WhatsApp + email buttons that carry the lead to the owner. */
export function Deliver({ lead, lang }: { lead: Lead; lang: Lang }) {
  const w = dict[lang].extra.wa;
  const msg = leadMessage(lead, w.hello, lang);
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  const mail = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Consultation request: ${lead.name}`)}&body=${encodeURIComponent(msg)}`;
  return (
    <div className="mt-5">
      <p className="text-sm text-muted-foreground">{w.note}</p>
      <div className="mt-3 flex flex-wrap gap-3">
        <a href={wa} target="_blank" rel="noreferrer" className="btn-navy">{w.send}</a>
        <a href={mail} className="inline-flex items-center justify-center rounded border border-gold px-6 py-3 font-medium text-navy hover:bg-secondary">{w.mail}</a>
      </div>
    </div>
  );
}

/** Floating WhatsApp button and a one-time, non-blocking prompt. */
export function FloatingContact({ lang }: { lang: Lang }) {
  const [chip, setChip] = useState(false);
  useEffect(() => {
    try {
      if (sessionStorage.getItem("ble-chip")) return;
    } catch {
      /* ignore */
    }
    const id = setTimeout(() => {
      setChip(true);
      try {
        sessionStorage.setItem("ble-chip", "1");
      } catch {
        /* ignore */
      }
    }, 9000);
    return () => clearTimeout(id);
  }, []);
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Blé, I’d like to plan an event.")}`;
  return (
    <>
      {chip && (
        <button type="button" onClick={() => { setChip(false); goConsult(); }}
          className="fixed bottom-24 end-4 z-40 max-w-60 rounded-2xl bg-cream p-3 text-start text-sm text-navy shadow-xl">
          {dict[lang].extra.plan.chip}
        </button>
      )}
      <a href={href} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="fixed bottom-4 end-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-xl">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm4.9 13.7c-.2.6-1.2 1.1-1.7 1.2-.5 0-1 .2-3.2-.7-2.7-1.1-4.4-3.8-4.5-4-.1-.2-1.1-1.4-1.1-2.7s.7-1.9 1-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.3 0 .5l-.3.4-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.2 1.6 2 1.1.9 2 1.2 2.3 1.4.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.1.1.6-.1 1z" /></svg>
      </a>
    </>
  );
}
