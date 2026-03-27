import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Terms() {
  return (
    <main className="flex-1">
      <SEOHead
        title="Termos & Condições — Angolauto"
        description="Consulte os termos e condições de utilização do website da Angolauto, representante oficial Suzuki, DFSK, Ineos e Scania em Angola."
      />
      <PageHero title="Termos &" highlight="Condições" subtitle="Condições gerais de utilização" image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80" />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Breadcrumbs items={[{ label: "Termos & Condições" }]} />

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">1. Identificação</h2>
            <p className="text-muted-foreground leading-relaxed">
              O presente website é propriedade da <strong>Angolauto, Lda.</strong>, com sede na Rua Major Kanhangulo, Luanda, Angola. A Angolauto é representante oficial das marcas Suzuki, DFSK, Ineos Grenadier e Scania no mercado angolano.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">2. Objecto</h2>
            <p className="text-muted-foreground leading-relaxed">
              Os presentes Termos & Condições regulam o acesso e a utilização do website angolauto.co.ao, incluindo todos os conteúdos, funcionalidades e serviços disponibilizados através da plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">3. Aceitação dos Termos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ao aceder e utilizar este website, o utilizador aceita integralmente os presentes Termos & Condições. Caso não concorde com alguma das disposições, deverá abster-se de utilizar o website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">4. Utilização do Website</h2>
            <p className="text-muted-foreground leading-relaxed">
              O utilizador compromete-se a utilizar o website de forma lícita, respeitando a legislação aplicável e os direitos de terceiros. É proibida qualquer utilização que possa danificar, sobrecarregar ou deteriorar o funcionamento do website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">5. Propriedade Intelectual</h2>
            <p className="text-muted-foreground leading-relaxed">
              Todos os conteúdos do website — incluindo textos, imagens, logótipos, marcas, gráficos e software — são propriedade da Angolauto ou dos respectivos titulares de direitos. A reprodução, distribuição ou modificação dos conteúdos sem autorização prévia é estritamente proibida.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">6. Preços e Disponibilidade</h2>
            <p className="text-muted-foreground leading-relaxed">
              Os preços e a disponibilidade dos veículos apresentados no website são meramente indicativos e podem sofrer alterações sem aviso prévio. A confirmação de preços e condições deve ser efectuada directamente com a equipa comercial da Angolauto.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">7. Limitação de Responsabilidade</h2>
            <p className="text-muted-foreground leading-relaxed">
              A Angolauto envidará os melhores esforços para manter as informações do website actualizadas e precisas. Contudo, não garante a exactidão, integridade ou actualização de todos os conteúdos, não sendo responsável por danos directos ou indirectos decorrentes da sua utilização.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">8. Links Externos</h2>
            <p className="text-muted-foreground leading-relaxed">
              O website pode conter links para sites de terceiros. A Angolauto não se responsabiliza pelo conteúdo, políticas de privacidade ou práticas desses websites externos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">9. Alterações aos Termos</h2>
            <p className="text-muted-foreground leading-relaxed">
              A Angolauto reserva-se o direito de alterar os presentes Termos & Condições a qualquer momento. As alterações entram em vigor a partir da data de publicação no website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">10. Lei Aplicável</h2>
            <p className="text-muted-foreground leading-relaxed">
              Os presentes Termos & Condições são regidos pela legislação da República de Angola. Quaisquer litígios serão submetidos à jurisdição dos tribunais competentes de Luanda.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-foreground">11. Contacto</h2>
            <p className="text-muted-foreground leading-relaxed">
              Para quaisquer questões relacionadas com os presentes Termos & Condições, contacte-nos através do email{" "}
              <a href="mailto:info@angolauto.co.ao" className="text-primary hover:underline">info@angolauto.co.ao</a>{" "}
              ou do telefone <a href="tel:+244923000000" className="text-primary hover:underline">+244 923 000 000</a>.
            </p>
          </section>

          <p className="text-sm text-muted-foreground pt-8 border-t border-border">
            Última actualização: Março de 2026
          </p>
        </div>
      </div>
    </main>
  );
}
