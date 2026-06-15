/**
 * Configuração central da landing page.
 * Troque aqui os links das lojas, contatos e parceiros — sem mexer nos componentes.
 */

export const siteConfig = {
  name: "Luz de Minas",
  tagline: "Circuito Luz de Minas",

  // Links das lojas de aplicativos (substitua os placeholders)
  links: {
    appStore: "<<URL_APP_STORE>>",
    googlePlay: "<<URL_GOOGLE_PLAY>>",
    // Contato comercial para parcerias do Guia Local
    partnerWhatsApp:
      "https://wa.me/5500000000000?text=Quero%20ser%20parceiro%20do%20Luz%20de%20Minas",
    contactEmail: "contato@luzdeminas.app",
  },

  // Redes sociais (use "#" ou remova o item para esconder)
  social: {
    instagram: "<<URL_INSTAGRAM>>",
    facebook: "<<URL_FACEBOOK>>",
    youtube: "<<URL_YOUTUBE>>",
  },

  // Links institucionais do rodapé
  legal: {
    privacy: "/politica-de-privacidade",
    terms: "/termos-de-uso",
    contact: "mailto:contato@luzdeminas.app",
  },

  // Créditos / parceiros institucionais — ajuste conforme o patrocínio real
  partners: [
    { name: "Energisa", url: "<<URL_ENERGISA>>" },
    { name: "Prefeitura de Cataguases", url: "<<URL_PREFEITURA>>" },
  ],
};

export type SiteConfig = typeof siteConfig;
