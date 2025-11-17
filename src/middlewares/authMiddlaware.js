const jwt = require('jsonwebtoken');

// Pega a mesma chave secreta que usamos para *criar* o token
// ATENÇÃO: Tem que ser EXATAMENTE a mesma do authController.js
const JWT_SECRET = 'minha-chave-secreta-do-sigtu-123456';

// Este é o nosso "Porteiro" (Middleware)
function checkAuth(request, response, next) {
    // 1. De onde o usuário envia o token? Do "Cabeçalho" (Header)
    // O padrão é enviar um cabeçalho chamado "Authorization"
    // com o valor "Bearer <token>"
    const authHeader = request.headers['authorization'];
    
    // 2. O cabeçalho existe? Se sim, pega só o token (ignora o "Bearer ")
    const token = authHeader && authHeader.split(' ')[1];

    // 3. Se não veio um token, barra a entrada (Não Autorizado)
    if (!token) {
        return response.status(401).json({ message: "Acesso negado. Nenhum token fornecido." });
    }

    // 4. Se o token veio, vamos *verificar* se é válido
    try {
        // jwt.verify() tenta decodificar o token com a nossa chave secreta
        // Se for falso, adulterado ou expirado, ele vai dar um ERRO
        const payloadDecodificado = jwt.verify(token, JWT_SECRET);

        // 5. O token é válido! Anexa os dados do usuário (ex: id)
        // no objeto 'request' para que o Controller possa usá-lo se precisar
        request.user = payloadDecodificado;

        // 6. DEIXA O PEDIDO PASSAR para o próximo passo (o Controller)
        next(); 

    } catch (error) {
        // 7. O token é inválido (falso, expirado, etc.)
        response.status(403).json({ message: "Token inválido ou expirado." });
    }
}

module.exports = checkAuth;