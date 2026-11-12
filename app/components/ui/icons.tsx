import type { SVGProps } from "react";

/** Bespoke icon set. No icon library is used anywhere on the site. */
type P = SVGProps<SVGSVGElement>;
const base = (props: P): P => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  ...props,
});

export const ArrowRight = (p: P) => <svg {...base(p)}><path d="M4 12h15M13 6l6 6-6 6" /></svg>;
export const ArrowUpRight = (p: P) => <svg {...base(p)}><path d="M7 17 17 7M8 7h9v9" /></svg>;
export const ArrowLeft = (p: P) => <svg {...base(p)}><path d="M20 12H5M11 6l-6 6 6 6" /></svg>;
export const ChevronDown = (p: P) => <svg {...base(p)}><path d="m6 9 6 6 6-6" /></svg>;
export const ChevronRight = (p: P) => <svg {...base(p)}><path d="m9 6 6 6-6 6" /></svg>;
export const PlusIcon = (p: P) => <svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>;
export const CloseIcon = (p: P) => <svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>;
export const MenuIcon = (p: P) => <svg {...base(p)}><path d="M3 7h18M3 12h12M3 17h18" /></svg>;
export const SearchIcon = (p: P) => <svg {...base(p)}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
export const CheckIcon = (p: P) => <svg {...base(p)}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>;
export const PhoneIcon = (p: P) => (
  <svg {...base(p)}><path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v3a3 3 0 0 1-3 3C10 21 3 14 3 6a3 3 0 0 1 3-3Z" /></svg>
);
export const MailIcon = (p: P) => (
  <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7.5 8 6 8-6" /></svg>
);
export const PinIcon = (p: P) => (
  <svg {...base(p)}><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.800 12 21 12 21Z" /><circle cx="12" cy="9.500" r="2.500" /></svg>
);
export const ClockIcon = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5.500l3.500 2" /></svg>
);
export const ShieldIcon = (p: P) => (
  <svg {...base(p)}><path d="M12 3 5 6v5.500c0 4.500 3 8 7 9.500 4-1.500 7-5 7-9.500V6l-7-3Z" /><path d="m9 12 2.200 2.200L15.300 10" /></svg>
);
export const BellIcon = (p: P) => (
  <svg {...base(p)}><path d="M6 16.500V11a6 6 0 1 1 12 0v5.500l1.500 2h-15l1.500-2Z" /><path d="M10 21h4" /></svg>
);
export const FingerprintIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 11a6 6 0 0 1 10.500-4M18 11c0 4-.5 6-1.500 8M12 11c0 4-.8 7-2.500 9M9 11a3 3 0 0 1 6 0c0 3-.3 5-1 7M6 15c0 1.500-.3 2.700-1 4" />
  </svg>
);
export const DevicesIcon = (p: P) => (
  <svg {...base(p)}><rect x="3" y="4" width="13" height="10" rx="2" /><path d="M6 18h7" /><rect x="16" y="9" width="5.500" height="11" rx="1.500" /></svg>
);
export const LockIcon = (p: P) => (
  <svg {...base(p)}><rect x="4.500" y="10.500" width="15" height="10" rx="2.500" /><path d="M8 10.500V8a4 4 0 0 1 8 0v2.500" /></svg>
);
export const AlertIcon = (p: P) => (
  <svg {...base(p)}><path d="M10.300 4.300 2.800 17.500A2 2 0 0 0 4.500 20.500h15a2 2 0 0 0 1.700-3L13.700 4.300a2 2 0 0 0-3.400 0Z" /><path d="M12 9.500v4M12 17h.01" /></svg>
);
export const IdCardIcon = (p: P) => (
  <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2.500" /><circle cx="9" cy="11" r="2" /><path d="M6 16c.6-1.300 1.700-2 3-2s2.400.7 3 2M14.500 10h3.500M14.500 13.500h3.500" /></svg>
);

export const FacebookIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M13.500 21v-7.800h2.700l.4-3.200h-3.100V8c0-.9.3-1.500 1.600-1.500h1.600V3.600c-.3 0-1.300-.1-2.400-.1-2.400 0-4 1.400-4 4.100V10H7.500v3.200h2.800V21h3.200Z" />
  </svg>
);
export const XIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M17.200 3.500h3l-6.600 7.500 7.800 9.500h-6.100l-4.800-5.900-5.500 5.900h-3l7-8L1.600 3.500h6.300l4.300 5.400 5-5.400Zm-1 15.300h1.700L7 5.100H5.200l11 13.700Z" />
  </svg>
);
export const LinkedinIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M6.500 8.800H3.300V20h3.200V8.800ZM4.900 3.500a1.900 1.900 0 1 0 0 3.800 1.900 1.900 0 0 0 0-3.800ZM20.700 13.600c0-3-1.600-5-4.200-5-1.300 0-2.400.6-3 1.600V8.800h-3.100V20h3.200v-5.800c0-1.500.7-2.700 2.200-2.700 1.400 0 1.800 1.100 1.800 2.700V20h3.200l-.1-6.400Z" />
  </svg>
);
export const socialIcons = { facebook: FacebookIcon, x: XIcon, linkedin: LinkedinIcon } as const;

export const GooglePlayGlyph = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden fill="currentColor" {...p}>
    <path d="M4.200 2.700a1.500 1.500 0 0 0-.7 1.300v16c0 .5.300 1 .7 1.300L13 12 4.200 2.700Z" opacity=".75" />
    <path d="M16.300 8.500 6 2.500 14.200 11l2.100-2.500Z" />
    <path d="m14.200 13-8.200 8.500 10.300-6L14.200 13Z" />
    <path d="m20 10.700-2.400-1.400-2.500 2.700 2.500 2.700 2.400-1.400c1-.6 1-2 0-2.600Z" opacity=".85" />
  </svg>
);
export const AppleGlyph = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden fill="currentColor" {...p}>
    <path d="M16.700 12.700c0-2.300 1.900-3.400 2-3.500-1.100-1.600-2.800-1.800-3.400-1.800-1.400-.2-2.800.8-3.500.8-.7 0-1.900-.8-3-.8-1.600 0-3 .9-3.800 2.300-1.600 2.800-.4 7 1.200 9.300.8 1.100 1.700 2.400 2.900 2.300 1.200 0 1.600-.7 3-.7s1.800.7 3 .7 2.100-1.100 2.800-2.200c.9-1.300 1.300-2.500 1.300-2.600-.1 0-2.500-1-2.500-3.800ZM14.400 5.700c.6-.8 1.100-1.900.9-3-1 0-2.100.6-2.800 1.400-.6.700-1.100 1.800-1 2.900 1.100.1 2.200-.5 2.900-1.300Z" />
  </svg>
);
