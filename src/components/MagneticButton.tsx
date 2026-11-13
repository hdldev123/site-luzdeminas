"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

/**
 * Botão "magnético": é atraído levemente na direção do cursor quando ele se
 * aproxima, com retorno elástico ao sair. Detalhe de micro-interação que dá a
 * sensação de peça viva, não de template. Desliga com prefers-reduced-motion.
 *
 * Com `href`, renderiza um link externo (nova aba) em vez de um <button>.
 */
export default function MagneticButton({
  children,
  onClick,
  href,
  className = "",
  strength = 0.35,
  "aria-haspopup": ariaHasPopup,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  strength?: number;
  "aria-haspopup"?: "dialog";
  "aria-label"?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 220, damping: 16, mass: 0.4 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const shared = {
    onMouseMove: onMove,
    onMouseLeave: reset,
    style: { x: sx, y: sy },
    whileTap: { scale: 0.96 },
    "aria-label": ariaLabel,
    className,
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        {...shared}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      aria-haspopup={ariaHasPopup}
      {...shared}
    >
      {children}
    </motion.button>
  );
}
