import { ContractPaths, ContractSchema } from "./contrato.swagger";
import { ReportPaths, ReportSchema } from "./report.swagger";
import { swaggerComponents, swaggerPaths } from "./initializations.swagger";
import { ModulePaths, ModuleSchema } from "./module.swagger";

const globalPaths = {
  ...swaggerPaths,
  ...ContractPaths,
  ...ReportPaths,
  ...ModulePaths,
};

const globalComponents = {
  ...swaggerComponents,
  schemas: {
    ...(swaggerComponents.schemas || {}),
    Contract: ContractSchema,
    Report: ReportSchema,
    Module: ModuleSchema,
  },
};

export { globalPaths, globalComponents };
