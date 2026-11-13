"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import PartnerForm from "./PartnerForm";
import LegalModal from "./LegalModal";
import { MODAL_EVENT, type ModalKind } from "@/lib/modal";

/**
 * Host único de modais. Montado uma vez na página, escuta o evento global
 * disparado por openModal(kind) e renderiza o conteúdo correspondente.
 */
export default function ModalsHost() {
  const [kind, setKind] = useState<ModalKind | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ModalKind>).detail;
      setKind(detail);
    };
    window.addEventListener(MODAL_EVENT, handler as EventListener);
    return () =>
      window.removeEventListener(MODAL_EVENT, handler as EventListener);
  }, []);

  const close = () => setKind(null);

  return (
    <>
      {/* Seja um parceiro (Guia Local) */}
      <Modal
        open={kind === "partner"}
        onClose={close}
        title="Seja um parceiro do Luz de Minas"
        size="lg"
      >
        <p className="leading-relaxed text-ink/80 dark:text-slate-300">
          Coloque seu negócio no mapa do circuito, alcance turistas que já estão
          na sua cidade e atraia visitas com cupons. Preencha os dados abaixo que
          nossa equipe entra em contato.
        </p>
        <div className="mt-5 border-t border-black/5 pt-5 dark:border-white/10">
          <PartnerForm />
        </div>
      </Modal>

      {/* Termos de Uso + Política de Privacidade (abas) */}
      <LegalModal
        open={kind === "terms" || kind === "privacy"}
        onClose={close}
        initialTab={kind === "terms" ? "terms" : "privacy"}
      />
    </>
  );
}
