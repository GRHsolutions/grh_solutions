export interface CreateRolDto {
  _id: string;
  name: string;
  permissions: string[];
  isActive: boolean;
}

export interface UpdateRolDto {
  name: string;
  isActive: boolean;
  addPermissions: string[];
  removePermissions: string[];
}