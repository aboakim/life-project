import { makeTrustPage } from "@/lib/trust-page";
import EditorialTeamJsonLd from "@/components/trust/EditorialTeamJsonLd";

const page = makeTrustPage("editorial-team", "/editorial-team");
const TrustPage = page.default;

export const generateMetadata = page.generateMetadata;

export default async function EditorialTeamPage() {
  return (
    <>
      <EditorialTeamJsonLd />
      <TrustPage />
    </>
  );
}
