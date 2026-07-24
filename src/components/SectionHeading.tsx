import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  invert?: boolean;
};

/**
 * Cabeçalho editorial de seção: kicker com filete (como no hero) e título em
 * Fraunces (font-display), dando ao site a cadência de revista em vez de
 * template.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  invert = false,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={`max-w-2xl ${centered ? "mx-auto text-center" : "text-left"}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] ${
            invert ? "text-brand-orange" : "text-brand-green dark:text-brand-leaf"
          }`}
        >
          {centered && (
            <span
              className={`h-px w-8 ${invert ? "bg-brand-orange" : "bg-brand-green/60 dark:bg-brand-leaf/60"}`}
              aria-hidden="true"
            />
          )}
          {!centered && (
            <span
              className={`h-px w-10 ${invert ? "bg-brand-orange" : "bg-brand-green/60 dark:bg-brand-leaf/60"}`}
              aria-hidden="true"
            />
          )}
          {eyebrow}
          {centered && (
            <span
              className={`h-px w-8 ${invert ? "bg-brand-orange" : "bg-brand-green/60 dark:bg-brand-leaf/60"}`}
              aria-hidden="true"
            />
          )}
        </span>
      )}
      <h2
        className={`mt-4 font-display text-4xl font-semibold leading-[1.06] tracking-[-0.01em] sm:text-5xl ${
          invert ? "text-white" : "text-ink dark:text-white"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            invert ? "text-white/80" : "text-ink/70 dark:text-slate-300"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
