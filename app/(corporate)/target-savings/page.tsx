import { ProductPage, productMetadata } from "@/app/components/corporate/ProductPage";

export const metadata = productMetadata("target-savings");

export default function Page() {
  return <ProductPage slug="target-savings" />;
}
