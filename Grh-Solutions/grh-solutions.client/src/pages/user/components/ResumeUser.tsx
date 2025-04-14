import { Box, Typography, Avatar, Divider, List, ListItem, ListItemText, Alert, Link, useTheme } from "@mui/material";

const userInfo = {
  name: "Roberto Gómez Bolaños",
  title: "Gerente General",
  avatar: "https://via.placeholder.com/100",
  location: "Ciudad de México, México",
  phone: "+52 123 456 7890",
  email: "roberto.gomez@email.com",
};

const experiences = [
  {
    primary: "Gerente General - Grupo Televisión",
    secondary: "2005 - Presente | Dirección estratégica y liderazgo de equipos de producción.",
  },
  {
    primary: "Director de Producción - Empresa Audiovisual",
    secondary: "1990 - 2005 | Supervisión de contenido televisivo y planificación de proyectos.",
  },
];

const education = [
  "🎓 Licenciatura en Comunicación - Universidad Nacional Autónoma de México (1980 - 1985)",
];

const skills = [
  "✅ Liderazgo y gestión de equipos",
  "✅ Estrategia empresarial",
  "✅ Comunicación efectiva",
  "✅ Producción audiovisual",
];

export default function ResumeUser() {
  const hasResume = userInfo && (experiences.length || education.length || skills.length);
  const theme = useTheme();

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

        {hasResume ? (
          <>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3, mt: 2 }}>
              <Avatar sx={{ width: 100, height: 100, mr: 2 }} src={userInfo.avatar} />
              <Box>
                <Typography variant="h5" fontWeight="bold">{userInfo.name}</Typography>
                <Typography variant="body1" color="textSecondary">{userInfo.title}</Typography>
              </Box>
            </Box>

            <Divider />

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" fontWeight="bold">Información Personal</Typography>
              <Typography variant="body2">📍 {userInfo.location}</Typography>
              <Typography variant="body2">📞 {userInfo.phone}</Typography>
              <Typography variant="body2">✉️ {userInfo.email}</Typography>
            </Box>

            {experiences.length > 0 && (
              <>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ mt: 3, flex: 1 }}>
                  <Typography variant="h6" fontWeight="bold">Experiencia Laboral</Typography>
                  <List>
                    {experiences.map((exp, idx) => (
                      <ListItem key={idx}>
                        <ListItemText primary={exp.primary} secondary={exp.secondary} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </>
            )}

            {education.length > 0 && (
              <>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ mt: 1 }}>
                  <Typography variant="h6" fontWeight="bold">Educación</Typography>
                  {education.map((edu, idx) => (
                    <Typography key={idx} variant="body2">{edu}</Typography>
                  ))}
                </Box>
              </>
            )}

            {skills.length > 0 && (
              <>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mt: 3, mb: 4 }}>
                  <Typography variant="h6" fontWeight="bold">Habilidades</Typography>
                  {skills.map((skill, idx) => (
                    <Typography key={idx} variant="body2">{skill}</Typography>
                  ))}
                </Box>
              </>
            )}
          </>
        ) : (
          <Box
          sx={{
            mt: 4,
            p: 3,
            backgroundColor:
              theme.palette.mode === "dark" ? "#3E3E3E" : "#FFF3CD",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            boxShadow: theme.palette.mode === "dark" ? 3 : 2,
          }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                mb: 2,
                color: theme.palette.mode === "dark" ? "#FFF" : "#000", 
              }}
            >
              No tienes una hoja de vida registrada.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                color: theme.palette.mode === "dark" ? "#FFF" : "#000",
              }}
            >
              Puedes crearla{" "}
              <Link
                href="/hv-user"
                underline="hover"
                sx={{
                  ml: 1,
                  color: theme.palette.mode === "dark" ? "#FFF" : "#000",
                }}
              >
                Aquí
              </Link>
              .
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
