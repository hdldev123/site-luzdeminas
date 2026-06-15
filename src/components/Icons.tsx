import type { SVGProps } from "react";

/**
 * Ícones em SVG inline (stroke), leves e acessíveis.
 * Decorativos por padrão (aria-hidden); recebem className para cor/tamanho.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const RouteIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="6" cy="19" r="2.5" />
    <circle cx="18" cy="5" r="2.5" />
    <path d="M8.5 19H14a3 3 0 0 0 3-3V8.5M15.5 5H10a3 3 0 0 0-3 3v7.5" />
  </svg>
);

export const AudioIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M11 5 6 9H3v6h3l5 4V5Z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12" />
  </svg>
);

export const QrIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3M21 14v.01M14 21h3M21 17v4M17 21h.01" />
  </svg>
);

export const MedalIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="14" r="6" />
    <path d="M12 11.5 13 13.5l2 .3-1.5 1.4.4 2-1.9-1-1.9 1 .4-2L9 13.8l2-.3 1-2ZM8.5 8 6 3M15.5 8 18 3" />
  </svg>
);

export const StoreIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 9h16l-1 11H5L4 9ZM4 9l1.5-5h13L20 9" />
    <path d="M9 12v0M15 12v0" />
  </svg>
);

export const HeartPulseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M19 14c1.5-1.5 2-3.3 2-5a4.5 4.5 0 0 0-8-2.8A4.5 4.5 0 0 0 5 9c0 1.7.5 3.5 2 5l5 5 4-4" />
    <path d="M3 12h3l1.5-2.5L10 14l1.5-2H14" />
  </svg>
);

export const AccessibilityIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="4.5" r="1.6" />
    <path d="M4 8.5c2.5 1 5 1.5 8 1.5s5.5-.5 8-1.5M12 10v5M12 15l-3 5M12 15l3 5" />
  </svg>
);

export const MapPinIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const TagIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 11.5V4a1 1 0 0 1 1-1h7.5a2 2 0 0 1 1.4.6l7 7a2 2 0 0 1 0 2.8l-6.5 6.5a2 2 0 0 1-2.8 0l-7-7A2 2 0 0 1 3 11.5Z" />
    <circle cx="8" cy="8" r="1.3" />
  </svg>
);

export const WhatsAppIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3.5 20.5l1.3-4.2A8 8 0 1 1 8 19.2l-4.5 1.3Z" />
    <path d="M9 9c0 3 3 6 6 6 .8 0 1.4-.6 1.4-1.4 0-.3-.2-.6-.5-.7l-1.4-.6c-.3-.1-.6 0-.8.2l-.4.5c-1-.4-1.8-1.2-2.2-2.2l.5-.4c.2-.2.3-.5.2-.8l-.6-1.4c-.1-.3-.4-.5-.7-.5C9.6 7.6 9 8.2 9 9Z" />
  </svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5v.01" />
  </svg>
);

export const FacebookIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V9H6v3h3v9h3v-9h2.5l.5-3H12V6.5a.5.5 0 0 1 .5-.5H15V3Z" />
  </svg>
);

export const YoutubeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
    <path d="M10 9.5v5l4.5-2.5L10 9.5Z" />
  </svg>
);

export const TypeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7V5h16v2M9 19h6M12 5v14" />
  </svg>
);

export const MoonIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
  </svg>
);

export const SunIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
