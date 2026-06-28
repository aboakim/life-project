/** Visual identity per route group — helps users remember “where they are”. */
export type PageTheme =
  | "home"
  | "product"
  | "blog"
  | "experts"
  | "community"
  | "lab"
  | "commerce"
  | "guides"
  | "trust"
  | "default";

export type PageThemeMeta = {
  icon: string;
  label: string;
  /** Short tag shown in marketing hero chip */
  chip: string;
};

export const PAGE_THEME_META: Record<PageTheme, PageThemeMeta> = {
  home: { icon: "🏠", label: "Home", chip: "Life Decisions" },
  product: { icon: "⚡", label: "Analyzer", chip: "Structured analysis" },
  blog: { icon: "📰", label: "Blog", chip: "Guides & frameworks" },
  experts: { icon: "🤝", label: "Experts", chip: "Human support" },
  community: { icon: "💬", label: "Community", chip: "Shared wisdom" },
  lab: { icon: "🧪", label: "Tools", chip: "Personal workspace" },
  commerce: { icon: "💎", label: "Pricing", chip: "Plans & value" },
  guides: { icon: "🧭", label: "Guides", chip: "How we work" },
  trust: { icon: "🛡️", label: "Trust", chip: "Policies & team" },
  default: { icon: "✦", label: "Life Decisions", chip: "Explore" },
};

const TRUST_PREFIXES = [
  "/about",
  "/faq",
  "/privacy",
  "/terms",
  "/cookies",
  "/content-policy",
  "/disclaimer",
  "/editorial-team",
  "/editorial-standards",
  "/contact",
] as const;

const LAB_PREFIXES = [
  "/journal",
  "/field-notes",
  "/checklists",
  "/playbooks",
] as const;

/** Resolve theme from pathname (no query/hash). */
export function resolvePageTheme(pathname: string): PageTheme {
  const path = pathname.split("?")[0]?.split("#")[0] ?? "/";
  if (path === "/") return "home";
  if (path.startsWith("/analyze")) return "product";
  if (path.startsWith("/blog")) return "blog";
  if (path.startsWith("/experts")) return "experts";
  if (path.startsWith("/community")) return "community";
  if (LAB_PREFIXES.some((p) => path.startsWith(p))) return "lab";
  if (path.startsWith("/pricing") || path.startsWith("/monetize")) return "commerce";
  if (path.startsWith("/how-we-use-ai")) return "guides";
  if (TRUST_PREFIXES.some((p) => path.startsWith(p))) return "trust";
  return "default";
}

export function getPageThemeMeta(theme: PageTheme): PageThemeMeta {
  return PAGE_THEME_META[theme] ?? PAGE_THEME_META.default;
}

/** Inline boot script — sets `data-page-theme` before first paint (avoids flash). */
export const PAGE_THEME_BOOTSTRAP_SCRIPT = `(function(){var p=location.pathname||"/";var t="default";if(p==="/")t="home";else if(p.indexOf("/analyze")===0)t="product";else if(p.indexOf("/blog")===0)t="blog";else if(p.indexOf("/experts")===0)t="experts";else if(p.indexOf("/community")===0)t="community";else if(p.indexOf("/journal")===0||p.indexOf("/field-notes")===0||p.indexOf("/checklists")===0||p.indexOf("/playbooks")===0)t="lab";else if(p.indexOf("/pricing")===0||p.indexOf("/monetize")===0)t="commerce";else if(p.indexOf("/how-we-use-ai")===0)t="guides";else if(["/about","/faq","/privacy","/terms","/cookies","/content-policy","/disclaimer","/editorial-team","/editorial-standards","/contact"].some(function(x){return p.indexOf(x)===0}))t="trust";document.documentElement.setAttribute("data-page-theme",t);})();`;
