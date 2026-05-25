import { makeTrustPage } from "@/lib/trust-page";

const page = makeTrustPage("cookies", "/cookies");
export const generateMetadata = page.generateMetadata;
export default page.default;
