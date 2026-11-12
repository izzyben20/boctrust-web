import { ProductPage, productMetadata } from "@/app/components/corporate/ProductPage";

export const metadata = productMetadata("regular-savings");

export default function Page() {
  return <ProductPage slug="regular-savings" />;
}
