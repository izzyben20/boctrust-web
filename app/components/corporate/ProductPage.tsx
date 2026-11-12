import type { Metadata } from "next";
import { PRODUCT_STORIES } from "@/data/corporate/product-stories";
import { CATEGORY_LABELS, getCorporateProduct } from "@/data/corporate/products";
import { pageMeta, productJsonLd } from "@/lib/seo";
import { JsonLd } from "../shared/JsonLd";
import { AdvisoryProduct } from "./products/AdvisoryProduct";
import { InvestmentProduct } from "./products/InvestmentProduct";
import { LoanProduct } from "./products/LoanProduct";
import { SavingsProduct } from "./products/SavingsProduct";

export function productMetadata(slug: string): Metadata {
  const product = getCorporateProduct(slug);
  if (!product) throw new Error(`Unknown product: ${slug}`);
  return pageMeta({ title: product.name, description: product.metaDescription, path: `/${product.slug}` });
}

/** Every legacy product URL has its own static route, so an unknown URL is a true 404. */
export function ProductPage({ slug }: { slug: string }) {
  const product = getCorporateProduct(slug);
  const story = PRODUCT_STORIES[slug];
  if (!product || !story) throw new Error(`Unknown product: ${slug}`);

  const System = { savings: SavingsProduct, loans: LoanProduct, investments: InvestmentProduct, advisory: AdvisoryProduct }[product.category];

  return (
    <>
      <JsonLd
        data={productJsonLd({
          name: product.name,
          description: product.metaDescription,
          path: `/${product.slug}`,
          category: CATEGORY_LABELS[product.category],
        })}
      />
      <System product={product} story={story} />
    </>
  );
}
