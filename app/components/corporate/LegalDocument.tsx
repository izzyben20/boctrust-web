import { Mullion } from "./Mullion";

export type LegalBlock = { kind: "h" | "p" | "li"; x: string };

const linkify = (text: string) => {
  const parts = text.split(/([\w.]+@boctrustmfb\.com)/);
  return parts.map((part, i) =>
    part.endsWith("@boctrustmfb.com") ? (
      <a key={i} href={`mailto:${part}`}>{part}</a>
    ) : (
      part
    ),
  );
};

const ID = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** A long policy page with a sticky contents rail, set for comfortable reading. */
export function LegalDocument({ title, intro, blocks }: { title: string; intro: string; blocks: LegalBlock[] }) {
  // The title duplicates the page heading, so the first heading is dropped.
  const body = blocks[0]?.kind === "h" ? blocks.slice(1) : blocks;
  const headings = body.filter((b) => b.kind === "h" && b.x.length < 70);

  type Group = { type: "ul"; items: string[] } | LegalBlock;
  const grouped = body.reduce<Group[]>((acc, block) => {
    const last = acc[acc.length - 1];
    if (block.kind === "li") {
      if (last && "type" in last) last.items.push(block.x);
      else acc.push({ type: "ul", items: [block.x] });
    } else acc.push(block);
    return acc;
  }, []);

  return (
    <>
      <header className="relative isolate overflow-hidden bg-navy text-white">
        <Mullion className="pointer-events-none absolute right-[5%] bottom-0 -z-10 h-[78%] text-white/30 max-md:hidden" />
        <div className="wrap py-14 lg:py-20">
          <p className="eyebrow text-gold">Legal</p>
          <h1 className="display-page mt-4 max-w-4xl">{title}</h1>
          <p className="lede mt-5 max-w-2xl text-white/80">{intro}</p>
        </div>
      </header>
      <div className="wrap grid gap-10 py-12 lg:grid-cols-12 lg:py-20">
        {headings.length > 3 && (
          <nav aria-label="On this page" className="lg:col-span-3">
            <div className="lg:sticky lg:top-32 lg:max-h-[calc(100dvh-10rem)] lg:overflow-y-auto">
              <p className="eyebrow text-gold-deep">On this page</p>
              <ul className="mt-3 text-sm">
                {headings.map((h) => (
                  <li key={h.x}>
                    <a href={`#${ID(h.x)}`} className="block border-b border-rule py-2.5 text-ink-soft hover:text-navy">{h.x}</a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}
        <article className={`prose-ledger max-w-3xl ${headings.length > 3 ? "lg:col-span-8 lg:col-start-5" : "lg:col-span-8"}`}>
          {grouped.map((block, i) => {
            if ("type" in block) {
              return (
                <ul key={i}>
                  {block.items.map((item, j) => (
                    <li key={j}>{linkify(item)}</li>
                  ))}
                </ul>
              );
            }
            if (block.kind === "h" && block.x.length < 70) {
              return <h2 key={i} id={ID(block.x)}>{block.x}</h2>;
            }
            return <p key={i}>{linkify(block.x)}</p>;
          })}
        </article>
      </div>
    </>
  );
}
