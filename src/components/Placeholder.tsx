import Image from "next/image";
import { MapPinIcon } from "./Icons";

type PlaceholderProps = {
  /** Rótulo do placeholder, ex.: "<<foto-cataguases>>" */
  label: string;
  className?: string;
  /** descrição que vira o alt da imagem */
  alt?: string;
  variant?: "photo" | "screenshot";
  /**
   * Caminho da imagem real em /public (ex.: "/rotas.jpeg").
   * Quando informado, renderiza a imagem (next/image, lazy-load).
   * Quando ausente, mostra a moldura de placeholder.
   */
  src?: string;
  /** dica de tamanho responsivo para o next/image */
  sizes?: string;
};

/**
 * Exibe uma imagem real (se `src` for informado) ou uma moldura de placeholder.
 * Mantém os mesmos cantos arredondados / proporção via `className`.
 */
export default function Placeholder({
  label,
  className = "",
  alt,
  variant = "photo",
  src,
  sizes = "(max-width: 768px) 80vw, 320px",
}: PlaceholderProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt ?? label.replace(/<<|>>/g, "")}
          fill
          sizes={sizes}
          loading="lazy"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt ?? `Imagem: ${label}`}
      data-placeholder={label}
      className={`relative flex items-center justify-center overflow-hidden ${
        variant === "screenshot"
          ? "bg-gradient-to-b from-brand-blue to-brand-darker"
          : "bg-gradient-to-br from-brand-blue/15 via-brand-blue/5 to-brand-orange/15"
      } ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, currentColor 1px, transparent 1px), linear-gradient(45deg, currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />
      <span
        className={`relative z-10 flex flex-col items-center gap-2 px-4 text-center text-sm font-semibold ${
          variant === "screenshot"
            ? "text-white/80"
            : "text-brand-dark/70 dark:text-slate-200/80"
        }`}
      >
        <MapPinIcon className="h-7 w-7 opacity-80" />
        {label}
      </span>
    </div>
  );
}
