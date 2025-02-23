import { Button, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRef } from "react";

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

export default function Register({  }: RegisterProps) {
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
      <TextField
        id="crr"
        label="Correo"
        variant="outlined" // Cambio a outlined para mejor visibilidad
        inputRef={mailRef}
        fullWidth
        autoComplete="off"
      />
      <TextField
        id="ctr"
        label="Contraseña"
        variant="outlined" // Cambio a outlined para mejor visibilidad
        type="password"
        inputRef={passRef}
        fullWidth
      />
      <TextField
        id="ctr"
        label="Confirmar contraseña"
        variant="outlined" // Cambio a outlined para mejor visibilidad
        type="password"
        inputRef={confirmPassRef}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          width: { xs: "100%", sm: "50%" },
          margin: "0 auto",
          padding: "12px", // Ajuste de padding
        }}
      >
        Registrar
      </Button>
    </Box>
  );
}
