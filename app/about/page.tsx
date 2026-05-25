import { makeTrustPage } from "@/lib/trust-page";

const page = makeTrustPage("about", "/about");
export const generateMetadata = page.generateMetadata;
export default page.default;
