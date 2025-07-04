import { ContractPaths, ContractSchema } from "./contrato.swagger";
import { ReportPaths, ReportSchema } from "./report.swagger";
import { swaggerComponents, swaggerPaths } from "./initializations.swagger";
import { ModulePaths, ModuleSchema } from "./module.swagger";
import { cvPaths, cvSchemas } from "./cv.swagger";
import { RequestPaths, RequestSchema} from "./request.swagger";

const globalPaths = {
  ...swaggerPaths,
  ...ContractPaths,
  ...ReportPaths,
  ...ModulePaths,
  ...ReportPaths,
  ...cvPaths,
  ...RequestPaths
};

const globalComponents = {
  ...swaggerComponents,
  schemas: {
    ...(swaggerComponents.schemas || {}),
    Contract: ContractSchema,
    Report: ReportSchema,
    Module: ModuleSchema,
    Request: RequestSchema,
  },
  ...cvSchemas
};

export { globalPaths, globalComponents };
