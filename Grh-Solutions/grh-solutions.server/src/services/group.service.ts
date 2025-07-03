import {get} from "http";
import { groupsModel } from "../models/group.model";
import { GroupFilter } from "../filters/group.filter";

export const groupService = {
  getAll: async (filter: GroupFilter) => {
    const query: any = {};

    console.log(filter.name)

    if (filter.name && filter.name.trim() !== '') {
      query.$or = [{ name: new RegExp(filter.name, 'i') }]; // Búsqueda insensible a mayúsculas
    }

    return await groupsModel.find(query);
  },
  create: async (entity: { name: string; area: string; users: string[] }) => {
    return groupsModel.create(entity);
  },
update: async (
  id: string,
  payload: { name?: string; userId?: string; area?: string }
) => {
  const update: any = {};

  if (payload.name)   update.name = payload.name;
  if (payload.area)   update.area = payload.area;

  if (payload.userId) {
    update.$addToSet = { users: payload.userId }; // añade usuario sin duplicar
  }

  return groupsModel.findByIdAndUpdate(id, update, { new: true });
},
  delete: async (id: string) => {
    return groupsModel.findByIdAndDelete(id);
  },
deleteUserFromGroup: async (groupId: string, userId: string) => {
  return await groupsModel.findOneAndUpdate(
    { _id: groupId },
    { $pull: { users: userId } },
    { new: true }
  );
}
}