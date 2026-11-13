/**
 * Configuração central da landing page.
 * Troque aqui os links das lojas, contatos e parceiros — sem mexer nos componentes.
 */

export const siteConfig = {
  name: "Luz de Minas",
  tagline: "Circuito Luz de Minas",

  // Links das lojas de aplicativos (app "Rotas Luz de Minas")
  links: {
    appStore: "https://apps.apple.com/br/app/rotas-luz-de-minas/id6820334771",
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.hdl.rotas&hl=pt_BR",
  },

  // ID numérico do app na App Store — alimenta o Smart App Banner do Safari (iOS)
  appStoreId: "6820334771",

  // Contato exibido no footer (e-mail + telefone)
  contact: {
    email: "hdlgithub@gmail.com",
    // Telefone em formato de exibição e em formato E.164 para o link tel:
    phoneDisplay: "(32) 99825-3348",
    phoneHref: "+5532998253348",
  },

  // Redes sociais exibidas no footer (apenas Instagram)
  social: {
    instagram: "https://www.instagram.com/hdl_solucoes",
  },

  // Conteúdo institucional aberto em modal (Termos de Uso / Política de Privacidade)
  // — ver textos em src/components/ModalsHost.tsx.
};

export type SiteConfig = typeof siteConfig;
