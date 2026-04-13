import type { Metadata } from "next";
import RegisterExpertForm from "./RegisterExpertForm";

export const metadata: Metadata = {
  title: "Գրանցում մասնագետ — համաշխարհային ցանց",
  description:
    "Հոգեբան, իրավաբան կամ ֆինանսիստ — գրանցվեք և երևացեք համաշխարհային ցանցում։",
};

export default function RegisterExpertPage() {
  return <RegisterExpertForm />;
}
