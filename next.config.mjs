/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Habilite domínios remotos aqui quando trocar os placeholders por fotos reais.
    // remotePatterns: [{ protocol: "https", hostname: "seu-cdn.com" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
