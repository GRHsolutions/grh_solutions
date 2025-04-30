export type Login = {
    correo: string,
    pass: string
};

export type ReturnableLogin = {
    correo: string,
    token: string,
    photo: string;
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