import { ContractPaths, ContractSchema } from "./contrato.swagger";
import { ReportPaths, ReportSchema } from "./report.swagger";
import { swaggerComponents, swaggerPaths } from "./initializations.swagger";

const globalPaths = {
  ...swaggerPaths,
  ...ContractPaths,
  ...ReportPaths
};

const globalComponents = {
  ...swaggerComponents,
  ...ContractSchema,
  ...ReportSchema
};

export { globalPaths, globalComponents };
