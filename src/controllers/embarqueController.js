// Precisamos "enxergar" os dois models para dar uma resposta completa
const alunos = require('../models/alunoModel');
const onibus = require('../models/onibusModel');

const embarqueController = {
    // Função principal que verifica o embarque
    verificar: (request, response) => {
        // 1. Pega a matrícula que o "leitor" (Thunder Client) enviou no Body
        const { matricula } = request.body;

        // Validação básica
        if (!matricula) {
            return response.status(400).json({ message: "Nenhuma matrícula fornecida." });
        }

        // 2. Procura o aluno por essa matrícula
        const alunoEncontrado = alunos.find(a => a.matricula === matricula);

        // 3. REGRA DE NEGÓCIO: Aluno não existe
        if (!alunoEncontrado) {
            return response.status(404).json({ 
                status: "NEGADO", 
                message: "Matrícula não encontrada no sistema." 
            });
        }

        // 4. REGRA DE NEGÓCIO: Aluno existe, mas não está matriculado
        if (alunoEncontrado.onibusId === null) {
            return response.status(403).json({ 
                status: "NEGADO", 
                message: `Aluno ${alunoEncontrado.nome} encontrado, mas não está matriculado em nenhum ônibus.`
            });
        }

        // 5. SUCESSO! O aluno existe e está matriculado.
        // Vamos encontrar o ônibus dele para dar uma resposta bonita
        const onibusEncontrado = onibus.find(o => o.id === alunoEncontrado.onibusId);

        // Se o ônibus não for encontrado (raro, mas pode acontecer)
        if (!onibusEncontrado) {
             return response.status(404).json({ 
                status: "ERRO", 
                message: `Aluno matriculado, mas o ônibus (ID: ${alunoEncontrado.onibusId}) não foi encontrado.`
            });
        }

        // Resposta de sucesso
        response.status(200).json({
            status: "APROVADO",
            message: `Embarque autorizado para ${alunoEncontrado.nome}.`,
            aluno: {
                nome: alunoEncontrado.nome,
                curso: alunoEncontrado.curso
            },
            onibus: {
                placa: onibusEncontrado.placa,
                modelo: onibusEncontrado.modelo
            }
        });
    }
};

module.exports = embarqueController;