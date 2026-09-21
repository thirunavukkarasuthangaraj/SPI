export type Lang = "ta" | "en";

export const UI_STRINGS = {
  home: { ta: "முகப்பு", en: "Home" },
  news: { ta: "செய்திகள்", en: "News" },
  politics: { ta: "அரசியல்", en: "Politics" },
  blog: { ta: "கருத்தாக்கம்", en: "Blog" },
  activity: { ta: "நாளாந்த செயல்பாடு", en: "Daily Activity" },
  videos: { ta: "வீடியோக்கள்", en: "Videos" },
  donate: { ta: "நன்கொடை", en: "Donate" },
  adminLogin: { ta: "நிர்வாக உள்நுழைவு", en: "Admin Login" },
  admin: { ta: "நிர்வாகம்", en: "Admin" },
  orgName: { ta: "சட்ட பஞ்சாயத்து இயக்கம்", en: "Satta Panchayat Iyakkam" },
  tagline: { ta: "சட்டத்தின் ஆட்சி", en: "Rule of Law" },
} as const;

export type UiKey = keyof typeof UI_STRINGS;

export function t(key: UiKey, lang: Lang) {
  return UI_STRINGS[key][lang];
}

export const LANG_COOKIE = "spi_lang";

export async function getLang(): Promise<Lang> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return cookieStore.get(LANG_COOKIE)?.value === "en" ? "en" : "ta";
}
