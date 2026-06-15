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
    // Formulário de cadastro de parceiros do Guia Local (botão "Seja um parceiro").
    // Troque pelo link real do formulário (Google Forms, Typeform, etc.).
    partnerForm: "<<URL_FORMS_PARCEIRO>>",
  },

  // Contato exibido no footer (e-mail + telefone)
  contact: {
    email: "contato@luzdeminas.app",
    // Telefone em formato de exibição e em formato E.164 para o link tel:
    phoneDisplay: "(32) 99999-9999",
    phoneHref: "+5532999999999",
  },

  // Redes sociais exibidas no footer (apenas Instagram)
  social: {
    instagram: "<<URL_INSTAGRAM>>",
  },

  // Conteúdo institucional aberto em modal (Termos de Uso / Política de Privacidade)
  // — ver textos em src/components/ModalsHost.tsx.
};

export type SiteConfig = typeof siteConfig;
