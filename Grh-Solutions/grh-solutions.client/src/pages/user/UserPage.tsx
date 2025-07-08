import { Box, Grid2, useTheme } from "@mui/material";
import { useParametros } from "../../contexts/useParamether.provider";
import InfoUser from "./components/InfoUser";
import ResumeUser from "./components/ResumeUser";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTypeDocuments } from "../../domain/services/typeDocument/typeDocument.service";
import { IOption } from "../../domain/models/profile/profile.entities";

export default function InfoPage() {
  const [documentType, setDocumentType] = useState<IOption[]>([]);
  const { parametros } = useParametros();
  const { id } = useParams();
  const theme = useTheme();
  const { usePhoneScreen } = parametros;
  useEffect(() => {
    getTypeDocuments()
      .then((response) => {
        const opMap = response.data.map((item: any) => ({ value: item._id, name: item.name }));
        setDocumentType(opMap);
      })
  }, [id]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        height: "100%",
        width: "100%",
        fontSize: "1rem",
      }}
    >
      <Grid2
        container
        width={"80vw"}
        height={"100vh"}
        sx={{
          border: "3px solid black"
        }}
      >
        <Grid2
          size={5}
          sx={{
            boxShadow: `${theme.palette.primary.boxShadow}`,
            backgroundColor: `${theme.palette.primary.light}`,
            height: '100%',
            overflowY: 'hidden',
          }}
        >
          <InfoUser id={id} documentType={documentType} />
        </Grid2>
        {!usePhoneScreen && (
          <Grid2
            size={{
              sm: 7
            }}
            sx={{
              boxShadow: `${theme.palette.primary.boxShadow}`,
              backgroundColor: `${theme.palette.primary.light}`,
              height: '100%',
              overflowY: 'hidden',
            }}
          >
            <ResumeUser
            id={id}
            />
          </Grid2>
        )}
      </Grid2>
    </Box>
  )
}