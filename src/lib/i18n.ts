export type Lang = "en" | "ar" | "fa";
export const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ar", label: "عربي" },
  { code: "fa", label: "فارسی" },
];
export const isRtl = (l: Lang) => l !== "en";

export function detectLang(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("ble-lang");
  if (saved === "en" || saved === "ar" || saved === "fa") return saved;
  const nav = (navigator.language || "en").toLowerCase();
  if (nav.startsWith("ar")) return "ar";
  if (nav.startsWith("fa")) return "fa";
  return "en";
}

export type PackageKey = "gathering" | "party" | "event";
export type Budget = "simple" | "comfortable" | "generous";

/** Suggest a package from guest count and budget per guest. */
export function suggestPackage(guests: number, budget: Budget): PackageKey {
  if (guests >= 60) return "event";
  if (guests >= 25) return budget === "generous" && guests >= 50 ? "event" : "party";
  if (guests >= 10 && budget === "generous") return "party";
  return "gathering";
}

const en = {
  nav: { menu: "Menu", packages: "Packages", suggest: "Find a package", contact: "Consultation" },
  hero: {
    eyebrow: "Event & party catering · Muscat",
    title: "Every celebration begins here.",
    sub: "Finger food, boxes and fresh drinks from our Muscat bakery, sized to your guest list.",
    cta1: "Request a consultation",
    cta2: "Find my package",
  },
  bar: { text: "We do events & party catering — request a consultation ↓" },
  strip: {
    items: ["Finger food", "Savory & sweet boxes", "Bottled drinks"],
    types: "Birthdays · Weddings · Corporate events · Family gatherings",
  },
  packages: {
    title: "Three ways to host",
    sub: "Each package is made fresh in our bakery and shaped around your day.",
    guests: "guests",
    items: {
      gathering: { name: "Gathering", range: "10–25", list: ["One savory box", "One sweet box", "Bottled drinks"] },
      party: { name: "Party", range: "25–60", list: ["Savory and sweet boxes", "Bruschetta selection, up to 15 flavors", "Bottled drinks"] },
      event: { name: "Event", range: "60+", list: ["Full finger food catering", "Custom menu", "Bottled drinks"] },
    },
  },
  suggest: {
    title: "Find your package",
    sub: "Tell us two things. We'll point you to a good fit.",
    guests: "Number of guests",
    budget: "Budget per guest",
    budgets: { simple: "Simple", comfortable: "Comfortable", generous: "Generous" },
    result: "Our suggestion",
    notes: {
      gathering: "Two boxes and drinks — easy to set out, easy to share.",
      party: "A fuller spread with bruschetta in many flavors.",
      event: "A full catering table with a menu built with you.",
    },
    cta: "Request a consultation",
  },
  form: {
    title: "Request a consultation",
    sub: "Share a few details and we'll reach out on WhatsApp or by phone.",
    name: "Name",
    phone: "Phone / WhatsApp",
    date: "Event date",
    guests: "Number of guests",
    type: "Event type",
    types: { birthday: "Birthday", wedding: "Wedding or engagement", corporate: "Corporate", family: "Family gathering", other: "Other" },
    choose: "Choose…",
    notes: "Notes",
    notesPh: "Anything we should know — dietary needs, timing, theme.",
    submit: "Send request",
    sending: "Sending…",
    successTitle: "Thank you — request received.",
    successBody: "We'll contact you soon to plan the details.",
    again: "Send another request",
    error: "Your request is ready. Please send it now on WhatsApp or by email below and we will reply shortly.",
    required: "Required",
    invalidPhone: "Enter a valid phone number",
    insta: "Prefer Instagram? Message us at",
  },
  footer: { line: "Blé Pastry & Bakery, Muscat, Oman", talabat: "Also available on Talabat" },
  extra: {
    menu: { title: "From our kitchen", sub: "Finger food, boxes and sweets for every occasion. Tell us about your event and we'll send a personal proposal.", cats: ["Savory & Finger Food", "Lunch & Mains", "Persian Cuisine", "Sweets & Pastry", "Bruschetta", "Weddings & Occasions"], req: "Request this menu" },
    plan: { type: "Event type", guests: "Guests", go: "Get my proposal", req: "Request this", chip: "Planning an event? Tell us in 30 seconds." },
    rev: { title: "Loved by our guests", sample: "Sample wording while we collect real guest reviews.", q: ["Everything arrived fresh and right on time.", "Our guests kept asking where the food was from.", "Easy to order, and it looked beautiful on the table."] },
    wa: { send: "Send on WhatsApp", mail: "Send by email", note: "Send your request on WhatsApp or email now to speed things up.", hello: "Hello Blé! New consultation request" },
    drinks: { names: ["Red Juice", "Fresh Lemonade", "Mint Mojito"], line: "Fresh, natural and made with real fruits.", pause: "Pause", play: "Play" },
  },
};
type Dict = typeof en;

