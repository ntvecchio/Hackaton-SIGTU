const express = require('express');
const app = express();
const PORT = 3000;

// IMPORTANTE: Isso permite que o servidor entenda dados enviados em JSON
app.use(express.json());

// Importa as rotas dos alunos
// O caminho deve ser './src/routes/alunoRoutes'
const alunoRoutes = require('./src/routes/alunoRoutes');

// Usa as rotas. Tudo que estiver em alunoRoutes vai começar com /alunos
app.use('/alunos', alunoRoutes);

// Rota principal (teste)
app.get('/', (req, res) => {
    res.send('Sistema SIGTU rodando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});