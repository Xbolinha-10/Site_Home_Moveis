import { Link } from 'react-router-dom';

export function Legal() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Simples para retorno */}
      <nav className="p-8 border-b border-gray-100 flex justify-between items-center">
        <Link to="/" className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-black transition">
          ← Voltar para a Home
        </Link>
        <h1 className="text-sm font-serif tracking-[0.2em] uppercase">Documentos Legais</h1>
      </nav>

      <main className="max-w-3xl mx-auto py-20 px-8">
        
        {/* POLÍTICA DE PRIVACIDADE */}
        <section className="mb-20">
          <h2 className="text-3xl font-serif mb-8 text-black">Política de Privacidade</h2>
          
          <div className="space-y-6 text-gray-600 leading-relaxed text-sm">
            <p>
              A **Home Móveis** valoriza a sua privacidade. Esta política descreve como tratamos os seus dados em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>

            <div>
              <h3 className="font-bold text-black mb-2 uppercase text-xs tracking-widest">1. Coleta de Dados</h3>
              <p>
                Coletamos apenas informações fornecidas voluntariamente por você ao entrar em contato conosco via WhatsApp ou e-mail. Isso geralmente inclui seu nome, telefone e o conteúdo da sua mensagem.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-black mb-2 uppercase text-xs tracking-widest">2. Uso de Cookies</h3>
              <p>
                Utilizamos cookies técnicos essenciais para o funcionamento do site e ferramentas de análise básica para entender o volume de visitas. Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-black mb-2 uppercase text-xs tracking-widest">3. Finalidade do Tratamento</h3>
              <p>
                Seus dados são utilizados exclusivamente para responder às suas solicitações de orçamento, fornecer informações sobre os produtos do acervo e concretizar vendas.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-black mb-2 uppercase text-xs tracking-widest">4. Seus Direitos</h3>
              <p>
                Conforme a LGPD, você possui o direito de confirmar a existência de tratamento, acessar seus dados, corrigir informações incompletas ou solicitar a exclusão total de seus dados de nossa base a qualquer momento.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 mb-20" />

        {/* TERMOS DE USO */}
        <section>
          <h2 className="text-3xl font-serif mb-8 text-black">Termos de Uso</h2>
          
          <div className="space-y-6 text-gray-600 leading-relaxed text-sm">
            <p>
              Ao acessar o site da **Home Móveis**, você concorda em cumprir estes termos de serviço.
            </p>

            <div>
              <h3 className="font-bold text-black mb-2 uppercase text-xs tracking-widest">1. Disponibilidade do Acervo</h3>
              <p>
                As peças exibidas em nossa vitrine digital são únicas ou de estoque limitado. A disponibilidade deve ser sempre confirmada via atendimento direto no WhatsApp.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-black mb-2 uppercase text-xs tracking-widest">2. Propriedade Intelectual</h3>
              <p>
                Todo o conteúdo visual (fotografias e logos) é de propriedade exclusiva da Home Móveis ou de seus parceiros, sendo proibida a reprodução sem autorização prévia.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-black mb-2 uppercase text-xs tracking-widest">3. Contato</h3>
              <p>
                Para dúvidas sobre estes termos, entre em contato através de: <br />
                <strong>brenohenriqueshimada@gmail.com</strong>
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Minimalista */}
      <footer className="py-12 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em]">
          Home Móveis © 2026 - Transparência e Segurança
        </p>
      </footer>
    </div>
  );
}