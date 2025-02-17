const auth = {
    auth: {
        login: {
            tittle: 'Login',
            email: 'E-mail',
            password: 'Password',
            description: 'Log in to access your account',
            action: 'Sign In',
            toSignup: "Don't have an account?",
        },
        signup: {
            tittle: 'Sign Up',
            email: 'E-mail',
            password: 'Create Password',
            refPassword: 'Repeat Password',
            name: 'Name',
            description: 'Create an account to get started',
            action: 'Register',
            toLogin: 'Already have an account?',
        },
        erros: {
            invalidEmail: 'Invalid email',
            requiredField: 'Required field',
            nameMinValue: 'Username must be at least 3 characters',
            passwordMinLength: 'Password must be at least 6 characters',
            invalidRefPassword: 'Passwords must match',
            invalidPassword: 'Invalid password'
        },
        messages: {
            login: 'Logged in successfully',
            register: 'Registered successfully',
        }
    }
};

export default auth;