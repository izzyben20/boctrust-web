import { ProductPage, productMetadata } from "@/app/components/corporate/ProductPage";

export const metadata = productMetadata("micro-insurance-advisory");

export default function Page() {
  return <ProductPage slug="micro-insurance-advisory" />;
}
