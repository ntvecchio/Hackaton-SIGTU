// Importa o Express (a ferramenta que acabamos de instalar)
const express = require('express');

// Cria o aplicativo
const app = express();

// Define uma porta para o "site" rodar (como se fosse o número da casa)
const PORT = 3000;

// Cria uma rota simples para teste
// Quando alguém acessar a raiz (/) vai ver essa mensagem
app.get('/', (request, response) => {
    response.send('Sistema de Transporte Universitário (SIGTU) está ON!');
});

// Manda o servidor ficar ouvindo na porta 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando no endereço: http://localhost:${PORT}`);
});