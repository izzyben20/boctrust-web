import { ProductPage, productMetadata } from "@/app/components/corporate/ProductPage";

export const metadata = productMetadata("asset-backed-financing");

export default function Page() {
  return <ProductPage slug="asset-backed-financing" />;
}
