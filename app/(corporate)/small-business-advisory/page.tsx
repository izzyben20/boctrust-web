import { ProductPage, productMetadata } from "@/app/components/corporate/ProductPage";

export const metadata = productMetadata("small-business-advisory");

export default function Page() {
  return <ProductPage slug="small-business-advisory" />;
}