const ar: Dict = {
  nav: { menu: "القائمة", packages: "الباقات", suggest: "اختر باقتك", contact: "استشارة" },
  hero: {
    eyebrow: "ضيافة المناسبات والحفلات · مسقط",
    title: "كل احتفال يبدأ من هنا.",
    sub: "مقبلات وصناديق ومشروبات طازجة من مخبزنا في مسقط، بكميات تناسب عدد ضيوفك.",
    cta1: "اطلب استشارة",
    cta2: "اعثر على باقتي",
  },
  bar: { text: "نقوم بضيافة المناسبات والحفلات — اطلب استشارة ↓" },
  strip: {
    items: ["مقبلات صغيرة", "صناديق مالحة وحلوة", "مشروبات معبأة"],
    types: "أعياد ميلاد · أعراس · مناسبات شركات · تجمعات عائلية",
  },
  packages: {
    title: "ثلاث طرق للضيافة",
    sub: "كل باقة تُحضَّر طازجة في مخبزنا وتُصمَّم حسب مناسبتك.",
    guests: "ضيف",
    items: {
      gathering: { name: "لقاء", range: "10–25", list: ["صندوق مالح واحد", "صندوق حلو واحد", "مشروبات معبأة"] },
      party: { name: "حفلة", range: "25–60", list: ["صناديق مالحة وحلوة", "تشكيلة بروسكيتا حتى 15 نكهة", "مشروبات معبأة"] },
      event: { name: "مناسبة", range: "+60", list: ["ضيافة مقبلات كاملة", "قائمة حسب الطلب", "مشروبات معبأة"] },
    },
  },
  suggest: {
    title: "اعثر على باقتك",
    sub: "أخبرنا بأمرين، وسنقترح عليك الأنسب.",
    guests: "عدد الضيوف",
    budget: "الميزانية لكل ضيف",
    budgets: { simple: "بسيطة", comfortable: "مريحة", generous: "سخية" },
    result: "اقتراحنا",
    notes: {
      gathering: "صندوقان ومشروبات — سهلة التقديم والمشاركة.",
      party: "تشكيلة أوفر مع بروسكيتا بنكهات متعددة.",
      event: "طاولة ضيافة كاملة بقائمة نُعدّها معك.",
    },
    cta: "اطلب استشارة",
  },
  form: {
    title: "اطلب استشارة",
    sub: "شاركنا بعض التفاصيل وسنتواصل معك عبر واتساب أو الهاتف.",
    name: "الاسم",
    phone: "الهاتف / واتساب",
    date: "تاريخ المناسبة",
    guests: "عدد الضيوف",
    type: "نوع المناسبة",
    types: { birthday: "عيد ميلاد", wedding: "زفاف أو خطوبة", corporate: "مناسبة شركة", family: "تجمع عائلي", other: "أخرى" },
    choose: "اختر…",
    notes: "ملاحظات",
    notesPh: "أي شيء نحتاج معرفته — احتياجات غذائية، التوقيت، الطابع.",
    submit: "أرسل الطلب",
    sending: "جارٍ الإرسال…",
    successTitle: "شكرًا لك — تم استلام طلبك.",
    successBody: "سنتواصل معك قريبًا لترتيب التفاصيل.",
    again: "إرسال طلب آخر",
    error: "طلبك جاهز. يرجى إرساله الآن عبر واتساب أو البريد الإلكتروني أدناه وسنرد عليك قريباً.",
    required: "مطلوب",
    invalidPhone: "أدخل رقم هاتف صحيحًا",
    insta: "تفضّل إنستغرام؟ راسلنا على",
  },
  footer: { line: "Blé للمعجنات والمخبوزات، مسقط، عُمان", talabat: "متوفر أيضًا على طلبات" },
  extra: {
    menu: { title: "من مطبخنا", sub: "مقبلات وصناديق وحلويات لكل مناسبة. أخبرنا عن مناسبتك وسنرسل لك عرضًا خاصًا.", cats: ["مقبلات ومالحات", "غداء ووجبات رئيسية", "المطبخ الفارسي", "حلويات ومعجنات", "بروسكيتا", "الأعراس والمناسبات"], req: "اطلب هذه القائمة" },
    plan: { type: "نوع المناسبة", guests: "عدد الضيوف", go: "احصل على عرضي", req: "اطلب هذا", chip: "تخطّط لمناسبة؟ أخبرنا في ٣٠ ثانية." },
    rev: { title: "محبوبون من ضيوفنا", sample: "نصوص توضيحية ريثما نجمع تقييمات ضيوفنا الحقيقية.", q: ["وصل كل شيء طازجًا وفي الموعد تمامًا.", "ظل ضيوفنا يسألون من أين الطعام.", "الطلب سهل، وكان شكله جميلًا على المائدة."] },
    wa: { send: "أرسل عبر واتساب", mail: "أرسل بالبريد", note: "أرسل طلبك الآن عبر واتساب أو البريد لتسريع الأمر.", hello: "مرحبًا Blé! طلب استشارة جديد" },
    drinks: { names: ["العصير الأحمر", "ليمونادة طازجة", "موهيتو بالنعناع"], line: "طازج وطبيعي ومصنوع من فواكه حقيقية.", pause: "إيقاف", play: "تشغيل" },
  },
};

