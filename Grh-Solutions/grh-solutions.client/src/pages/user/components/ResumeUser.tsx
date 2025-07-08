import { Box, Typography, Avatar, Divider, List, ListItem, ListItemText, Alert, Link, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getMyCv } from "../../../domain/services/cv/cv.service";
import { useAuth } from "../../../hooks/auth";
import { ICv } from "../../../domain/models/Cv/cv.entities";

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
interface props {
  id?: string
}
export default function ResumeUser({ id }: props) {
  const [dataCv, setDataCv] = useState<ICv | null>(null);
  const { auth } = useAuth();
  const hasResume = dataCv !== null
  const theme = useTheme();
  useEffect(() => {
    getMyCv(id, auth.token).then((res) => setDataCv(res.data));
  }, []);
  console.log(dataCv);
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
              <Avatar sx={{ width: 100, height: 100, mr: 2 }} src={"https://via.placeholder.com/100"} />
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {`${dataCv.firstName} ${dataCv.middleName} ${dataCv.lastName} ${dataCv.secondLastName}`}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {dataCv.perfil}
                </Typography>
              </Box>
            </Box>

            <Divider />

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" fontWeight="bold">Información Personal</Typography>
              <Typography variant="body2">📍 {dataCv.city}, {dataCv.address}</Typography>
              <Typography variant="body2">📞 {dataCv.phone}</Typography>
              <Typography variant="body2">✉️ {dataCv.mail}</Typography>
            </Box>

            {dataCv.formations?.length > 0 && (
              <>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ mt: 1 }}>
                  <Typography variant="h6" fontWeight="bold">Educación</Typography>
                  {dataCv.formations.map((edu: any, idx: number) => (
                    <Typography key={idx} variant="body2">
                      🎓 {edu.tittle} - {edu.school}, {edu.city} ({new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()})
                    </Typography>
                  ))}
                </Box>
              </>
            )}

            {dataCv.skills?.length > 0 && (
              <>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mt: 3, mb: 4 }}>
                  <Typography variant="h6" fontWeight="bold">Habilidades</Typography>
                  {dataCv.skills.map((skill: any, idx: number) => (
                    <Typography key={idx} variant="body2">✅ {skill.name}</Typography>
                  ))}
                </Box>
              </>
            )}

            {dataCv.lenguages?.length > 0 && (
              <>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mt: 3, mb: 4 }}>
                  <Typography variant="h6" fontWeight="bold">Idiomas</Typography>
                  {dataCv.lenguages.map((lang: any, idx: number) => (
                    <Typography key={idx} variant="body2">
                      🌐 {lang.name} - Nivel: {lang.level}
                    </Typography>
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
