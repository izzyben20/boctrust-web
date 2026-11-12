import { ProductPage, productMetadata } from "@/app/components/corporate/ProductPage";

export const metadata = productMetadata("ajo-plus-account");

export default function Page() {
  return <ProductPage slug="ajo-plus-account" />;
}
