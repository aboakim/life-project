import PageEducation from "@/components/layout/PageEducation";
import type { ComponentProps } from "react";

/** Server-rendered publisher block for tool pages (AdSense / Googlebot). */
export default function ToolPageEducation(
  props: ComponentProps<typeof PageEducation>,
) {
  return (
    <div className="mx-auto max-w-3xl border-b border-white/[0.08] px-4 pb-16 pt-4 sm:px-6 sm:pb-20">
      <PageEducation {...props} />
    </div>
  );
}
