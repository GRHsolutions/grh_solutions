import {  Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { useRef } from "react";
import { LoginService } from "../../../domain/services/login/login.service";
import { useAuth } from "../../../hooks/auth";
import GrhTextField from "../../../generics/grh-generics/textField";
import GrhButton from "../../../generics/grh-generics/button";

interface LoginProps {
  onRegister: () => void;
}

const styles = {
  link: {
    cursor: 'pointer',
    color: 'blue',
    textDecoration: 'underline', // Subrayado para enlaces
  } as React.CSSProperties,
};

export default function Login({ onRegister }: LoginProps) {
  const correoRef = useRef<HTMLInputElement>(null);
  const contraseñaRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("nigga")
    if(correoRef.current == undefined || contraseñaRef.current == undefined){
      return;
    }
    const correo = correoRef.current.value;
    const contraseña = contraseñaRef.current.value;
    LoginService.login(correo, contraseña)
      .then(e => {
        login(e.token, e.usrName, e.photo, e.correo);
      });    
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
      sx={{
        display: "grid",
        width: { xs: "90%", sm: "70%", md: "50%" }, // Ajuste de ancho responsivo
        gap: "1.5rem",
        margin: "0 auto",
        padding: { xs: "16px", sm: "24px" }, // Padding responsivo
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.primary.contrastText,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "1.5rem", sm: "2rem" },
          textAlign: "center",
        }}
      >
        Inicio de Sesión
      </Typography>
      <GrhTextField
        id="crr"
        label="Correo"
        ref={correoRef}
        fullWidth
        type="mail"
        autoComplete="off"
      />
      <GrhTextField
        id="ctr"
        label="Contraseña" // Cambio a outlined para mejor visibilidad
        type="password"
        ref={contraseñaRef}
        fullWidth
      />
      <Typography
        sx={{
          fontSize: { xs: "0.8rem", sm: "1rem" },
          textAlign: "center",
        }}
      >
        ¿Has olvidado tu contraseña? Haz clic <label onClick={onRegister} style={styles.link}>aquí</label>
      </Typography>
      <GrhButton
        type="submit"
        variant="principal"
        label="Ingresar"
      />
    </Box>
  );
}