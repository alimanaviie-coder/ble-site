import type { Lang } from "@/lib/i18n";
import { isRtl } from "@/lib/i18n";
import bottleRed from "@/assets/bottle-red.jpg";
import bottleLemon from "@/assets/bottle-lemon.jpg";
import bottleMojito from "@/assets/bottle-mojito.jpg";
import pkgGathering from "@/assets/pkg-gathering.jpg";
import pkgParty from "@/assets/pkg-party.jpg";
import pkgEvent from "@/assets/pkg-event.jpg";

type L3<T> = Record<Lang, T>;

export const ABOUT_NAV: L3<string> = { en: "Our story", ar: "قصتنا", fa: "درباره ما" };

const gallery: { src: string; w: number; h: number; alt: L3<string> }[] = [
  { src: pkgEvent, w: 1024, h: 768, alt: { en: "Event catering spread from Blé, Muscat", ar: "ضيافة مناسبات من بليه في مسقط", fa: "پذیرایی ایونت از بله، مسقط" } },
  { src: bottleRed, w: 1024, h: 1280, alt: { en: "Blé bottled red juice with fresh raspberries", ar: "عصير أحمر معبأ من بليه مع التوت الطازج", fa: "نوشیدنی قرمز بطری بله با تمشک تازه" } },
  { src: pkgParty, w: 1024, h: 768, alt: { en: "Party boxes of savory and sweet bites", ar: "صناديق حفلات من المقبلات المالحة والحلوة", fa: "باکس مهمانی شور و شیرین" } },
  { src: bottleLemon, w: 928, h: 1152, alt: { en: "Blé bottled lemonade", ar: "ليموناضة معبأة من بليه", fa: "لیموناد بطری بله" } },
  { src: pkgGathering, w: 1024, h: 768, alt: { en: "Gathering box for small get-togethers", ar: "صندوق لقاء للتجمعات الصغيرة", fa: "باکس دورهمی برای جمع‌های کوچک" } },
  { src: bottleMojito, w: 928, h: 1152, alt: { en: "Blé bottled mojito", ar: "موهيتو معبأ من بليه", fa: "موهیتو بطری بله" } },
];

const galleryTitle: L3<[string, string]> = {
  en: ["From our kitchen", "A look at what we prepare for your table."],
  ar: ["من مطبخنا", "نظرة على ما نحضّره لمائدتكم."],
  fa: ["از آشپزخانه ما", "نگاهی به آنچه برای سفره شما آماده می‌کنیم."],
};

export function Gallery({ lang }: { lang: Lang }) {
  const [title, sub] = galleryTitle[lang];
  return (
    <section id="gallery" className="bg-background py-20" dir={isRtl(lang) ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-4xl md:text-5xl">{title}</h2>
        <p className="mt-3 text-muted-foreground">{sub}</p>
        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {gallery.map((g) => (
            <li key={g.src} className="overflow-hidden rounded border border-gold/30 bg-navy">
              <img
                src={g.src}
                alt={g.alt[lang]}
                width={g.w}
                height={g.h}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105 motion-reduce:transition-none"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const about: L3<{ title: string; p1: string; p2: string; cta: string }> = {
  en: {
    title: "Our story",
    p1: "Blé is a pastry and bakery in Muscat. We bake fresh for gatherings, parties and events: finger food, savory and sweet boxes, bruschetta and bottled drinks, each order shaped around your guest list and your day.",
    p2: "Tell us your date and the number of guests, and we will come back to you personally on WhatsApp.",
    cta: "Request a consultation",
  },
  ar: {
    title: "قصتنا",
    p1: "بليه مخبز ومعجنات في مسقط. نخبز طازجاً للتجمعات والحفلات والمناسبات: فينجر فود وصناديق مالحة وحلوة وبروسكيتا ومشروبات معبأة، ونصمّم كل طلب حسب عدد ضيوفكم ويومكم.",
    p2: "أخبرونا بالتاريخ وعدد الضيوف، وسنتواصل معكم شخصياً عبر واتساب.",
    cta: "اطلب استشارة",
  },
  fa: {
    title: "درباره ما",
    p1: "بله یک نانوایی و شیرینی‌پزی در مسقط است. برای دورهمی‌ها، مهمانی‌ها و رویدادها تازه می‌پزیم: فینگرفود، باکس شور و شیرین، بروسکتا و نوشیدنی بطری؛ و هر سفارش را متناسب با تعداد مهمان‌ها و روز شما تنظیم می‌کنیم.",
    p2: "تاریخ و تعداد مهمان‌ها را بگویید؛ خودمان از طریق واتساپ با شما تماس می‌گیریم.",
    cta: "درخواست مشاوره",
  },
};

export function About({ lang }: { lang: Lang }) {
  const a = about[lang];
  return (
    <section id="about" className="bg-navy py-20 text-cream" dir={isRtl(lang) ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="font-display text-4xl text-gold md:text-5xl">{a.title}</h2>
        <div className="my-6 h-px w-24 bg-gold" aria-hidden="true" />
        <p className="text-lg leading-relaxed text-cream/90">{a.p1}</p>
        <p className="mt-4 text-lg leading-relaxed text-cream/90">{a.p2}</p>
        <a href="#consult" className="mt-8 inline-block rounded bg-cream px-6 py-3 font-medium text-navy hover:bg-cream/90">{a.cta}</a>
      </div>
    </section>
  );
}
