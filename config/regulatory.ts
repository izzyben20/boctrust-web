/**
 * Regulatory and trust claims. A claim renders only when `status` is "verified".
 * Each record says where it was checked, so the next reviewer can re-check it.
 * Set a status to "pending" to pull a claim from both websites at once.
 * Last checked against the official sources below: 7 November 2026.
 */
export type RegulatoryClaim = {
  id: "cbn" | "ndic" | "ndpc";
  status: "verified" | "pending";
  authority: string;
  abbreviation: string;
  /** The exact wording shown publicly. */
  statement: string;
  detail: string;
  logo: { src: string; width: number; height: number; alt: string };
  verifyUrl: string;
  verifyLabel: string;
  /** Internal note, never rendered. */
  evidence: string;
};

export const REGULATORY_CLAIMS: RegulatoryClaim[] = [
  {
    id: "cbn",
    status: "verified",
    authority: "Central Bank of Nigeria",
    abbreviation: "CBN",
    statement: "Licensed by the Central Bank of Nigeria",
    detail: "Boctrust appears in the CBN's published directory of microfinance banks.",
    logo: {
      src: "/images/shared/regulatory/cbn-logo.png",
      width: 288,
      height: 100,
      alt: "Central Bank of Nigeria logo",
    },
    verifyUrl: "https://www.cbn.gov.ng/Supervision/Inst-MF.html",
    verifyLabel: "See the CBN directory",
    evidence:
      "cbn.gov.ng/api/GetMFBs lists id 3316 'BOCTRUST MFB'. The entry has no licence category or date, so none is claimed.",
  },
  {
    id: "ndic",
    status: "verified",
    authority: "Nigeria Deposit Insurance Corporation",
    abbreviation: "NDIC",
    statement: "Listed by the NDIC as an insured institution",
    detail: "Find Boctrust in the NDIC's directory of insured microfinance banks.",
    logo: {
      src: "/images/shared/regulatory/ndic-logo.png",
      width: 1710,
      height: 723,
      alt: "Nigeria Deposit Insurance Corporation logo",
    },
    verifyUrl: "https://ndic.gov.ng/insured-banks?type=microfinance",
    verifyLabel: "Search the NDIC directory",
    evidence:
      "NDIC directory search returns 'BOCTRUST Microfinance Bank Limited'. Its listed address (32 Lawson Street) differs from the site's. No coverage limit is stated because none was verified.",
  },
  {
    id: "ndpc",
    status: "verified",
    authority: "Nigeria Data Protection Commission",
    abbreviation: "NDPC",
    statement: "NDPR Audit Compliant, audit year 2024",
    detail: "NDPC audit reg. no. NDPC/AUDIT/19975. Filed through DPCO Floliz Nigeria Limited; approved 19 May 2025.",
    logo: {
      src: "/images/shared/regulatory/ndpc-audit-trustmark-2024.jpg",
      width: 1100,
      height: 998,
      alt: "Boctrust NDPR Audit Compliant 2024 trustmark",
    },
    verifyUrl:
      "https://services.ndpc.gov.ng/portal/?page=verify-c&d=ang39005873774&id=22208&sn=b6e21df3ddde2eba0b50d4caaf578864&t=audit_filing&tp=nwp_audit",
    verifyLabel: "Verify on the NDPC portal",
    evidence:
      "The trustmark's QR code resolves to this NDPC record. The brief's 'NDPE' is not the designation: the record and trustmark say NDPC and NDPR. It covers audit year 2024 only, so it is not worded as current-year compliance.",
  },
];

export const verifiedClaims = (): RegulatoryClaim[] =>
  REGULATORY_CLAIMS.filter((claim) => claim.status === "verified");
