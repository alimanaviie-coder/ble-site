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
