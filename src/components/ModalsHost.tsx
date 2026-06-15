"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import StoreButtons from "./StoreButtons";
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
      {/* App em breve */}
      <Modal
        open={kind === "coming-soon"}
        onClose={close}
        title="Chegando muito em breve 🎉"
      >
        <p className="leading-relaxed text-ink/80 dark:text-slate-300">
          O app <strong>Luz de Minas</strong> está em desenvolvimento e será
          lançado em breve nas lojas. Enquanto isso, fique de olho — a sua
          jornada pelo Circuito Luz de Minas está quase pronta para começar!
        </p>
        <p className="mt-4 text-sm font-semibold text-ink/60 dark:text-slate-400">
          Em breve disponível para iOS e Android:
        </p>
        <div className="mt-3">
          {/* Botões ilustrativos (ainda sem link de loja ativo) */}
          <StoreButtons variant="dark" />
        </div>
      </Modal>

      {/* Termos de Uso */}
      <Modal
        open={kind === "terms"}
        onClose={close}
        title="Termos de Uso"
        size="lg"
      >
        <LegalTerms />
      </Modal>

      {/* Política de Privacidade */}
      <Modal
        open={kind === "privacy"}
        onClose={close}
        title="Política de Privacidade"
        size="lg"
      >
        <LegalPrivacy />
      </Modal>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Conteúdo institucional (TEMPLATE — revise com apoio jurídico)       */
/* ------------------------------------------------------------------ */

const prose =
  "space-y-4 text-sm leading-relaxed text-ink/80 dark:text-slate-300 [&_h3]:mt-5 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-ink dark:[&_h3]:text-white";

function LegalTerms() {
  return (
    <div className={prose}>
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-orange">
        Modelo — substitua pelo texto jurídico oficial
      </p>
      <p>
        Estes Termos de Uso regulam o acesso e a utilização da landing page e do
        aplicativo <strong>Luz de Minas</strong>. Ao utilizar nossos serviços,
        você concorda com as condições abaixo.
      </p>
      <h3>1. Uso do serviço</h3>
      <p>
        O conteúdo é disponibilizado para fins informativos e de divulgação do
        Circuito Luz de Minas. Você se compromete a utilizá-lo de forma lícita,
        sem prejudicar terceiros ou a integridade da plataforma.
      </p>
      <h3>2. Propriedade intelectual</h3>
      <p>
        Marcas, textos, imagens e demais materiais pertencem ao Luz de Minas ou a
        seus parceiros, sendo vedada a reprodução sem autorização.
      </p>
      <h3>3. Limitação de responsabilidade</h3>
      <p>
        Empenhamo-nos para manter as informações corretas e atualizadas, mas não
        garantimos ausência de erros ou disponibilidade ininterrupta.
      </p>
      <h3>4. Alterações</h3>
      <p>
        Estes termos podem ser atualizados a qualquer momento. A versão vigente
        estará sempre disponível nesta página.
      </p>
      <p className="text-xs text-ink/50 dark:text-slate-500">
        Última atualização: defina a data ao publicar a versão oficial.
      </p>
    </div>
  );
}

function LegalPrivacy() {
  return (
    <div className={prose}>
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-orange">
        Modelo — substitua pelo texto jurídico oficial
      </p>
      <p>
        Esta Política de Privacidade descreve como o <strong>Luz de Minas</strong>{" "}
        coleta, usa e protege seus dados, em conformidade com a LGPD (Lei nº
        13.709/2018).
      </p>
      <h3>1. Dados coletados</h3>
      <p>
        Podemos coletar dados fornecidos por você (ex.: contato em formulários) e
        dados de navegação (ex.: estatísticas de uso anonimizadas).
      </p>
      <h3>2. Uso dos dados</h3>
      <p>
        Utilizamos as informações para responder solicitações, melhorar a
        experiência e divulgar novidades do Circuito Luz de Minas.
      </p>
      <h3>3. Compartilhamento</h3>
      <p>
        Não vendemos seus dados. O compartilhamento ocorre apenas quando
        necessário à prestação do serviço ou por obrigação legal.
      </p>
      <h3>4. Seus direitos</h3>
      <p>
        Você pode solicitar acesso, correção ou exclusão dos seus dados pelos
        canais de contato informados nesta página.
      </p>
      <p className="text-xs text-ink/50 dark:text-slate-500">
        Última atualização: defina a data ao publicar a versão oficial.
      </p>
    </div>
  );
}
