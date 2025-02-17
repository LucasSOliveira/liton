const auth = {
    auth: {
        login: {
            tittle: "Login",
            email: "E-mail",
            password: "Password",
            description: "Log in to access your account",
            action: "Sign In",
            toSignup: "Don't have an account?",
        },
        signup: {
            tittle: "Sign Up",
            email: "E-mail",
            password: "Create Password",
            refPassword: "Repeat Password",
            name: "Name",
            description: "Create an account to get started",
            action: "Register",
            toLogin: "Already have an account?",
        },
        erros: {
            invalidEmail: "Invalid e-mail",
            requiredField: "Required field",
            nameMinValue: "The username must be at least 3 characters long",
            passwordMinLength: "The password must be at least 6 characters long",
            invalidRefPassword: "Passwords must match",
            invalidPassword: "Invalid password",

            erroLogin: "Error logging in",
            erroRegister: "Error registering",
            invalidData: "Invalid data, please check the fields and try again!",
            verifiedEmail: "E-mail already registered",
            invalidCredentials: "Invalid credentials",
        },
        messages: {
            login: "Successfully logged in",
            register: "Successfully registered",
        },
        userMenu: {
            myAccount: "My Account",
            goLogin: "Login",
            orders: "Orders",
            logout: "Logout",
            saudation: "Hello",
        },
    },
};

export default auth;