import { Components, Paths } from "swagger-jsdoc";
import { ContractPaths, ContractSchema } from "./contrato.swagger";
import { ReportPaths, ReportSchema } from "./report.swagger";
import { swaggerComponents, swaggerPaths } from "./initializations.swagger";
import { ModulePaths, ModuleSchema } from "./module.swagger";
import { cvPaths, cvSchemas } from "./cv.swagger";
import { RequestPaths, RequestSchema } from "./request.swagger";
import { FollowUpTypePaths, FollowUpTypeSchema } from "./followUpType.swagger";
import { HistoryPaths, HistorySchema } from "./history.swagger";
import { newPaths, NewsSchema } from "./comunicados.swagger";
import { BadRequestErrorSchemas } from "./error.swagger";

// Combinar todos los paths
export const globalPaths: Paths = {
  ...swaggerPaths,
  ...ContractPaths,
  ...ReportPaths,
  ...ModulePaths,
  ...cvPaths,
  ...RequestPaths,
  ...FollowUpTypePaths,
  ...HistoryPaths,
  ...newPaths
};

// Combinar todos los componentes
export const globalComponents: Components = {
  // Mantener securitySchemes de la configuración base
  securitySchemes: swaggerComponents.securitySchemes,

  // Combinar todos los schemas
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
    // Schemas de tipos de seguimiento
    ...(FollowUpTypeSchema.schemas || {}),

    // Schemas de historial
    ...(HistorySchema.schemas || {}),

    // Schema error 
    ...(BadRequestErrorSchemas.schemas || {}),

    // new
    ...NewsSchema,
  },
};
