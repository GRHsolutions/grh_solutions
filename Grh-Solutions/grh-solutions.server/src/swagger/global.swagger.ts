import { ContractPaths, ContractSchema } from "./contrato.swagger";
import { ReportPaths, ReportSchema } from "./report.swagger";
import { swaggerComponents, swaggerPaths } from "./initializations.swagger";
import { cvPaths, cvSchemas } from "./cv.swagger";

const globalPaths = {
  ...swaggerPaths,
  ...ContractPaths,
  ...ReportPaths,
  ...cvPaths
};

const globalComponents = {
  ...swaggerComponents,
  ...ContractSchema,
  ...ReportSchema,
  ...cvSchemas,
};

export { globalPaths, globalComponents };
