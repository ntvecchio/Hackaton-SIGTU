// 1. Importa as ferramentas que instalamos
const bcrypt = require('bcryptjs'); // Para criptografar senhas
const jwt = require('jsonwebtoken'); // Para criar o Token (a "chave mestra")

// 2. Importa nosso "banco de dados" de usuários
const users = require('../models/userModel');

// 3. Define a "Chave Secreta" do nosso sistema
// CONCEITO: Em um projeto real, isso NUNCA fica no código.
// Fica em um arquivo secreto (.env) no servidor.
// Mas para nosso estudo, vamos colocar aqui.
const JWT_SECRET = 'minha-chave-secreta-do-sigtu-123456';


const authController = {
    // ===============================================
    // FUNÇÃO: REGISTRAR (Criar um novo Admin)
    // ===============================================
    register: async (request, response) => {
        try {
            // 1. Pega o username e a senha do corpo (Body) da requisição
            const { username, password } = request.body;

            // 2. CONCEITO (bcrypt): Criptografar a senha
            // "Salt" (sal) é um "tempero" aleatório para a criptografia.
            // 10 é o "custo" (cost) - quanto maior, mais seguro e mais lento.
            const hashedPassword = await bcrypt.hash(password, 10);

            // 3. Cria o novo usuário
            const novoUsuario = {
                id: users.length + 1,
                username: username,
                password: hashedPassword // Salva a senha JÁ CRIPTOGRAFADA
            };

            // 4. Salva no nosso "banco de dados"
            users.push(novoUsuario);

            // 5. Responde que deu certo
            response.status(201).json({ message: "Usuário administrador criado com sucesso!" });

        } catch (error) {
            response.status(500).json({ message: "Erro ao registrar usuário", error: error.message });
        }
    },

    // ===============================================
    // FUNÇÃO: LOGIN (Entrar no sistema)
    // ===============================================
    login: async (request, response) => {
        try {
            // 1. Pega o username e a senha do corpo (Body)
            const { username, password } = request.body;

            // 2. Encontra o usuário no banco de dados pelo nome
            const user = users.find(u => u.username === username);

            // 3. Se não achou o usuário, dá erro de "Não autorizado"
            if (!user) {
                return response.status(401).json({ message: "Usuário ou senha inválidos." });
            }

            // 4. CONCEITO (bcrypt): Compara a senha
            // Pega a senha que o usuário digitou (password) e compara com a
            // senha criptografada que está salva no banco (user.password)
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            // 5. Se as senhas NÃO baterem, dá erro
            if (!isPasswordMatch) {
                return response.status(401).json({ message: "Usuário ou senha inválidos." });
            }

            // 6. CONCEITO (JWT): Login bem-sucedido! Criar a "Chave Mestra" (Token)
            // O Token vai "carregar" o ID do usuário e o nome dele.
            // Ele é assinado com a nossa Chave Secreta (JWT_SECRET)
            // E expira em 1 hora ('1h')
            const token = jwt.sign(
                { userId: user.id, username: user.username }, // O que vai dentro da chave
                JWT_SECRET,                                  // A assinatura secreta
                { expiresIn: '1h' }                          // Validade
            );

            // 7. Envia o Token (a "chave") de volta para o usuário
            response.status(200).json({ 
                message: "Login bem-sucedido!",
                token: token 
            });

        } catch (error) {
            response.status(500).json({ message: "Erro ao fazer login", error: error.message });
        }
    }
};



module.exports = authController;