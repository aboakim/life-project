import type { Metadata } from "next";
import RegisterExpertEducation from "@/lib/page-education/RegisterExpertEducation";
import RegisterExpertForm from "./RegisterExpertForm";
import { toolPageMetadata } from "@/lib/site-page-metadata";

export const metadata: Metadata = toolPageMetadata({
  title: "Register as an expert — Life Decision Engine",
  description:
    "Apply to list your psychology, legal, financial, or coaching practice in our curated experts directory.",
  canonical: "/experts/register",
});

export default function RegisterExpertPage() {
  return (
    <>
      <RegisterExpertForm />
      <RegisterExpertEducation />
    </>
  );
}
