const onibus = require('../models/onibusModel');

const onibusController = {
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
            capacidade: capacidade
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
    }
};

module.exports = onibusController;