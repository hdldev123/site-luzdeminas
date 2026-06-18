import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Placeholder from "./Placeholder";
import ModalTrigger from "./ModalTrigger";
import { ArrowRightIcon } from "./Icons";

const CITIES = [
  {
    name: "Cataguases",
    placeholder: "<<foto-cataguases>>",
    alt: "Arquitetura modernista de Cataguases",
    text: "Berço do modernismo brasileiro: obras de Niemeyer, Portinari, Burle Marx e Paulo Werneck.",
  },
  {
    name: "Leopoldina",
    placeholder: "<<foto-leopoldina>>",
    alt: "Centro histórico de Leopoldina",
    text: "Tradição cafeeira, casario histórico e a hospitalidade que define a Zona da Mata.",
  },
  {
    name: "Piacatuba / Itamarati",
    placeholder: "<<foto-piacatuba>>",
    alt: "Distrito de Piacatuba e Itamarati",
    text: "Distritos de charme interiorano, memória ferroviária e paisagens que pedem uma boa caminhada.",
  },
];

export default function Cities() {
  return (
    <section id="cidades" className="container-page py-20 sm:py-24">
      <SectionHeading
        eyebrow="O circuito"
        title="Cidades do Circuito Luz de Minas"
        description="Uma macrorregião que conecta história, arte e natureza no coração da Zona da Mata mineira."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {CITIES.map((city, i) => (
          <Reveal key={city.name} delay={i * 120}>
            <article className="group h-full overflow-hidden rounded-2xl bg-white shadow-card dark:bg-night-card dark:ring-1 dark:ring-white/10">
              <Placeholder
                label={city.placeholder}
                alt={city.alt}
                className="aspect-[4/3] transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-ink dark:text-white">
                  {city.name}
                </h3>
                <p className="mt-2 leading-relaxed text-ink/70 dark:text-slate-300">
                  {city.text}
                </p>
                <ModalTrigger
                  kind="coming-soon"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue transition hover:gap-2.5 dark:text-brand-sky"
                >
                  Explorar no app
                  <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
                </ModalTrigger>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
