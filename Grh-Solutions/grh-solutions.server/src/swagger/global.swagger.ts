import { ContractPaths, ContractSchema } from "./contrato.swagger";
import { swaggerComponents, swaggerPaths } from "./initializations.swagger";

const globalPaths = {
  ...swaggerPaths,
  ...ContractPaths,
};

const globalComponents = {
  ...swaggerComponents,
  ...ContractSchema,
};

export { globalPaths, globalComponents };
