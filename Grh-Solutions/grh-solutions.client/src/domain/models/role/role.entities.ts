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
export interface RolDemo {
  _id: string;
  name: string;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}