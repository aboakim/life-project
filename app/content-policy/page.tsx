import { makeTrustPage } from "@/lib/trust-page";

const page = makeTrustPage("content-policy", "/content-policy");
export const generateMetadata = page.generateMetadata;
export default page.default;
