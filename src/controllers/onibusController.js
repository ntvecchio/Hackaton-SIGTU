// Agora o controller de ônibus precisa "enxergar" os dois models
const onibus = require('../models/onibusModel');
const alunos = require('../models/alunoModel'); // IMPORTANTE

const onibusController = {
    // ... (as 4 funções do CRUD - listar, criar, atualizar, deletar - continuam aqui em cima)
    // C-R-U-D: READ (Listar todos)
    listarOnibus: (request, response) => {
        response.json(onibus);
    },

    // C-R-U-D: CREATE (Criar um)
    criarOnibus: (request, response) => {
        const { placa, modelo, capacidade } = request.body;
        const novoOnibus = {
            id: onibus.length + 1,
            placa: placa,
            modelo: modelo,
            capacidade: capacidade,
            alunosMatriculados: [] // Não esquecer
        };
        onibus.push(novoOnibus);
        response.status(201).json({ message: "Ônibus cadastrado!", onibus: novoOnibus });
    },

    // C-R-U-D: UPDATE (Atualizar um)
    atualizarOnibus: (request, response) => {
        const id = parseInt(request.params.id);
        const { placa, modelo, capacidade } = request.body;
        const onibusEncontrado = onibus.find(o => o.id === id);

        if (!onibusEncontrado) {
            return response.status(404).json({ message: "Ônibus não encontrado." });
        }

        if (placa) onibusEncontrado.placa = placa;
        if (modelo) onibusEncontrado.modelo = modelo;
        if (capacidade) onibusEncontrado.capacidade = capacidade;

        response.status(200).json(onibusEncontrado);
    },

    // C-R-U-D: DELETE (Deletar um)
    deletarOnibus: (request, response) => {
        const id = parseInt(request.params.id);
        const index = onibus.findIndex(o => o.id === id);

        if (index === -1) {
            return response.status(404).json({ message: "Ônibus não encontrado." });
        }

        onibus.splice(index, 1);
        response.status(200).json({ message: "Ônibus deletado com sucesso." });
    },

    // ===============================================
    // NOVA FUNÇÃO: Matricular Aluno no Ônibus
    // ===============================================
    matricularAluno: (request, response) => {
        // 1. Pega os IDs da URL
        const idOnibus = parseInt(request.params.idOnibus);
        const idAluno = parseInt(request.params.idAluno);

        // 2. Encontra os "objetos" no banco de dados
        const onibusEncontrado = onibus.find(o => o.id === idOnibus);
        const alunoEncontrado = alunos.find(a => a.id === idAluno);

        // 3. Validações de erro
        if (!onibusEncontrado) {
            return response.status(404).json({ message: "Ônibus não encontrado." });
        }
        if (!alunoEncontrado) {
            return response.status(404).json({ message: "Aluno não encontrado." });
        }

        // 4. REGRA DE NEGÓCIO: O aluno já está em outro ônibus?
        if (alunoEncontrado.onibusId !== null) {
            return response.status(400).json({ message: "Este aluno já está matriculado em outro ônibus." });
        }

        // 5. REGRA DE NEGÓCIO: O ônibus está cheio?
        if (onibusEncontrado.alunosMatriculados.length >= onibusEncontrado.capacidade) {
            return response.status(400).json({ message: "Este ônibus está lotado." });
        }

        // 6. TUDO OK! Faz a matrícula (a "mágica")
        // Coloca o ID do ônibus no aluno
        alunoEncontrado.onibusId = idOnibus;
        // Coloca o ID do aluno na lista do ônibus
        onibusEncontrado.alunosMatriculados.push(idAluno);

        response.status(200).json({ 
            message: `Aluno ${alunoEncontrado.nome} matriculado no ônibus ${onibusEncontrado.placa}!` 
        });
    }
};

module.exports = onibusController;