import { KaiCenat } from "../../../const/variables";

export const LoginService = {
    async login(correo: string, pass: string) { // ESTO ES UN SERVICIO QUE SOLO ES DE PRUEBA EN DESARROLLO SE HACE DE OTRA FORMA, JODIDOS.
        console.log(pass);

        return {
            token: "fdshf7fghoifufn'28hf0iejfolfppñf02'fñ¿f'fpf2i90lfñ2'¿e{f2'¿h4ik9'e2{}h{34¿g09kgñfb.{ortnmteogkep",
            usrName: "Pedro Sanchez",
            photo: KaiCenat,
            correo: correo
        }
    }   
  };