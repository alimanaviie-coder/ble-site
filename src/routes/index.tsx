import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { dict, isRtl, LANGS, suggestPackage, type Budget, type Lang, type PackageKey } from "@/lib/i18n";
import { Logo } from "@/components/Logo";
import { seoHead, PATHS } from "@/lib/seo";
import { Link } from "@tanstack/react-router";
import { CONTACT_EMAIL } from "@/lib/config";
import { notifyOwnerWhatsApp } from "@/lib/notify";
import { Hero, MenuSection, Reviews, FloatingContact, Deliver, type Lead } from "@/components/extras";
import { INSTAGRAM_URL } from "@/lib/config";
import imgGathering from "@/assets/pkg-gathering.jpg";
import imgParty from "@/assets/pkg-party.jpg";
import imgEvent from "@/assets/pkg-event.jpg";

export const Route = createFileRoute("/")({
  head: () => seoHead("en"),
  component: () => <Home lang="en" />,
});

const IG = INSTAGRAM_URL;
const images: Record<PackageKey, string> = { gathering: imgGathering, party: imgParty, event: imgEvent };
const keys: PackageKey[] = ["gathering", "party", "event"];

export function Home({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl(lang) ? "rtl" : "ltr";
  }, [lang]);
  const t = dict[lang];

  return (
    <div dir={isRtl(lang) ? "rtl" : "ltr"} lang={lang} className="min-h-screen">
      <header className="sticky top-0 z-30 bg-navy/95 backdrop-blur border-b border-gold/30">
        <a href="#consult" className="block border-b border-gold/20 bg-ink py-2 text-center text-xs text-gold transition-colors hover:text-cream sm:text-sm">
          {t.bar.text}
        </a>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <a href="#top" aria-label="Blé home"><Logo /></a>
          <nav className="hidden gap-6 text-sm text-cream/80 md:flex">
            <a href="#menu" className="hover:text-cream">{t.nav.menu}</a>
            <a href="#packages" className="hover:text-cream">{t.nav.packages}</a>
            <a href="#suggest" className="hover:text-cream">{t.nav.suggest}</a>
            <a href="#consult" className="hover:text-cream">{t.nav.contact}</a>
          </nav>
          <div role="group" aria-label="Language" className="flex rounded border border-gold/50 text-sm">
            {LANGS.map((l) => (
              <Link
                key={l.code}
                to={PATHS[l.code]}
                hrefLang={l.code}
                aria-current={lang === l.code ? "page" : undefined}
                lang={l.code}
                onClick={() => { try { localStorage.setItem("ble-lang", l.code); } catch { /* ignore */ } }}
                className={`px-3 py-1.5 ${lang === l.code ? "bg-cream text-navy" : "text-cream/80 hover:text-cream"}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <Hero lang={lang} />

        {/* WHAT WE DO */}
        <section className="border-t border-gold/20 bg-navy text-cream" aria-label={lang === "ar" ? "ما نقدمه" : lang === "fa" ? "آنچه ارائه می‌دهیم" : "What we offer"}>
          <div className="mx-auto max-w-6xl px-5 py-8">
            <ul className="grid gap-5 text-center sm:grid-cols-3">
              {t.strip.items.map((item) => (
                <li key={item} className="flex items-center justify-center gap-3">
                  <span className="text-gold" aria-hidden="true">◆</span>
                  <span className="font-display text-xl sm:text-2xl">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-center text-sm text-cream/70">{t.strip.types}</p>
          </div>
        </section>

        <MenuSection lang={lang} />

        {/* PACKAGES */}
        <section id="packages" className="bg-background py-20">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display text-4xl md:text-5xl">{t.packages.title}</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">{t.packages.sub}</p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {keys.map((k) => {
                const p = t.packages.items[k];
                return (
                  <article key={k} className="overflow-hidden rounded border border-border bg-card">
                    <img src={images[k]} alt={`${p.name} — ${t.packages.title}`} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover" />
                    <div className="p-6">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-3xl">{p.name}</h3>
                        <span className="text-sm text-muted-foreground">{p.range} {t.packages.guests}</span>
                      </div>
                      <div className="gold-rule my-4" />
                      <ul className="space-y-2 text-sm">
                        {p.list.map((i) => (
                          <li key={i} className="flex gap-2"><span className="text-gold" aria-hidden="true">◆</span>{i}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <Suggester lang={lang} />
        <Reviews lang={lang} />
        <Consultation lang={lang} />
      </main>

      <footer className="bg-ink py-10 text-cream/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4"><Logo /><span className="text-sm">{t.footer.line}</span></div>
          <div className="flex flex-col gap-1 text-sm md:items-end">
            <a href={IG} target="_blank" rel="noreferrer" className="text-cream hover:text-gold" dir="ltr">Instagram @ble.oman</a>
            <span>{t.footer.talabat}</span>
          </div>
        </div>
      </footer>
      <FloatingContact lang={lang} />
    </div>
  );
}

function Suggester({ lang }: { lang: Lang }) {
  const t = dict[lang].suggest;
  const [guests, setGuests] = useState(20);
  const [budget, setBudget] = useState<Budget>("comfortable");
  const pkg = suggestPackage(guests, budget);
  const p = dict[lang].packages.items[pkg];
  return (
    <section id="suggest" className="bg-navy py-20 text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl md:text-5xl">{t.title}</h2>
          <p className="mt-3 text-cream/75">{t.sub}</p>
          <label className="mt-8 block text-sm" htmlFor="g">{t.guests}: <strong className="text-lg">{guests}</strong></label>
          <input id="g" type="range" min={5} max={200} value={guests} onChange={(e) => setGuests(+e.target.value)} className="mt-3 w-full accent-[var(--gold)]" />
          <fieldset className="mt-8">
            <legend className="text-sm">{t.budget}</legend>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(["simple", "comfortable", "generous"] as Budget[]).map((b) => (
                <button key={b} type="button" aria-pressed={budget === b} onClick={() => setBudget(b)}
                  className={`rounded border px-3 py-2.5 text-sm ${budget === b ? "border-cream bg-cream text-navy" : "border-gold/50 text-cream/85 hover:border-cream"}`}>
                  {t.budgets[b]}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
        <div className="rounded border border-gold/50 p-8" aria-live="polite">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">{t.result}</p>
          <h3 className="font-display mt-3 text-5xl">{p.name}</h3>
          <p className="mt-1 text-sm text-cream/70">{p.range} {dict[lang].packages.guests}</p>
          <div className="gold-rule my-5" />
          <p className="text-cream/85">{t.notes[pkg]}</p>
          <a href="#consult" className="btn-cream mt-8">{t.cta}</a>
        </div>
      </div>
    </section>
  );
}

function Consultation({ lang }: { lang: Lang }) {
  const t = dict[lang].form;
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [type, setType] = useState("");
  const [guestsV, setGuestsV] = useState("");
  const [lead, setLead] = useState<Lead | null>(null);
  const [minDate, setMinDate] = useState("");
  useEffect(() => {
    setMinDate(new Date(Date.now() + 2 * 864e5).toISOString().slice(0, 10)); // 48-hour notice
    const h = (e: Event) => {
      const d = (e as CustomEvent<{ type?: string; guests?: string }>).detail;
      setType(d.type ?? "");
      setGuestsV(d.guests ?? "");
    };
    window.addEventListener("ble-plan", h);
    return () => window.removeEventListener("ble-plan", h);
  }, []);

  const schema = z.object({
    name: z.string().trim().min(1, t.required).max(100),
    phone: z.string().trim().regex(/^[+\d][\d\s-]{6,24}$/, t.invalidPhone),
    event_date: z.string().optional(),
    guests: z.string().optional(),
    event_type: z.string().max(50).optional(),
    notes: z.string().trim().max(1000).optional(),
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const r = schema.safeParse(fd);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    const d = r.data;
    setLead({
      name: d.name,
      phone: d.phone,
      type: d.event_type ? (dict.en.form.types as Record<string, string>)[d.event_type] ?? d.event_type : "",
      date: d.event_date ?? "",
      guests: d.guests ?? "",
      notes: d.notes ?? "",
    });
    const g = d.guests ? parseInt(d.guests, 10) : null;
    let failed = false;
    try {
      const { error } = await supabase.from("consultation_requests").insert({
        name: d.name,
        phone: d.phone,
        event_date: d.event_date || null,
        guests: g && g > 0 ? Math.min(g, 5000) : null,
        event_type: d.event_type || null,
        notes: d.notes || null,
        language: lang,
      });
      failed = !!error;
    } catch {
      failed = true;
    }
    // Automatic email to the owner (no click needed from the visitor).
    let emailed = false;
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New event request — ${d.name}`,
          _template: "table",
          _captcha: "false",
          name: d.name,
          phone: d.phone,
          event_type: d.event_type || "-",
          event_date: d.event_date || "-",
          guests: d.guests || "-",
          notes: d.notes || "-",
          language: lang,
        }),
      });
      emailed = res.ok;
    } catch {
      emailed = false;
    }
    let waSent = false;
    try {
      const r2 = await notifyOwnerWhatsApp({
        data: {
          name: d.name,
          phone: d.phone,
          type: d.event_type ? (dict.en.form.types as Record<string, string>)[d.event_type] ?? d.event_type : "",
          date: d.event_date ?? "",
          guests: d.guests ?? "",
          notes: d.notes ?? "",
        },
      });
      waSent = r2.ok;
    } catch {
      waSent = false;
    }
    setStatus(failed && !emailed && !waSent ? "error" : "done");
  }

  return (
    <section id="consult" className="bg-background py-20">
      <div className="mx-auto max-w-2xl px-5">
        <h2 className="font-display text-4xl md:text-5xl">{t.title}</h2>
        <p className="mt-3 text-muted-foreground">{t.sub}</p>
        {status === "done" && lead ? (
          <div role="status" className="mt-10 rounded border border-gold bg-card p-8">
            <p className="font-display text-3xl">{t.successTitle}</p>
            <p className="mt-2 text-muted-foreground">{t.successBody}</p>
            <Deliver lead={lead} lang={lang} />
            <button className="mt-6 text-sm underline decoration-gold underline-offset-4" onClick={() => setStatus("idle")}>{t.again}</button>
          </div>
        ) : (
          <>
            <form onSubmit={onSubmit} noValidate className="mt-10 grid gap-5 sm:grid-cols-2">
              <Field label={t.name} error={errors["name"]}><input name="name" required maxLength={100} className="field" autoComplete="name" /></Field>
              <Field label={t.phone} error={errors["phone"]}><input name="phone" type="tel" required maxLength={30} className="field" dir="ltr" autoComplete="tel" /></Field>
              <Field label={t.date}><input name="event_date" type="date" min={minDate} className="field" /></Field>
              <Field label={t.guests}><input name="guests" type="number" min={1} max={5000} value={guestsV} onChange={(e) => setGuestsV(e.target.value)} className="field" /></Field>
              <Field label={t.type} className="sm:col-span-2">
                <select name="event_type" className="field" value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="">{t.choose}</option>
                  {Object.entries(t.types).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </Field>
              <Field label={t.notes} className="sm:col-span-2"><textarea name="notes" rows={4} maxLength={1000} placeholder={t.notesPh} className="field" /></Field>
              {status === "error" && <p role="alert" className="text-destructive sm:col-span-2">{t.error}</p>}
              <div className="sm:col-span-2">
                <button type="submit" className="btn-navy w-full sm:w-auto" disabled={status === "sending"}>{status === "sending" ? t.sending : t.submit}</button>
              </div>
            </form>
            {status === "error" && lead && <Deliver lead={lead} lang={lang} />}
          </>
        )}
        <p className="mt-8 text-sm text-muted-foreground">
          {t.insta} <a href={IG} target="_blank" rel="noreferrer" className="font-medium text-navy underline decoration-gold underline-offset-4" dir="ltr">@ble.oman</a>
        </p>
      </div>
    </section>
  );
}

function Field({ label, error, className = "", children }: { label: string; error?: string | undefined; className?: string; children: React.ReactNode }) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1.5 block font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 block text-destructive">{error}</span>}
    </label>
  );
}
