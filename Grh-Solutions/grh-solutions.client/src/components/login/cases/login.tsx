import { Button, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRef } from "react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correo = correoRef.current?.value;
    const contraseña = contraseñaRef.current?.value;
    console.log("Correo:", correo);
    console.log("Contraseña:", contraseña);
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
        Inicio de Sesión
      </Typography>
      <TextField
        id="crr"
        label="Correo"
        variant="outlined" // Cambio a outlined para mejor visibilidad
        inputRef={correoRef}
        fullWidth
        autoComplete="off"
      />
      <TextField
        id="ctr"
        label="Contraseña"
        variant="outlined" // Cambio a outlined para mejor visibilidad
        type="password"
        inputRef={contraseñaRef}
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
      <Button
        type="submit"
        variant="contained"
        sx={{
          width: { xs: "100%", sm: "50%" },
          margin: "0 auto",
          padding: "12px", // Ajuste de padding
        }}
      >
        Ingresar
      </Button>
    </Box>
  );
}