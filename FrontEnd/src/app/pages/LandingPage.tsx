import { useState, useEffect } from 'react';
import { CardProduto } from '@/app/components/CardProduto';

export function LandingPage() {
  const [produtos, setProdutos] = useState([]);

  // Função para buscar produtos do servidor
  const buscarProdutos = async () => {
  try {
    // O ?t=${Date.now()} obriga o navegador a pegar a versão MAIS NOVA do banco
    const response = await fetch(`http://localhost:3001/produtos?t=${Date.now()}`);
    const data = await response.json();
    console.log("Dados do Servidor:", data); // Isso vai aparecer no F12
    setProdutos(data);
  } catch (error) {
    console.error("Erro ao carregar:", error);
  }
};
  useEffect(() => {
    buscarProdutos();
  }, []);

  const abrirWhatsapp = (nomeProduto: string) => {
    const telefone = "5561999117694"; // Substitua pelo seu número real
    const mensagem = encodeURIComponent(`Olá! Tenho interesse no produto: ${nomeProduto}`);
    window.open(`https://wa.me/${telefone}?text=${mensagem}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* SEÇÃO HERO - Design Minimalista */}
      <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80" 
            className="h-full w-full object-cover opacity-50"
            alt="Interior Designer"
          />
        </div>

        <nav className="absolute top-0 w-full p-8 flex justify-center z-20">
          <h1 className="text-white text-2xl font-serif tracking-[0.3em] uppercase">Home Móveis</h1>
        </nav>

        <div className="relative z-10 text-center px-4">
          <h2 className="text-white text-5xl md:text-7xl font-serif mb-6 leading-tight">
            Design que define <br/> sua essência
          </h2>
          <button 
            onClick={() => document.getElementById('vitrine')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-8 border border-white text-white px-10 py-4 hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-[0.2em] text-sm font-bold"
          >
            Ver Produtos Disponíveis
          </button>
        </div>
      </section>

      {/* VITRINE DE PRODUTOS */}
      <section id="vitrine" className="py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gray-400 uppercase tracking-widest text-xs">Modelos Exclusivos</span>
          <h3 className="text-4xl font-serif text-black mt-2">Móveis de Alto Padrão</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {produtos.length > 0 ? (
            produtos.map((p: any) => (
              <CardProduto 
                key={p.id}
                nome={p.nome}
                preco={p.preco}
                imagem={p.imagem}
                onComprar={() => abrirWhatsapp(p.nome)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-lg">
              <p className="text-gray-400 italic font-serif">Aguardando novas peças em nosso acervo...</p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
     <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-100">
  <div className="max-w-7xl mx-auto px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
      
      {/* Coluna 1: Branding */}
      <div className="space-y-4">
        <h4 className="text-xl font-serif tracking-[0.2em] uppercase text-black">Home Móveis</h4>
        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
          Curadoria exclusiva de móveis de excelência, transformando ambientes com sofisticação e design atemporal.
        </p>
      </div>

      {/* Coluna 2: Contato Rápido */}
      <div className="space-y-4">
        <h5 className="text-xs uppercase tracking-[0.2em] font-bold text-black">Contato</h5>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-gray-600 hover:text-black transition-colors">
            <span className="text-lg">📧</span>
            <a href="mailto:brenohenriqueshimada@gmail.com" className="text-sm">brenohenriqueshimada@gmail.com</a>
          </li>
          <li className="flex items-center gap-3 text-gray-600 hover:text-black transition-colors">
            <span className="text-lg">📞</span>
            <a href="tel:+5561999117694" className="text-sm">(61) 99911-7694</a>
          </li>
        </ul>
      </div>
      {/* Coluna 3: Footer Final */}
      <div className="pt-8 border-t border-gray-200 text-center">
      <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em]">
        Venda de Móveis em Brasília-DF<br></br>© 2026 - Todos os direitos reservados
      </p>
       <div className="flex justify-center gap-6 mt-4 text-[9px] text-gray-400 uppercase tracking-widest">
      <a href="/politica-privacidade" className="hover:text-black transition">Política de Privacidade</a>
      <a href="/termos-uso" className="hover:text-black transition">Termos de Uso</a>
      </div>
      </div>
    </div>
  </div>
</footer> 

    </div>
  );
}