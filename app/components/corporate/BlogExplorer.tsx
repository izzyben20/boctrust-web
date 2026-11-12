"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useState } from "react";
import type { BlogPost } from "@/data/blog/types";
import { ArticleCard } from "./ArticleCard";

/** Client-side category filter, so the page itself stays fully static and cacheable. */
export function BlogExplorer({ posts, categories }: { posts: BlogPost[]; categories: string[] }) {
  const [category, setCategory] = useState("All");
  const visible = category === "All" ? posts : posts.filter((p) => p.category === category);

  return (
    <div>
      <div role="group" aria-label="Filter articles by category" className="flex flex-wrap gap-2">
        {["All", ...categories].map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={category === name}
            onClick={() => setCategory(name)}
            className={`min-h-11 rounded-full border px-5 font-display text-sm font-bold transition-colors ${category === name ? "border-navy bg-navy text-white" : "border-navy/30 text-navy hover:border-navy"}`}
          >
            {name}
          </button>
        ))}
      </div>
      <p role="status" className="sr-only">{visible.length} articles shown</p>
      <ul className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((post) => (
            <m.li key={post.slug} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <ArticleCard post={post} />
            </m.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
