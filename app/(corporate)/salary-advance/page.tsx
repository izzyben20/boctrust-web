import { ProductPage, productMetadata } from "@/app/components/corporate/ProductPage";

export const metadata = productMetadata("salary-advance");

export default function Page() {
  return <ProductPage slug="salary-advance" />;
}