const fa: Dict = {
  nav: { menu: "منو", packages: "پکیج‌ها", suggest: "پکیج مناسب", contact: "مشاوره" },
  hero: {
    eyebrow: "پذیرایی جشن و مهمانی · مسقط",
    title: "هر جشن از اینجا شروع می‌شود.",
    sub: "فینگرفود، باکس و نوشیدنی تازه از نانوایی ما در مسقط، به اندازهٔ تعداد مهمانانتان.",
    cta1: "درخواست مشاوره",
    cta2: "پکیج من را پیدا کن",
  },
  bar: { text: "ما پذیرایی جشن و مهمانی انجام می‌دهیم — درخواست مشاوره ↓" },
  strip: {
    items: ["فینگرفود", "باکس شور و شیرین", "نوشیدنی بطری"],
    types: "تولد · عروسی · مراسم شرکتی · دورهمی خانوادگی",
  },
  packages: {
    title: "سه راه برای پذیرایی",
    sub: "هر پکیج تازه در نانوایی ما آماده می‌شود و متناسب با روز شما تنظیم می‌شود.",
    guests: "مهمان",
    items: {
      gathering: { name: "دورهمی", range: "۱۰–۲۵", list: ["یک باکس شور", "یک باکس شیرین", "نوشیدنی بطری"] },
      party: { name: "مهمانی", range: "۲۵–۶۰", list: ["باکس‌های شور و شیرین", "بروسکتا تا ۱۵ طعم", "نوشیدنی بطری"] },
      event: { name: "مراسم", range: "+۶۰", list: ["پذیرایی کامل فینگرفود", "منوی اختصاصی", "نوشیدنی بطری"] },
    },
  },
  suggest: {
    title: "پکیج خود را پیدا کنید",
    sub: "دو چیز به ما بگویید تا گزینهٔ مناسب را پیشنهاد کنیم.",
    guests: "تعداد مهمانان",
    budget: "بودجه برای هر مهمان",
    budgets: { simple: "ساده", comfortable: "متوسط", generous: "دست‌ودل‌باز" },
    result: "پیشنهاد ما",
    notes: {
      gathering: "دو باکس و نوشیدنی — چیدنش ساده، تقسیمش آسان.",
      party: "پذیرایی کامل‌تر با بروسکتا در طعم‌های مختلف.",
      event: "میز پذیرایی کامل با منویی که با هم می‌چینیم.",
    },
    cta: "درخواست مشاوره",
  },
  form: {
    title: "درخواست مشاوره",
    sub: "چند جزئیات بنویسید تا از طریق واتس‌اپ یا تلفن با شما تماس بگیریم.",
    name: "نام",
    phone: "تلفن / واتس‌اپ",
    date: "تاریخ مراسم",
    guests: "تعداد مهمانان",
    type: "نوع مراسم",
    types: { birthday: "تولد", wedding: "عروسی یا نامزدی", corporate: "شرکتی", family: "دورهمی خانوادگی", other: "سایر" },
    choose: "انتخاب کنید…",
    notes: "توضیحات",
    notesPh: "هر چیزی که باید بدانیم — رژیم غذایی، زمان، تم.",
    submit: "ارسال درخواست",
    sending: "در حال ارسال…",
    successTitle: "ممنون — درخواست شما دریافت شد.",
    successBody: "به‌زودی برای هماهنگی جزئیات با شما تماس می‌گیریم.",
    again: "ارسال درخواست دیگر",
    error: "درخواست شما آماده است. لطفاً همین حالا از طریق واتساپ یا ایمیل در پایین ارسالش کنید تا سریع پاسخ بدهیم.",
    required: "الزامی",
    invalidPhone: "شماره تلفن معتبر وارد کنید",
    insta: "اینستاگرام را ترجیح می‌دهید؟ پیام دهید به",
  },
  footer: { line: "Blé شیرینی و نانوایی، مسقط، عمان", talabat: "در طلبات هم موجود است" },
  extra: {
    menu: { title: "از آشپزخانهٔ ما", sub: "فینگرفود، باکس و شیرینی برای هر مناسبت. دربارهٔ مراسمتان بگویید تا پیشنهاد شخصی بفرستیم.", cats: ["شور و فینگرفود", "ناهار و غذای اصلی", "غذاهای ایرانی", "شیرینی و پیراشکی", "بروسکتا", "عروسی و مناسبت‌ها"], req: "درخواست این منو" },
    plan: { type: "نوع مراسم", guests: "تعداد مهمان", go: "پیشنهاد من را بده", req: "درخواست این مورد", chip: "مراسم دارید؟ در ۳۰ ثانیه بگویید." },
    rev: { title: "محبوب مهمان‌هایمان", sample: "متن نمونه تا زمان جمع‌آوری نظرهای واقعی مهمان‌ها.", q: ["همه‌چیز تازه و سر وقت رسید.", "مهمان‌ها مدام می‌پرسیدند غذا از کجاست.", "سفارش دادنش راحت بود و روی میز خیلی قشنگ شد."] },
    wa: { send: "ارسال در واتساپ", mail: "ارسال با ایمیل", note: "همین حالا درخواست را در واتساپ یا ایمیل بفرستید تا سریع‌تر هماهنگ شود.", hello: "سلام Blé! درخواست مشاورهٔ جدید" },
    drinks: { names: ["آب‌میوهٔ قرمز", "لیموناد تازه", "موهیتو نعناع"], line: "تازه، طبیعی و ساخته‌شده از میوهٔ واقعی.", pause: "توقف", play: "پخش" },
  },
};

export const dict: Record<Lang, Dict> = { en, ar, fa };
