import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  invert?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  invert = false,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <Reveal className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <span
          className={`text-sm font-bold uppercase tracking-[0.16em] ${
            invert ? "text-brand-orange" : "text-brand-blue dark:text-brand-sky"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl ${
          invert ? "text-white" : "text-ink dark:text-white"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            invert ? "text-white/80" : "text-ink/70 dark:text-slate-300"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
