import { ProductPage, productMetadata } from "@/app/components/corporate/ProductPage";

export const metadata = productMetadata("investment-note");

export default function Page() {
  return <ProductPage slug="investment-note" />;
}
