import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Troque pela URL real de produção quando publicar.
const SITE_URL = "https://luzdeminas.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Luz de Minas — Turismo histórico e cultural da Zona da Mata",
    template: "%s · Luz de Minas",
  },
  description:
    "Explore a história, a arquitetura e o modernismo da Zona da Mata mineira com rotas guiadas, áudio-guia e recompensas a cada marco que você descobre. Conheça o Circuito Luz de Minas: Cataguases, Leopoldina e Piacatuba/Itamarati.",
  keywords: [
    "Luz de Minas",
    "Circuito Luz de Minas",
    "turismo Zona da Mata",
    "Cataguases modernismo",
    "Leopoldina",
    "Piacatuba",
    "Itamarati",
    "áudio-guia",
    "rotas turísticas",
    "Oscar Niemeyer",
    "Cândido Portinari",
  ],
  authors: [{ name: "Luz de Minas" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Luz de Minas",
    title: "Luz de Minas — Turismo histórico e cultural da Zona da Mata",
    description:
      "Rotas guiadas, áudio-guia e recompensas a cada marco do Circuito Luz de Minas. Descubra o modernismo de Cataguases e a história da Zona da Mata mineira.",
    images: [
      {
        // <<og-image>> — substitua por uma imagem 1200x630 em /public/og-image.jpg
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "App Luz de Minas — rotas guiadas pelo Circuito Luz de Minas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luz de Minas — Turismo histórico e cultural da Zona da Mata",
    description:
      "Rotas guiadas, áudio-guia e recompensas a cada marco do Circuito Luz de Minas.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#002D72",
  width: "device-width",
  initialScale: 1,
};

// Dados estruturados básicos (Schema.org) para SEO.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "Luz de Minas",
  operatingSystem: "iOS, Android",
  applicationCategory: "TravelApplication",
  inLanguage: "pt-BR",
  description:
    "App de turismo histórico e cultural da Zona da Mata mineira. Rotas guiadas, áudio-guia, coleta de marcos por QR Code, conquistas e guia local com cupons.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
  url: SITE_URL,
  about:
    "Circuito Luz de Minas — Cataguases, Leopoldina e Piacatuba/Itamarati, berço do modernismo brasileiro.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Aplica tema e tamanho de fonte salvos antes da pintura (evita flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('ldm-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');var s=localStorage.getItem('ldm-font-scale');if(s)document.documentElement.style.setProperty('--font-scale',s);}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-orange focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
        >
          Pular para o conteúdo
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
