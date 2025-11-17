// Importa o modelo (a lista de alunos)
const alunos = require('../models/alunoModel');

const alunoController = {
    // Função para LISTAR todos os alunos
    listarAlunos: (request, response) => {
        // Retorna a lista em formato JSON
        response.json(alunos);
    },

    // Função para CRIAR um novo aluno
    criarAluno: (request, response) => {
        const { nome, curso, matricula } = request.body;

        // Cria um novo objeto aluno
        const novoAluno = {
            id: alunos.length + 1, // Gera um ID simples
            nome: nome,
            curso: curso,
            matricula: matricula
        };

        // Adiciona na lista
        alunos.push(novoAluno);

        // Responde que deu certo (Status 201 = Criado)
        response.status(201).json({ message: "Aluno criado com sucesso!", aluno: novoAluno });
    }
};

module.exports = alunoController;