const alunos = require('../models/alunoModel');

const alunoController = {
    listarAlunos: (req, res) => {
        res.json(alunos);
    },

    criarAluno: (req, res) => {
        const { nome, curso, matricula } = req.body;

        const novoAluno = {
            id: alunos.length + 1,
            nome,
            curso,
            matricula
        };

        alunos.push(novoAluno);

        res.status(201).json({ message: "Aluno criado!", aluno: novoAluno });
    }
};

module.exports = alunoController;
