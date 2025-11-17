const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// --- Rotas dos Alunos ---
const alunoRoutes = require('./src/routes/alunoRoutes');
app.use('/alunos', alunoRoutes);

// --- Rotas dos Ônibus ---
const onibusRoutes = require('./src/routes/onibusRoutes');
app.use('/onibus', onibusRoutes);

// --- Rotas de Autenticação ---
const authRoutes = require('./src/routes/authRoutes');
app.use('/auth', authRoutes);

// ===============================================
// NOVA ROTA: Rota de Embarque (Simulador)
// ===============================================
const embarqueRoutes = require('./src/routes/embarqueRoutes');
app.use('/embarque', embarqueRoutes);

// Rota principal
app.get('/', (req, res) => {
    res.send('Sistema SIGTU rodando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});