export type Login = {
    correo: string,
    pass: string
};

export type ReturnableLogin = {
    user: {
        correo: string,
        photo: string,
        isEmployee: boolean,
    },
    token: string,
}

export type RegisterConfirmation = {
    message: string,
    code: string
}

export type RegisterForm = {
    nombre: string,
    correo: string,
    contrasena: string,
    confirmContrasena: string
}