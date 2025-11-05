export type ContractFilter = {
  title?: string;

  estado?: 
    | "borrador"
    | "por revisar"
    | "aprobado"
    | "por firmar"
    | "firmado"
    | "activo"
    | "vencido"
    | "cancelado";

  perfil_creador?: string;     // ObjectId
  perfil_empleado?: string;    // ObjectId
  tipo_contrato?: string;      // ObjectId
  vacante?: string;            // ObjectId

  eps?: 
    | "Nueva EPS"
    | "Sanitas"
    | "Sura"
    | "Compensar"
    | "Salud Total"
    | "Coomeva"
    | "Medimás"
    | "Mutual Ser"
    | "Capresoca"
    | "Famisanar";

  arl?: 
    | "Sura"
    | "Bolívar"
    | "Colmena"
    | "Positiva"
    | "Equidad"
    | "Mapfre";

  estrato?: 1 | 2 | 3 | 4 | 5 | 6;

  // 🗓 Filtros por rangos de fechas
  start_date_from?: string | Date;
  start_date_to?: string | Date;
  end_date_from?: string | Date;
  end_date_to?: string | Date;
};
