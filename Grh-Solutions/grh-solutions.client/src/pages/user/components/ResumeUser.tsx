import { Box, Typography, Avatar, Divider, List, ListItem, ListItemText } from "@mui/material";

export default function ResumeUser() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        borderLeft: "2px solid black",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          width: "78%",
          maxWidth: "900px",
          height: "100%",
          p: 4,
          borderRight: "2px solid black",
          borderLeft: "none",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <Typography variant="h4" align="center" mt={2}>
          Hoja de vida
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 3, mt: 2 }}>
          <Avatar sx={{ width: 100, height: 100, mr: 2 }} src="https://via.placeholder.com/100" />
          <Box>
            <Typography variant="h5" fontWeight="bold">Roberto Gómez Bolaños</Typography>
            <Typography variant="body1" color="textSecondary">Gerente General</Typography>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight="bold">Información Personal</Typography>
          <Typography variant="body2">📍 Ciudad de México, México</Typography>
          <Typography variant="body2">📞 +52 123 456 7890</Typography>
          <Typography variant="body2">✉️ roberto.gomez@email.com</Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box sx={{ mt: 3, flex: 1 }}>
          <Typography variant="h6" fontWeight="bold">Experiencia Laboral</Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Gerente General - Grupo Televisión"
                secondary="2005 - Presente | Dirección estratégica y liderazgo de equipos de producción."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Director de Producción - Empresa Audiovisual"
                secondary="1990 - 2005 | Supervisión de contenido televisivo y planificación de proyectos."
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box sx={{ mt: 1 }}>
          <Typography variant="h6" fontWeight="bold">Educación</Typography>
          <Typography variant="body2">🎓 Licenciatura en Comunicación - Universidad Nacional Autónoma de México (1980 - 1985)</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />
        <Box sx={{ mt: 3, mb: 4 }}>
          <Typography variant="h6" fontWeight="bold">Habilidades</Typography>
          <Typography variant="body2">✅ Liderazgo y gestión de equipos</Typography>
          <Typography variant="body2">✅ Estrategia empresarial</Typography>
          <Typography variant="body2">✅ Comunicación efectiva</Typography>
          <Typography variant="body2">✅ Producción audiovisual</Typography>
        </Box>
      </Box>
    </Box>
  );
}