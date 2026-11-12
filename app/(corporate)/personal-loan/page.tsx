import { ProductPage, productMetadata } from "@/app/components/corporate/ProductPage";

export const metadata = productMetadata("personal-loan");

export default function Page() {
  return <ProductPage slug="personal-loan" />;
}
