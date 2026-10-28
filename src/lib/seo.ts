import type { Lang } from "@/lib/i18n";
import { FAQ } from "@/lib/faq";

export const SITE = "https://bleoman.com";
export const PATHS: Record<Lang, string> = { en: "/", ar: "/ar", fa: "/fa" };

const COPY: Record<Lang, { title: string; desc: string; locale: string }> = {
  en: {
    title: "Blé Pastry & Bakery — Event & Party Catering in Muscat",
    desc: "Finger food, savory and sweet boxes, bruschetta and bottled drinks for parties, weddings and corporate events in Muscat, Oman. Request a free consultation.",
    locale: "en_US",
  },
  ar: {
    title: "بليه للمعجنات والمخبوزات — ضيافة وحفلات ومناسبات في مسقط",
    desc: "فينجر فود وصناديق مالحة وحلوة وبروسكيتا ومشروبات معبأة للحفلات والأعراس وفعاليات الشركات في مسقط، سلطنة عمان. اطلب استشارتك المجانية.",
    locale: "ar_OM",
  },
  fa: {
    title: "بله — کیترینگ مهمانی و ایونت در مسقط عمان",
    desc: "فینگرفود، باکس شور و شیرین، بروسکتا و نوشیدنی بطری برای مهمانی، عروسی و رویدادهای شرکتی در مسقط عمان. مشاوره‌ی رایگان بگیرید.",
    locale: "fa_IR",
  },
};

export function seoHead(lang: Lang) {
  const c = COPY[lang];
  const url = SITE + PATHS[lang];
  return {
    meta: [
      { title: c.title },
      { name: "description", content: c.desc },
      { property: "og:title", content: c.title },
      { property: "og:description", content: c.desc },
      { property: "og:url", content: url },
      { property: "og:locale", content: c.locale },
      { name: "twitter:title", content: c.title },
      { name: "twitter:description", content: c.desc },
      { property: "og:image:alt", content: "Blé Pastry & Bakery event catering, Muscat" },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": url + "#faq",
          inLanguage: lang,
          mainEntity: FAQ[lang].map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        },
      },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "en", href: SITE + PATHS.en },
      { rel: "alternate", hrefLang: "ar", href: SITE + PATHS.ar },
      { rel: "alternate", hrefLang: "fa", href: SITE + PATHS.fa },
      { rel: "alternate", hrefLang: "x-default", href: SITE + PATHS.en },
    ],
  };
}
