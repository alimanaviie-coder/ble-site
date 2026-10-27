import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { isRtl } from "@/lib/i18n";
import img_event from "@/assets/gallery/event.webp";
import img_savory_puff from "@/assets/gallery/savory-puff.webp";
import img_bottles from "@/assets/gallery/bottles.webp";
import img_tartlets from "@/assets/gallery/tartlets.webp";
import img_bruschetta from "@/assets/gallery/bruschetta.webp";
import img_tahchin from "@/assets/gallery/tahchin.webp";
import img_puff_bites from "@/assets/gallery/puff-bites.webp";
import img_sliders from "@/assets/gallery/sliders.webp";
import img_blueberry_tart from "@/assets/gallery/blueberry-tart.webp";
import img_rice_dish from "@/assets/gallery/rice-dish.webp";
import img_fruit_tart from "@/assets/gallery/fruit-tart.webp";
import img_tahchin_plate from "@/assets/gallery/tahchin-plate.webp";
import img_herb_toast from "@/assets/gallery/herb-toast.webp";
import img_eclair from "@/assets/gallery/eclair.webp";

type L3<T> = Record<Lang, T>;

export const ABOUT_NAV: L3<string> = { en: "Our story", ar: "قصتنا", fa: "درباره ما" };

const gallery: { src: string; w: number; h: number; alt: L3<string> }[] = [
  { src: img_event, w: 666, h: 1000, alt: { en: "Behind the scenes at one of our events", ar: "كواليس إحدى مناسباتنا", fa: "پشت صحنه یکی از رویدادهای ما" } },
  { src: img_savory_puff, w: 586, h: 1000, alt: { en: "Savory choux puff with cream cheese, olives, tomato and dill", ar: "كرات شو مالحة بالجبن الكريمي والزيتون والطماطم والشبت", fa: "شو شور با پنیر خامه‌ای، زیتون، گوجه و شوید" } },
  { src: img_bottles, w: 750, h: 1000, alt: { en: "Blé bottled watermelon and lemonade drinks", ar: "مشروبات بليه المعبأة: بطيخ وليموناضة", fa: "نوشیدنی‌های بطری بله: هندوانه و لیموناد" } },
  { src: img_tartlets, w: 750, h: 1000, alt: { en: "Assorted fruit tartlets", ar: "تارتات فواكه متنوعة", fa: "تارت‌های میوه‌ای متنوع" } },
  { src: img_bruschetta, w: 750, h: 1000, alt: { en: "Bruschetta with whipped cheese, tomato and olives", ar: "بروسكيتا بالجبن المخفوق والطماطم والزيتون", fa: "بروسکتا با پنیر خامه‌ای، گوجه و زیتون" } },
  { src: img_tahchin, w: 1000, h: 840, alt: { en: "Modern tahchin squares topped with barberries", ar: "مربعات تاهچين عصرية مع الزرشك", fa: "تهچین مدرن مربعی با زرشک" } },
  { src: img_puff_bites, w: 1000, h: 667, alt: { en: "Mini puff pastry bites with cream and blueberries", ar: "لقيمات ميني من عجينة الباف مع الكريمة والتوت الأزرق", fa: "لقمه‌های کوچک هزارلا با خامه و بلوبری" } },
  { src: img_sliders, w: 750, h: 1000, alt: { en: "Box of mini sliders and sandwiches with olives", ar: "علبة ميني برغر وساندويتشات مع الزيتون", fa: "باکس مینی برگر و ساندویچ با زیتون" } },
  { src: img_blueberry_tart, w: 749, h: 1000, alt: { en: "Blueberry tartlet", ar: "تارت التوت الأزرق", fa: "تارت بلوبری" } },
  { src: img_rice_dish, w: 1000, h: 806, alt: { en: "Baked rice dish with slow-cooked meat, olives and fresh herbs", ar: "طبق أرز مخبوز مع لحم مطهو ببطء وزيتون وأعشاب طازجة", fa: "غذای برنجی با گوشت آرام‌پز، زیتون و سبزی تازه" } },
  { src: img_fruit_tart, w: 749, h: 1000, alt: { en: "Tartlet with grapes and kiwi", ar: "تارت بالعنب والكيوي", fa: "تارت انگور و کیوی" } },
  { src: img_tahchin_plate, w: 1000, h: 840, alt: { en: "Modern tahchin on a plate", ar: "تاهچين عصري في طبق", fa: "تهچین مدرن در بشقاب" } },
  { src: img_herb_toast, w: 750, h: 1000, alt: { en: "Herb butter toast with radish", ar: "توست بزبدة الأعشاب والفجل", fa: "نان تُست با کره سبزیجات و تربچه" } },
  { src: img_eclair, w: 1000, h: 545, alt: { en: "Mini éclair topped with mango", ar: "ميني إكلير بالمانجو", fa: "مینی اکلر با انبه" } },
];

