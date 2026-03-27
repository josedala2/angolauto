import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Privacy() {
  return (
    <main className="flex-1">
      <SEOHead
        title="Política de Privacidade — Angolauto"
        description="Consulte a política de privacidade e protecção de dados pessoais do website da Angolauto."
      />
      <PageHero title="Política de Privacidade" subtitle="Protecção dos seus dados pessoais" />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Breadcrumbs items={[{ label: "Política de Privacidade" }]} />

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">1. Responsável pelo Tratamento</h2>
            <p className="text-muted-foreground leading-relaxed">
              A <strong>Angolauto, Lda.</strong>, com sede na Rua Major Kanhangulo, Luanda, Angola, é a entidade responsável pelo tratamento dos dados pessoais recolhidos através deste website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">2. Dados Recolhidos</h2>
            <p className="text-muted-foreground leading-relaxed">
              No âmbito da utilização do website, podemos recolher os seguintes dados pessoais:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Nome completo</li>
              <li>Endereço de email</li>
              <li>Número de telefone</li>
              <li>Dados relativos ao veículo de interesse</li>
              <li>Informações fornecidas em formulários de contacto, test drive, oficina ou candidatura</li>
              <li>Dados de navegação (cookies, endereço IP, tipo de browser)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">3. Finalidades do Tratamento</h2>
            <p className="text-muted-foreground leading-relaxed">
              Os dados pessoais são tratados para as seguintes finalidades:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Resposta a pedidos de informação e contacto</li>
              <li>Agendamento de test drives e serviços de oficina</li>
              <li>Processamento de propostas comerciais</li>
              <li>Envio de newsletters e comunicações comerciais (com consentimento)</li>
              <li>Gestão de candidaturas a emprego</li>
              <li>Melhoria da experiência de navegação e funcionamento do website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">4. Base Legal</h2>
            <p className="text-muted-foreground leading-relaxed">
              O tratamento dos dados pessoais é realizado com base no consentimento do titular, na execução de um contrato ou diligências pré-contratuais, e no interesse legítimo da Angolauto em prestar os seus serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">5. Conservação dos Dados</h2>
            <p className="text-muted-foreground leading-relaxed">
              Os dados pessoais são conservados pelo período necessário à prossecução das finalidades para que foram recolhidos, ou pelo prazo legalmente exigido. Os dados de candidaturas são conservados por um período máximo de 12 meses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">6. Partilha de Dados</h2>
            <p className="text-muted-foreground leading-relaxed">
              A Angolauto não partilha dados pessoais com terceiros, excepto quando necessário para a prestação dos serviços solicitados (ex: fabricantes de veículos para garantias), por obrigação legal, ou com o consentimento expresso do titular.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">7. Direitos do Titular</h2>
            <p className="text-muted-foreground leading-relaxed">
              O titular dos dados tem direito a:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Aceder aos seus dados pessoais</li>
              <li>Solicitar a rectificação de dados inexactos</li>
              <li>Solicitar a eliminação dos seus dados</li>
              <li>Opor-se ao tratamento dos seus dados</li>
              <li>Solicitar a portabilidade dos dados</li>
              <li>Retirar o consentimento a qualquer momento</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Para exercer os seus direitos, contacte-nos através do email{" "}
              <a href="mailto:privacidade@angolauto.co.ao" className="text-primary hover:underline">privacidade@angolauto.co.ao</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">8. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Este website utiliza cookies para melhorar a experiência de navegação. Os cookies são pequenos ficheiros de texto armazenados no seu dispositivo. Pode gerir as suas preferências de cookies através das definições do seu browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">9. Segurança</h2>
            <p className="text-muted-foreground leading-relaxed">
              A Angolauto adopta medidas técnicas e organizativas adequadas para proteger os dados pessoais contra acessos não autorizados, perda, destruição ou alteração acidental.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">10. Alterações à Política</h2>
            <p className="text-muted-foreground leading-relaxed">
              A Angolauto reserva-se o direito de alterar a presente Política de Privacidade. As alterações serão publicadas nesta página com indicação da data de actualização.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">11. Contacto</h2>
            <p className="text-muted-foreground leading-relaxed">
              Para questões sobre privacidade e protecção de dados, contacte-nos:
            </p>
            <ul className="list-none pl-0 text-muted-foreground space-y-1 mt-2">
              <li>📧 <a href="mailto:privacidade@angolauto.co.ao" className="text-primary hover:underline">privacidade@angolauto.co.ao</a></li>
              <li>📞 <a href="tel:+244923000000" className="text-primary hover:underline">+244 923 000 000</a></li>
              <li>📍 Rua Major Kanhangulo, Luanda, Angola</li>
            </ul>
          </section>

          <p className="text-sm text-muted-foreground pt-8 border-t border-border">
            Última actualização: Março de 2026
          </p>
        </div>
      </div>
    </main>
  );
}
