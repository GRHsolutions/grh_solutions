export type Permission = {
  ident: Ident;
  description: string;
};

export type Ident = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "MODULO";
  originalUrl: string;
  module: null | Module;
};

export type Module = {
  name: string;
  disabled: string;
  description: string;
};

export type VerifiedPermission = {
  success: boolean,
  permissions: {
    ident: Ident,
    granted: boolean
  }[]
}