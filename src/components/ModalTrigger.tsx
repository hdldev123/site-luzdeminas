"use client";

import type { ReactNode } from "react";
import { openModal, type ModalKind } from "@/lib/modal";

type ModalTriggerProps = {
  kind: ModalKind;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

/**
 * Botão cliente que abre um modal global (openModal).
 * Usado em componentes de servidor para acionar popups sem torná-los clientes.
 */
export default function ModalTrigger({
  kind,
  children,
  className = "",
  ariaLabel,
}: ModalTriggerProps) {
  return (
    <button
      type="button"
      onClick={() => openModal(kind)}
      aria-haspopup="dialog"
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  );
}
