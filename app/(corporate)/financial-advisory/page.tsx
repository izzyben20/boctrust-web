import { ProductPage, productMetadata } from "@/app/components/corporate/ProductPage";

export const metadata = productMetadata("financial-advisory");

export default function Page() {
  return <ProductPage slug="financial-advisory" />;
}
