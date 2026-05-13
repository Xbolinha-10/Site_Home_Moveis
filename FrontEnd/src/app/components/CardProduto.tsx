import React from 'react';
interface CardProdutoProps {
  nome: string;
  preco: string;
  imagem: string;
  onComprar: () => void;
}

export function CardProduto({ nome, preco, imagem, onComprar }: CardProdutoProps) {
  return (
    <div className="group bg-white flex flex-col h-full border border-gray-100 p-4 hover:shadow-2xl transition-all duration-300 rounded-sm">
      
      {/* Container da Imagem com efeito de zoom no hover */}
      <div className="aspect-3/4 overflow-hidden bg-gray-100 mb-6 relative">
        <img 
  src={`https://backend-home-moveis.onrender.com${imagem}`}
alt={nome}
className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
/>
        {/* Badge discreta de Disponível */}
        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
           <span className="text-[10px] uppercase tracking-widest font-bold text-black">Disponível</span>
        </div>
      </div>

      {/* Informações do Produto */}
      <div className="grow flex flex-col justify-between">
        <div>
          <h4 className="text-xl font-serif text-gray-800 mb-2">{nome}</h4>
          <p className="text-2xl font-light text-black mb-6">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(preco))}
          </p>
        </div>
        
        {/* Botão de WhatsApp Estilizado */}
        <button 
          onClick={onComprar}
          className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-md flex items-center justify-center gap-3 transition-colors duration-300 shadow-md transform active:scale-95"
        >
          <span className="font-bold uppercase text-[10px] tracking-[0.2em]">Negociar pelo WhatsApp</span>
        </button>
      </div>
    </div>
  );
}