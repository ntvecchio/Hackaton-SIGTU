const alunos = require('../models/alunoModel');

const alunoController = {
    // Lista todos
    listarAlunos: (request, response) => {
        response.json(alunos);
    },

    // Cria um novo
    criarAluno: (request, response) => {
        const { nome, curso, matricula } = request.body;
        const novoAluno = {
            id: alunos.length + 1,
            nome: nome,
            curso: curso,
            matricula: matricula
        };
        alunos.push(novoAluno);
        response.status(201).json({ message: "Aluno criado!", aluno: novoAluno });
    },

    // Atualiza um aluno
    atualizarAluno: (request, response) => {
        const id = parseInt(request.params.id);
        const { nome, curso, matricula } = request.body;
        const alunoEncontrado = alunos.find(aluno => aluno.id === id);

        if (!alunoEncontrado) {
            return response.status(404).json({ message: "Aluno não encontrado." });
        }

        if (nome) alunoEncontrado.nome = nome;
        if (curso) alunoEncontrado.curso = curso;
        if (matricula) alunoEncontrado.matricula = matricula;

        response.status(200).json(alunoEncontrado);
    },

    // ===============================================
    // NOVA FUNÇÃO: DELETAR UM ALUNO
    // ===============================================
    deletarAluno: (request, response) => {
        // 1. Pegar o ID que veio na URL (ex: /alunos/3)
        const id = parseInt(request.params.id);

        // 2. Encontrar a *posição* (index) do aluno na lista
        const index = alunos.findIndex(aluno => aluno.id === id);

        // 3. Se o aluno NÃO for encontrado (findIndex retorna -1), mande um erro 404
        if (index === -1) {
            return response.status(404).json({ message: "Aluno não encontrado." });
        }

        // 4. Se foi encontrado, remove 1 item da lista naquela posição (index)
        alunos.splice(index, 1);

        // 5. Responde com uma mensagem de sucesso
        // (204 No Content é comum, mas 200 com mensagem é mais claro para nós)
        response.status(200).json({ message: "Aluno deletado com sucesso." });
    }
};

module.exports = alunoController;