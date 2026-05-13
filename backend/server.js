const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
// O Render define a porta automaticamente através da variável de ambiente PORT
const port = process.env.PORT || 3001;

// --- Configurações Iniciais ---
app.use(cors()); // Permite acesso de qualquer origem (Netlify, localhost, etc)
app.use(express.json());

// Caminhos absolutos para evitar erros no servidor Linux
const uploadsDir = path.join(__dirname, 'uploads');
const jsonPath = path.join(__dirname, 'produtos.json');

// Torna a pasta de uploads pública
app.use('/uploads', express.static(uploadsDir));

// --- Garantir existência de arquivos/pastas ---
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('✅ Pasta uploads criada');
}
if (!fs.existsSync(jsonPath)) {
    fs.writeFileSync(jsonPath, JSON.stringify([]));
    console.log('✅ Arquivo produtos.json criado');
}

// --- Configuração do Multer (armazenamento) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => {
        // Remove espaços do nome do arquivo original para evitar erros na URL
        const uniqueName = Date.now() + '-' + file.originalname.replace(/\s/g, '_');
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

// --- Rotas ---

// 1. Listar Produtos
app.get('/produtos', (req, res) => {
    try {
        const data = fs.readFileSync(jsonPath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: "Erro ao ler produtos" });
    }
});

// 2. Cadastrar Produto
app.post('/produtos', upload.single('imagem'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "A imagem é obrigatória" });
        }

        const { nome, preco } = req.body;
        const data = fs.readFileSync(jsonPath, 'utf8');
        const produtos = JSON.parse(data);

        const novoProduto = {
            id: Date.now(),
            nome,
            preco,
            // O caminho da imagem deve começar com /uploads para o frontend entender
            imagem: `/uploads/${req.file.filename}`
        };

        produtos.push(novoProduto);
        fs.writeFileSync(jsonPath, JSON.stringify(produtos, null, 2));

        console.log(`✨ Produto cadastrado: ${nome}`);
        res.status(201).json(novoProduto);
    } catch (error) {
        console.error("Erro no POST:", error);
        res.status(500).json({ error: "Erro ao salvar produto" });
    }
});

// 3. Deletar Produto
app.delete('/produtos/:id', (req, res) => {
    try {
        const { id } = req.params;
        const data = fs.readFileSync(jsonPath, 'utf8');
        let produtos = JSON.parse(data);
        
        // Encontra o produto para remover o arquivo físico da imagem (opcional, mas recomendado)
        const produtoParaRemover = produtos.find(p => p.id === parseInt(id));
        if (produtoParaRemover) {
            const imagePath = path.join(__dirname, produtoParaRemover.imagem);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        produtos = produtos.filter(p => p.id !== parseInt(id));
        fs.writeFileSync(jsonPath, JSON.stringify(produtos, null, 2));
        
        res.json({ message: "Produto removido com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar produto" });
    }
});

// Rota raiz apenas para teste de saúde (Health Check)
app.get('/', (req, res) => {
    res.send('Servidor Home Móveis Rodando Online! 🚀');
});

app.listen(port, () => {
    console.log(`🚀 Servidor online na porta ${port}`);
});