import { ProductPage, productMetadata } from "@/app/components/corporate/ProductPage";

export const metadata = productMetadata("sme-loan");

export default function Page() {
  return <ProductPage slug="sme-loan" />;
}
