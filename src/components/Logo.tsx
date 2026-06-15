type LogoProps = {
  /** "light" para fundos escuros (hero/footer), "dark" para fundo claro */
  variant?: "light" | "dark";
  className?: string;
};

/**
 * Marca "Luz de Minas" — sol estilizado (a "luz") + wordmark.
 * Substitua o <svg> por um logo definitivo quando houver.
 */
export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const text =
    variant === "light" ? "text-white" : "text-brand-dark dark:text-white";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="16" cy="16" r="7" fill="#FF6B35" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4;
          const x1 = 16 + Math.cos(angle) * 10;
          const y1 = 16 + Math.sin(angle) * 10;
          const x2 = 16 + Math.cos(angle) * 14;
          const y2 = 16 + Math.sin(angle) * 14;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#FF6B35"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      <span className={`flex flex-col leading-none ${text}`}>
        <span className="text-lg font-extrabold tracking-tight">
          Luz de Minas
        </span>
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] opacity-70">
          Circuito
        </span>
      </span>
    </span>
  );
}
