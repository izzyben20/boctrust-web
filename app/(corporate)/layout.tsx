import { CorporateFooter } from "@/app/components/corporate/CorporateFooter";
import { CorporateHeader } from "@/app/components/corporate/CorporateHeader";

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CorporateHeader />
      <main id="main">{children}</main>
      <CorporateFooter />
    </>
  );
}
