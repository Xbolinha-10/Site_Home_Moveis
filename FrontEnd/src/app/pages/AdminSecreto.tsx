import { useState, useEffect } from 'react';

export function AdminSecreto() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);


  // 1. Carregar produtos existentes
  const carregarProdutos = () => {
    fetch('http://localhost:3001/produtos')
      .then(res => res.json())
      .then(data => setProdutos(data));
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

    await fetch('http://localhost:3001/produtos', {
      method: 'POST',
      body: formData
    });

    setNome(''); setPreco(''); setImagem(null);
    carregarProdutos(); // Atualiza a lista
    alert("Produto cadastrado com sucesso!");
  };

  // 3. Deletar produto
  const handleDeletar = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este móvel?")) {
      await fetch(`http://localhost:3001/produtos/${id}`, { method: 'DELETE' });
      carregarProdutos();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif mb-8 border-b pb-4">Gerenciador de Acervo</h1>

        {/* FORMULÁRIO DE CADASTRO */}
        <form onSubmit={handleSalvar} className="bg-white p-6 rounded-lg shadow-md mb-12 space-y-4">
          <h2 className="text-xl font-bold mb-4">Novo Móvel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" placeholder="Nome do Móvel" value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="border p-3 rounded"
            />
            <input 
              type="number" placeholder="Preço (Ex: 1500)" value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="border p-3 rounded"
            />
          </div>
          <input 
            type="file" 
            onChange={(e) => setImagem(e.target.files?.[0] || null)}
            className="w-full"
          />
          <button className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition">
            Salvar no Site
          </button>
        </form>

        {/* LISTA DE EXCLUSÃO */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 uppercase text-xs">
              <tr>
                <th className="p-4">Imagem</th>
                <th className="p-4">Nome</th>
                <th className="p-4">Preço</th>
                <th className="p-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((p: any) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <img src={`http://localhost:3001${p.imagem}`} className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td className="p-4 font-medium">{p.nome}</td>
                  <td className="p-4">R$ {p.preco}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDeletar(p.id)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}