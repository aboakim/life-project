/**
 * Keyboard accessibility: visually hidden until focused, then jumps past
 * the global nav to main content. Screen readers announce it first.
 * AdSense and general SEO audits look for this pattern.
 */
export default function SkipToContent() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded-lg focus:bg-[rgb(var(--ink))] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[rgb(10_12_20)] focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-2))]"
    >
      Skip to main content
    </a>
  );
}
