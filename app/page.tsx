import DecisionStudioShell from "@/components/home/DecisionStudioShell";
import { HERO_SLIDE_IMAGE_URLS } from "@/lib/home/hero-slide-images";
import { initialPresetFromSearchParams } from "@/lib/home/initial-preset";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const initialPreset = initialPresetFromSearchParams(sp);
  const heroLcpSrc = HERO_SLIDE_IMAGE_URLS[0];

  return (
    <>
      <link rel="preload" as="image" href={heroLcpSrc} fetchPriority="high" />
      <main id="main">
        <DecisionStudioShell initialPreset={initialPreset} />
      </main>
    </>
  );
}
