import { Components, Paths } from "swagger-jsdoc";
import { ContractPaths, ContractSchema } from "./contrato.swagger";
import { ReportPaths, ReportSchema } from "./report.swagger";
import { swaggerComponents, swaggerPaths } from "./initializations.swagger";
import { ModulePaths, ModuleSchema } from "./module.swagger";
import { cvPaths, cvSchemas } from "./cv.swagger";
import { RequestPaths, RequestSchema } from "./request.swagger";
import { InvolvedPaths, InvolvedSchemas } from "./involved.swagger";
import { HistoryPaths, HistorySchema } from "./history.swagger";
import { newPaths, NewsSchema } from "./comunicados.swagger";
//import { BadRequestErrorSchemas } from "./error.swagger";
import { permissionPaths, permissionSchemas } from "./permission.swagger";
import { TypeContractPaths, TypeContractSchema } from "./typeContract.swagger";

// Combinar todos los paths
export const globalPaths: Paths = {
  ...permissionPaths,
  ...swaggerPaths,
  ...ContractPaths,
  ...ReportPaths,
  ...ModulePaths,
  ...cvPaths,
  ...RequestPaths,
  ...InvolvedPaths,
  ...HistoryPaths,
  ...newPaths,
  ...TypeContractPaths,
};

// Combinar todos los components/schemas
export const globalComponents: Components = {
  securitySchemes: swaggerComponents.securitySchemes,
  schemas: {
    // Schemas base
    ...(swaggerComponents.schemas || {}),

    // Schemas de contratos
    ...(ContractSchema.schemas || {}),

    // Schemas de reportes
    ...(ReportSchema.schemas || {}),

    // Schema de módulos
    Module: ModuleSchema,

    // Schema de solicitudes
    Request: RequestSchema,

    // Schemas de CV
    ...(cvSchemas.schemas || {}),

    // Schemas de involucrados (IMPORTANTE: debe estar antes de cualquier $ref a Involved)
    ...InvolvedSchemas,

    // Schemas de historial
    History: HistorySchema,

    // Schema error
    //...(BadRequestErrorSchemas.schemas || {}),

    // Schemas de comunicados
    ...NewsSchema,

    // Schema permission
    ...permissionSchemas.schemas,

    // Schemas de tipo de contrato
    ...(TypeContractSchema.schemas || {}),
  },
};
