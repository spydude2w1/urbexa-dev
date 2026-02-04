import { Metadata } from "next"
import { FAQClient } from "./faq-client"

export const metadata: Metadata = {
  title: "FAQ — Urbexa Projects",
  description: "Common questions about residential construction, BBMP approvals, construction costs, and project execution in Bangalore and Tamil Nadu.",
}

export default function FAQPage() {
  return <FAQClient />
}