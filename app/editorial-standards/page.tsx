import { makeTrustPage } from "@/lib/trust-page";

const page = makeTrustPage("editorial-standards", "/editorial-standards");
export const generateMetadata = page.generateMetadata;
export default page.default;
