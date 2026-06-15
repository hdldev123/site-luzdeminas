/**
 * Mecanismo simples e desacoplado de modais via evento de janela.
 * Qualquer componente cliente pode abrir um modal chamando openModal(kind);
 * o ModalsHost (montado uma vez) escuta e renderiza o conteúdo correspondente.
 */

export type ModalKind = "coming-soon" | "terms" | "privacy";

export const MODAL_EVENT = "ldm:modal";

export function openModal(kind: ModalKind) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<ModalKind>(MODAL_EVENT, { detail: kind }));
}
