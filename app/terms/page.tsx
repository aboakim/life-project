import { makeTrustPage } from "@/lib/trust-page";

const page = makeTrustPage("terms", "/terms");
export const generateMetadata = page.generateMetadata;
export default page.default;