const galleryTitle: L3<[string, string]> = {
  en: ["Moments from our table", "A look at what we prepare for your celebrations."],
  ar: ["لحظات من مائدتنا", "نظرة على ما نحضّره لاحتفالاتكم."],
  fa: ["لحظه‌هایی از سفره ما", "نگاهی به آنچه برای جشن‌های شما آماده می‌کنیم."],
};

export function Gallery({ lang }: { lang: Lang }) {
  const [title, sub] = galleryTitle[lang];
  return (
    <section id="gallery" className="bg-background py-20" dir={isRtl(lang) ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-4xl md:text-5xl">{title}</h2>
        <p className="mt-3 text-muted-foreground">{sub}</p>
        <ul className="mt-10 columns-2 gap-3 md:columns-3 md:gap-5">
          {gallery.map((g) => (
            <li key={g.src} className="mb-3 break-inside-avoid overflow-hidden rounded border border-gold/30 bg-navy md:mb-5">
              <img
                src={g.src}
                alt={g.alt[lang]}
                width={g.w}
                height={g.h}
                loading="lazy"
                className="h-auto w-full transition-transform duration-700 hover:scale-105 motion-reduce:transition-none"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const about: L3<{ title: string; lead: string; p1: string; p2: string; cta: string }> = {
  en: {
    title: "Our story",
    lead: "We are working to bring a different experience to your parties.",
    p1: "At Blé, a party is more than a menu. From the first conversation to the last bite, we want your table to feel considered: fresh finger food, elegant savory and sweet boxes, bruschetta and chilled bottled drinks, each prepared in our Muscat bakery and presented with care.",
    p2: "Every gathering has its own rhythm. Tell us your date and the number of guests, and we will shape the details around your day and come back to you personally on WhatsApp.",
    cta: "Request a consultation",
  },
  ar: {
    title: "قصتنا",
    lead: "نسعى لنقدّم تجربة مختلفة لحفلاتكم.",
    p1: "في بليه، الحفلة أكثر من قائمة طعام. من أول حديث إلى آخر لقمة، نريد أن تبدو مائدتكم مدروسة بعناية: فينجر فود طازج، وصناديق مالحة وحلوة أنيقة، وبروسكيتا ومشروبات باردة معبأة، تُحضَّر كلها في مخبزنا بمسقط وتُقدَّم بعناية.",
    p2: "لكل تجمّع إيقاعه الخاص. أخبرونا بالتاريخ وعدد الضيوف، وسنصمّم التفاصيل حول يومكم ونتواصل معكم شخصياً عبر واتساب.",
    cta: "اطلب استشارة",
  },
  fa: {
    title: "درباره ما",
    lead: "ما در تلاشیم تجربه‌ای متفاوت برای مهمانی‌های شما بسازیم.",
    p1: "در بله، مهمانی فقط یک منو نیست. از اولین گفت‌وگو تا آخرین لقمه، می‌خواهیم سفره‌ی شما با دقت و سلیقه چیده شود: فینگرفود تازه، باکس‌های شور و شیرین شیک، بروسکتا و نوشیدنی‌های خنک بطری؛ همه در نانوایی ما در مسقط آماده می‌شوند و با وسواس سرو می‌شوند.",
    p2: "هر دورهمی ریتم خودش را دارد. تاریخ و تعداد مهمان‌ها را بگویید تا جزئیات را متناسب با روز شما تنظیم کنیم و خودمان از طریق واتساپ با شما تماس بگیریم.",
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
        <p className="font-display text-2xl leading-snug md:text-3xl">{a.lead}</p>
        <p className="mt-6 text-lg leading-relaxed text-cream/90">{a.p1}</p>
        <p className="mt-4 text-lg leading-relaxed text-cream/90">{a.p2}</p>
        <a href="#consult" className="mt-8 inline-block rounded bg-cream px-6 py-3 font-medium text-navy hover:bg-cream/90">{a.cta}</a>
      </div>
    </section>
  );
}

const sig: L3<{ eyebrow: string; title: string; items: [string, string, string] }> = {
  en: { eyebrow: "Signature", title: "Made by hand, served with care", items: ["Bruschetta", "Fruit tartlets", "Savory choux"] },
  ar: { eyebrow: "توقيعنا", title: "صُنعت يدوياً، تُقدَّم بعناية", items: ["بروسكيتا", "تارتات الفواكه", "كرات الشو المالحة"] },
  fa: { eyebrow: "امضای ما", title: "با دست ساخته می‌شود، با دقت سرو می‌شود", items: ["بروسکتا", "تارت میوه‌ای", "شوی شور"] },
};

export function Signature({ lang }: { lang: Lang }) {
  const c = sig[lang];
  const pics = [
    { src: img_bruschetta, w: 750, h: 1000, alt: gallery.find((g) => g.src === img_bruschetta)!.alt[lang], offset: "md:mt-0" },
    { src: img_tartlets, w: 750, h: 1000, alt: gallery.find((g) => g.src === img_tartlets)!.alt[lang], offset: "md:mt-16" },
    { src: img_savory_puff, w: 586, h: 1000, alt: gallery.find((g) => g.src === img_savory_puff)!.alt[lang], offset: "md:mt-6" },
  ];
  return (
    <section id="signature" className="bg-navy py-20 text-cream" dir={isRtl(lang) ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-soft">{c.eyebrow}</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl text-cream md:text-5xl">{c.title}</h2>
        <ul className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {pics.map((p, i) => (
            <li key={p.src} className={p.offset}>
              <figure>
                <div className="overflow-hidden rounded-t-[999px] border border-gold/50">
                  <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-1000 hover:scale-105 motion-reduce:transition-none" />
                </div>
                <figcaption className="mt-4 font-display text-2xl text-cream/90">{c.items[i]}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const reelCopy: L3<{ title: string; sub: string; note: string; play: string; pause: string }> = {
  en: { title: "Your evening, beautifully served", sub: "From the first guest to the last bite.", note: "Concept film", play: "Play video", pause: "Pause video" },
  ar: { title: "أمسيتكم، تُقدَّم بأناقة", sub: "من الضيف الأول إلى آخر لقمة.", note: "فيلم تعريفي تصوّري", play: "تشغيل الفيديو", pause: "إيقاف الفيديو" },
  fa: { title: "شب شما، با ظرافت سرو می‌شود", sub: "از اولین مهمان تا آخرین لقمه.", note: "فیلم مفهومی", play: "پخش ویدیو", pause: "توقف ویدیو" },
};

export function Reel({ lang }: { lang: Lang }) {
  const c = reelCopy[lang];
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
        else { v.pause(); setPlaying(false); }
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => undefined);
    else { v.pause(); setPlaying(false); }
  };
  return (
    <section id="reel" className="relative isolate overflow-hidden bg-ink text-cream" dir={isRtl(lang) ? "rtl" : "ltr"} aria-label={c.title}>
      <video
        ref={ref}
        className="h-[70vh] min-h-[420px] w-full object-cover opacity-90"
        src="/media/ble-reel.mp4"
        poster="/media/ble-reel-poster.webp"
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/30" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-6xl items-end justify-between gap-6 px-5 pb-10">
        <div>
          <h2 className="font-display text-4xl text-cream md:text-6xl">{c.title}</h2>
          <p className="mt-3 text-lg text-cream/85">{c.sub}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? c.pause : c.play}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/70 bg-ink/50 text-cream backdrop-blur hover:bg-ink/70"
          >
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="3" y="2" width="3.5" height="12" /><rect x="9.5" y="2" width="3.5" height="12" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4 2l10 6-10 6z" /></svg>
            )}
          </button>
          <span className="text-[11px] uppercase tracking-[0.2em] text-cream/60">{c.note}</span>
        </div>
      </div>
    </section>
  );
}
