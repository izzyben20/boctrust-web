import Link from "next/link";
import type { CompareTable } from "@/data/corporate/product-compare";
import { getCorporateProduct } from "@/data/corporate/products";

/** One category's products side by side, with the current page marked rather than linked. */
export function CompareLedger({ table, current, title, dark = false }: { table: CompareTable; current: string; title: string; dark?: boolean }) {
  const rule = dark ? "border-white/20" : "border-rule";
  const muted = dark ? "text-white/75" : "text-ink-soft";
  return (
    <div>
      <h2 className="display-md">{title}</h2>
      <div tabIndex={0} role="region" aria-label={title} className={`mt-8 overflow-x-auto border-t-2 ${dark ? "border-gold" : "border-navy"}`}>
        <table className="w-full min-w-[44rem] text-left">
          <thead>
            <tr className={`border-b ${rule} font-display text-sm`}>
              <th scope="col" className="w-[24%] py-3 pr-4">Product</th>
              {table.columns.map((column) => (
                <th key={column} scope="col" className="p-3">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(table.rows).map(([slug, cells]) => {
              const product = getCorporateProduct(slug);
              const here = slug === current;
              return (
                <tr key={slug} aria-current={here ? "page" : undefined} className={`border-b ${rule} align-top ${here ? (dark ? "bg-white/[0.06]" : "bg-gold-pale/60") : ""}`}>
                  <th scope="row" className="py-4 pr-4 pl-0 font-display font-bold">
                    {here ? (
                      <span className="flex items-center gap-2">
                        <span aria-hidden className="size-2 rounded-full bg-gold" />
                        {product?.name}
                      </span>
                    ) : (
                      <Link href={`/${slug}`} className="underline decoration-gold decoration-2 underline-offset-4 hover:decoration-current">{product?.name}</Link>
                    )}
                  </th>
                  {cells.map((cell, i) => (
                    <td key={i} className={`p-3 text-sm ${i === 0 ? "font-semibold" : muted}`}>{cell}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className={`mt-3 text-sm ${muted}`}>Rates, charges and eligibility are subject to review. Please confirm current terms with us.</p>
    </div>
  );
}
