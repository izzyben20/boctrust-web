import { ProductPage, productMetadata } from "@/app/components/corporate/ProductPage";

export const metadata = productMetadata("fixed-investment");

export default function Page() {
  return <ProductPage slug="fixed-investment" />;
}
