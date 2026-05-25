import { makeTrustPage } from "@/lib/trust-page";

const page = makeTrustPage("privacy", "/privacy");
export const generateMetadata = page.generateMetadata;
export default page.default;
