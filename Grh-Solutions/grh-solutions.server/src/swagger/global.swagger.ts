import { ContractPaths, ContractSchema } from "./contrato.swagger";
import { ReportPaths, ReportSchema } from "./report.swagger";
import { swaggerComponents, swaggerPaths } from "./initializations.swagger";
import { cvPaths, cvSchemas } from "./cv.swagger";
import { ModulePaths, ModuleSchema } from "./module.swagger";

const globalPaths = {
  ...swaggerPaths,
  ...ContractPaths,
  ...ReportPaths,
  ...cvPaths,
  ...ModulePaths,
};

const globalComponents = {
  ...swaggerComponents,
  ...ContractSchema,
  ...ReportSchema,
  ...cvSchemas,
  ...ContractSchema,
  ...ReportSchema,
  ...ModuleSchema,
};

export { globalPaths, globalComponents };
