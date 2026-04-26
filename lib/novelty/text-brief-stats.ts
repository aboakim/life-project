/** English glue words — word-cloud is clearer without them */
const EN_STOP = new Set(
  "the and for are but not you all any can her was one our out day get has him his how its may new now old see two way who boy did let put say she too use has had from they them with that this than then when what your more some will just like over also into only back after here well were even such each much both".split(
    " ",
  ),
);

const HY_STOP = new Set(
  "և որ մի է են էր իսկ այս այդ նրա նրանք իրենք մեզ մեր քո քեզ նրան նրանց համար հետ առանց վրա մեջ նոր հին այո ոչ միայն երբ որտեղ ինչպես ինչու ով ինչ".split(
    " ",
  ),
);

export type BriefWordStat = {
  word: string;
  count: number;
};

export type BriefTextAnalysis = {
  wordCount: number;
  uniqueTokens: number;
  readingMinutes: number;
  topWords: BriefWordStat[];
};

function tokenize(text: string): string[] {
  const m = text.toLowerCase().match(/[\p{L}\p{N}]+/gu);
  return m ?? [];
}

export function analyzeBriefText(
  text: string,
  locale: "en" | "hy",
): BriefTextAnalysis {
  const words = tokenize(text);
  const stop = locale === "hy" ? HY_STOP : EN_STOP;
  const meaningful = words.filter((w) => w.length > 2 && !stop.has(w));
  const freq = new Map<string, number>();
  for (const w of meaningful) {
    freq.set(w, (freq.get(w) ?? 0) + 1);
  }
  const topWords = [...freq.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 14)
    .map(([word, count]) => ({ word, count }));
  const uniqueTokens = new Set(words).size;
  const readingMinutes = Math.round((words.length / 220) * 10) / 10;
  return {
    wordCount: words.length,
    uniqueTokens,
    readingMinutes: Math.max(0.1, readingMinutes),
    topWords,
  };
}
