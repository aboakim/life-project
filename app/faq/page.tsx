import { makeTrustPage } from "@/lib/trust-page";

const page = makeTrustPage("faq", "/faq");
export const generateMetadata = page.generateMetadata;
export default page.default;
