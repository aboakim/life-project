import PageEducation from "@/components/layout/PageEducation";
import type { ComponentProps } from "react";

/** Server-rendered publisher block for tool pages (AdSense / Googlebot). */
export default function ToolPageEducation(
  props: ComponentProps<typeof PageEducation>,
) {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-4 sm:px-6 sm:pb-28">
      <PageEducation {...props} />
    </div>
  );
}
