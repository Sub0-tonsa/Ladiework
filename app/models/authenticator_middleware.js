const { validationResult } = require("express-validator");
const user = require("./usermodel.js");
const bcrypt = require("bcryptjs");

// TA LOGADO OU NAO?
checkAuthenticatedUser = (req, res, next) => {
    if (req.session.logado) {
        var logado = req.session.logado;
        req.session.logado = req.session.logado;
        req.session.autenticado++;
    } else {
        var logado = { logado: null, id: null, tipo: null }
        req.session.autenticado = 0;
    }
    next();
}


// LOGOUT - NAO FUNCIONANDO
clearSession = (req, res, next) => { // Declaração de uma função chamada 
    req.session.destroy(); // Remove todos os dados associados ao usuario. Usa a funcao da biblioteca nodejs "Destroy()"
    console.log("saiu!")
    next() // Chama a próxima função middleware na cadeia de execução.
}


recordAuthenticatedUser = async (req, res, next) => {
    console.log("Middleware recordAuthenticatedUser");

    const errors = validationResult(req);
    console.log("Validation errors:", errors.array());

    if (errors.isEmpty()) {
        const dataForm = {
            EMAIL_USUARIO: req.body.email_usu,
            SENHA_USUARIO: req.body.senha_usu
        };

        // Verificação no banco de dados para usuários comuns
        const results = await user.findUserEmail(dataForm);
        console.log("Database results:", results);

        if (results.length === 1 && bcrypt.compareSync(dataForm.SENHA_USUARIO, results[0].SENHA_USUARIO)) {
            const logado = {
                id: results[0].ID_USUARIO,
                nome: results[0].NOME_USUARIO,
                telefone: results[0].CELULAR_USUARIO,
                email: results[0].EMAIL_USUARIO,
                criacao: results[0].DT_CRIACAO_CONTA_USUARIO,
                
            };

            req.session.logado = logado;
            

            if (logado.id === 1) { // Se for o administrador
                console.log("Usuário administrador autenticado com sucesso:", logado);
                return res.redirect("/administrator"); // Redireciona para a página de administrador
            } else {
                console.log("Usuário comum autenticado com sucesso:", logado);
            }
        } else {
            req.session.logado = null; // Falha na autenticação
            console.log("Autenticação falhou");
        }
    } else {
        req.session.logado = null; // Erros de validação
        console.log("Erros de validação encontrados");
    }

    next(); // Continua para a próxima middleware/rota
};


verifyAuthorizedUser = (authorizedTypes, destinoFalha) => {
    return (req, res, next) => {
        if (req.session.logado != null &&
            authorizedTypes.includes(req.session.logado.id)) {
            next();
        } else {
            res.render(destinoFalha);
        }
    };
};


module.exports = {
    checkAuthenticatedUser,
    clearSession,
    recordAuthenticatedUser,
    verifyAuthorizedUser
}