"use client";

import { useState, type ReactNode } from "react";
import Modal from "./Modal";

type LegalTab = "terms" | "privacy";

const TABS: { id: LegalTab; label: string }[] = [
  { id: "terms", label: "Termos de Uso" },
  { id: "privacy", label: "Política de Privacidade" },
];

/**
 * Modal institucional com duas abas: Termos de Uso e Política de Privacidade.
 * A aba inicial vem de `initialTab` (o rodapé abre na aba correspondente ao
 * link clicado). Como o Modal só monta os filhos quando aberto, o estado da
 * aba é reinicializado a cada abertura.
 */
export default function LegalModal({
  open,
  onClose,
  initialTab,
}: {
  open: boolean;
  onClose: () => void;
  initialTab: LegalTab;
}) {
  return (
    <Modal open={open} onClose={onClose} title="Informações legais" size="lg">
      <LegalTabs initialTab={initialTab} />
    </Modal>
  );
}

function LegalTabs({ initialTab }: { initialTab: LegalTab }) {
  const [tab, setTab] = useState<LegalTab>(initialTab);

  // Navegação por teclado no padrão ARIA tabs (← / →).
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const i = TABS.findIndex((t) => t.id === tab);
    const next = e.key === "ArrowRight" ? (i + 1) % TABS.length : (i - 1 + TABS.length) % TABS.length;
    setTab(TABS[next].id);
  }

  return (
    <div>
      {/* Abas fixas no topo enquanto o conteúdo rola */}
      <div className="sticky top-0 z-10 -mx-6 -mt-5 mb-5 border-b border-black/5 bg-white/95 px-6 pb-0 pt-4 backdrop-blur dark:border-white/10 dark:bg-night-card/95">
        <div
          role="tablist"
          aria-label="Documentos legais"
          onKeyDown={onKeyDown}
          className="flex gap-1"
        >
          {TABS.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                id={`tab-${t.id}`}
                role="tab"
                type="button"
                aria-selected={active}
                aria-controls={`panel-${t.id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => setTab(t.id)}
                className={`-mb-px border-b-2 px-3 py-2.5 text-sm font-bold transition ${
                  active
                    ? "border-brand-orange text-brand-orange"
                    : "border-transparent text-ink/55 hover:text-ink dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="panel-terms"
        role="tabpanel"
        aria-labelledby="tab-terms"
        hidden={tab !== "terms"}
      >
        <LegalTerms />
      </div>
      <div
        id="panel-privacy"
        role="tabpanel"
        aria-labelledby="tab-privacy"
        hidden={tab !== "privacy"}
      >
        <LegalPrivacy />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Estilos de texto compartilhados                                     */
/* ------------------------------------------------------------------ */

const prose =
  "space-y-4 text-sm leading-relaxed text-ink/80 dark:text-slate-300 [&_h3]:mt-5 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-ink dark:[&_h3]:text-white [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_strong]:text-ink dark:[&_strong]:text-white";

function Atualizado() {
  return (
    <span className="inline-block rounded-full bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green dark:bg-brand-leaf/10 dark:text-brand-leaf">
      Última atualização: julho de 2026
    </span>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <h3>{title}</h3>
      {children}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Termos de Uso                                                       */
/* ------------------------------------------------------------------ */

function LegalTerms() {
  return (
    <div className={prose}>
      <Atualizado />
      <p>
        Estes Termos de Uso regulam o acesso e a utilização da landing page e do
        aplicativo <strong>Luz de Minas</strong> — plataforma de turismo
        histórico e cultural do Circuito Luz de Minas, na Zona da Mata mineira.
        Ao criar uma conta ou utilizar os nossos serviços, você declara que leu e
        concorda com estas condições.
      </p>

      <Section title="1. O serviço">
        <p>
          O Luz de Minas oferece rotas turísticas guiadas, áudio-guias, coleta de
          marcos por QR Code, conquistas e medalhas, percursos de caminhada e um
          Guia Local com serviços e parceiros das cidades do circuito. Alguns
          recursos dependem de permissões do dispositivo (localização, câmera e,
          se você autorizar, dados de atividade física).
        </p>
      </Section>

      <Section title="2. Cadastro e conta">
        <p>
          Para usar os recursos personalizados é necessário criar uma conta com
          informações verdadeiras e mantê-las atualizadas. Você é responsável por
          preservar a confidencialidade das suas credenciais e por toda atividade
          realizada na sua conta. O serviço destina-se a maiores de 13 anos;
          menores devem utilizá-lo com supervisão dos responsáveis.
        </p>
      </Section>

      <Section title="3. Uso adequado">
        <p>Ao utilizar o Luz de Minas, você concorda em não:</p>
        <ul>
          <li>publicar conteúdo ilícito, ofensivo, falso ou que viole direitos de terceiros;</li>
          <li>burlar a validação de visitas, conquistas ou qualquer mecânica do aplicativo;</li>
          <li>tentar acessar sistemas, dados ou contas de terceiros sem autorização;</li>
          <li>utilizar o serviço para fins comerciais não autorizados ou envio de spam.</li>
        </ul>
      </Section>

      <Section title="4. Conteúdo do usuário">
        <p>
          Avaliações, fotos e comentários que você publica continuam sendo seus.
          Ao publicá-los, você concede ao Luz de Minas uma licença não exclusiva e
          gratuita para exibi-los dentro da plataforma e na divulgação do
          circuito. Você é o único responsável pelo conteúdo que compartilha e
          garante ter os direitos necessários para tanto.
        </p>
      </Section>

      <Section title="5. Conquistas e gamificação">
        <p>
          Medalhas, pontos e conquistas têm caráter simbólico e recreativo, sem
          valor monetário, e não podem ser trocados por dinheiro. Podemos ajustar
          as regras da gamificação para preservar a integridade da experiência.
        </p>
      </Section>

      <Section title="6. Parceiros e ofertas">
        <p>
          Cupons, descontos e serviços exibidos no Guia Local são oferecidos por
          estabelecimentos parceiros, responsáveis por suas próprias condições,
          preços e disponibilidade. O Luz de Minas apenas conecta você a esses
          parceiros e não é parte das relações de consumo firmadas com eles.
        </p>
      </Section>

      <Section title="7. Propriedade intelectual">
        <p>
          A marca, o logotipo, os textos, o design e os demais materiais do Luz de
          Minas pertencem à iniciativa e aos seus parceiros, sendo vedada a
          reprodução ou uso sem autorização prévia.
        </p>
      </Section>

      <Section title="8. Limitação de responsabilidade">
        <p>
          Empenhamo-nos para manter as informações corretas e o serviço
          disponível, mas não garantimos ausência de erros ou funcionamento
          ininterrupto. As rotas e sugestões têm caráter informativo; a decisão de
          se deslocar e visitar cada local é sua, cabendo atenção às condições de
          segurança, trânsito e sinalização.
        </p>
      </Section>

      <Section title="9. Privacidade">
        <p>
          O tratamento dos seus dados pessoais está descrito na aba{" "}
          <strong>Política de Privacidade</strong>, que integra estes Termos.
        </p>
      </Section>

      <Section title="10. Alterações e contato">
        <p>
          Estes Termos podem ser atualizados a qualquer momento; a versão vigente
          estará sempre disponível nesta página. Dúvidas podem ser enviadas para{" "}
          <a
            href="mailto:hdlgithub@gmail.com"
            className="font-semibold text-brand-green underline dark:text-brand-leaf"
          >
            hdlgithub@gmail.com
          </a>
          . Aplica-se a legislação brasileira, elegendo-se o foro da comarca de
          Cataguases/MG para dirimir eventuais controvérsias.
        </p>
      </Section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Política de Privacidade                                             */
/* (reproduz o conteúdo publicado em hdldev123.github.io)              */
/* ------------------------------------------------------------------ */

function LegalPrivacy() {
  return (
    <div className={prose}>
      <Atualizado />
      <p>
        Esta política descreve como o aplicativo <strong>Luz de Minas</strong>{" "}
        trata os seus dados pessoais, em conformidade com a Lei nº 13.709/2018
        (Lei Geral de Proteção de Dados — LGPD).
      </p>

      <Section title="1. Dados que coletamos">
        <ul>
          <li>
            <strong>Cadastro:</strong> nome, e-mail e, opcionalmente, telefone e
            foto de perfil.
          </li>
          <li>
            <strong>CEP:</strong> informado no cadastro para classificar o seu
            perfil como morador local ou turista. Não armazenamos o CEP —
            guardamos apenas o resultado dessa classificação e o município
            correspondente.
          </li>
          <li>
            <strong>Localização (GPS):</strong> usada para validar a leitura de QR
            Codes nos atrativos turísticos e centralizar o mapa.
          </li>
          <li>
            <strong>Dados de saúde (passos e calorias):</strong> coletados apenas
            se você autorizar a integração com o Health Connect.
          </li>
          <li>
            <strong>Conteúdo que você publica:</strong> avaliações e fotos da
            comunidade.
          </li>
        </ul>
      </Section>

      <Section title="2. Finalidade e base legal">
        <p>
          Tratamos os seus dados para criar e gerenciar a sua conta, registrar
          visitas a atrativos turísticos, conceder conquistas, adaptar o conteúdo
          à sua região (morador local ou turista) e exibir parceiros próximos.
          Também produzimos estatísticas agregadas e anônimas (por exemplo,
          quantos moradores e turistas visitaram cada atrativo) para apoiar
          políticas de turismo — sem identificar você individualmente. A base
          legal é o seu consentimento e a execução do serviço. Dados sensíveis de
          saúde são tratados apenas com consentimento específico.
        </p>
      </Section>

      <Section title="3. Compartilhamento e transferência internacional">
        <p>
          Utilizamos o Supabase (banco de dados e autenticação) e o Google Maps,
          cujos servidores podem estar fora do Brasil — havendo, portanto,
          transferência internacional de dados. Para identificar o município a
          partir do CEP, consultamos o serviço ViaCEP. Não vendemos os seus dados.
          O WhatsApp e os aplicativos de mapa são abertos por você, sob a sua
          iniciativa.
        </p>
      </Section>

      <Section title="4. Retenção">
        <p>
          Mantemos os seus dados enquanto a sua conta existir. Logs técnicos de
          diagnóstico são retidos por até 7 dias.
        </p>
      </Section>

      <Section title="5. Seus direitos">
        <p>
          Você pode acessar, corrigir e excluir os seus dados. A exclusão completa
          da conta e dos dados está disponível no aplicativo em{" "}
          <strong>Configurações → Excluir Conta</strong>. Para outras
          solicitações, use o contato abaixo.
        </p>
      </Section>

      <Section title="6. Contato do Encarregado (DPO)">
        <p>
          Dúvidas sobre privacidade ou solicitações relativas aos seus dados podem
          ser enviadas para:{" "}
          <a
            href="mailto:hdlgithub@gmail.com"
            className="font-semibold text-brand-green underline dark:text-brand-leaf"
          >
            hdlgithub@gmail.com
          </a>
          .
        </p>
      </Section>

      <p className="text-xs text-ink/50 dark:text-slate-500">
        Luz de Minas — Caminhos da Zona da Mata Mineira. Uma iniciativa do
        Instituto Energisa e parceiros.
      </p>
    </div>
  );
}
