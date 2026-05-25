import { makeTrustPage } from "@/lib/trust-page";

const page = makeTrustPage("editorial-team", "/editorial-team");
export const generateMetadata = page.generateMetadata;
export default page.default;
