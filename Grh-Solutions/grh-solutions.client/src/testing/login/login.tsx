import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function Login() {
    // Definir los estados para correo y contraseña
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');

    // Manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Correo:', correo);
        console.log('Contraseña:', contraseña);
    };

    return (
        <Box
            component="form"
            sx={{
                display: "flex",
                flexDirection: 'column',
                alignItems: "center",
                gap: "15px",
                width: "1000px"
            }}
            onSubmit={handleSubmit}
            autoComplete="off"
        >
            <Typography>
                Inicio de Sesion
            </Typography>
            <TextField
                id="correo"
                label="Correo"
                variant="standard"
                value={correo}  // Establecer el valor del campo
                onChange={(e) => setCorreo(e.target.value)}  // Actualizar el estado
            />
            <TextField
                id="contraseña"
                label="Contraseña"
                variant="standard"
                type="password"
                value={contraseña}  // Establecer el valor del campo
                onChange={(e) => setContraseña(e.target.value)}  // Actualizar el estado
            />
            <Button
                type='submit'
                variant='contained'
            >
                Iniciar Sesion
            </Button>
        </Box>
    );
}
