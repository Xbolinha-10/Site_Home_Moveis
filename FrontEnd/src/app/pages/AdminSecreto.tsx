import { useState, useEffect } from 'react';

export function AdminSecreto() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);

  // URL BASE DO SEU BACKEND NO RENDER (Ajuste se o nome do serviço for diferente)
  const BASE_URL = "https://backend-home-moveis.onrender.com";
  const API_URL = `${BASE_URL}/produtos`;

  // 1. Carregar produtos existentes
  const carregarProdutos = () => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error("Erro ao buscar produtos");
        return res.json();
      })
      .then(data => setProdutos(data))
      .catch(err => console.error("Erro na API:", err));
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  // 2. Salvar novo produto
  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !preco || !imagem) return alert("Preencha todos os campos!");

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('preco', preco);
    formData.append('imagem', imagem);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setNome(''); 
        setPreco(''); 
        setImagem(null);
        carregarProdutos(); // Atualiza a lista após salvar
        alert("Produto cadastrado com sucesso!");
      } else {
        alert("Erro ao salvar no servidor.");
      }
    } catch (err) {
      console.error("Erro no envio:", err);
      alert("Não foi possível conectar ao servidor.");
    }
  };

  // 3. Deletar produto
  const handleDeletar = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este móvel?")) {
      try {
        const response = await fetch(`${API_URL}/${id}`, { 
          method: 'DELETE' 
        });

        if (response.ok) {
          carregarProdutos();
        } else {
          alert("Erro ao excluir o produto.");
        }
      } catch (err) {
        console.error("Erro ao deletar:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif mb-8 border-b pb-4 text-black">Gerenciador de Acervo</h1>

        {/* FORMULÁRIO DE CADASTRO */}
        <form onSubmit={handleSalvar} className="bg-white p-6 rounded-lg shadow-md mb-12 space-y-4 border border-gray-100">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Novo Móvel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" placeholder="Nome do Móvel" value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="border p-3 rounded focus:ring-2 focus:ring-black outline-none"
            />
            <input 
              type="number" placeholder="Preço (Ex: 1500)" value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="border p-3 rounded focus:ring-2 focus:ring-black outline-none"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Foto do Produto</label>
            <input 
              type="file" 
              onChange={(e) => setImagem(e.target.files?.[0] || null)}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
            />
          </div>
          <button type="submit" className="w-full md:w-auto bg-black text-white px-10 py-4 rounded hover:bg-gray-800 transition shadow-lg font-bold uppercase tracking-widest text-xs">
            Salvar no Site
          </button>
        </form>

        {/* LISTA DE EXCLUSÃO */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100 uppercase text-[10px] tracking-widest text-gray-400">
              <tr>
                <th className="p-4">Imagem</th>
                <th className="p-4">Nome</th>
                <th className="p-4">Preço</th>
                <th className="p-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {produtos.map((p: any) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <img 
                      src={`${BASE_URL}${p.imagem}`} 
                      alt={p.nome}
                      className="w-16 h-16 object-cover rounded shadow-sm border border-gray-200" 
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-900">{p.nome}</td>
                  <td className="p-4 text-gray-600 font-mono">R$ {p.preco}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDeletar(p.id)}
                      className="text-red-400 hover:text-red-600 font-bold text-xs uppercase tracking-tighter transition"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
              {produtos.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-gray-400 italic">
                    Nenhum móvel cadastrado no momento.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}