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
  },

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
