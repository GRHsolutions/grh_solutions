// ContratoPDF.tsx
import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { Contract } from "../../../domain/models/contratos/contratos.entities";

interface ContratoPDFProps {
  contrato: Contract;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: { width: 80, height: 80 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "underline",
    marginBottom: 20,
  },
  section: { marginBottom: 15 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    textDecoration: "underline",
  },
  paragraph: { textAlign: "justify", marginBottom: 10 },
  signatureBox: {
    marginTop: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signature: { textAlign: "center" },
});

const formatDate = (date?: string) => {
  if (!date) return "No aplica";
  const d = new Date(date);
  return d.toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" });
};

const ContratoPDF: React.FC<ContratoPDFProps> = ({ contrato }) => {
  if (!contrato) return null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text></Text>
          <Text style={{ fontSize: 10 }}>Contrato ID: {contrato._id}</Text>
        </View>

        <Text style={styles.title}>CONTRATO DE TRABAJO</Text>

        {/* Introducción */}
        <View style={styles.section}>
          <Text style={styles.paragraph}>
            En la ciudad de [Ciudad], a los {formatDate(contrato.start_date)}, se celebra el presente contrato de trabajo 
            entre <Text style={{ fontWeight: "bold" }}>{contrato.perfil_creador?.name} {contrato.perfil_creador?.lastname}</Text>, 
            identificado(a) con cédula {contrato.perfil_creador?.document}, en adelante denominado "EL EMPLEADOR", y 
            <Text style={{ fontWeight: "bold" }}>{contrato.perfil_empleado?.name} {contrato.perfil_empleado?.lastname}</Text>, 
            identificado(a) con cédula {contrato.perfil_empleado?.document}, en adelante denominado "EL EMPLEADO".
          </Text>

          <Text style={styles.paragraph}>
            Ambas partes acuerdan la celebración de este contrato bajo la modalidad de 
            <Text style={{ fontWeight: "bold" }}> {contrato.tipo_contrato?.name}</Text>, 
            cuyo objeto principal es regular la relación laboral, estableciendo derechos, deberes y obligaciones, 
            conforme a las leyes de la República de Colombia y a los reglamentos internos de la organización.
          </Text>
        </View>

        {/* Cláusulas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cláusulas del Contrato</Text>

          <Text style={styles.paragraph}>
            1. Objeto: El empleado desempeñará las funciones propias del cargo de 
            <Text style={{ fontWeight: "bold" }}> {contrato.vacante?.tittle || "No definido"}</Text>, ubicado en la sede {contrato.vacante?.address || "No definida"}, 
            cumpliendo con las tareas y responsabilidades indicadas en la descripción del puesto: {contrato.vacante?.description || "No especificada"}.
          </Text>

          <Text style={styles.paragraph}>
            2. Duración: El contrato inicia el día {formatDate(contrato.start_date)} y se mantiene hasta que alguna de las partes decida su terminación, 
            siguiendo lo establecido en la cláusula de terminación o por mutuo acuerdo. El tipo de contrato seleccionado, <Text style={{ fontWeight: "bold" }}>{contrato.tipo_contrato?.name}</Text>, 
            asegura continuidad laboral mientras se cumplan las condiciones pactadas.
          </Text>

          <Text style={styles.paragraph}>
            3. Remuneración: El empleado recibirá un salario de <Text style={{ fontWeight: "bold" }}>{contrato.vacante?.salary || "No definido"}</Text>, 
            pagadero según los periodos establecidos por la empresa. Además, contará con afiliación a la EPS <Text style={{ fontWeight: "bold" }}>{contrato.eps}</Text> 
            y a la ARL <Text style={{ fontWeight: "bold" }}>{contrato.arl}</Text> para garantizar cobertura completa.
          </Text>

          <Text style={styles.paragraph}>
            4. Jornada laboral: La jornada se realizará de <Text style={{ fontWeight: "bold" }}>{contrato.vacante?.horary}</Text>, bajo modalidad 
            <Text style={{ fontWeight: "bold" }}> {contrato.vacante?.type_modality}</Text>, asegurando cumplimiento de horarios y productividad. 
            Cualquier modificación será informada y acordada previamente.
          </Text>

          <Text style={styles.paragraph}>
            5. Obligaciones del empleado: Cumplir con las funciones asignadas, mantener confidencialidad sobre la información de la empresa, 
            ejecutar actividades con calidad y puntualidad, y respetar las políticas internas y los reglamentos de la compañía.
          </Text>

          <Text style={styles.paragraph}>
            6. Terminación: El contrato podrá darse por terminado por incumplimiento de obligaciones por alguna de las partes, mutuo acuerdo o por disposición legal.
          </Text>

          <Text style={styles.paragraph}>
            7. Ley aplicable: Este contrato se rige por las leyes de la República de Colombia y será interpretado conforme a la legislación vigente.
          </Text>

          <Text style={styles.paragraph}>
            8. Información adicional: El empleado cuenta con experiencia de {contrato.vacante?.experience || "No especificada"} y formación académica: {contrato.vacante?.formation || "No definida"}.
          </Text>
        </View>

        {/* Firmas */}
        <View style={styles.signatureBox}>
          <View style={styles.signature}>
            <Image src={contrato.firma_empleador} style={{ width: 120, height: 60 }} />
            <Text>Firma Empleador</Text>
            <Text>{contrato.perfil_creador?.name} {contrato.perfil_creador?.lastname}</Text>
          </View>
          <View style={styles.signature}>
            <Image src={contrato.firma_empleado} style={{ width: 120, height: 60 }} />
            <Text>Firma Empleado</Text>
            <Text>{contrato.perfil_empleado?.name} {contrato.perfil_empleado?.lastname}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ContratoPDF;