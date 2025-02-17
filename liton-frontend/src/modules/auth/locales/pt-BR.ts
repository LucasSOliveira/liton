const auth = {
    auth: {
        login: {
            tittle: 'Login',
            email: 'E-mail',
            password: 'Senha',
            description: 'Faça login para acessar sua conta',
            action: 'Entrar',
            toSignup: 'Não tem uma conta?',
        },
        signup: {
            tittle: 'Cadastro',
            email: 'E-mail',
            password: 'Criar Senha',
            refPassword: 'Repita a senha',
            name: 'Nome',
            description: 'Crie uma conta para começar',
            action: 'Cadastrar',
            toLogin: 'Já tem uma conta?',
        },
        erros: {
            invalidEmail: 'E-mail inválido',
            requiredField: 'Campo obrigatório',
            nameMinValue: 'O nome do usuário deve ter no mínimo 3 caracteres',
            passwordMinLength: 'A senha deve ter no mínimo 6 caracteres',
            invalidRefPassword: 'As senhas devem ser iguais',
            invalidPassword: 'Senha inválida'
        },
        messages: {
            login: 'Login realizado com sucesso',
            register: 'Cadastro realizado com sucesso',
        }

    }
}

export default auth