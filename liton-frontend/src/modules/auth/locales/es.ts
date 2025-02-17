const auth = {
  auth: {
    login: {
      tittle: 'Iniciar sesión',
      email: 'Correo electrónico',
      password: 'Contraseña',
      description: 'Inicia sesión para acceder a tu cuenta',
      action: 'Ingresar',
      toSignup: '¿No tienes una cuenta?',
    },
    signup: {
      tittle: 'Registro',
      email: 'Correo electrónico',
      password: 'Crear Contraseña',
      refPassword: 'Repite la contraseña',
      name: 'Nombre',
      description: 'Crea una cuenta para comenzar',
      action: 'Registrarse',
      toLogin: '¿Ya tienes una cuenta?',
    },
    erros: {
      invalidEmail: 'Correo electrónico inválido',
      requiredField: 'Campo obligatorio',
      nameMinValue: 'El nombre de usuario debe tener al menos 3 caracteres',
      passwordMinLength: 'La contraseña debe tener al menos 6 caracteres',
      invalidRefPassword: 'Las contraseñas deben coincidir',
      invalidPassword: 'Contraseña inválida'
    },
    messages: {
      login: 'Inicio de sesión realizado con éxito',
      register: 'Registro realizado con éxito',
    }
  }
}

export default auth