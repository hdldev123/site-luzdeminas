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
 */
export default function MagneticButton({
  children,
  onClick,
  className = "",
  strength = 0.35,
  "aria-haspopup": ariaHasPopup,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
  "aria-haspopup"?: "dialog";
  "aria-label"?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 220, damping: 16, mass: 0.4 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  function onMove(e: React.MouseEvent<HTMLButtonElement>) {
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

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      aria-haspopup={ariaHasPopup}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </motion.button>
  );
}
