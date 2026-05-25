import type { AppLocale } from "@/lib/i18n/locale";
import { getUi } from "@/lib/i18n/ui";

export type HomeSectionNavLink = {
  id:
    | "section-overview"
    | "section-what-it-fixes"
    | "section-product"
    | "section-trust"
    | "section-how"
    | "section-workspace"
    | "section-language"
    | "section-privacy";
  label: string;
};

export function getHomeSectionNavProps(locale: AppLocale) {
  const t = getUi(locale);
  const links: HomeSectionNavLink[] = [
    { id: "section-overview", label: t.sectionNavOverview },
    { id: "section-what-it-fixes", label: t.sectionNavFixes },
    { id: "section-product", label: t.sectionNavProduct },
    { id: "section-trust", label: t.sectionNavTrust },
    { id: "section-how", label: t.sectionNavHow },
    { id: "section-workspace", label: t.sectionNavAnalyzer },
    { id: "section-language", label: t.sectionNavLanguage },
    { id: "section-privacy", label: t.sectionNavPrivacy },
  ];
  return {
    links,
    navAriaLabel: t.homeSectionNavAria,
    jumpLabel: t.homeSectionJumpLabel,
    jumpPlaceholder: t.homeSectionJumpPlaceholder,
  };
}
