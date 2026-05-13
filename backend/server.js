const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

// Configurações Iniciais
const cors = require('cors');
app.use(cors({
  origin: '*', // Permite que qualquer porta acesse os dados
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
// Torna a pasta de uploads pública para o navegador acessar as fotos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 1. Garantir que a pasta 'uploads' e o arquivo 'produtos.json' existam
if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');
if (!fs.existsSync('produtos.json')) fs.writeFileSync('produtos.json', JSON.stringify([]));

// 2. Configuração do Multer (armazenamento de imagem)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// 3. Rota para Listar Produtos
app.get('/produtos', (req, res) => {
  const data = fs.readFileSync('produtos.json', 'utf8');
  res.json(JSON.parse(data));
});

// 4. Rota para Cadastrar Produto
app.post('/produtos', upload.single('imagem'), (req, res) => {
  try {
    const { nome, preco } = req.body;
    const data = fs.readFileSync('produtos.json', 'utf8');
    const produtos = JSON.parse(data);

    const novoProduto = {
      id: Date.now(),
      nome,
      preco,
      imagem: `/uploads/${req.file.filename}`
    };

    produtos.push(novoProduto);
    fs.writeFileSync('produtos.json', JSON.stringify(produtos, null, 2));

    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar produto" });
  }
});

// 5. Rota para Deletar Produto
app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync('produtos.json', 'utf8');
  let produtos = JSON.parse(data);
  
  produtos = produtos.filter(p => p.id !== parseInt(id));
  fs.writeFileSync('produtos.json', JSON.stringify(produtos, null, 2));
  
  res.json({ message: "Produto removido" });
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));