import { makeTrustPage } from "@/lib/trust-page";

const page = makeTrustPage("disclaimer", "/disclaimer");
export const generateMetadata = page.generateMetadata;
export default page.default;
