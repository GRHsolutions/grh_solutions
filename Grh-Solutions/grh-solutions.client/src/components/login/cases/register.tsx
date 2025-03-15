import { Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { useRef } from "react";
import GrhTextField from "../../../generics/grh-generics/textField";
import GrhButton from "../../../generics/grh-generics/button";

interface RegisterProps {
  onRegister?: () => void;
}

// const styles = {
//   link: {
//     cursor: "pointer",
//     color: "blue",
//     textDecoration: "underline", // Subrayado para enlaces
//   } as React.CSSProperties,
// };

export default function Register({ 
  onRegister
}: RegisterProps) {
  const mailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const confirmPassRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correo = mailRef.current?.value;
    const contraseña = passRef.current?.value;
    const confirmacion = confirmPassRef.current?.value;
    console.log("Correo:", correo);
    console.log("Contraseña:", contraseña);
    console.log('confirmacion:', confirmacion)
    if(onRegister){
      onRegister();
    }
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
        color: theme.palette.text.primary
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "1.5rem", sm: "2rem" },
          textAlign: "center",
        }}
      >
        Registrarse
      </Typography>
      <GrhTextField
        id="crr"
        label="Correo"
        variant="outlined" // Cambio a outlined para mejor visibilidad
        ref={mailRef}
        fullWidth
        autoComplete="off"
      />
      <GrhTextField
        id="ctr"
        label="Contraseña"
        variant="outlined" // Cambio a outlined para mejor visibilidad
        type="password"
        ref={passRef}
        fullWidth
      />
      <GrhTextField
        id="ctr"
        label="Confirmar contraseña"
        variant="outlined" // Cambio a outlined para mejor visibilidad
        type="password"
        ref={confirmPassRef}
        fullWidth
      />
      <GrhButton
        type="submit"
        variant="tertiary"
        label="Registrar"
      />
    </Box>
  );
}
