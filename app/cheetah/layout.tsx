import type { CSSProperties } from "react";
import { CheetahFooter } from "@/app/components/cheetah/CheetahFooter";
import { CheetahHeader } from "@/app/components/cheetah/CheetahHeader";

export default function CheetahLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white text-stride-night" style={{ "--focus-ring": "var(--color-stride-deep)" } as CSSProperties}>
      <CheetahHeader />
      {/* The floating nav overlaps each page's hero. */}
      <main id="main" className="-mt-17">
        {children}
      </main>
      <CheetahFooter />
    </div>
  );
}
